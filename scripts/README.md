# Festival Data Generator

This directory contains tools to convert CSV files into the JSON format required by the Film Festival Schedule Planner.

## Quick Start

1. **Edit the CSV templates** in the `data/` directory:
   - [template_films.csv](../data/template_films.csv) - Film information
   - [template_screenings.csv](../data/template_screenings.csv) - Screening times and venues

2. **Run the converter**:
   ```bash
   python scripts/csv_to_json.py data/template_films.csv data/template_screenings.csv data/yourfestival2026.json
   ```

3. **Add to festivals.json** and test in the app

## CSV File Format

### Films CSV (template_films.csv)

| Column | Description | Example |
|--------|-------------|---------|
| ID | Unique film ID (integer) | 1 |
| Title_EN | English title | ABODE OF DAWN |
| Title_FI | Finnish title | ABODE OF DAWN |
| Director | Director name | Kristina Shtubert |
| Duration | Film duration | 105 min |
| Description_EN | English description | A cult living in Siberia... |
| Description_FI | Finnish description | Siperiassa elävää kulttia... |

**Tips:**
- Use Excel or Google Sheets to edit the CSV
- Keep quotes in descriptions by using proper CSV escaping
- IDs must be unique integers
- You can copy-paste descriptions from festival websites

### Screenings CSV (template_screenings.csv)

| Column | Description | Example |
|--------|-------------|---------|
| Film_ID | Reference to film ID | 1 |
| Date | Screening date (YYYY-MM-DD) | 2026-02-04 |
| Time | Screening time (HH:MM) | 20:30 |
| Venue | Theater/venue name | Kinopalatsi 7 |

**Tips:**
- Each row is one screening
- A film can have multiple screenings (multiple rows with same Film_ID)
- Use 24-hour time format
- Date must be in ISO format (YYYY-MM-DD)

## Workflow Example

### Step 1: Create your CSV files

Open Excel or Google Sheets and create two sheets:

**Films:**
```
ID | Title_EN | Title_FI | Director | Duration | Description_EN | Description_FI
1  | Film One | Elokuva 1 | Director A | 90 min | English desc | Finnish desc
2  | Film Two | Elokuva 2 | Director B | 120 min | English desc | Finnish desc
```

**Screenings:**
```
Film_ID | Date       | Time  | Venue
1       | 2026-10-15 | 14:00 | Screen 1
1       | 2026-10-16 | 20:30 | Screen 2
2       | 2026-10-15 | 18:00 | Main Theater
```

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
- Check your CSV has all required columns with exact names (case-sensitive)

**Error: Invalid ID**
- IDs must be integers (1, 2, 3...)
- No duplicate IDs allowed

**Error: Invalid date/time format**
- Dates: YYYY-MM-DD (e.g., 2026-02-04)
- Times: HH:MM in 24-hour format (e.g., 20:30)

**Warning: Film has no screenings**
- Check that Film_ID in screenings.csv matches the ID in films.csv

## Advanced: Using Google Sheets

You can maintain your data in Google Sheets for easier collaboration:

1. Create a Google Sheet with two tabs: "Films" and "Screenings"
2. When ready to convert, export each sheet as CSV
3. Run the converter script
4. Commit the generated JSON to your repository

This way multiple people can help add film data without dealing with JSON formatting!
