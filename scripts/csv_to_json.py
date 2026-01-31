#!/usr/bin/env python3
"""
Convert CSV files to festival JSON format.

Usage:
    python scripts/csv_to_json.py data/template_films.csv data/template_screenings.csv data/output.json

The script reads films and screenings from CSV files and combines them into
the JSON format expected by the Film Festival Schedule Planner.
"""

import csv
import json
import sys
from datetime import datetime
from collections import defaultdict


def read_films_csv(filepath):
    """Read films from CSV file and return as list of dictionaries."""
    films = []

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                try:
                    film_id = int(row['ID'])
                except ValueError:
                    print(f"Warning: Invalid ID '{row['ID']}' - skipping row")
                    continue

                film = {
                    'id': film_id,
                    'title': {
                        'en': row['Title_EN'].strip(),
                        'fi': row['Title_FI'].strip()
                    },
                    'director': row['Director'].strip(),
                    'duration': row['Duration'].strip(),
                    'description': {
                        'en': row['Description_EN'].strip(),
                        'fi': row['Description_FI'].strip()
                    },
                    'screenings': []  # Will be populated from screenings CSV
                }
                films.append(film)

        print(f"[OK] Read {len(films)} films from {filepath}")
        return films

    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
        sys.exit(1)
    except KeyError as e:
        print(f"Error: Missing required column in films CSV: {e}")
        print("Required columns: ID, Title_EN, Title_FI, Director, Duration, Description_EN, Description_FI")
        sys.exit(1)


def read_screenings_csv(filepath):
    """Read screenings from CSV file and return grouped by Film_ID."""
    screenings_by_film = defaultdict(list)

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            screening_count = 0

            for row in reader:
                try:
                    film_id = int(row['Film_ID'])
                except ValueError:
                    print(f"Warning: Invalid Film_ID '{row['Film_ID']}' - skipping screening")
                    continue

                # Combine date and time into ISO format
                date_str = row['Date'].strip()
                time_str = row['Time'].strip()

                try:
                    # Validate date and time format
                    datetime.strptime(date_str, '%Y-%m-%d')
                    datetime.strptime(time_str, '%H:%M')

                    iso_datetime = f"{date_str}T{time_str}"

                    screening = {
                        'date': iso_datetime,
                        'venue': row['Venue'].strip()
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
    except KeyError as e:
        print(f"Error: Missing required column in screenings CSV: {e}")
        print("Required columns: Film_ID, Date, Time, Venue")
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
        print("  python scripts/csv_to_json.py data/template_films.csv data/template_screenings.csv data/output.json")
        sys.exit(1)

    films_csv = sys.argv[1]
    screenings_csv = sys.argv[2]
    output_json = sys.argv[3]

    print("Converting CSV to JSON...")
    print("-" * 50)

    # Read CSV files
    films = read_films_csv(films_csv)
    screenings = read_screenings_csv(screenings_csv)

    # Combine data
    festival_data = combine_data(films, screenings)

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
