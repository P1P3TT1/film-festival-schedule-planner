// Theme handling
let currentTheme = localStorage.getItem('theme') || 'light';

function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const lightIcon = document.getElementById('themeIconLight');
    const darkIcon = document.getElementById('themeIconDark');
    if (currentTheme === 'light') {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    } else {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    }
}

initTheme();

// Festival management
let availableFestivals = [];
let currentFestival = null;

// Load available festivals from festivals.json
async function loadFestivals() {
    try {
        const response = await fetch('data/festivals.json');
        availableFestivals = await response.json();
        return availableFestivals;
    } catch (error) {
        console.error('Error loading festivals:', error);
        return [];
    }
}

// Load specific festival data
async function loadFestivalData(festivalId) {
    const festival = availableFestivals.find(f => f.id === festivalId);
    if (!festival) {
        console.error('Festival not found:', festivalId);
        return false;
    }

    try {
        const response = await fetch(festival.dataFile);
        festivalData = await response.json();
        currentFestival = festival;
        return true;
    } catch (error) {
        console.error('Error loading festival data:', error);
        return false;
    }
}

// Update page headers based on current festival
function updateHeadersForFestival() {
    if (!currentFestival) return;

    const lang = currentLang;
    const headerTitle = document.getElementById('headerTitle');
    const headerSubtitle = document.getElementById('headerSubtitle');

    if (headerTitle && currentFestival.displayName) {
        headerTitle.textContent = currentFestival.displayName[lang] || currentFestival.displayName.en;
    }
    if (headerSubtitle && currentFestival.subtitle) {
        headerSubtitle.textContent = currentFestival.subtitle[lang] || currentFestival.subtitle.en;
    }
}

// Populate festival selector dropdown
function populateFestivalSelector() {
    const selector = document.getElementById('festivalSelector');
    if (!selector) return;

    selector.innerHTML = availableFestivals.map(festival => {
        const displayText = `${festival.name} ${festival.year}`;
        const selected = currentFestival && currentFestival.id === festival.id ? 'selected' : '';
        return `<option value="${festival.id}" ${selected}>${displayText}</option>`;
    }).join('');
}

// Change festival when user selects from dropdown
async function changeFestival(festivalId) {
    const loaded = await loadFestivalData(festivalId);
    if (loaded) {
        localStorage.setItem('selectedFestival', festivalId);

        // Reset state
        selectedFilms.clear();
        excludedScreenings.clear();
        priorityFilms.clear();
        availableDates.clear();
        searchQuery = '';

        // Update UI
        updateHeadersForFestival();
        initializeAvailableDates();
        renderDateSelector();
        renderFilms();
        renderSchedule();
        updateDownloadButton();
    }
}

// Initialize the application
async function initializeApp() {
    // Load festivals list
    await loadFestivals();

    // Populate festival selector
    populateFestivalSelector();

    // Load default festival (first one or from localStorage)
    const savedFestivalId = localStorage.getItem('selectedFestival');
    const defaultFestivalId = savedFestivalId || (availableFestivals[0]?.id);

    if (defaultFestivalId) {
        const loaded = await loadFestivalData(defaultFestivalId);
        if (loaded) {
            populateFestivalSelector(); // Update selector to show selected festival
            updateHeadersForFestival();
            initializeAvailableDates();
            renderFilms();
            renderSchedule();
            renderDateSelector();
        }
    }
}

// Translations
const translations = {
    en: {
        headerTitle: "",
        headerSubtitle: "",
        filmsTitle: "Films",
        scheduleTitle: "Your Schedule",
        searchPlaceholder: "Search films...",
        downloadBtn: "Add to Calendar",
        downloadPdf: "Download PDF",
        noFilmsFound: "No films found",
        tryDifferentSearch: "Try a different search term",
        noFilmsSelected: "No films selected yet",
        clickToAdd: "Click on films above to add them to your schedule",
        screening: "screening",
        screenings: "screenings",
        director: "Dir.",
        viewList: "List",
        viewCalendar: "Calendar",
        viewDay: "Day",
        removeScreening: "Remove from schedule",
        restoreScreening: "Restore to schedule",
        removedScreenings: "removed",
        showRemoved: "Show removed",
        pdfTitle: "Film Festival Schedule",
        pdfGenerated: "Generated",
        selectAll: "Select all",
        deselectAll: "Deselect all",
        mustSee: "Must see",
        removePriority: "Remove priority",
        optimizeSchedule: "Optimize",
        optimizeTooltip: "Create optimal schedule without conflicts",
        optimized: "Schedule optimized",
        filmsIncluded: "films included",
        priorityIncluded: "priority films included",
        availableDates: "Available dates",
        selectAllDates: "Select all",
        deselectAllDates: "Deselect all",
        datesSelected: "dates selected"
    },
    fi: {
        headerTitle: "",
        headerSubtitle: "",
        filmsTitle: "Elokuvat",
        scheduleTitle: "Aikataulusi",
        searchPlaceholder: "Etsi elokuvia...",
        downloadBtn: "Lataa kalenteriin",
        downloadPdf: "Lataa PDF",
        noFilmsFound: "Elokuvia ei löytynyt",
        tryDifferentSearch: "Kokeile eri hakusanaa",
        noFilmsSelected: "Ei valittuja elokuvia",
        clickToAdd: "Klikkaa elokuvia lisätäksesi ne aikatauluusi",
        screening: "näytös",
        screenings: "näytöstä",
        director: "Ohj.",
        viewList: "Lista",
        viewCalendar: "Kalenteri",
        viewDay: "Päivä",
        removeScreening: "Poista aikataulusta",
        restoreScreening: "Palauta aikatauluun",
        removedScreenings: "poistettu",
        showRemoved: "Näytä poistetut",
        pdfTitle: "Elokuvafestivaalin aikataulu",
        pdfGenerated: "Luotu",
        selectAll: "Valitse kaikki",
        deselectAll: "Poista valinnat",
        mustSee: "Pakko nähdä",
        removePriority: "Poista prioriteetti",
        optimizeSchedule: "Optimoi",
        optimizeTooltip: "Luo optimaalinen aikataulu ilman päällekkäisyyksiä",
        optimized: "Aikataulu optimoitu",
        filmsIncluded: "elokuvaa mukana",
        priorityIncluded: "prioriteettielokuvaa mukana",
        availableDates: "Saatavilla olevat päivät",
        selectAllDates: "Valitse kaikki",
        deselectAllDates: "Poista valinnat",
        datesSelected: "päivää valittu"
    }
};

