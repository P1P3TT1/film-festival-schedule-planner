# Film Festival Schedule Planner

A modern web application for planning your film festival schedule. Select films, manage screenings, optimize your schedule, and export to iCal or PDF. Supports multiple festivals with dynamic data loading.

## Features

### Festival Selection
- **Multiple Festivals** - Switch between different festivals using the dropdown selector
- **Dynamic Data Loading** - Festival data loaded from JSON files for easy updates
- Currently supports: DocPoint 2026 (more festivals can be added to [festivals.json](data/festivals.json))

### Date Filtering
- **Available Dates** - Select which dates you'll be attending the festival
- **Smart Filtering** - Films and screenings automatically filtered by selected dates
- **Quick Selection** - Select/deselect all dates with one click

### Film Management
- **Browse Films** - View all available festival films with details (director, duration, description)
- **Search** - Filter films by title, director, or description
- **Select/Deselect** - Click on film cards to add or remove from your schedule
- **Priority Marking** - Star films as "must see" for schedule optimization
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

### Accessibility
- Keyboard navigation support
- Screen reader announcements for actions
- Focus visible states
- Reduced motion support (`prefers-reduced-motion`)

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
│   └── docpoint2026.json   # DocPoint 2026 festival data
└── README.md               # This file
```

## Technology Stack

- **HTML5** - Semantic markup with accessibility attributes
- **CSS3** - Custom properties, flexbox, grid, animations
- **Vanilla JavaScript** - No framework dependencies
- **jsPDF** - PDF generation (loaded via CDN)
- **Google Fonts** - Playfair Display & DM Sans

## Design Features

- Glassmorphism UI with backdrop blur effects
- Animated gradient background
- Responsive grid layout
- Smooth hover and focus animations
- Gradient accent colors

## Festival Data

The app currently includes data for:
- **DocPoint 2026** - Documentary film festival (February 3-8, 2026)

## Adding New Festivals

To add a new festival:

1. Create a JSON data file in the [data/](data/) directory with your festival's films:

```json
[
    {
        "id": 1,
        "title": { "en": "Film Title", "fi": "Elokuvan nimi" },
        "director": "Director Name",
        "duration": "120 min",
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

2. Add your festival to [data/festivals.json](data/festivals.json):

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

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License
