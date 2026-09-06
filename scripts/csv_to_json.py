#!/usr/bin/env python3
"""
Convert CSV files to festival JSON format.

Usage:
    python scripts/csv_to_json.py data/templates/template_films.csv data/templates/template_screenings.csv data/output.json

The script reads films and screenings from CSV files and combines them into
the JSON format expected by the Film Festival Schedule Planner.

The CSV files are an authoring convenience only - once the JSON is generated it
is the app's sole runtime data source, so everything the app needs must end up
in the JSON.

Themes and keywords are emitted as stable keys plus two label registries:

    {
      "themeLabels":   { "midnight-mayhem": { "en": "...", "fi": "..." } },
      "keywordLabels": { "aging": { "en": "Aging", "fi": "Ikaantyminen" } },
      "films": [ { ..., "themeKey": "...", "keywords": ["..."] } ]
    }

Keys are derived from the English value (falling back to Finnish when the
English cell is blank), so the FI and EN forms of a value collapse to one
identity and re-running a scrape produces the same key for an unchanged value.
"""

import csv
import hashlib
import json
import re
import sys
import unicodedata
from datetime import datetime
from collections import defaultdict


# Columns a films CSV cannot do without. Director and Year are optional:
# shorts programmes are listed as single entries with neither.
REQUIRED_FILM_COLUMNS = ['ID', 'Title_EN', 'Title_FI', 'Duration']
REQUIRED_SCREENING_COLUMNS = ['Film_ID', 'Date', 'Time', 'Venue']

# Separator for multi-value cells. Individual values are assumed not to
# contain a literal pipe.
MULTI_VALUE_SEPARATOR = '|'


def make_key(value):
    """Derive a stable, deterministic key from a value.

    Diacritics are folded to ASCII and everything that is not a letter or a
    digit collapses to a hyphen, so "Science Fiction" -> "science-fiction" and
    "Ikaantyminen" -> "ikaantyminen". Values that slug to nothing (a title in a
    non-Latin script, say) fall back to a hash so the key is still stable.
    """
    ascii_form = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    slug = re.sub(r'[^a-z0-9]+', '-', ascii_form.lower()).strip('-')
    if not slug:
        slug = 'x-' + hashlib.md5(value.encode('utf-8')).hexdigest()[:8]
    return slug


def get_cell(row, *names):
    """Return the first non-empty value among the given column names.

    Accepting several names is how legacy column aliases are supported
    (Genre_EN for Keyword_EN, a single URL for URL_EN/URL_FI). Missing columns
    and short rows both read as empty rather than raising.
    """
    for name in names:
        value = row.get(name)
        if value and value.strip():
            return value.strip()
    return ''


def split_multi(cell):
    """Split a pipe-separated cell into its individual values."""
    return [value.strip() for value in cell.split(MULTI_VALUE_SEPARATOR) if value.strip()]


def pair_bilingual(en_cell, fi_cell, film_id, field, problems):
    """Index-pair the EN and FI forms of a multi-value cell.

    Returns a list of (en, fi) tuples. If only one language is present its
    value is used for both labels. A count mismatch is recorded as a problem
    and the field is dropped, so values are never silently truncated or
    mis-paired.
    """
    en_values = split_multi(en_cell)
    fi_values = split_multi(fi_cell)

    if not en_values and not fi_values:
        return []
    if not en_values:
        return [(value, value) for value in fi_values]
    if not fi_values:
        return [(value, value) for value in en_values]

    if len(en_values) != len(fi_values):
        problems.append(
            f"Film ID {film_id}: {field} has {len(en_values)} English value(s) but "
            f"{len(fi_values)} Finnish value(s) - the two cells must list the same "
            f"items in the same order.\n"
            f"    EN: {en_cell}\n"
            f"    FI: {fi_cell}"
        )
        return []

    return list(zip(en_values, fi_values))