// Festival data (loaded dynamically)
let festivalData = [];
let selectedFilms = new Set();
let excludedScreenings = new Set(); // Tracks removed screenings as "filmId-dateString"
let priorityFilms = new Set(); // Films marked as "must see"
let searchQuery = '';
let currentLang = 'fi';
let availableDates = new Set(); // Dates the user is available (all by default)

// Get all unique dates from festival data
function getAllDates() {
    const dates = new Set();
    festivalData.forEach(film => {
        film.screenings.forEach(screening => {
            const dateKey = screening.date.split('T')[0];
            dates.add(dateKey);
        });
    });
    return Array.from(dates).sort();
}

// Initialize available dates (all dates by default)
function initializeAvailableDates() {
    const allDates = getAllDates();
    allDates.forEach(date => availableDates.add(date));
}

function changeLanguage(lang, event) {
    currentLang = lang;
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-current', 'false');
    });
    event.currentTarget.classList.add('active');
    event.currentTarget.setAttribute('aria-current', 'true');
    
    const t = translations[lang];
    updateHeadersForFestival();
    document.getElementById('filmsTitle').textContent = t.filmsTitle;
    document.getElementById('scheduleTitle').textContent = t.scheduleTitle;
    document.getElementById('searchInput').placeholder = t.searchPlaceholder;
    document.getElementById('searchLabel').textContent = t.searchPlaceholder;
    document.getElementById('downloadBtnText').textContent = t.downloadBtn;
    document.getElementById('filmsGrid').setAttribute('aria-label', t.filmsTitle);
    document.getElementById('themeToggleBtn').setAttribute('aria-label', 
        lang === 'fi' ? 'Vaihda tumma/vaalea tila' : 'Toggle dark/light mode');
    document.getElementById('downloadHint').textContent = 
        lang === 'fi' ? 'Lataa valitut elokuvat kalenteritiedostona' : 'Download selected films as calendar file';
    document.getElementById('viewListText').textContent = t.viewList;
    document.getElementById('viewCalendarText').textContent = t.viewCalendar;
    document.getElementById('viewDayText').textContent = t.viewDay;
    document.getElementById('downloadPdfBtnText').textContent = t.downloadPdf;
    document.getElementById('optimizeBtnText').textContent = t.optimizeSchedule;
    document.getElementById('optimizeBtn').title = t.optimizeTooltip;
    updateSelectAllButton();
    document.documentElement.lang = lang;

    renderDateSelector();
    renderFilms();
    renderSchedule();

    // Re-render current view if not list
    if (currentView === 'calendar') {
        renderCalendarView();
    } else if (currentView === 'day') {
        renderDayView();
    }
}

function handleSearch() {
    searchQuery = document.getElementById('searchInput').value.toLowerCase();
    renderFilms();
}

function getFilteredFilms() {
    const sortByTitle = (a, b) => {
        const cleanTitle = (title) => title.replace(/^(The|A|An)\s+/i, '');
        const titleA = typeof a.title === 'object' ? a.title[currentLang] : a.title;
        const titleB = typeof b.title === 'object' ? b.title[currentLang] : b.title;
        return cleanTitle(titleA).localeCompare(cleanTitle(titleB));
    };

    // Filter films based on available dates and search query
    let filteredFilms = festivalData.filter(film => {
        // Check if film has at least one screening on an available date
        const hasAvailableScreening = film.screenings.some(screening => {
            const dateKey = screening.date.split('T')[0];
            return availableDates.has(dateKey);
        });

        if (!hasAvailableScreening) return false;

        // If there's a search query, also check that
        if (searchQuery) {
            const title = typeof film.title === 'object' ? film.title[currentLang] : film.title;
            const desc = typeof film.description === 'object' ? film.description[currentLang] : film.description;
            return title.toLowerCase().includes(searchQuery) ||
                   film.director.toLowerCase().includes(searchQuery) ||
                   desc.toLowerCase().includes(searchQuery);
        }

        return true;
    });

    return filteredFilms.sort(sortByTitle);
}

function toggleFilm(filmId) {
    const film = festivalData.find(f => f.id === filmId);
    const title = typeof film.title === 'object' ? film.title[currentLang] : film.title;
    const t = translations[currentLang];
    
    if (selectedFilms.has(filmId)) {
        selectedFilms.delete(filmId);
        priorityFilms.delete(filmId); // Also remove priority when deselecting
        announce(currentLang === 'fi' ? `${title} poistettu aikataulusta` : `${title} removed from schedule`);
    } else {
        selectedFilms.add(filmId);
        announce(currentLang === 'fi' ? `${title} lisätty aikatauluun` : `${title} added to schedule`);
    }
    
    // Tallennetaan fokusoidun kortin ID ennen renderöintiä
    const focusedFilmId = filmId;
    
    renderFilms();
    renderSchedule();
    updateDownloadButton();
    updateSelectAllButton();
    updateOptimizeButton();
    
    // Re-render current view if not list
    if (currentView === 'calendar') {
        renderCalendarView();
    } else if (currentView === 'day') {
        renderDayView();
    }
    
    // Palautetaan fokus samaan korttiin renderöinnin jälkeen
    requestAnimationFrame(() => {
        const cardToFocus = document.querySelector(`.film-card[data-film-id="${focusedFilmId}"]`);
        if (cardToFocus) {
            cardToFocus.focus();
        }
    });
}

function announce(message) {
    const announcer = document.getElementById('srAnnouncement');
    announcer.textContent = message;
    setTimeout(() => { announcer.textContent = ''; }, 1000);
}

function updateDownloadButton() {
    const activeScreenings = getAllScreenings(false);
    const hasScreenings = activeScreenings.length > 0;
    document.getElementById('downloadBtn').disabled = !hasScreenings;
    document.getElementById('downloadPdfBtn').disabled = !hasScreenings;
}

