# Film Festival Schedule Planner

A modern, responsive web application for planning your film festival schedule with multiple viewing modes and smart optimization. Browse films in cards, table, or list view, manage screenings, optimize your schedule, and export to iCal or PDF. Fully accessible with keyboard navigation and screen reader support.

**Key Features:** Multiple view types • Smart schedule optimization • Conflict detection • Mobile-optimized • iCal & PDF export • Bilingual support (FI/EN) • Dark mode • Festival page links • Film release years • Genre display & filtering

## Features

### Festival Selection
- **Multiple Festivals** - Switch between different festivals using the dropdown selector
- **Dynamic Data Loading** - Festival data loaded from JSON files for easy updates

### Date Filtering
- **Available Dates** - Select which dates you'll be attending the festival
- **Smart Filtering** - Films and screenings automatically filtered by selected dates
- **Quick Selection** - Select/deselect all dates with one click

### Film Browsing & Management
- **Multiple View Types** - Switch between three different viewing modes:
  - **Cards View** - Visual glassmorphic cards with full descriptions (default)
  - **Table View** - Data-dense table with sortable columns for quick scanning
  - **Compact List View** - Mobile-optimized horizontal layout with inline metadata
- **View Persistence** - Your preferred view is saved and restored on reload
- **Search & Filters** - Filter films by title, director, or description, with additional min/max range filters for release year and duration, and multi-select genre filter chips (collapsible filter panel with active-filter badge count)
- **Select/Deselect** - Click on films to add or remove from your schedule
- **Priority Marking** - Star films as "must see" for schedule optimization
- **Release Year** - Film release year displayed across all view types (cards, table, list)
- **Genre Display** - Bilingual genre metadata shown as a coloured chip (first genre) plus muted text (additional genres) in card view, and as plain comma-separated text in list and table views
- **Festival Page Links** - Optional external link icon next to film titles, linking to the film's page on the festival website (shown on hover tooltip)
- **Screening Management** - Remove individual screenings while keeping the film selected

### Schedule Views
- **List View** - Chronological list of all selected screenings
- **Calendar View** - Day-by-day breakdown with overlap warnings
- **Day View** - Detailed timeline visualization with hour-by-hour layout
- **Overlap Detection** - Visual warnings for conflicting screenings

### Schedule Optimization
- Smart algorithm to create conflict-free schedules
- Prioritizes "must see" films when resolving conflicts
- Uses weighted interval scheduling for optimal selection
- Automatically excludes conflicting screenings

### Export Options
- **iCal Export** - Download `.ics` file to import into any calendar app
- **PDF Export** - Generate a printable PDF matching your current view (list, calendar, or day)

### Internationalization
- Full support for Finnish (FI) and English (EN)
- Language toggle in the header
- All UI elements and film content translated

### Theme Support
- Light and dark mode
- Theme preference saved in local storage
- Smooth animated transitions

### Mobile Experience
- **Floating Navigation** - "Jump to Schedule" button appears when scrolling through films on mobile
- **Responsive Design** - Optimized layouts for mobile, tablet, and desktop
- **Touch-Friendly** - All controls sized appropriately for touch interaction
- **Adaptive Header** - Header controls scale and reposition on narrow viewports to prevent overlap
- **Table Scrolling** - Horizontal scroll for table view on small screens

### Accessibility
- **Keyboard Navigation** - Full keyboard support with Tab, Space, Enter, and Arrow keys
- **Screen Reader Support** - Announcements for all actions and state changes
- **ARIA Labels** - Proper roles and labels throughout the interface
- **Focus Management** - Clear focus indicators and logical tab order
- **Reduced Motion** - Respects `prefers-reduced-motion` user preference

## Getting Started

### Usage

The application loads festival data dynamically, so it must be served via a web server (not opened directly as a local file).

```bash
# Clone the repository
git clone <repository-url>
cd film-schedule-planner

# Start a local web server (choose one):

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have npx)
npx serve

# PHP
php -S localhost:8000

# Then open in browser:
# http://localhost:8000
```

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Web server (for local development)

## Project Structure

