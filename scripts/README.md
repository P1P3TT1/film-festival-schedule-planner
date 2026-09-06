# Festival Data Generator

This directory contains tools to convert CSV files into the JSON format required by the Film Festival Schedule Planner.

The CSVs are an authoring convenience only. Once the JSON is generated it is the app's sole runtime data source, so everything the app needs has to end up in the JSON - nothing at runtime reads a CSV.

## Quick Start

1. **Edit the CSV templates** in the `data/templates/` directory:
   - [template_films.csv](../data/templates/template_films.csv) - Film information
   - [template_screenings.csv](../data/templates/template_screenings.csv) - Screening times and venues

2. **Run the converter**:
   ```bash
   python scripts/csv_to_json.py data/templates/template_films.csv data/templates/template_screenings.csv data/yourfestival2026.json
   ```

3. **Add to festivals.json** and test in the app

## CSV File Format

### Films CSV (template_films.csv)

| Column | Description | Example |
|--------|-------------|---------|
| ID | Unique film ID (integer) | 1 |
| Title_EN | English title | Film |
| Title_FI | Finnish title | Elokuva |
| Director | Director name (optional) | John Smith |
| Year | Release year (optional) | 2025 |
| Duration | Film duration | 105 min |
| Country_EN | English country, pipe-separated (optional) | Finland\|Sweden |
| Country_FI | Finnish country, pipe-separated (optional) | Suomi\|Ruotsi |
| Age_Limit | Age classification (optional) | K16 |
| Theme_EN | English programme strand, one per film (optional) | Midnight Mayhem |
| Theme_FI | Finnish programme strand (optional) | Midnight Mayhem |
| Keyword_EN | English keywords, pipe-separated (optional) | Love\|Aging\|Humour |
| Keyword_FI | Finnish keywords, pipe-separated (optional) | Rakkaus\|Ikääntyminen\|Huumori |
| Description_EN | English description (optional) | Description... |
| Description_FI | Finnish description (optional) | Kuvaus... |
| URL_EN | English festival page link (optional) | https://... |
| URL_FI | Finnish festival page link (optional) | https://... |

Only `ID`, `Title_EN`, `Title_FI` and `Duration` are required. Every other column may be left out of the file entirely, or left blank on any row - the converter emits genuine absence rather than empty placeholders.

**Themes and keywords**

- A **theme** is the festival's own programme strand and there is at most one per film, so `Theme_EN`/`Theme_FI` hold a single value with no pipe separator.
- A **keyword** is a broader descriptive tag (genre, mood, descriptor) and a film can have several, pipe-separated. This replaces the old `Genre_EN`/`Genre_FI` columns, which are still accepted as input aliases so existing festival CSVs convert without editing.
- Use the festival's own names in each language, never a translation you invented. Identical FI and EN forms (`Midnight Mayhem` in both) are fine and expected.
- The FI and EN forms of a multi-value cell are paired **by position**: the 3rd `Keyword_EN` item is the 3rd `Keyword_FI` item. The two cells must list the same number of items in the same order, or the converter stops with an error naming the film.
- If only one language is filled in, that value is used for both labels.
- Themes and keywords are optional per film and per festival, and independently of each other. A festival with no themes at all simply gets no theme filter in the app.

**Tips:**
- Use Excel or Google Sheets to edit the CSV
- Keep quotes in descriptions by using proper CSV escaping
- IDs must be unique integers
- Pipe (`|`) is the multi-value separator, so individual values must not contain one

### Screenings CSV (template_screenings.csv)

| Column | Description | Example |
|--------|-------------|---------|
| Film_ID | Reference to film ID | 1 |
| Date | Screening date (YYYY-MM-DD) | 2026-02-04 |
| Time | Screening time (HH:MM) | 20:30 |
| Venue | Theater/venue name | Cinema Palace |

**Tips:**
- Each row is one screening
- A film can have multiple screenings (multiple rows with same Film_ID)
- Use 24-hour time format
- Date must be in ISO format (YYYY-MM-DD)

## Generated JSON

The converter writes an object with two label registries and the films array:

```json
{
  "themeLabels": {
    "midnight-mayhem": { "en": "Midnight Mayhem", "fi": "Midnight Mayhem" }
  },
  "keywordLabels": {
    "aging": { "en": "Aging", "fi": "Ikääntyminen" }
  },
  "films": [
    {
      "id": 1,
      "title": { "en": "Film 1", "fi": "Elokuva 1" },
      "director": "Ohjaaja 1",
      "year": "2026",
      "duration": "90 min",
      "country": { "en": ["Finland"], "fi": ["Suomi"] },
      "ageLimit": "K16",
      "themeKey": "midnight-mayhem",
      "keywords": ["aging", "humour"],
      "urls": { "en": "https://...", "fi": "https://..." },
      "description": { "en": "", "fi": "" },
      "screenings": [{ "date": "2026-02-04T20:30", "venue": "Cinema Palace 7" }]
    }
  ]
}
```

