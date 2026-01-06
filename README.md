# Film Festival Schedule Planner

A modern, single-page web application for planning your film festival schedule. Select films, manage screenings, and export your personalized schedule.

## Features

### Film Management
- **Browse Films** - View all available festival films with details (director, duration, description)
- **Search** - Filter films by title, director, or description
- **Select/Deselect** - Click on film cards to add or remove from your schedule
- **Priority Marking** - Star films as "must see" for schedule optimization

### Schedule Views
- **List View** - Chronological list of all selected screenings
- **Calendar View** - Week-based calendar grid showing screenings
- **Day View** - Detailed daily breakdown with timeline

### Schedule Optimization
- Smart algorithm to create conflict-free schedules
- Prioritizes "must see" films when resolving conflicts
- Uses weighted interval scheduling for optimal selection

### Export Options
- **iCal Export** - Download `.ics` file to import into any calendar app
- **PDF Export** - Generate a printable PDF of your schedule

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

Simply open `index.html` in any modern web browser. No build process or server required.

```bash
# Clone the repository
git clone <repository-url>
cd film-schedule-planner

# Open in browser
open index.html
# or
xdg-open index.html  # Linux
start index.html     # Windows
```

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled

## Project Structure

```
film-schedule-planner/
├── index.html    # Complete single-page application
└── README.md     # This file
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

## Sample Data

The app includes 6 sample films with multiple screening times:

1. The Midnight Garden / Keskiyön Puutarha
2. Echoes of Tomorrow / Huomisen Kaiut
3. Desert Roads / Aavikon Tiet
4. The Last Symphony / Viimeinen Sinfonia
5. Neon Nights / Neoniyöt
6. Whispers in the Wind / Kuiskauksia Tuulessa

## Customization

To add your own festival data, modify the `festivalData` array in the JavaScript section:

```javascript
const festivalData = [
    {
        id: 1,
        title: { en: "Film Title", fi: "Elokuvan nimi" },
        director: "Director Name",
        duration: "120 min",
        description: {
            en: "English description",
            fi: "Suomenkielinen kuvaus"
        },
        screenings: [
            { date: "2025-10-15T14:00", venue: "Main Theater" },
            { date: "2025-10-16T20:30", venue: "Screen 2" }
        ]
    },
    // ... more films
];
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License