```
film-schedule-planner/
├── index.html              # Main HTML structure
├── styles.css              # All styling
├── script.js               # Application logic
├── data/
│   ├── festivals.json      # List of available festivals
│   ├── nightvisions_spring2026.json  # Night Visions Spring 2026 data
│   ├── templates/
│   │   ├── template_films.csv        # CSV template for film data
│   │   └── template_screenings.csv   # CSV template for screenings
│   └── archive/            # Archived past festival data
├── scripts/
│   ├── csv_to_json.py      # CSV to JSON converter
│   └── README.md           # Data generation guide
└── README.md               # This file
```

## Technology Stack

- **HTML5** - Semantic markup with accessibility attributes
- **CSS3** - Custom properties, flexbox, grid, animations
- **Vanilla JavaScript** - No framework dependencies
- **jsPDF** - PDF generation (loaded via CDN)
- **Google Fonts** - Playfair Display & DM Sans

## Design Features

- **Glassmorphism UI** - Translucent backgrounds with backdrop blur effects throughout
- **Animated Gradient Background** - Dynamic gradient with subtle noise texture
- **Multiple Layout Modes** - Cards grid, data table, and compact list views
- **Responsive Design** - Fully adaptive from mobile (320px) to desktop (1920px+)
- **Smooth Animations** - Hover effects, transitions, and state changes
- **Gradient Accents** - Color gradients for buttons, badges, and highlights
- **Theme Support** - Seamless light/dark mode with persistent preference

## Festival Data

**Adding your own festival data is easy!** Use the included CSV templates and converter script to quickly generate festival data from spreadsheets. See the [Adding New Festivals](#adding-new-festivals) section below.

## Adding New Festivals

### Easy Method: CSV to JSON Converter (Recommended)

The easiest way to add festival data is using the CSV-to-JSON converter:

1. **Edit the CSV templates** in Excel or Google Sheets:
   - [data/templates/template_films.csv](data/templates/template_films.csv) - Film information (includes Year, Genre_EN/Genre_FI, and optional URL columns)
   - [data/templates/template_screenings.csv](data/templates/template_screenings.csv) - Screening times

2. **Run the converter script**:
   ```bash
   python scripts/csv_to_json.py data/yourfestival_films.csv data/yourfestival_screenings.csv data/yourfestival2026.json
   ```

3. **Add to festivals list** in [data/festivals.json](data/festivals.json):
   ```json
   {
       "id": "yourfestival2026",
       "name": "Your Festival",
       "year": "2026",
       "displayName": {
           "en": "Your Festival 2026",
           "fi": "Your Festival 2026"
       },
       "subtitle": {
           "en": "Select films and create your schedule",
           "fi": "Valitse elokuvat ja luo oma aikataulusi"
       },
       "dataFile": "data/yourfestival2026.json",
       "startDate": "2026-10-15",
       "endDate": "2026-10-20"
   }
   ```

**Benefits:**
- No manual JSON editing required
- Easy to copy-paste data from festival websites
- Can use Google Sheets for collaborative data entry
- Automatic validation and error checking

See [scripts/README.md](scripts/README.md) for detailed instructions and examples.

### Manual Method: Direct JSON Editing

You can also create JSON files directly. The expected format:

```json
[
    {
        "id": 1,
        "title": { "en": "Film Title", "fi": "Elokuvan nimi" },
        "director": "Director Name",
        "year": "2026",
        "duration": "120 min",
        "url": "https://festival-website.com/films/film-title",
        "genres": {
            "en": ["Horror", "Thriller"],
            "fi": ["Kauhu", "Trilleri"]
        },
        "description": {
            "en": "English description",
            "fi": "Suomenkielinen kuvaus"
        },
        "screenings": [
            { "date": "2026-10-15T14:00", "venue": "Main Theater" },
            { "date": "2026-10-16T20:30", "venue": "Screen 2" }
        ]
    }
]
```

> **Note:** The `year`, `url`, and `genres` fields are optional. If `year` is provided, it is displayed in all film views. If `url` is provided, a link icon appears next to the film title linking to the film's page on the festival website. If `genres` is provided, genres are displayed beneath the film metadata and available as filter chips in the filter panel.

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License