Films carry theme and keyword **keys**, not labels; the registries resolve a key to its Finnish and English name at render time. That is what lets a user's filter selections survive a language switch.

Keys are derived from the English value, falling back to Finnish when the English cell is blank: diacritics are folded to ASCII, everything else is lowercased and hyphenated, so `Science Fiction` becomes `science-fiction` and `Ikääntyminen` becomes `ikaantyminen`. The derivation is deterministic, so re-running a scrape produces the same key for an unchanged value.

`country` and `ageLimit` are carried through for later use - the app does not display or filter on them yet. They are captured now because the CSV is discarded after conversion.

Fields that would be empty are omitted entirely rather than written as `""` or `null`.

## Workflow Example

### Step 1: Create your CSV files

Open Excel or Google Sheets and create two sheets:

**Films:**

| ID | Title_EN | Title_FI | Director | Year | Duration | Theme_EN | Theme_FI | Keyword_EN | Keyword_FI | URL_EN | URL_FI |
|----|----------|----------|----------|------|----------|----------|----------|------------|------------|--------|--------|
| 1 | Film One | Elokuva 1 | Director A | 2025 | 90 min | Midnight Mayhem | Midnight Mayhem | Horror\|Thriller | Kauhu\|Trilleri | https://... | https://... |
| 2 | Film Two | Elokuva 2 | Director B | 1987 | 120 min | Nordic Lights | Pohjoiset valot | Drama | Draama | https://... | https://... |

**Screenings:**

| Film_ID | Date | Time | Venue |
|---------|------|------|-------|
| 1 | 2026-10-15 | 14:00 | Screen 1 |
| 1 | 2026-10-16 | 20:30 | Screen 2 |
| 2 | 2026-10-15 | 18:00 | Main Theater |

### Step 2: Export as CSV

- Save/Export as CSV with UTF-8 encoding
- Name them something like `myfestival_films.csv` and `myfestival_screenings.csv`

### Step 3: Run the converter

```bash
python scripts/csv_to_json.py data/myfestival_films.csv data/myfestival_screenings.csv data/myfestival2026.json
```

### Step 4: Add to festivals.json

Edit [data/festivals.json](../data/festivals.json) and add your festival:

```json
{
  "id": "myfestival2026",
  "name": "My Festival",
  "year": "2026",
  "displayName": {
    "en": "My Festival 2026",
    "fi": "My Festival 2026"
  },
  "subtitle": {
    "en": "Select films and create your schedule",
    "fi": "Valitse elokuvat ja luo oma aikataulusi"
  },
  "dataFile": "data/myfestival2026.json",
  "startDate": "2026-10-15",
  "endDate": "2026-10-20"
}
```

### Step 5: Test

Open the app and select your festival from the dropdown!

## Troubleshooting

**Error: Missing required column**
- Check your CSV has all required columns with exact names (case-sensitive): `ID`, `Title_EN`, `Title_FI`, `Duration`

**Error: Invalid ID**
- IDs must be integers (1, 2, 3...)
- No duplicate IDs allowed

**Error: Keyword has N English value(s) but M Finnish value(s)**
- The `_EN` and `_FI` cells of a multi-value field must list the same items in the same order
- Check for a stray or missing `|` in the row the message names

**Error: Key collision**
- Two different values reduce to the same key (`Sci-Fi` and `Sci Fi`, say)
- Rename one of them in the CSV so the two stay distinct

**Error: Invalid date/time format**
- Dates: YYYY-MM-DD (e.g., 2026-02-04)
- Times: HH:MM in 24-hour format (e.g., 20:30)

**Warning: Film has no screenings**
- Check that Film_ID in screenings.csv matches the ID in films.csv

**Warning: conflicting Finnish labels**
- The same theme or keyword was given two different Finnish names in different rows
- The first one wins; fix the CSV if that is not what you wanted

## Advanced: Using Google Sheets

You can maintain your data in Google Sheets for easier collaboration:

1. Create a Google Sheet with two tabs: "Films" and "Screenings"
2. When ready to convert, export each sheet as CSV
3. Run the converter script
4. Commit the generated JSON to your repository

This way multiple people can help add film data without dealing with JSON formatting!