function toggleSelectAll() {
    const allFilmIds = festivalData.map(f => f.id);
    const allSelected = allFilmIds.every(id => selectedFilms.has(id));
    
    if (allSelected) {
        // Deselect all
        selectedFilms.clear();
        excludedScreenings.clear();
        priorityFilms.clear();
        announce(currentLang === 'fi' ? 'Kaikki valinnat poistettu' : 'All selections cleared');
    } else {
        // Select all
        allFilmIds.forEach(id => selectedFilms.add(id));
        announce(currentLang === 'fi' ? 'Kaikki elokuvat valittu' : 'All films selected');
    }
    
    renderFilms();
    renderSchedule();
    updateDownloadButton();
    updateSelectAllButton();
    updateOptimizeButton();
    
    if (currentView === 'calendar') {
        renderCalendarView();
    } else if (currentView === 'day') {
        renderDayView();
    }
}

function updateSelectAllButton() {
    const allFilmIds = festivalData.map(f => f.id);
    const allSelected = allFilmIds.every(id => selectedFilms.has(id));
    const t = translations[currentLang];
    
    const btn = document.getElementById('selectAllBtn');
    const btnText = document.getElementById('selectAllBtnText');
    const btnIcon = document.getElementById('selectAllIcon');
    
    if (allSelected && selectedFilms.size > 0) {
        btn.classList.add('deselect');
        btnText.textContent = t.deselectAll;
        btnIcon.innerHTML = '<path d="M5 12h14"></path>';
    } else {
        btn.classList.remove('deselect');
        btnText.textContent = t.selectAll;
        btnIcon.innerHTML = '<path d="M12 5v14M5 12h14"></path>';
    }
}

function updateOptimizeButton() {
    const hasSelectedFilms = selectedFilms.size > 0;
    document.getElementById('optimizeBtn').disabled = !hasSelectedFilms;
}

function optimizeSchedule() {
    const t = translations[currentLang];

    // Get all possible screenings for selected films (only on available dates)
    let allPossibleScreenings = [];
    festivalData.forEach(film => {
        if (selectedFilms.has(film.id)) {
            const title = typeof film.title === 'object' ? film.title[currentLang] : film.title;
            const durationMatch = film.duration.match(/(\d+)/);
            const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 120;

            film.screenings.forEach(screening => {
                const dateKey = screening.date.split('T')[0];

                // Only include screenings on available dates
                if (!availableDates.has(dateKey)) return;

                const startDate = new Date(screening.date);
                const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

                allPossibleScreenings.push({
                    filmId: film.id,
                    screeningId: `${film.id}-${screening.date}`,
                    filmTitle: title,
                    isPriority: priorityFilms.has(film.id),
                    startDate: startDate,
                    endDate: endDate,
                    venue: screening.venue
                });
            });
        }
    });
    
    // Sort by priority (priority first) then by start time
    allPossibleScreenings.sort((a, b) => {
        if (a.isPriority !== b.isPriority) return b.isPriority - a.isPriority;
        return a.startDate - b.startDate;
    });
    
    // Weighted interval scheduling algorithm
    // Priority films get much higher weight
    const PRIORITY_WEIGHT = 1000;
    const NORMAL_WEIGHT = 1;
    
    // Build list of screenings with weights
    const screeningsWithWeight = allPossibleScreenings.map(s => ({
        ...s,
        weight: s.isPriority ? PRIORITY_WEIGHT : NORMAL_WEIGHT
    }));
    
    // Sort by end time for dynamic programming
    screeningsWithWeight.sort((a, b) => a.endDate - b.endDate);
    
    const n = screeningsWithWeight.length;
    if (n === 0) return;
    
    // Find the latest non-conflicting screening for each screening
    const findLatestNonConflicting = (index) => {
        for (let j = index - 1; j >= 0; j--) {
            if (screeningsWithWeight[j].endDate <= screeningsWithWeight[index].startDate) {
                return j;
            }
        }
        return -1;
    };
    
    // DP array: dp[i] = max weight achievable considering screenings 0..i
    const dp = new Array(n).fill(0);
    const selected = new Array(n).fill(false);
    
    // Compute dp values
    dp[0] = screeningsWithWeight[0].weight;
    
    for (let i = 1; i < n; i++) {
        const includeWeight = screeningsWithWeight[i].weight;
        const latestNonConflict = findLatestNonConflicting(i);
        const includeTotal = includeWeight + (latestNonConflict >= 0 ? dp[latestNonConflict] : 0);
        
        dp[i] = Math.max(dp[i-1], includeTotal);
    }
    
    // Backtrack to find selected screenings
    const selectedScreeningIds = new Set();
    const selectedFilmIdsInSchedule = new Set();
    let i = n - 1;
    
    while (i >= 0) {
        const includeWeight = screeningsWithWeight[i].weight;
        const latestNonConflict = findLatestNonConflicting(i);
        const includeTotal = includeWeight + (latestNonConflict >= 0 ? dp[latestNonConflict] : 0);
        
        if (i === 0 || includeTotal >= dp[i-1]) {
            // Check if we already have a screening for this film
            if (!selectedFilmIdsInSchedule.has(screeningsWithWeight[i].filmId)) {
                selectedScreeningIds.add(screeningsWithWeight[i].screeningId);
                selectedFilmIdsInSchedule.add(screeningsWithWeight[i].filmId);
            }
            i = latestNonConflict;
        } else {
            i--;
        }
    }
    
    // Update excludedScreenings based on optimization
    excludedScreenings.clear();
    
    festivalData.forEach(film => {
        if (selectedFilms.has(film.id)) {
            film.screenings.forEach(screening => {
                const screeningId = `${film.id}-${screening.date}`;
                if (!selectedScreeningIds.has(screeningId)) {
                    excludedScreenings.add(screeningId);
                }
            });
        }
    });
    
    // Count results
    const totalFilmsIncluded = selectedFilmIdsInSchedule.size;
    const priorityFilmsIncluded = [...selectedFilmIdsInSchedule].filter(id => priorityFilms.has(id)).length;
    
    // Announce result
    let message = currentLang === 'fi' 
        ? `${t.optimized}: ${totalFilmsIncluded} ${t.filmsIncluded}`
        : `${t.optimized}: ${totalFilmsIncluded} ${t.filmsIncluded}`;
    
    if (priorityFilms.size > 0) {
        message += `, ${priorityFilmsIncluded}/${priorityFilms.size} ${t.priorityIncluded}`;
    }
    
    announce(message);
    
    // Re-render views
    renderSchedule();
    updateDownloadButton();
    
    if (currentView === 'calendar') {
        renderCalendarView();
    } else if (currentView === 'day') {
        renderDayView();
    }
}