def register_values(registry, pairs, problems):
    """Register (en, fi) label pairs and return their keys, in order."""
    keys = []

    for en, fi in pairs:
        canonical = en or fi
        key = make_key(canonical)
        labels = {'en': en or fi, 'fi': fi or en}

        existing = registry.get(key)
        if existing is None:
            registry[key] = labels
        elif existing['en'] != labels['en']:
            problems.append(
                f"Key collision: '{existing['en']}' and '{labels['en']}' both produce "
                f"the key '{key}' - rename one of them so they stay distinct."
            )
        elif existing['fi'] != labels['fi']:
            print(
                f"Warning: '{labels['en']}' has conflicting Finnish labels "
                f"('{existing['fi']}' and '{labels['fi']}') - keeping '{existing['fi']}'"
            )

        if key not in keys:
            keys.append(key)

    return keys


def check_columns(reader, required, filepath, kind):
    """Exit with a clear message if a required column is missing."""
    fieldnames = reader.fieldnames or []
    missing = [name for name in required if name not in fieldnames]
    if missing:
        print(f"Error: Missing required column(s) in {kind} CSV {filepath}: {', '.join(missing)}")
        print(f"Required columns: {', '.join(required)}")
        sys.exit(1)


def read_films_csv(filepath):
    """Read films from CSV file.

    Returns (films, theme_labels, keyword_labels).
    """
    films = []
    theme_labels = {}
    keyword_labels = {}
    problems = []

    try:
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            check_columns(reader, REQUIRED_FILM_COLUMNS, filepath, 'films')

            for row in reader:
                try:
                    film_id = int(row['ID'])
                except (TypeError, ValueError):
                    print(f"Warning: Invalid ID '{row.get('ID')}' - skipping row")
                    continue

                film = {
                    'id': film_id,
                    'title': {
                        'en': get_cell(row, 'Title_EN'),
                        'fi': get_cell(row, 'Title_FI')
                    },
                    'director': get_cell(row, 'Director'),
                    'year': get_cell(row, 'Year'),
                    'duration': get_cell(row, 'Duration')
                }

                # Country and age limit are carried through for later use; the
                # app does not display or filter on them yet.
                country_pairs = pair_bilingual(
                    get_cell(row, 'Country_EN'), get_cell(row, 'Country_FI'),
                    film_id, 'Country', problems
                )
                if country_pairs:
                    film['country'] = {
                        'en': [en for en, _ in country_pairs],
                        'fi': [fi for _, fi in country_pairs]
                    }

                age_limit = get_cell(row, 'Age_Limit')
                if age_limit:
                    film['ageLimit'] = age_limit

                # Theme: a single programme strand per film, no pipe splitting.
                theme_en = get_cell(row, 'Theme_EN')
                theme_fi = get_cell(row, 'Theme_FI')
                if theme_en or theme_fi:
                    theme_keys = register_values(theme_labels, [(theme_en, theme_fi)], problems)
                    if theme_keys:
                        film['themeKey'] = theme_keys[0]

                # Keywords: pipe-separated. Genre_* is the legacy column name.
                keyword_pairs = pair_bilingual(
                    get_cell(row, 'Keyword_EN', 'Genre_EN'),
                    get_cell(row, 'Keyword_FI', 'Genre_FI'),
                    film_id, 'Keyword', problems
                )
                if keyword_pairs:
                    keyword_keys = register_values(keyword_labels, keyword_pairs, problems)
                    if keyword_keys:
                        film['keywords'] = keyword_keys

                # Per-language festival page. A legacy single URL serves both.
                urls = {}
                url_en = get_cell(row, 'URL_EN', 'URL')
                url_fi = get_cell(row, 'URL_FI', 'URL')
                if url_en:
                    urls['en'] = url_en
                if url_fi:
                    urls['fi'] = url_fi
                if urls:
                    film['urls'] = urls

                film['description'] = {
                    'en': get_cell(row, 'Description_EN'),
                    'fi': get_cell(row, 'Description_FI')
                }
                film['screenings'] = []  # Will be populated from screenings CSV

                films.append(film)

    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
        sys.exit(1)

    if problems:
        print(f"\nError: {len(problems)} problem(s) found in {filepath}:")
        for problem in problems:
            print(f"  - {problem}")
        print("\nNo output written. Fix the CSV and run again.")
        sys.exit(1)

    print(f"[OK] Read {len(films)} films from {filepath}")
    if theme_labels:
        print(f"[OK] Found {len(theme_labels)} themes")
    if keyword_labels:
        print(f"[OK] Found {len(keyword_labels)} keywords")

    return films, theme_labels, keyword_labels