function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const locale = currentLang === 'fi' ? 'fi-FI' : 'en-US';
    return {
        weekday: date.toLocaleString(locale, { weekday: 'short' }),
        day: date.getDate(),
        time: date.toLocaleString(locale, { hour: '2-digit', minute: '2-digit' })
    };
}

function formatICalDate(dateTime) {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}00`;
}

function downloadCalendar() {
    // Get only active (non-excluded) screenings
    const allScreenings = getAllScreenings(false);
    
    if (allScreenings.length === 0) return;
    
    // Get descriptions for each film
    const filmDescriptions = {};
    festivalData.forEach(film => {
        const desc = typeof film.description === 'object' ? film.description[currentLang] : film.description;
        filmDescriptions[film.id] = desc;
    });
    
    let icsContent = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Film Festival Planner//EN\r\nCALSCALE:GREGORIAN\r\n';
    
    allScreenings.forEach((screening, index) => {
        const description = filmDescriptions[screening.filmId] || '';
        
        icsContent += `BEGIN:VEVENT\r\nUID:${Date.now()}-${index}@filmfestival\r\nDTSTAMP:${formatICalDate(new Date())}\r\nDTSTART:${formatICalDate(screening.startDate)}\r\nDTEND:${formatICalDate(screening.endDate)}\r\nSUMMARY:${screening.filmTitle}\r\nLOCATION:${screening.venue}\r\nDESCRIPTION:${description}\\n\\nDirector: ${screening.director}\\nDuration: ${screening.duration}\r\nEND:VEVENT\r\n`;
    });
    
    icsContent += 'END:VCALENDAR\r\n';
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'film-festival-schedule.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
    
    announce(currentLang === 'fi' 
        ? `Kalenteritiedosto ladattu, ${allScreenings.length} näytöstä` 
        : `Calendar file downloaded, ${allScreenings.length} screenings`);
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const allScreenings = getAllScreenings(false);
    const t = translations[currentLang];
    const locale = currentLang === 'fi' ? 'fi-FI' : 'en-US';
    
    if (allScreenings.length === 0) return;
    
    // Create PDF
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - (margin * 2);
    let yPos = margin;
    
    // Helper function to add new page if needed
    const checkNewPage = (neededSpace) => {
        if (yPos + neededSpace > pageHeight - margin) {
            doc.addPage();
            yPos = margin;
            return true;
        }
        return false;
    };
    
    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(99, 102, 241);
    doc.text(t.pdfTitle, pageWidth / 2, yPos, { align: 'center' });
    yPos += 12;
    
    // Generated date
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    const now = new Date();
    const dateStr = now.toLocaleDateString(locale, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    doc.text(`${t.pdfGenerated}: ${dateStr}`, pageWidth / 2, yPos, { align: 'center' });
    yPos += 15;
    
    // Divider line
    doc.setDrawColor(99, 102, 241);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
    
    // Render based on current view
    if (currentView === 'list') {
        renderPdfListView(doc, allScreenings, t, locale, margin, contentWidth, pageWidth, pageHeight, yPos, checkNewPage);
    } else if (currentView === 'calendar') {
        renderPdfCalendarView(doc, allScreenings, t, locale, margin, contentWidth, pageWidth, pageHeight, yPos, checkNewPage);
    } else if (currentView === 'day') {
        renderPdfDayView(doc, allScreenings, t, locale, margin, contentWidth, pageWidth, pageHeight, yPos, checkNewPage);
    }
    
    // Footer on last page
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text(`Film Festival Planner  •  ${i}/${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }
    
    // Save PDF
    doc.save('film-festival-schedule.pdf');
    
    announce(currentLang === 'fi' 
        ? `PDF ladattu, ${allScreenings.length} näytöstä` 
        : `PDF downloaded, ${allScreenings.length} screenings`);
}