def read_screenings_csv(filepath):
    """Read screenings from CSV file and return grouped by Film_ID."""
    screenings_by_film = defaultdict(list)

    try:
        with open(filepath, 'r', encoding='utf-8-sig') as f:
            reader = csv.DictReader(f)
            check_columns(reader, REQUIRED_SCREENING_COLUMNS, filepath, 'screenings')
            screening_count = 0

            for row in reader:
                try:
                    film_id = int(row['Film_ID'])
                except (TypeError, ValueError):
                    print(f"Warning: Invalid Film_ID '{row.get('Film_ID')}' - skipping screening")
                    continue

                # Combine date and time into ISO format
                date_str = get_cell(row, 'Date')
                time_str = get_cell(row, 'Time')

                try:
                    # Validate date and time format
                    datetime.strptime(date_str, '%Y-%m-%d')
                    datetime.strptime(time_str, '%H:%M')

                    iso_datetime = f"{date_str}T{time_str}"

                    screening = {
                        'date': iso_datetime,
                        'venue': get_cell(row, 'Venue')
                    }

                    screenings_by_film[film_id].append(screening)
                    screening_count += 1

                except ValueError as e:
                    print(f"Warning: Invalid date/time format in row: {row} - {e}")
                    continue

        print(f"[OK] Read {screening_count} screenings from {filepath}")
        return screenings_by_film

    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
        sys.exit(1)


def combine_data(films, screenings_by_film):
    """Combine films with their screenings."""
    for film in films:
        film_id = film['id']
        if film_id in screenings_by_film:
            # Sort screenings by date
            film['screenings'] = sorted(
                screenings_by_film[film_id],
                key=lambda s: s['date']
            )
        else:
            print(f"Warning: Film ID {film_id} ({film['title']['en']}) has no screenings")

    return films


def build_festival_data(films, theme_labels, keyword_labels):
    """Assemble the festival JSON document."""
    return {
        'themeLabels': dict(sorted(theme_labels.items())),
        'keywordLabels': dict(sorted(keyword_labels.items())),
        'films': films
    }


def write_json(data, filepath):
    """Write data to JSON file with proper formatting."""
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"[OK] Wrote festival data to {filepath}")
    except Exception as e:
        print(f"Error writing JSON file: {e}")
        sys.exit(1)


def main():
    if len(sys.argv) != 4:
        print("Usage: python scripts/csv_to_json.py <films.csv> <screenings.csv> <output.json>")
        print("\nExample:")
        print("  python scripts/csv_to_json.py data/templates/template_films.csv data/templates/template_screenings.csv data/output.json")
        sys.exit(1)

    films_csv = sys.argv[1]
    screenings_csv = sys.argv[2]
    output_json = sys.argv[3]

    print("Converting CSV to JSON...")
    print("-" * 50)

    # Read CSV files
    films, theme_labels, keyword_labels = read_films_csv(films_csv)
    screenings = read_screenings_csv(screenings_csv)

    # Combine data
    films = combine_data(films, screenings)
    festival_data = build_festival_data(films, theme_labels, keyword_labels)

    # Write output
    write_json(festival_data, output_json)

    print("-" * 50)
    print(f"[OK] Conversion complete! {len(films)} films with screenings")
    print(f"\nNext steps:")
    print(f"  1. Review the output: {output_json}")
    print(f"  2. Update festivals.json to reference this file")
    print(f"  3. Test in the application")


if __name__ == '__main__':
    main()