function renderPdfListView(doc, screenings, t, locale, margin, contentWidth, pageWidth, pageHeight, yPos, checkNewPage) {
    // Simple chronological list
    screenings.forEach((screening, idx) => {
        checkNewPage(22);
        
        const dateStr = screening.startDate.toLocaleDateString(locale, { 
            weekday: 'short', 
            day: 'numeric', 
            month: 'short' 
        });
        const timeStr = screening.startDate.toLocaleTimeString(locale, { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const endTimeStr = screening.endDate.toLocaleTimeString(locale, { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        // Date & Time box
        doc.setFillColor(99, 102, 241);
        doc.roundedRect(margin, yPos, 32, 16, 2, 2, 'F');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(dateStr, margin + 16, yPos + 6, { align: 'center' });
        doc.setFontSize(10);
        doc.text(timeStr, margin + 16, yPos + 12, { align: 'center' });
        
        // Film title
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 30, 50);
        doc.text(screening.filmTitle, margin + 38, yPos + 6);
        
        // Details
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(`${screening.venue}  •  ${t.director} ${screening.director}  •  ${screening.duration}`, margin + 38, yPos + 12);
        
        yPos += 22;
        
        // Update yPos for checkNewPage
        if (yPos > pageHeight - margin - 22) {
            doc.addPage();
            yPos = margin;
        }
    });
}

function renderPdfCalendarView(doc, screenings, t, locale, margin, contentWidth, pageWidth, pageHeight, yPos, checkNewPage) {
    // Group by date - calendar style
    const byDate = {};
    screenings.forEach(screening => {
        const dateKey = screening.startDate.toISOString().split('T')[0];
        if (!byDate[dateKey]) {
            byDate[dateKey] = [];
        }
        byDate[dateKey].push(screening);
    });
    
    Object.entries(byDate).forEach(([dateKey, dayScreenings]) => {
        const date = new Date(dateKey);
        const dayFormatted = date.toLocaleDateString(locale, { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
        });
        
        // Check space for header + at least one screening
        if (yPos + 40 > pageHeight - margin) {
            doc.addPage();
            yPos = margin;
        }
        
        // Day header
        doc.setFillColor(99, 102, 241);
        doc.roundedRect(margin, yPos, contentWidth, 12, 3, 3, 'F');
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(dayFormatted.charAt(0).toUpperCase() + dayFormatted.slice(1), margin + 6, yPos + 8);
        yPos += 18;
        
        // Check for overlaps
        const overlaps = findOverlaps(dayScreenings);
        
        // Screenings
        dayScreenings.forEach((screening, idx) => {
            if (yPos + 20 > pageHeight - margin) {
                doc.addPage();
                yPos = margin;
            }
            
            const isOverlap = overlaps.has(idx);
            const timeStr = screening.startDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
            const endTimeStr = screening.endDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
            
            // Background for overlap warning
            if (isOverlap) {
                doc.setFillColor(254, 226, 226);
                doc.roundedRect(margin + 2, yPos - 2, contentWidth - 4, 16, 2, 2, 'F');
            }
            
            // Time
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(isOverlap ? 220 : 99, isOverlap ? 38 : 102, isOverlap ? 38 : 241);
            doc.text(`${timeStr}–${endTimeStr}`, margin + 6, yPos + 5);
            
            // Film title
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(30, 30, 50);
            doc.text(screening.filmTitle, margin + 38, yPos + 5);
            
            // Venue
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            doc.text(`${screening.venue}  •  ${screening.duration}`, margin + 38, yPos + 11);
            
            // Overlap warning - red exclamation mark
            if (isOverlap) {
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(220, 38, 38);
                doc.text('!', pageWidth - margin - 6, yPos + 9, { align: 'center' });
            }
            
            yPos += 18;
        });
        
        yPos += 8;
    });
}

function renderPdfDayView(doc, screenings, t, locale, margin, contentWidth, pageWidth, pageHeight, yPos, checkNewPage) {
    // Group screenings by date
    const byDate = {};
    screenings.forEach(screening => {
        const dateKey = screening.startDate.toISOString().split('T')[0];
        if (!byDate[dateKey]) {
            byDate[dateKey] = [];
        }
        byDate[dateKey].push(screening);
    });
    
    const dateKeys = Object.keys(byDate).sort();
    
    // Render each day on its own page
    dateKeys.forEach((dateKey, pageIndex) => {
        const dayScreenings = byDate[dateKey];
        
        // Add new page for subsequent days
        if (pageIndex > 0) {
            doc.addPage();
            yPos = margin;
        }
        
        const date = new Date(dateKey);
        const dayFormatted = date.toLocaleDateString(locale, { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long',
            year: 'numeric'
        });
        
        // Day title
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(99, 102, 241);
        doc.text(dayFormatted.charAt(0).toUpperCase() + dayFormatted.slice(1), pageWidth / 2, yPos, { align: 'center' });
        yPos += 12;
        
        // Find time range for this day
        const minHour = Math.min(...dayScreenings.map(s => s.startDate.getHours()));
        const maxHour = Math.max(...dayScreenings.map(s => s.endDate.getHours())) + 1;
        const startHour = Math.max(0, minHour - 1);
        const endHour = Math.min(24, maxHour + 1);
        
        // Calculate timeline dimensions
        const timelineLeft = margin + 15;
        const timelineWidth = contentWidth - 20;
        const availableHeight = pageHeight - yPos - margin - 10;
        const hourHeight = Math.min(14, availableHeight / (endHour - startHour));
        
        // Draw hour lines and labels
        doc.setDrawColor(220, 220, 220);
        doc.setLineWidth(0.2);
        for (let hour = startHour; hour <= endHour; hour++) {
            const hourY = yPos + (hour - startHour) * hourHeight;
            doc.line(timelineLeft, hourY, pageWidth - margin, hourY);
            
            // Hour label
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(150, 150, 150);
            doc.text(`${hour.toString().padStart(2, '0')}:00`, margin, hourY + 3);
        }
        
        // Assign columns for overlapping events
        const columns = [];
        const assignments = [];
        dayScreenings.forEach((screening, idx) => {
            let columnIdx = 0;
            while (true) {
                if (!columns[columnIdx]) columns[columnIdx] = [];
                const hasOverlap = columns[columnIdx].some(existingIdx => 
                    checkOverlap(dayScreenings[existingIdx], screening)
                );
                if (!hasOverlap) {
                    columns[columnIdx].push(idx);
                    assignments[idx] = columnIdx;
                    break;
                }
                columnIdx++;
            }
        });
        const totalColumns = Math.max(1, columns.length);
        const columnWidth = timelineWidth / totalColumns;
        
        // Find overlaps for coloring
        const overlaps = findOverlaps(dayScreenings);
        
        // Draw events
        dayScreenings.forEach((screening, idx) => {
            const startMinutes = (screening.startDate.getHours() - startHour) * 60 + screening.startDate.getMinutes();
            const eventTop = yPos + (startMinutes / 60) * hourHeight;
            const eventHeight = Math.max((screening.durationMinutes / 60) * hourHeight, 12);
            
            const column = assignments[idx];
            const eventLeft = timelineLeft + (column * columnWidth) + 2;
            const eventWidth = columnWidth - 4;
            
            const isOverlap = overlaps.has(idx);
            
            // Event background
            if (isOverlap) {
                doc.setFillColor(239, 68, 68);
            } else {
                doc.setFillColor(99, 102, 241);
            }
            doc.roundedRect(eventLeft, eventTop, eventWidth, eventHeight, 2, 2, 'F');
            
            // Event text
            const timeStr = screening.startDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
            const endTimeStr = screening.endDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
            
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            
            // Truncate title if needed
            let title = screening.filmTitle;
            const maxTitleWidth = eventWidth - 4;
            while (doc.getTextWidth(title) > maxTitleWidth && title.length > 3) {
                title = title.slice(0, -4) + '...';
            }
            
            if (eventHeight >= 12) {
                doc.text(title, eventLeft + 2, eventTop + 6);
            }
            if (eventHeight >= 20) {
                doc.setFontSize(7);
                doc.setFont('helvetica', 'normal');
                doc.text(`${timeStr}–${endTimeStr}`, eventLeft + 2, eventTop + 12);
            }
            if (eventHeight >= 26) {
                doc.text(screening.venue, eventLeft + 2, eventTop + 17);
            }
        });
    });
}

function renderFilms() {
    const grid = document.getElementById('filmsGrid');
    const filteredFilms = getFilteredFilms();
    const t = translations[currentLang];
    
    if (filteredFilms.length === 0) {
        grid.innerHTML = `
            <div class="no-results" role="listitem">
                <h3>${t.noFilmsFound}</h3>
                <p>${t.tryDifferentSearch}</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredFilms.map(film => {
        const title = typeof film.title === 'object' ? film.title[currentLang] : film.title;
        const desc = typeof film.description === 'object' ? film.description[currentLang] : film.description;

        // Count only screenings on available dates
        const availableScreeningsCount = film.screenings.filter(screening => {
            const dateKey = screening.date.split('T')[0];
            return availableDates.has(dateKey);
        }).length;

        const screeningText = availableScreeningsCount === 1 ? t.screening : t.screenings;
        const isSelected = selectedFilms.has(film.id);
        const isPriority = priorityFilms.has(film.id);

        return `
            <article class="film-card ${isSelected ? 'selected' : ''} ${isPriority ? 'priority' : ''}" 
                 role="listitem"
                 tabindex="0"
                 data-film-id="${film.id}"
                 aria-pressed="${isSelected}"
                 aria-label="${title}, ${t.director} ${film.director}, ${film.duration}, ${availableScreeningsCount} ${screeningText}${isSelected ? ', valittu' : ''}${isPriority ? ', prioriteetti' : ''}"
                 onclick="toggleFilm(${film.id})"
                 onkeydown="handleCardKeydown(event, ${film.id})">
                <button class="priority-btn ${isPriority ? 'active' : ''}"
                        onclick="togglePriority(${film.id}, event)"
                        aria-label="${isPriority ? t.removePriority : t.mustSee}"
                        title="${isPriority ? t.removePriority : t.mustSee}">
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="${isPriority ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                </button>
                <div class="film-card-header">
                    <h3 class="film-title">${title}${isPriority ? `<span class="priority-badge">${t.mustSee}</span>` : ''}</h3>
                    ${isSelected ? '<span class="checkmark" aria-hidden="true">✓</span>' : ''}
                </div>
                <div class="film-meta">
                    <span class="film-meta-item"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg> ${film.director}</span>
                    <span class="film-meta-item"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg> ${film.duration}</span>
                </div>
                <p class="film-description">${desc}</p>
                <span class="screening-badge">
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    ${availableScreeningsCount} ${screeningText}
                </span>
            </article>
        `;
    }).join('');
}

function togglePriority(filmId, event) {
    event.stopPropagation();
    
    if (priorityFilms.has(filmId)) {
        priorityFilms.delete(filmId);
        announce(currentLang === 'fi' ? 'Prioriteetti poistettu' : 'Priority removed');
    } else {
        priorityFilms.add(filmId);
        // Also select the film if not already selected
        if (!selectedFilms.has(filmId)) {
            selectedFilms.add(filmId);
        }
        announce(currentLang === 'fi' ? 'Merkitty prioriteetiksi' : 'Marked as priority');
    }
    
    renderFilms();
    renderSchedule();
    updateDownloadButton();
    updateSelectAllButton();
    updateOptimizeButton();
    
    if (currentView === 'calendar') {
        renderCalendarView();
    } else if (currentView === 'day') {
        renderDayView();
    }
}

function handleCardKeydown(event, filmId) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleFilm(filmId);
    }
}

function renderSchedule() {
    const scheduleEl = document.getElementById('schedule');
    const t = translations[currentLang];
    
    const allScreenings = getAllScreenings(true); // Include excluded to show them
    const activeScreenings = allScreenings.filter(s => !s.isExcluded);
    const excludedCount = allScreenings.filter(s => s.isExcluded).length;
    
    if (allScreenings.length === 0) {
        scheduleEl.innerHTML = `
            <div class="empty-state">
                <h3>${t.noFilmsSelected}</h3>
                <p>${t.clickToAdd}</p>
            </div>
        `;
        return;
    }
    
    // Show excluded screenings toggle if there are any
    const excludedToggleHtml = excludedCount > 0 ? `
        <div class="excluded-toggle">
            <button class="excluded-toggle-btn" onclick="toggleShowExcluded()" aria-expanded="${showExcludedScreenings}" aria-controls="excludedScreeningsList">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                ${t.showRemoved} (${excludedCount})
                <svg class="chevron ${showExcludedScreenings ? 'expanded' : ''}" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
            </button>
        </div>
    ` : '';
    
    // Active screenings
    const activeHtml = activeScreenings.map(screening => {
        const dt = formatDateTime(screening.dateStr);
        return `
            <article class="screening-item">
                <div class="screening-datetime">
                    <span class="screening-day">${dt.weekday}</span>
                    <span class="screening-date">${dt.day}</span>
                    <span class="screening-time">${dt.time}</span>
                </div>
                <div class="screening-details">
                    <h4 class="screening-film-title">${screening.filmTitle}</h4>
                    <div class="screening-venue">
                        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        ${screening.venue}
                    </div>
                    <div class="screening-director">${t.director} ${screening.director}</div>
                </div>
                <button class="screening-remove-btn" 
                        onclick="toggleScreening('${screening.screeningId}', event)"
                        aria-label="${t.removeScreening}"
                        title="${t.removeScreening}">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </article>
        `;
    }).join('');
    
    // Excluded screenings (collapsible)
    const excludedScreenings = allScreenings.filter(s => s.isExcluded);
    const excludedHtml = excludedCount > 0 && showExcludedScreenings ? `
        <div id="excludedScreeningsList" class="excluded-screenings-list">
            ${excludedScreenings.map(screening => {
                const dt = formatDateTime(screening.dateStr);
                return `
                    <article class="screening-item excluded">
                        <div class="screening-datetime">
                            <span class="screening-day">${dt.weekday}</span>
                            <span class="screening-date">${dt.day}</span>
                            <span class="screening-time">${dt.time}</span>
                        </div>
                        <div class="screening-details">
                            <h4 class="screening-film-title">${screening.filmTitle}</h4>
                            <div class="screening-venue">
                                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:4px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                ${screening.venue}
                            </div>
                            <div class="screening-director">${t.director} ${screening.director}</div>
                        </div>
                        <button class="screening-restore-btn" 
                                onclick="toggleScreening('${screening.screeningId}', event)"
                                aria-label="${t.restoreScreening}"
                                title="${t.restoreScreening}">
                            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                                <path d="M3 3v5h5"></path>
                            </svg>
                        </button>
                    </article>
                `;
            }).join('')}
        </div>
    ` : '';
    
    scheduleEl.innerHTML = activeHtml + excludedToggleHtml + excludedHtml;
}

let showExcludedScreenings = false;

function toggleShowExcluded() {
    showExcludedScreenings = !showExcludedScreenings;
    renderSchedule();
}

// Date filtering functions
function toggleDate(dateKey) {
    if (availableDates.has(dateKey)) {
        availableDates.delete(dateKey);
    } else {
        availableDates.add(dateKey);
    }
    renderDateSelector();
    renderFilms();
}

function toggleAllDates() {
    const allDates = getAllDates();
    const allSelected = allDates.every(date => availableDates.has(date));

    if (allSelected) {
        // Deselect all
        availableDates.clear();
        announce(currentLang === 'fi' ? 'Kaikki päivät poistettu' : 'All dates deselected');
    } else {
        // Select all
        allDates.forEach(date => availableDates.add(date));
        announce(currentLang === 'fi' ? 'Kaikki päivät valittu' : 'All dates selected');
    }

    renderDateSelector();
    renderFilms();
}

function renderDateSelector() {
    const container = document.getElementById('dateSelector');
    if (!container) return;

    const t = translations[currentLang];
    const locale = currentLang === 'fi' ? 'fi-FI' : 'en-US';
    const allDates = getAllDates();
    const allSelected = allDates.every(date => availableDates.has(date));

    const datesHtml = allDates.map(dateKey => {
        const date = new Date(dateKey);
        const isSelected = availableDates.has(dateKey);
        const label = date.toLocaleDateString(locale, {
            weekday: 'short',
            day: 'numeric',
            month: 'short'
        });

        return `
            <button class="date-selector-btn ${isSelected ? 'active' : ''}"
                    onclick="toggleDate('${dateKey}')"
                    aria-pressed="${isSelected}">
                ${label}
            </button>
        `;
    }).join('');

    const selectAllBtn = `
        <button class="date-select-all-btn ${allSelected ? 'deselect' : ''}"
                onclick="toggleAllDates()">
            ${allSelected ? t.deselectAllDates : t.selectAllDates}
        </button>
    `;

    container.innerHTML = `
        <div class="date-selector-header">
            <h3 class="date-selector-title">${t.availableDates}</h3>
            ${selectAllBtn}
        </div>
        <div class="date-selector-buttons">
            ${datesHtml}
        </div>
        <div class="date-selector-info">
            ${availableDates.size} ${t.datesSelected}
        </div>
    `;
}

// Initial render
initializeApp();
updateSelectAllButton();
updateOptimizeButton();

// View state
let currentView = 'list';
let selectedDay = null;

function switchView(view, event) {
    currentView = view;
    
    // Update buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    event.currentTarget.classList.add('active');
    event.currentTarget.setAttribute('aria-pressed', 'true');
    
    // Show/hide views
    document.getElementById('schedule').style.display = view === 'list' ? 'flex' : 'none';
    document.getElementById('calendarView').style.display = view === 'calendar' ? 'grid' : 'none';
    document.getElementById('dayView').style.display = view === 'day' ? 'flex' : 'none';
    
    if (view === 'calendar') {
        renderCalendarView();
    } else if (view === 'day') {
        renderDayView();
    }
}

function getAllScreenings(includeExcluded = false) {
    let allScreenings = [];
    festivalData.forEach(film => {
        if (selectedFilms.has(film.id)) {
            film.screenings.forEach(screening => {
                const screeningId = `${film.id}-${screening.date}`;
                const isExcluded = excludedScreenings.has(screeningId);
                const dateKey = screening.date.split('T')[0];

                // Skip excluded unless we want to include them
                if (isExcluded && !includeExcluded) return;

                // IMPORTANT: Only include screenings on available dates
                if (!availableDates.has(dateKey)) return;

                const title = typeof film.title === 'object' ? film.title[currentLang] : film.title;
                const startDate = new Date(screening.date);
                const durationMatch = film.duration.match(/(\d+)/);
                const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 120;
                const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

                allScreenings.push({
                    filmId: film.id,
                    screeningId: screeningId,
                    filmTitle: title,
                    director: film.director,
                    duration: film.duration,
                    durationMinutes: durationMinutes,
                    venue: screening.venue,
                    startDate: startDate,
                    endDate: endDate,
                    dateStr: screening.date,
                    isExcluded: isExcluded
                });
            });
        }
    });
    return allScreenings.sort((a, b) => a.startDate - b.startDate);
}

function toggleScreening(screeningId, event) {
    if (event) {
        event.stopPropagation();
    }
    
    const wasExcluded = excludedScreenings.has(screeningId);
    
    if (wasExcluded) {
        excludedScreenings.delete(screeningId);
        announce(currentLang === 'fi' ? 'Näytös palautettu aikatauluun' : 'Screening restored to schedule');
    } else {
        excludedScreenings.add(screeningId);
        announce(currentLang === 'fi' ? 'Näytös poistettu aikataulusta' : 'Screening removed from schedule');
    }
    
    renderSchedule();
    updateDownloadButton();
    
    if (currentView === 'calendar') {
        renderCalendarView();
    } else if (currentView === 'day') {
        renderDayView();
    }
}

function checkOverlap(screening1, screening2) {
    return screening1.startDate < screening2.endDate && screening2.startDate < screening1.endDate;
}

function findOverlaps(screenings) {
    const overlaps = new Set();
    for (let i = 0; i < screenings.length; i++) {
        for (let j = i + 1; j < screenings.length; j++) {
            if (checkOverlap(screenings[i], screenings[j])) {
                overlaps.add(i);
                overlaps.add(j);
            }
        }
    }
    return overlaps;
}

function renderCalendarView() {
    const container = document.getElementById('calendarView');
    const allScreenings = getAllScreenings();
    const t = translations[currentLang];
    
    if (allScreenings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>${t.noFilmsSelected}</h3>
                <p>${t.clickToAdd}</p>
            </div>
        `;
        return;
    }
    
    // Group by date
    const byDate = {};
    allScreenings.forEach(screening => {
        const dateKey = screening.startDate.toISOString().split('T')[0];
        if (!byDate[dateKey]) {
            byDate[dateKey] = [];
        }
        byDate[dateKey].push(screening);
    });
    
    const locale = currentLang === 'fi' ? 'fi-FI' : 'en-US';
    
    container.innerHTML = Object.entries(byDate).map(([dateKey, screenings]) => {
        const date = new Date(dateKey);
        const dateFormatted = date.toLocaleDateString(locale, { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long' 
        });
        
        const overlaps = findOverlaps(screenings);
        
        return `
            <div class="calendar-day">
                <div class="calendar-day-header">${dateFormatted}</div>
                <div class="calendar-day-content">
                    ${screenings.map((screening, idx) => {
                        const isOverlap = overlaps.has(idx);
                        const timeStr = screening.startDate.toLocaleTimeString(locale, { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        });
                        const endTimeStr = screening.endDate.toLocaleTimeString(locale, { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        });
                        return `
                            <div class="calendar-screening ${isOverlap ? 'overlap' : ''}">
                                <div class="calendar-screening-time">${timeStr}</div>
                                <div class="calendar-screening-info">
                                    <div class="calendar-screening-title">${screening.filmTitle}</div>
                                    <div class="calendar-screening-venue">${screening.venue} • ${timeStr}–${endTimeStr}</div>
                                </div>
                                ${isOverlap ? `
                                    <div class="overlap-warning" title="${currentLang === 'fi' ? 'Päällekkäisyys!' : 'Overlap!'}">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                            <line x1="12" y1="9" x2="12" y2="13"></line>
                                            <line x1="12" y1="17" x2="12.01" y2="17"></line>
                                        </svg>
                                    </div>
                                ` : ''}
                                <button class="calendar-remove-btn" 
                                        onclick="toggleScreening('${screening.screeningId}', event)"
                                        aria-label="${t.removeScreening}"
                                        title="${t.removeScreening}">
                                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
}

function renderDayView() {
    const container = document.getElementById('dayView');
    const allScreenings = getAllScreenings();
    const t = translations[currentLang];
    
    if (allScreenings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>${t.noFilmsSelected}</h3>
                <p>${t.clickToAdd}</p>
            </div>
        `;
        return;
    }
    
    // Get unique dates
    const dates = [...new Set(allScreenings.map(s => s.startDate.toISOString().split('T')[0]))];
    
    if (!selectedDay || !dates.includes(selectedDay)) {
        selectedDay = dates[0];
    }
    
    const locale = currentLang === 'fi' ? 'fi-FI' : 'en-US';
    
    // Day selector buttons
    const daySelectorHtml = `
        <div class="day-selector" role="group" aria-label="${currentLang === 'fi' ? 'Valitse päivä' : 'Select day'}">
            ${dates.map(dateKey => {
                const date = new Date(dateKey);
                const label = date.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });
                return `
                    <button class="day-selector-btn ${dateKey === selectedDay ? 'active' : ''}" 
                            onclick="selectDay('${dateKey}')"
                            aria-pressed="${dateKey === selectedDay}">
                        ${label}
                    </button>
                `;
            }).join('')}
        </div>
    `;
    
    // Filter screenings for selected day
    const dayScreenings = allScreenings.filter(s => 
        s.startDate.toISOString().split('T')[0] === selectedDay
    );
    
    // Find time range
    const minHour = Math.min(...dayScreenings.map(s => s.startDate.getHours()));
    const maxHour = Math.max(...dayScreenings.map(s => s.endDate.getHours())) + 1;
    const startHour = Math.max(0, minHour - 1);
    const endHour = Math.min(24, maxHour + 1);
    const totalHours = endHour - startHour;
    
    // Assign columns to overlapping events
    const assignColumns = (screenings) => {
        const columns = [];
        const assignments = [];
        
        screenings.forEach((screening, idx) => {
            // Find first column where this screening fits
            let columnIdx = 0;
            while (true) {
                if (!columns[columnIdx]) {
                    columns[columnIdx] = [];
                }
                
                // Check if this column has any overlapping screenings
                const hasOverlap = columns[columnIdx].some(existingIdx => 
                    checkOverlap(screenings[existingIdx], screening)
                );
                
                if (!hasOverlap) {
                    columns[columnIdx].push(idx);
                    assignments[idx] = columnIdx;
                    break;
                }
                columnIdx++;
            }
        });
        
        const totalColumns = columns.length;
        return { assignments, totalColumns };
    };
    
    const { assignments, totalColumns } = assignColumns(dayScreenings);
    const columnWidth = 100 / totalColumns;
    
    // Find overlaps for coloring
    const overlaps = findOverlaps(dayScreenings);
    
    // Timeline
    const timelineHtml = `
        <div class="timeline" style="height: ${totalHours * 60}px;">
            <div class="timeline-hours">
                ${Array.from({length: totalHours + 1}, (_, i) => {
                    const hour = startHour + i;
                    return `<div class="timeline-hour">${hour.toString().padStart(2, '0')}:00</div>`;
                }).join('')}
            </div>
            <div class="timeline-grid">
                ${dayScreenings.map((screening, idx) => {
                    const startMinutes = (screening.startDate.getHours() - startHour) * 60 + screening.startDate.getMinutes();
                    const heightPx = screening.durationMinutes;
                    const topPx = startMinutes;
                    const isOverlap = overlaps.has(idx);
                    
                    const column = assignments[idx];
                    const leftPercent = column * columnWidth;
                    const widthPercent = columnWidth - 1; // Small gap between columns
                    
                    const timeStr = screening.startDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
                    const endTimeStr = screening.endDate.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
                    
                    return `
                        <div class="timeline-event ${isOverlap ? 'overlap' : ''}" 
                             style="top: ${topPx}px; height: ${Math.max(heightPx, 50)}px; left: calc(${leftPercent}% + 8px); width: calc(${widthPercent}% - 12px);"
                             title="${screening.filmTitle} (${timeStr}–${endTimeStr}) @ ${screening.venue}"
                             role="article"
                             aria-label="${screening.filmTitle}, ${timeStr}–${endTimeStr}, ${screening.venue}${isOverlap ? (currentLang === 'fi' ? ', päällekkäisyys' : ', overlap') : ''}">
                            <button class="timeline-remove-btn" 
                                    onclick="toggleScreening('${screening.screeningId}', event)"
                                    aria-label="${t.removeScreening}"
                                    title="${t.removeScreening}">
                                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <div class="timeline-event-title">${screening.filmTitle}</div>
                            <div class="timeline-event-time">${timeStr}–${endTimeStr}</div>
                            <div class="timeline-event-venue">${screening.venue}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    container.innerHTML = daySelectorHtml + timelineHtml;
}

function selectDay(dateKey) {
    selectedDay = dateKey;
    renderDayView();
}

// Card glow effect - follows cursor
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.film-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
