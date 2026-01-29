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

// Translations
const translations = {
    en: {
        headerTitle: "DocPoint 2026",
        headerSubtitle: "Select films and create your schedule",
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
        headerTitle: "DocPoint 2026",
        headerSubtitle: "Valitse elokuvat ja luo oma aikataulusi",
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

// Festival data
const festivalData = [
    {
        id: 1,
        title: { en: "ABODE OF DAWN", fi: "ABODE OF DAWN" },
        director: "Kristina Shtubert",
        duration: "105 min",
        description: {
            en: "A cult living in Siberia is led by Vissarion, a man who has proclaimed himself the Messiah. The observational documentary follows the isolated community over ten years, as everyday life wavers between faith, brainwashing, and hope.",
            fi: "Siperiassa elävää kulttia johtaa Vissarion, messiaaksi julistautunut mies. Seurantadokumentti tarkastelee 10 vuoden ajan eristäytynyttä yhteisöä, jonka arki horjuu uskon, aivopesun ja toivon välillä."
        },
        screenings: [
            { date: "2026-02-04T20:30", venue: "Kinopalatsi 7" },
            { date: "2026-02-05T20:00", venue: "Kinopalatsi 9" },
            { date: "2026-02-07T17:30", venue: "Kinopalatsi 5" }
        ]
    },
    {
        id: 2,
        title: { en: "AGATHA’S ALMANAC", fi: "AGATHA’S ALMANAC" },
        director: "Amalie Atkins",
        duration: "86 min",
        description: {
            en: "Amalie Atkins followed her grandmother Agatha’s simple, self-sufficient life on the family farm for six years. The result is a captivating portrait of a vanishing world.",
            fi: "Amalie Atkins seurasi isoäitinsä Agathan yksinkertaista ja omavaraista elämää perheen maatilalla kuuden vuoden ajan. Lopputulos on hurmaava muotokuva katoavasta maailmasta. "
        },
        screenings: [
            { date: "2026-02-03T21:45", venue: "Kinopalatsi 6" },
            { date: "2026-02-07T15:30", venue: "Kinopalatsi 5" },
            { date: "2026-02-08T12:45", venue: "Kiasma-teatteri" }
        ]
    },
    {
        id: 3,
        title: { en: "AMATEURS’ PARADISE", fi: "AMATEURS’ PARADISE" },
        director: "Janus Bragi Jakobsson",
        duration: "86 min",
        description: {
            en: "Four Icelandic men of different ages document their everyday lives on YouTube. The film explores the tension between recording life and performance.",
            fi: "Neljä eri-ikäistä islantilaismiestä dokumentoi arkeaan Youtubessa. Elokuva pohtii elämän tallentamisen ja performanssin välistä jännitettä."
        },
        screenings: [
            { date: "2026-02-04T21:45", venue: "Kinopalatsi 5" },
            { date: "2026-02-05T15:30", venue: "Cinema Orion" },
        ]
    },
    {
        id: 4,
        title: { en: "AMOS A – EN TOLKNING AV EN FRAMGÅNGSSAGA", fi: "AMOS A – EN TOLKNING AV EN FRAMGÅNGSSAGA" },
        director: "Anna Blom",
        duration: "63 min",
        description: {
            en: "Through rehearsals for a play about an enigmatic businessman and art patron, the film dives into 20th-century Finnish cultural history.",
            fi: "Arvoituksellisesta bisnesmiehestä ja taidemesenaatista kertovan näytelmän harjoitusten kautta sukelletaan 1900-luvun suomalaiseen kulttuurihistoriaan."
        },
        screenings: [
            { date: "2026-01-27T18:00", venue: "Kino Regina" },
            { date: "2026-02-08T16:15", venue: "Kino Regina" },
        ]
    },
    {
        id: 5,
        title: { en: "ANTIDOTE", fi: "ANTIDOTE" },
        director: "James Jones",
        duration: "92 min",
        description: {
            en: "A journalist, a dissident, and a former insider each wage their own fight against Russia’s government, fully aware of the price they may have to pay.",
            fi: "Toimittaja, toisinajattelija ja entinen sisäpiiriläinen käyvät kukin tahoillaan taistelua Venäjän hallintoa vastaan tietoisina hinnasta, jonka he saattavat joutua maksamaan. "
        },
        screenings: [
            { date: "2026-02-04T16:45", venue: "Bio Rex Lasipalatsi" },
            { date: "2026-02-05T19:30", venue: "Kinopalatsi 5" },
            { date: "2026-02-07T14:00", venue: "Maxim 2" },
        ]
    },
    {
        id: 6,
        title: { en: "BEDROCK", fi: "BEDROCK" },
        director: "Kinga Michalska",
        duration: "103 min",
        description: {
            en: "The film explores the shadows of the past by visiting residential areas near Holocaust extermination camps along Poland’s border, where everyday life is still not free from violence.",
            fi: "Elokuva tutkii menneisyyden varjoja vierailemalla asuinpaikoissa, jotka sijaitsevat holokaustin tuhoamisleirien läheisyydessä Puolan rajalla, jossa arki ei ole vieläkään vapaa väkivallasta. "
        },
        screenings: [
            { date: "2026-02-04T18:30", venue: "Kinopalatsi 7" },
            { date: "2026-02-06T21:00", venue: "Kino Regina" },
            { date: "2026-02-07T16:00", venue: "Maxim 2" },
        ]
    },
    {
        id: 7,
        title: { en: "BLAME", fi: "BLAME" },
        director: "Christian Frei",
        duration: "123 min",
        description: {
            en: "Three researchers spent years trying to warn the world about the threat of a new pandemic. When it finally broke out, they found themselves caught in the eye of the storm.",
            fi: "Kolme tutkijaa yritti vuosikausia varoittaa maailmaa uuden pandemian uhasta. Kun pandemia lopulta puhkesi, joutuivat he itse pyörremyrskyn keskelle."
        },
        screenings: [
            { date: "2026-02-04T16:15", venue: "Kino Regina" },
            { date: "2026-02-06T21:00", venue: "Maxim 1" },
            { date: "2026-02-08T19:15", venue: "Bio Rex Lasipalatsi" },
        ]
    },
    {
        id: 8,
        title: { en: "CHILD OF DUST", fi: "CHILD OF DUST" },
        director: "Weronika Mliszewska",
        duration: "93 min",
        description: {
            en: "When Sang, a Vietnamese man, finds his American father decades after the war, he is forced to reconsider what family truly means – and his own identity.",
            fi: "Kun vietnamilainen Sang löytää amerikkalaisen isänsä vuosikymmeniä sodan jälkeen, joutuu hän pohtimaan perheen todellista merkitystä ja omaa identiteettiään."
        },
        screenings: [
            { date: "2026-02-06T14:00", venue: "Kinopalatsi 5" },
            { date: "2026-02-07T19:00", venue: "Maxim 1" },
            { date: "2026-02-08T17:15", venue: "Cinema Orion" },
        ]
    },
    {
        id: 9,
        title: { en: "CLAUDIA HAS BAD DREAMS", fi: "CLAUDIA HAS BAD DREAMS" },
        director: "Eleonora Sardo, Marco Zenoni",
        duration: "68 min",
        description: {
            en: "In an intimate story, the director sets out on a pilgrimage with her sister, who is recovering from drug addiction. The film offers an honest portrayal of the complexity of family relationships in the shadow of addiction.",
            fi: "Intiimissä tarinassa ohjaaja lähtee pyhiinvaellukselle huumeaddiktiosta toipuvan sisarensa kanssa. Elokuva kuvaa vilpittömästi perhesuhteiden monimutkaisuutta riippuvuuden varjossa."
        },
        screenings: [
            { date: "2026-02-05T16:00", venue: "Cinema Orion" },
        ]
    },
    {
        id: 10,
        title: { en: "COEXISTENCE, MY ASS!", fi: "COEXISTENCE, MY ASS!" },
        director: "Amber Fares",
        duration: "95 min",
        description: {
            en: "Israeli comedian Noam Shuster Eliassi fights for justice with humor. With sharp satire, Noam challenges audiences to face difficult truths—while pointing to the possibility of a different reality.",
            fi: "Israelilainen koomikko Noam Shuster Eliassi taistelee oikeudenmukaisuuden puolesta huumorilla. Purevalla satiirilla Noam haastaa kohtaamaan vaikeita totuuksia, jotka muistuttavat toisenlaisen todellisuuden mahdollisuudesta."
        },
        screenings: [
            { date: "2026-02-03T18:45", venue: "Cinema Orion" },
            { date: "2026-02-07T11:00", venue: "Bio Rex Lasipalatsi" },
            { date: "2026-02-08T21:00", venue: "Kinopalatsi 7" },
        ]
    },
    {
        id: 11,
        title: { en: "CONFESSIONS OF A SWEDISH MAN", fi: "CONFESSIONS OF A SWEDISH MAN" },
        director: "Hampus Linder",
        duration: "97 min",
        description: {
            en: "Self-identified feminist Hampus Linder dives into the manosphere. His attempt to understand other men ultimately plunges him into an identity crisis.",
            fi: "Feministiksi itsensä laskeva Hampus Linder sukeltaa manosfääriin. Yritys ymmärtää muita miehiä syöksee hänet lopulta identiteettikriisiin."
        },
        screenings: [
            { date: "2026-01-27T15:00", venue: "Kino Regina" },
            { date: "2026-02-04T20:30", venue: "Cinema Orion" },
            { date: "2026-02-05T20:45", venue: "Maxim 1" },
        ]
    },
    {
        id: 12,
        title: { en: "CUTTING THROUGH ROCKS", fi: "CUTTING THROUGH ROCKS" },
        director: "Sara Khaki, Muhammad Reza Eyni",
        duration: "94 min",
        description: {
            en: "Sara Shaverdi, who lives in rural Iran, is the first woman elected to her village council. In her free time, too, she fights discrimination by secretly teaching girls to ride motorcycles.",
            fi: "Iranin maaseudulla elävä Sara Shaverdi on ensimmäinen kylänsä valtuustoon valittu nainen. Myös vapaa-ajallaan hän taistelee syrjintää vastaan opettamalla tytöille salaa moottoripyöräilyä."
        },
        screenings: [
            { date: "2026-02-03T19:45", venue: "Kinopalatsi 6" },
            { date: "2026-02-05T18:45", venue: "Maxim 1" },
            { date: "2026-02-07T18:45", venue: "Kinopalatsi 6" },
        ]
    },
    {
        id: 13,
        title: { en: "D IS FOR DISTANCE", fi: "D IS FOR DISTANCE" },
        director: "Christopher Petit, Emma Matthews",
        duration: "89 min",
        description: {
            en: "In an experimental, essayistic family portrait, the filmmaker couple runs up against society’s rigidity as they search for an effective treatment for their son’s epilepsy.",
            fi: "Kokeellisessa, esseemuotoisessa perhekuvassa ohjaajapariskunta törmää yhteiskunnan joustamattomuuteen etsiessään poikansa epilepsiaan tepsivää hoitoa."
        },
        screenings: [
            { date: "2026-02-06T18:30", venue: "Kinopalatsi 5" },
            { date: "2026-02-07T13:15", venue: "Kinopalatsi 6" },
            { date: "2026-02-08T16:30", venue: "Kinopalatsi 5" },
        ]
    },
    {
        id: 14,
        title: { en: "DAJORI", fi: "DAJORI" },
        director: "Martin Páv, Nicolas Kourek",
        duration: "88 min",
        description: {
            en: "Marie, a Romani woman, struggles with poverty and marginalization and ends up caring not only for her own children but also for her sister’s kids.",
            fi: "Romaninainen Marie kamppailee köyhyyden ja syrjäytymisen kanssa ja päätyy huolehtimaan omien lastensa lisäksi myös siskonsa lapsista."
        },
        screenings: [
            { date: "2026-02-07T13:15", venue: "Kinopalatsi 7" },
        ]
    },
    {
        id: 15,
        title: { en: "DEAR TOMORROW", fi: "DEAR TOMORROW" },
        director: "Kaspar Astrup Schröder",
        duration: "83 min",
        description: {
            en: "In Japan, loneliness is a national crisis. The film follows two people struggling with isolation as they try to regain control of their lives—with the help of volunteers, compassionate encounters, government measures, and even pet owls. In Japan, loneliness is a national crisis. The film follows two people struggling with isolation as they try to regain control of their lives—with the help of volunteers, compassionate encounters, government measures, and even pet owls.",
            fi: "Japanissa yksinäisyys on kansallinen kriisi.Elokuva seuraa kahta eristyneisyyden kanssakamppailevaa ihmistä, jotka yrittävät saada elämänsä haltuun vapaaehtoisten tuen, myötätuntoisten kohtaamisten, hallituksen toimien ja jopa lemmikkipöllöjen avulla."
        },
        screenings: [
            { date: "2026-02-03T18:00", venue: "Maxim 1" },
            { date: "2026-02-07T19:45", venue: "Kinopalatsi 5" },
            { date: "2026-02-08T21:45", venue: "Kinopalatsi 5" },
        ]
    },
    {
        id: 16,
        title: { en: "DI’ANNO – IRON MAIDEN’S LOST SINGER", fi: "DI’ANNO – IRON MAIDEN’S LOST SINGER" },
        director: "Wes Orhoski",
        duration: "97 min",
        description: {
            en: "A film about the fragility and randomness of success—but also about friendship, fandom, and the power of music.",
            fi: "Elokuva menestyksen hauraudesta ja sattumanvaraisuudesta, mutta myös ystävyydestä, faniudesta ja musiikin voimasta."
        },
        screenings: [
            { date: "2026-02-07T18:00", venue: "Bio Rex Lasipalatsi" },
            { date: "2026-02-08T20:45", venue: "Kinopalatsi 9" },
        ]
    },
    {
        id: 17,
        title: { en: "DO YOU LOVE ME", fi: "DO YOU LOVE ME" },
        director: "Lana Daher",
        duration: "76 min",
        description: {
            en: "Archival footage spanning seven decades explores Lebanon’s collective psyche, forming a love letter to Beirut.",
            fi: "Seitsemän vuosikymmenen ajalta koottu arkistomateriaali tutkii Libanonin kollektiivista psyykettä ja muodostaa rakkauskirjeen Beirutille."
        },
        screenings: [
            { date: "2026-02-05T21:30", venue: "Kinopalatsi 5" },
            { date: "2026-02-06T15:30", venue: "Kiasma-teatteri" },
            { date: "2026-02-08T18:30", venue: "Maxim 1" },
        ]
    },
    {
        id: 18,
        title: { en: "DOCPOINT X YLE TEEMA: SAIMAA-ILMIÖ", fi: "DOCPOINT X YLE TEEMA: SAIMAA-ILMIÖ" },
        director: "Mika Kaurismäki, Aki Kaurismäki",
        duration: "127 min",
        description: {
            en: "The Kaurismäki brothers’ documentary follows the 1981 summer concert tour on Lake Saimaa featuring Finnish rock legends Juice Leskinen Slam, Hassisen Kone, and Eppu Normaali.",
            fi: "Kaurismäen veljesten dokumenttielokuva Suomi-rockin legendojen Juice Leskinen Slamin, Hassisen koneen ja Eppu Normaalin konserttikiertueesta kesäisellä Saimaalla vuonna 1981."
        },
        screenings: [
            { date: "2026-02-04T21:00", venue: "Bio Rex Lasipalatsi"},
        ]
    },
    {
        id: 19,
        title: { en: "THE FINNISH DOCUMENTARY GUILD PRESENTS: SHORT FILM GEMS", fi: "DOKUMENTTIKILTA ESITTÄÄ: LYHYTELOKUVIEN HELMIÄ" },
        director: "",
        duration: "81 min",
        description: {
            en: "A selection curated by the documentary makers’ association Dokumenttikilta, celebrating its 30th anniversary, brings together modern short-film classics that showcase the diverse range of creative Finnish documentary cinema. The screening features Hätäkutsu, Hei hei Tornio, Hyppääjä, Lumikko, and Star Shaped Scar.",
            fi: "30-vuotisjuhlavuottaan viettävän tekijäjärjestö Dokumenttikillan kokoama valikoima lyhytelokuvien moderneja klassikoita, jotka edustavat luovan suomalaisen dokumenttielokuvan monimuotoista kirjoa. Näytöksessä esitetään Hätäkutsu, Hei hei Tornio, Hyppääjä, Lumikko ja Star Shaped Scar."
        },
        screenings: [
            { date: "2026-02-04T14:45", venue: "Kiasma-teatteri"},
        ]
    },
    {
        id: 20,
        title: { en: "ETNA", fi: "ETNA" },
        director: "Sinna Virtanen",
        duration: "75 min",
        description: {
            en: "A personal documentary about intergenerational trauma and working through it. In the film, a volcano evolves from a symbol of suppressed emotions into an active, living force.",
            fi: "Henkilökohtainen dokumentti ylisukupolvisesta traumasta ja sen purkamisesta. Elokuvassa tulivuori kasvaa tukahdutettujen tunteiden symbolista eläväksi toimijaksi."
        },
        screenings: [
            { date: "2026-02-04T18:15", venue: "Kinopalatsi 9"},
            { date: "2026-02-06T18:50", venue: "Maxim 2"},
            { date: "2026-02-08T13:00", venue: "Kinopalatsi 5"},
        ]
    },
    {
        id: 21,
        title: { en: "FLYING SCENTS – OF PLANTS AND PEOPLE", fi: "FLYING SCENTS – OF PLANTS AND PEOPLE" },
        director: "Antshi Von Moos",
        duration: "66 min",
        description: {
            en: "In Zurich, a women-led research team investigates a chemical reaction that makes plants burst into bloom instantly. The film explores the complex interplay between plants, insects, and humans in a changing world where science and art intertwine.",
            fi: "Zürichissä naisjohtoinen tutkimusryhmä selvittää kemiallista reaktiota, joka saa kasvit puhkeamaan kukkaan välittömästi. Elokuva tutkii kasvien, hyönteisten ja ihmisten moniulotteista vuorovaikutusta muuttuvassa maailmassa, jossa tiede ja taide kietoutuvat toisiinsa."
        },
        screenings: [
            { date: "2026-02-05T16:15", venue: "Kinopalatsi 9"},
            { date: "2026-02-06T19:30", venue: "Maxim 1"},
        ]
    },
    {
        id: 22,
        title: { en: "GEN_", fi: "GEN_" },
        director: "Gianluca Matarrese",
        duration: "104 min",
        description: {
            en: "Italy’s strict government restrictions challenge the work of a doctor in the public healthcare system who provides fertility treatments and gender-affirming care. Forced to operate in a charged climate, the doctor finds the limits of both medical ethics and political correctness tested.",
            fi: "Italian hallituksen tiukat rajoitukset haastavat julkisessa terveydenhuollossa lapsettomuus- ja sukupuolenkorjaushoitoja tarjoavan lääkärin työn. Hän joutuu toimimaan latautuneessa ilmapiirissä, joka koettelee sekä lääketieteellisen etiikan että poliittisen korrektiuden rajoja."
        },
        screenings: [
            { date: "2026-02-04T14:30", venue: "Kinopalatsi 6"},
            { date: "2026-02-07T18:15", venue: "Cinema Orion"},
            { date: "2026-02-08T15:00", venue: "Kinopalatsi 7"},
        ]
    },
    {
        id: 23,
        title: { en: "GEOGRAPHIES OF SOLITUDE", fi: "GEOGRAPHIES OF SOLITUDE" },
        director: "Jacquelyn Mills",
        duration: "104 min",
        description: {
            en: "Zoe Lucas has spent much of her life on a remote island in the Northwest Atlantic, studying its nature and wildlife. This playful, immersive portrait is a tribute to biodiversity.",
            fi: "Zoe Lucas on viettänyt ison osan elämästään syrjäisellä saarella Luoteis-Atlantilla tutkien saaren luontoa ja eläimiä. Leikkisä ja immersiivinen henkilökuva on kunnianosoitus luonnon monimuotoisuudelle."
        },
        screenings: [
            { date: "2026-02-07T14:00", venue: "Maxim 1"},
            { date: "2026-02-08T14:00", venue: "Kino Regina"},
        ]
    },
    {
        id: 24,
        title: { en: "GHOST ELEPHANTS", fi: "GHOST ELEPHANTS" },
        director: "Werner Herzog",
        duration: "99 min",
        description: {
            en: "A scientist believes that giant elephants live on Angola’s highlands. Werner Herzog follows his expedition and asks: is it sometimes better if we don’t succeed in our attempts?",
            fi: "Tieteilijä uskoo, että Angolan ylängöillä elää jättiläisnorsuja. Werner Herzog seuraa hänen tutkimusmatkaansa ja esittää kysymyksen: onko joskus parempi, jos emme onnistukaan yrityksissämme?"
        },
        screenings: [
            { date: "2026-02-03T20:30", venue: "Bio Rex Lasipalatsi"},
            { date: "2026-02-07T14:45", venue: "Kino Regina"},
            { date: "2026-02-08T15:15", venue: "Cinema Orion"},
        ]
    },
    {
        id: 25,
        title: { en: "HACKING HATE", fi: "HACKING HATE" },
        director: "Simon Klose",
        duration: "88 min",
        description: {
            en: "In this thriller-like film, journalist My Lindgren goes undercover online in far-right circles to investigate how hate is monetized and democracy is undermined.",
            fi: "Trillerimäisessä elokuvassa toimittaja My Lindgren soluttautuu äärioikeistoon internetissä tutkiakseen, kuinka vihalla tehdään rahaa ja horjutetaan demokratiaa. "
        },
        screenings: [
            { date: "2026-02-07T16:15", venue: "Cinema Orion"},
            { date: "2026-02-08T11:00", venue: "Bio Rex Lasipalatsi"},
        ]
    },
    {
        id: 26,
        title: { en: "HOW DEEP IS YOUR LOVE", fi: "HOW DEEP IS YOUR LOVE" },
        director: "Eleanor Mortimer",
        duration: "100 min",
        description: {
            en: "The deep sea is the planet’s last unknown frontier. Biologists study its creatures—like something from another world—but time is running out, as deep-sea mining threatens fragile ecosystems.",
            fi: "Syvänmeren alueet ovat maapallon viimeinen tuntematon kolkka. Biologit tutkivat alueen eläimiä, jotka ovat kuin toiselta planeetalta. Aika käy kuitenkin vähiin, sillä syvänmeren kaivostoiminta uhkaa hauraita ekosysteemejä."
        },
        screenings: [
            { date: "2026-02-04T16:15", venue: "Kinopalatsi 9"},
            { date: "2026-02-08T18:00", venue: "Kino Regina"},
        ]
    },
    {
        id: 27,
        title: { en: "HOW TO BUILD A LIBRARY", fi: "HOW TO BUILD A LIBRARY" },
        director: "Christopher King, Maia Lekow",
        duration: "98 min",
        description: {
            en: "Two Kenyan women set out to restore a decaying old library—once reserved for whites only—transforming it into a vibrant cultural center.",
            fi: "Kaksi kenialaisnaista ryhtyy kunnostamaan rapistunutta ja vanhaa, aiemmin vain valkoisille tarkoitettua kirjastoa eläväiseksi kulttuurikeskukseksi."
        },
        screenings: [
            { date: "2026-02-05T20:30", venue: "Cinema Orion"},
            { date: "2026-02-06T15:45", venue: "Kinopalatsi 7"},
            { date: "2026-02-07T12:00", venue: "Cinema Orion"},
        ]
    },
    {
        id: 28,
        title: { en: "I LOST SIGHT OF THE LANDSCAPE", fi: "I LOST SIGHT OF THE LANDSCAPE" },
        director: "Sophie Bédard Marcotte",
        duration: "85 min",
        description: {
            en: "The film follows two artistic processes in parallel: the creation of a stage production and the making of a film about it. Intimate and open, the documentary captures rare moments from the making of art that are seldom seen publicly.",
            fi: "Elokuvassa seurataan rinnakkain kahta taiteellista prosessia: teatteriesityksen ja siitä kertovan elokuvan syntyä. Intiimi ja avoin dokumentti onnistuu vangitsemaan taiteen tekemisestä hetkiä, joita nähdään harvoin julkisesti."
        },
        screenings: [
            { date: "2026-02-04T18:00", venue: "Kinopalatsi 6"},
            { date: "2026-02-08T10:30", venue: "Kiasma-teatteri"},
        ]
    },
    {
        id: 30,
        title: { en: "ILOVERUSS", fi: "ILOVERUSS" },
        director: "Tova Mozard",
        duration: "87 min",
        description: {
            en: "Swedish filmmaker Tova Mozard filmed various artistic experiments with her friend Russell over twenty years, while also documenting his everyday life as a Hollywood film extra. What does life look like amid Hollywood’s iconic landscapes when your paycheck is slim?",
            fi: "Ruotsalainen Tova Mozard kuvasi 20 vuoden ajan erilaisia taiteellisia kokeiluja ystävänsä Russellin kanssa ja tallensi samalla tämän arkea Hollywood-elokuvien avustajana. Miltä näyttää elämä Hollywoodin ikonisissa maisemissa, kun palkkapussi on kevyt?"
        },
        screenings: [
            { date: "2026-02-04T18:00", venue: "Cinema Orion"},
            { date: "2026-02-05T21:00", venue: "Kino Regina"},
            { date: "2026-02-07T16:45", venue: "Kinopalatsi 6"},
        ]
    },
    {
        id: 31,
        title: { en: "IMAGO", fi: "IMAGO" },
        director: "Déni Oumar Pitsaev",
        duration: "109 min",
        description: {
            en: "Déni, who grew up in France, inherits land in Georgia. In his native Chechnya, relatives he barely knows are waiting for him. Everyone seems to be asking the same question: when are you going to get married?",
            fi: "Ranskassa kasvanut Déni perii maata Georgiassa. Synnyinseuduillaan Tšetšeniassa häntä odottavat perheenjäsenet, joita hän hädin tuskin tuntee. Kaikkien huulilla tuntuu olevan sama kysymys: milloin menet naimisiin?"
        },
        screenings: [
            { date: "2026-02-06T16:00", venue: "Kinopalatsi 9"},
            { date: "2026-02-07T20:30", venue: "Cinema Orion"},
            { date: "2026-02-08T19:00", venue: "Kinopalatsi 6"},
        ]
    },
    {
        id: 32,
        title: { en: "IN HELL WITH IVO", fi: "IN HELL WITH IVO" },
        director: "Kristina Nikolova",
        duration: "78 min",
        description: {
            en: "Art has saved the life of Bulgarian queer artist Ivo Dimchev. Now he transforms the raw nerves of life and society into singular musical performances.",
            fi: "Taide on pelastanut bulgarialaisen queer-taiteilija Ivo Dimchevin elämän. Nyt hän muuttaa elämän ja yhteiskunnan kipupisteet ainutlaatuisiksi musiikkiesityksiksi."
        },
        screenings: [
            { date: "2026-02-06T18:00", venue: "Savoy-teatteri"},
            { date: "2026-02-07T20:45", venue: "Maxim 2"},
            { date: "2026-02-08T20:00", venue: "Kinopalatsi 5"},
        ]
    },
    {
        id: 33,
        title: { en: "JOHN LILLY AND THE EARTH COINCIDENCE CONTROL OFFICE", fi: "JOHN LILLY AND THE EARTH COINCIDENCE CONTROL OFFICE" },
        director: "Michael Almereyda, Courtney Stephens",
        duration: "89 min",
        description: {
            en: "John C. Lilly studied consciousness using controversial methods, and over the decades his psychedelic experiments transformed him from a scientist into a mystic.",
            fi: "John C. Lilly tutki tietoisuutta kiistanalaisilla metodeilla ja muuttui psykedeelisten kokeilujen myötä vuosikymmenien saatossa tiedemiehestä mystikoksi."
        },
        screenings: [
            { date: "2026-02-04T20:45", venue: "Maxim 2"},
            { date: "2026-02-07T11:45", venue: "Kiasma-teatteri"},
            { date: "2026-02-08T21:00", venue: "Cinema Orion"},
        ]
    },
    {
        id: 34,
        title: { en: "KABUL, BETWEEN PRAYERS", fi: "KABUL, BETWEEN PRAYERS" },
        director: "Aboozar Amini",
        duration: "102 min",
        description: {
            en: "A young Taliban fighter struggles to balance religion, family life, and the pressures of everyday existence in Afghanistan.",
            fi: "Nuori taleban-sotilas tasapainoilee uskonnon, perhe-elämän ja arjen ristipaineissa Afganistanissa."
        },
        screenings: [
            { date: "2026-02-03T20:45", venue: "Kinopalatsi 5"},
            { date: "2026-02-06T20:45", venue: "Kinopalatsi 9"},
            { date: "2026-02-08T17:00", venue: "Bio Rex Lasipalatsi"},
        ]
    },
    {
        id: 35,
        title: { en: "KHARTOUM", fi: "KHARTOUM" },
        director: "Anas Saeed, Rawia Alhag, Ibrahim Snoopy, Timeea M. Ahmed, Phil Cox",
        duration: "80 min",
        description: {
            en: "This empathetic film, which innovatively uses technology, portrays life amid the chaos of war. Five people who fled Khartoum when Sudan’s war broke out share their stories of survival and freedom.",
            fi: "Innovatiivisesti teknologiaa hyödyntävä, ihmisläheinen elokuva kuvaa elämää sodan aiheuttaman kaaoksen keskellä. Viisi Khartumista Sudanin sodan puhjetessa paennutta kertovat tarinansa selviytymisestä ja vapaudesta."
        },
        screenings: [
            { date: "2026-02-04T16:00", venue: "Cinema Orion"},
            { date: "2026-02-05T17:15", venue: "Maxim 2"},
            { date: "2026-02-08T16:30", venue: "Maxim 1"},
        ]
    },
    {
        id: 36,
        title: { en: "KING MATT THE FIRST", fi: "KING MATT THE FIRST" },
        director: "Jaśmina Wójcik",
        duration: "74 min",
        description: {
            en: "In a visually enchanting film, we dive into the wonders of childhood—and the bittersweet longing it leaves behind.",
            fi: "Visuaalisesti lumoavassa elokuvassa sukelletaan lapsuuden ihmeisiin ja sen jättämään haikeuteen."
        },
        screenings: [
            { date: "2026-01-27T13:00", venue: "Kino Regina"},
            { date: "2026-02-07T15:15", venue: "Kinopalatsi 7"},
        ]
    },
    {
        id: 37,
        title: { en: "IN FULL AGREEMENT", fi: "KORVIA HUUMAAVA HILJAISUUS" },
        director: "Panu Suuronen",
        duration: "75 min",
        description: {
            en: "The film examines how the war in Ukraine has reshaped the identity and sense of belonging of Russian-speaking Finns—forcing them to re-evaluate family ties, their homeland, their background, and their place in Finland.",
            fi: "Elokuva tarkastelee, miten Ukrainan sota on muuttanut venäjänkielisten suomalaisten identiteettiä ja kuulumisen kokemusta Suomessa, jossa perhe, kotimaa sekä oma tausta ja paikka joutuvat uudelleen määritellyiksi."
        },
        screenings: [
            { date: "2026-02-04T20:30", venue: "Kinopalatsi 9"},
            { date: "2026-02-06T17:15", venue: "Maxim 2"},
            { date: "2026-02-08T17:00", venue: "Kinopalatsi 9"},
        ]
    },
    {
        id: 38,
        title: { en: "WHEN THE SAXOPHONE BURNS", fi: "KUN SAKSOFONI PALAA" },
        director: "Petri Luukkainen",
        duration: "120 min",
        description: {
            en: "When the alternative is to stop playing altogether, Timo Lassy returns to the original source of joy. In this jazz-soaked blend of portrait and concert film, he searches for his own voice—alone with his saxophone.",
            fi: "Kun vaihtoehtona on soittamisen lopettaminen, Timo Lassy palaa ilon alkulähteelle. Jazzinhuuruisessa muotokuvan ja konserttielokuvan yhdistelmässä hän etsii omaa ääntään yksin saksofoninsa kanssa."
        },
        screenings: [
            { date: "2026-02-03T19:45", venue: "Maxim 1"},
            { date: "2026-02-06T20:15", venue: "Cinema Orion"},
        ]
    },
    {
        id: 39,
        title: { en: "LIGHT MEMORIES", fi: "LIGHT MEMORIES" },
        director: "Misha Vallejo",
        duration: "80 min",
        description: {
            en: "In this personal exploration of absent fathers, the director delves into buried family secrets and intergenerational trauma.",
            fi: "Ohjaaja tutkii poissaolevia isiä tässä henkilökohtaisessa kuvauksessa haudatuista perhesalaisuuksista ja ylisukupolvisista traumoista."
        },
        screenings: [
            { date: "2026-02-04T16:00", venue: "Kinopalatsi 5"},
            { date: "2026-02-06T17:45", venue: "Kiasma-teatteri"},
            { date: "2026-02-08T14:30", venue: "Maxim 1"},
        ]
    },
    {
        id: 40,
        title: { en: "NATIONAL SHORTS COMPETITION 1: THE VERGE OF NEW", fi: "LYHYTELOKUVAKILPAILU 1: UUDEN ÄÄRELLÄ" },
        director: "",
        duration: "76 min",
        description: {
            en: "In this screening, the films All the Light That Remains, Feeling Defensive (Part 1), Human Machine, Good Night Monster and Spirits challenge the conventional forms of documentary cinema.",
            fi: "Näytöksen elokuvissa Kaikki jäljelle jäävä valo, Puolustuskannalla, Human Machine, Mörkö ja Vuoiŋŋat haastetaan dokumenttielokuvan totuttuja muotoja."
        },
        screenings: [
            { date: "2026-02-05T16:00", venue: "Kinopalatsi 6"},
            { date: "2026-02-08T20:00", venue: "Maxim 2"},
        ]
    },
    {
        id: 41,
        title: { en: "NATIONAL SHORTS COMPETITION 2: SIDE BY SIDE", fi: "LYHYTELOKUVAKILPAILU 2: Rinnakkain" },
        director: "",
        duration: "90 min",
        description: {
            en: "In Lonely Rider, Watchful, Speeding, of Course, Homesick, Invasive Species, 20 Meters from Russia, and Letter 1 / AIR, different forms of coexistence are explored—from a skate park to Finland’s eastern border.",
            fi: "Elokuvissa Lonely Rider, Watchful, Vauhtipyrähdys, Homesick, Vieraslaji, 20 metriä Venäjältä ja Kirja 1 / ILMA tarkastellaan erilaisia rinnakkaiseloja aina skeittiparkilta Suomen itärajalle."
        },
        screenings: [
            { date: "2026-02-05T18:15", venue: "Kinopalatsi 6"},
            { date: "2026-02-08T17:45", venue: "Maxim 2"},
        ]
    },
    {
        id: 42,
        title: { en: "NATIONAL SHORTS COMPETITION 3: FLASHBACKS", fi: "LYHYTELOKUVAKILPAILU 3: Takaumia" },
        director: "",
        duration: "67 min",
        description: {
            en: "In this screening, the viewer is immersed in worlds of vanishing communal spaces, memories and dreams, and a great entertainment artist through the films Simo Was Here, Am I Calling You at a Bad Time?, The Ghost Feel Hour, Smoking Spot, Diving Wombs, Equal Dust and John 9:25.",
            fi: "Näytöksessä katsoja uppoutuu katoavien yhteisöllisten paikkojen, muistojen ja unelmien sekä suuren viihdetaitelijan maailmoihin elokuvissa Simo kävi täällä, En kai huonoon aikaan soittele?, Aavetuntohetki, Tupakkapaikka, Sukeltavat kohdut, Elämä ja yö sekä John 9:25."
        },
        screenings: [
            { date: "2026-02-05T20:45", venue: "Kinopalatsi 6"},
            { date: "2026-02-08T16:00", venue: "Maxim 2"},
        ]
    },
    {
        id: 43,
        title: { en: "MOVE YA BODY: THE BIRTH OF HOUSE", fi: "MOVE YA BODY: THE BIRTH OF HOUSE" },
        director: "Elegance Bratton",
        duration: "92 min",
        description: {
            en: "A gripping documentary about the rise of house music from Chicago’s underground clubs. The sound that went on to conquer the world began as experiments by a small group working with limited resources.",
            fi: "Vangitseva dokumentti, joka käsittelee house-musiikin nousua Chicagon underground-klubeilta. Maailman valloittanut soundi sai alkunsa pienen ryhmän rajatuilla resursseilla tehdyistä kokeiluista."
        },
        screenings: [
            { date: "2026-02-05T21:00", venue: "Maxim 1"},
            { date: "2026-02-06T20:30", venue: "Bio Rex Lasipalatsi"},
            { date: "2026-02-07T21:00", venue: "Maxim 1"},
        ]
    },
    {
        id: 44,
        title: { en: "MY BOYFRIEND THE FASCIST", fi: "MY BOYFRIEND THE FASCIST" },
        director: "Matthias Lintner",
        duration: "96 min",
        description: {
            en: "A filmmaker documents her Cuban boyfriend’s shift to the political right after becoming disillusioned with socialism – while trying to hold on to her own principles, and to love.",
            fi: "Elokuvantekijä dokumentoi sosialismiin pettyneen kuubalaisen poikaystävänsä muuttumista oikeistolaiseksi yrittäen samalla pitää kiinni omista periaatteistaan – ja rakkaudesta."
        },
        screenings: [
            { date: "2026-02-06T21:00", venue: "Kinopalatsi 6"},
            { date: "2026-02-07T17:00", venue: "Kino Regina"},
        ]
    },
    {
        id: 45,
        title: { en: "INVISIBLE ENEMY", fi: "NÄKYMÄTÖN VIHOLLINEN" },
        director: "Einari Paakkanen, Ann-Mari Lehtonen",
        duration: "75 min",
        description: {
            en: "Two Finnish volunteer soldiers who fought in Ukraine undergo trauma therapy in an effort to find their way back to civilian life.",
            fi: "Kaksi Ukrainassa taistellutta suomalaista vapaaehtoissotilasta käyvät läpi traumaterapiaa löytääkseen tiensä takaisin siviilielämään."
        },
        screenings: [
            { date: "2026-02-05T18:30", venue: "Bio Rex Lasipalatsi"},
            { date: "2026-02-06T20:40", venue: "Maxim 2"},
            { date: "2026-02-08T13:30", venue: "Kinopalatsi 9"},
        ]
    },
    {
        id: 46,
        title: { en: "NATCHEZ", fi: "NATCHEZ" },
        director: "Suzannah Herbert",
        duration: "88 min",
        description: {
            en: "Natchez, Mississippi, thrives on tourists who come to romanticize the pre–Civil War era. But some locals challenge the notion that those “good old days” were ever truly idyllic.",
            fi: "Mississippin Natchez elää turisteista, jotka saapuvat kaupunkiin romantisoimaan sisällissotaa edeltävää aikaa. Osa paikallisista kuitenkin haastaa ajatuksen entisten aikojen auvoisuudesta."
        },
        screenings: [
            { date: "2026-02-04T19:45", venue: "Maxim 1"},
            { date: "2026-02-07T18:45", venue: "Kinopalatsi 9"},
            { date: "2026-02-08T13:00", venue: "Bio Rex Lasipalatsi"},
        ]
    },
    {
        id: 47,
        title: { en: "NO MERCY", fi: "NO MERCY" },
        director: "Isa Willinger",
        duration: "104 min",
        description: {
            en: "In this documentary on the female gaze and the history of women and non-binary filmmakers, bold voices from different eras take the stage as the director searches for an answer to the question: “Do women make harsher films?”",
            fi: "Naisen katsetta ja nais- ja ei-binääristen elokuvantekijöiden historiaa käsittelevässä dokumentissa ääneen pääsevät rohkeat ja räväkät tekijät eri aikakausilta, kun ohjaaja etsii vastausta kysymykseen ”Tekevätkö naiset rankempia elokuvia?”"
        },
        screenings: [
            { date: "2026-02-05T20:45", venue: "Bio Rex Lasipalatsi"},
            { date: "2026-02-06T13:30", venue: "Kinopalatsi 7"},
            { date: "2026-02-07T13:00", venue: "Kinopalatsi 9"},
        ]
    },
    {
        id: 48,
        title: { en: "NORTH SOUTH MAN WOMAN", fi: "NORTH SOUTH MAN WOMAN" },
        director: "Morten Traavik, Sun Kim",
        duration: "93 min",
        description: {
            en: "North Korean women are building new lives in South Korea—but is marriage to a local man really a shortcut to happiness?",
            fi: "Pohjoiskorealaiset naiset rakentavat uutta elämää Etelä-Koreassa, mutta onko avioliitto paikallisen miehen kanssa oikotie onneen?"
        },
        screenings: [
            { date: "2026-02-06T21:00", venue: "Kinopalatsi 5"},
            { date: "2026-02-07T17:00", venue: "Kinopalatsi 7"},
            { date: "2026-02-08T15:00", venue: "Bio Rex Lasipalatsi"},
        ]
    },
    {
        id: 49,
        title: { en: "NOTES OF A TRUE CRIMINAL", fi: "NOTES OF A TRUE CRIMINAL" },
        director: "Alexander Rodnyansky, Andriy Alferov",
        duration: "117 min",
        description: {
            en: "Using archival material, a Ukrainian filmmaker weaves together collective and personal history, examining Ukraine’s past through the lens of Russian imperialism.",
            fi: "Ukrainalainen elokuvantekijä nivoo arkistomateriaalin avulla yhteen kollektiivisen ja henkilökohtaisen historian ja tarkastelee Ukrainan historiaa osana venäläistä imperialismia."
        },
        screenings: [
            { date: "2026-02-05T16:00", venue: "Bio Rex Lasipalatsi"},
            { date: "2026-02-07T13:15", venue: "Kinopalatsi 5"},
            { date: "2026-02-08T11:00", venue: "Cinema Orion"},
        ]
    },
    {
        id: 50,
        title: { en: "ONLY ON EARTH", fi: "ONLY ON EARTH" },
        director: "Robin Petré",
        duration: "93 min",
        description: {
            en: "In an immersive, visually striking documentary, we follow people and animals struggling to survive amid wildfires in southern Galicia during an exceptionally hot, dry summer.",
            fi: "Immersiivisessä, visuaalisesti pysäyttävässä dokumentissa seurataan, kuinka ihmiset ja eläimet pyrkivät selviytymään maastopalojen keskellä eteläisessä Galiciassa historiallisen kuumana ja kuivana kesänä."
        },
        screenings: [
            { date: "2026-02-05T16:00", venue: "Kinopalatsi 7"},
            { date: "2026-02-06T18:00", venue: "Kinopalatsi 7"},
            { date: "2026-02-08T14:00", venue: "Maxim 2"},
        ]
    },
    {
        id: 51,
        title: { en: "DAYS OF WONDER", fi: "PÄIVIEN LUMO" },
        director: "Karin Pennanen",
        duration: "87 min",
        description: {
            en: "A personal portrait of the director’s reclusive uncle, whose home—after his death—reveals an astonishing lifetime of artistic work.",
            fi: "Henkilökohtainen kuvaus ohjaajan erakkona eläneestä sedästä, jonka kotoa paljastuu tämän kuoltua uskomaton taiteellinen elämäntyö."
        },
        screenings: [
            { date: "2026-02-03T18:00", venue: "Bio Rex Lasipalatsi"},
            { date: "2026-02-06T17:15", venue: "Kinopalatsi 6"},
            { date: "2026-02-08T18:15", venue: "Kinopalatsi 5"},
        ]
    },
    {
        id: 52,
        title: { en: "PREDATORS", fi: "PREDATORS" },
        director: "David Osit",
        duration: "96 min",
        description: {
            en: "The film examines the 2000s hit series To Catch a Predator, which set out to catch pedophiles in the act. It also reflects on the ethics of true crime and asks uncomfortable questions about what we consider just punishment.",
            fi: "Elokuva tarkastelee 2000-luvun To Catch A Predator -hittisarjaa, jossa pyritään saamaan pedofiilit kiinni rysän päältä. Samalla se pohtii true crime -etiikkaa ja esittää epämiellyttäviä kysymyksiä käsityksestämme oikeudenmukaisesta rangaistuksesta."
        },
        screenings: [
            { date: "2026-02-03T18:45", venue: "Kinopalatsi 5"},
            { date: "2026-02-07T20:30", venue: "Bio Rex Lasipalatsi"},
        ]
    },
    {
        id: 53,
        title: { en: "QUEER AS PUNK", fi: "QUEER AS PUNK" },
        director: "Yihwen Chen",
        duration: "88 min",
        description: {
            en: "In Malaysia, where LGBTQIA rights are forbidden, trans man Faris defies social norms with his punk band. Shh...Diam! embodies resilience, resistance, and a rebellious punk ethos, performing amid the constraints of a restrictive society.",
            fi: "LGBTQIA-oikeudet kieltävässä Malesiassa transmies Faris uhmaa normeja punkbändinsä kanssa. Shh...Diam! -yhtye osoittaa sitkeyttä, vastarintaa ja kapinallista punkeetosta esiintymällä yhteiskunnallisten rajoitusten keskellä."
        },
        screenings: [
            { date: "2026-02-05T17:00", venue: "Maxim 1" },
            { date: "2026-02-07T21:45", venue: "Kinopalatsi 5" },
            { date: "2026-02-08T20:30", venue: "Maxim 1" },
        ]
    },
    {
        id: 54,
        title: { en: "REDLIGHT TO LIMELIGHT", fi: "REDLIGHT TO LIMELIGHT" },
        director: "Bipuljit Basu",
        duration: "100 min",
        description: {
            en: "A bold group of Indian sex workers and their families begin making short films to change their lives and inspire others. The documentary highlights the power of communal creativity and filmmaking.",
            fi: "Rohkea joukko intialaisia seksityöntekijöitä perheineen alkaa tehdä lyhytelokuvia muuttaakseen elämäänsä ja inspiroidakseen muita. Dokumentti korostaa yhteisöllisen luovuuden ja elokuvanteon merkitystä."
        },
        screenings: [
            { date: "2026-02-04T20:15", venue: "Kinopalatsi 5" },
            { date: "2026-02-07T19:00", venue: "Kinopalatsi 7" },
        ]
    },
    {
        id: 55,
        title: { en: "ROCK OUT", fi: "ROCK OUT" },
        director: "Dustin Lance Black",
        duration: "118 min",
        description: {
            en: "The film uncovers rock history’s forgotten queer trailblazers and ties their stories to the experience of Dustin Lance Black’s brother, who feels out of place in a hypermasculine music culture.",
            fi: "Elokuva paljastaa rockin historian unohdetut queer-vaikuttajat ja yhdistää heidän tarinansa Dustin Lance Blackin veljen kokemukseen kuulumattomuudesta hypermaskuliinisessa musiikkikulttuurissa."
        },
        screenings: [
            { date: "2026-02-07T20:45", venue: "Kinopalatsi 6" },
            { date: "2026-02-08T21:15", venue: "Kinopalatsi 6" },
        ]
    },
    {
        id: 56,
        title: { en: "SEEDS", fi: "SEEDS" },
        director: "Brittany Shyne",
        duration: "123 min",
        description: {
            en: "Shot through an intimate lens in black and white, the film offers a glimpse into the lives of African American farmers in the U.S. South, revealing the fragility of inheritance and the significance of land ownership.",
            fi: "Intiimin linssin läpi kuvattu, mustavalkoinen elokuva kurkistaa Yhdysvaltojen eteläosien afroamerikkalaisten maanviljelijöiden elämään paljastaen perinnön haurauden ja maanomistuksen merkityksen."
        },
        screenings: [
            { date: "2026-02-04T20:00", venue: "Kino Regina" },
            { date: "2026-02-06T16:00", venue: "Kinopalatsi 5" },
            { date: "2026-02-08T13:15", venue: "Kinopalatsi 6" },
        ]
    },
    {
        id: 57,
        title: { en: "SHARDS OF LIGHT", fi: "SHARDS OF LIGHT" },
        director: "Mila Teshaieva, Marcus Lenz",
        duration: "93 min",
        description: {
            en: "A timely film that begins with the liberation of Bucha and delves into Ukraine’s war trauma, exploring a nation’s transformed everyday life and identity.",
            fi: "Ajankohtainen elokuva alkaa Buchan vapauttamisesta ja pureutuu Ukrainan sotatrauman sekä kansakunnan muuttuneen arjen ja identiteetin käsittelyyn."
        },
        screenings: [
            { date: "2026-02-04T16:00", venue: "Kinopalatsi 6" },
            { date: "2026-02-07T16:45", venue: "Maxim 1" },
        ]
    },
    {
        id: 58,
        title: { en: "SILENT LEGACY", fi: "SILENT LEGACY - KATSEIDEN ALLA" },
        director: "Jenni Kivistö, Jussi Rastas",
        duration: "93 min",
        description: {
            en: "Burkina Faso–born choreographer Sibiry, who lives in Finland, explores his migrant identity between two realities as he tries to reclaim a lost sense of belonging with his home village.",
            fi: "Suomessa asuva burkinafasolainen koreografi Sibiry käsittelee siirtolaisen identiteettiään kahden todellisuuden välissä ja yrittää saada takaisin kadotetun yhteenkuuluvuuden tunteen kotikylänsä kanssa."
        },
        screenings: [
            { date: "2026-02-06T17:15", venue: "Kino Regina" },
            { date: "2026-02-07T15:00", venue: "Kinopalatsi 6" },
        ]
    },
    {
        id: 59,
        title: { en: "SINGING WINGS", fi: "SINGING WINGS" },
        director: "Hemen Khaledi",
        duration: "73 min",
        description: {
            en: "An elderly Kurdish woman takes in an injured stork. This metaphorical film explores the parallels between human and animal migrations.",
            fi: "Iäkäs kurdinainen ottaa hoiviinsa haavoittuneen haikaran. Vertauskuvallinen elokuva tutkii ihmisten ja eläinten muuttoliikkeiden yhtäläisyyksiä."
        },
        screenings: [
            { date: "2026-02-04T19:15", venue: "Maxim 2" },
            { date: "2026-02-06T20:30", venue: "Kinopalatsi 7" },
            { date: "2026-02-08T15:45", venue: "Kinopalatsi 6" },
        ]
    },
    {
        id: 60,
        title: { en: "SIRENS CALL", fi: "SIRENS CALL" },
        director: "Miriam Gossing, Lina Sieckmann",
        duration: "121 min",
        description: {
            en: "A visually striking sci-fi/documentary hybrid dives into the world of merfolk. In this eccentric subculture, dazzling costumes go hand in hand with self-acceptance, queer activism, and anti-racism.",
            fi: "Visuaalisesti näyttävä tieteisfiktion ja dokumenttielokuvan hybridi sukeltaa merenväen pariin. Omalaatuisessa alakulttuurissa on häikäisevien asujen lisäksi kyse itsensä hyväksymisestä, queer-aktivismista ja antirasismista."
        },
        screenings: [
            { date: "2026-02-04T17:15", venue: "Maxim 1" },
            { date: "2026-02-07T18:15", venue: "Maxim 2" },
            { date: "2026-02-08T14:45", venue: "Kiasma-teatteri" },
        ]
    },
    {
        id: 61,
        title: { en: "SOUTH: SIR ERNEST SHACKLETON’S GLORIOUS EPIC OF THE ANTARCTIC", fi: "SOUTH: SIR ERNEST SHACKLETON’S GLORIOUS EPIC OF THE ANTARCTIC" },
        director: "Frank Hurley",
        duration: "81 min",
        description: {
            en: "One of the world’s first feature-length documentaries follows Sir Ernest Shackleton’s ill-fated Antarctic expedition of 1914–1916. The silent-film screening is accompanied live by Kiri Ra! (Lau Nau, Matti Bye & Linda Fredriksson).",
            fi: "Yksi maailman ensimmäisistä täyspitkistä dokumenttielokuvista seuraa Sir Ernest Shackletonin epäonnista Etelämantereen tutkimusmatkaa vuosina 1914–1916. Mykkäelokuvanäytöstä säestää Kiri Ra! (Lau Nau, Matti Bye & Linda Fredriksson)."
        },
        screenings: [
            { date: "2026-02-05T19:00", venue: "Kino Regina" },
        ]
    },
    {
        id: 62,
        title: { en: "SYNTHETIC SINCERITY", fi: "SYNTHETIC SINCERITY" },
        director: "Marc Isaacs",
        duration: "70 min",
        description: {
            en: "Researchers try to teach AI what it means to be human using Marc Isaacs’s documentaries. This philosophical study of the relationship between people and machines blends fictional scenes with gently absurd humor.",
            fi: "Tutkijat opettavat tekoälylle inhimillisyyttä Marc Isaacsin dokumenttien avulla. Filosofinen tutkielma ihmisten ja koneiden suhteesta yhdistää fiktiivisiä kohtauksia ja lempeän absurdia huumoria."
        },
        screenings: [
            { date: "2026-02-03T17:00", venue: "Cinema Orion" },
            { date: "2026-02-07T15:30", venue: "Kiasma-teatteri" },
            { date: "2026-02-08T13:30", venue: "Cinema Orion" },
        ]
    },
    {
        id: 63,
        title: { en: "THE DIALOGUE POLICE", fi: "THE DIALOGUE POLICE" },
        director: "Susanna Edwards",
        duration: "90 min",
        description: {
            en: "A gripping film from democracy’s front line follows a uniquely Swedish institution: dialogue police officers who work to ensure everyone has the right to express their views.",
            fi: "Mukaansatempaava elokuva demokratian etulinjasta seuraa ruotsalaista erikoisuutta, dialogipoliisia, jotka työskentelevät varmistaakseen, että kaikilla on oikeus sanoa mielipiteensä."
        },
        screenings: [
            { date: "2026-02-05T16:30", venue: "Kinopalatsi 5" },
            { date: "2026-02-07T14:15", venue: "Cinema Orion" },
            { date: "2026-02-08T18:45", venue: "Kinopalatsi 9" },
        ]
    },
    {
        id: 64,
        title: { en: "THE GOLDEN SPURTLE", fi: "THE GOLDEN SPURTLE" },
        director: "Constantine Costi",
        duration: "75 min",
        description: {
            en: "For those competing for the world championship in oatmeal, there’s something magical about this humble grey dish. This warm documentary follows the contest that draws participants from around the world to a small Scottish village.",
            fi: "Kaurapuuron maailmanmestaruudesta kilpaileville harmaassa herkussa on taikaa. Sympaattinen dokumentti seuraa kilpailua, joka kerää pieneen skotlantilaiskylään osallistujia ympäri maailmaa."
        },
        screenings: [
            { date: "2026-02-05T17:15", venue: "Maxim 1" },
            { date: "2026-02-07T18:15", venue: "Maxim 2" },
            { date: "2026-02-08T14:45", venue: "Kiasma-teatteri" },
        ]
    },
    {
        id: 65,
        title: { en: "THE GROUND BENEATH OUR FEET", fi: "THE GROUND BENEATH OUR FEET" },
        director: "Yrsa Roca Fannberg",
        duration: "82 min",
        description: {
            en: "Shot on film, this warm-hearted portrait of a Reykjavík nursing home makes room for the small wonders of everyday life and is filled with a love of life—for as long as it lasts.",
            fi: "Filmille kuvattu lämminhenkinen elokuva reykjavíkiläisestä vanhainkodista antaa tilaa arjen pienille ihmeille ja on täynnä rakkautta elämään, niin kauan kuin sitä kestää."
        },
        screenings: [
            { date: "2026-02-05T18:00", venue: "Kinopalatsi 7" },
            { date: "2026-02-06T17:45", venue: "Cinema Orion" },
            { date: "2026-02-08T17:15", venue: "Kinopalatsi 6" },
        ]
    },
    {
        id: 66,
        title: { en: "THE LONG ROAD TO THE DIRECTOR’S CHAIR", fi: "THE LONG ROAD TO THE DIRECTOR’S CHAIR" },
        director: "Vibeke Løkkeberg",
        duration: "70 min",
        description: {
            en: "Archival footage shot in 1973, capturing the early days of the feminist film movement in Berlin, resurfaces fifty years later as a dialogue with struggles that are still unfinished.",
            fi: "Vuonna 1973 kuvattu arkistomateriaali feministisen elokuvaliikkeen alkuvaiheista Berliinissä avautuu 50 vuoden jälkeen vuoropuheluksi yhä keskeneräisten taistelujen kanssa."
        },
        screenings: [
            { date: "2026-02-05T17:15", venue: "Kino Regina" },
            { date: "2026-02-06T19:30", venue: "Kino Regina" },
        ]
    },
    {
        id: 67,
        title: { en: "THE MEMORY OF BUTTERFLIES", fi: "THE MEMORY OF BUTTERFLIES" },
        director: "Tatiana Fuentes Sadowski",
        duration: "77 min",
        description: {
            en: "A photograph more than a century old sets off a hypnotic journey into Peru’s past, shadowed by the colonialism brought into the rainforest during the Amazon rubber boom.",
            fi: "Yli satavuotias valokuva käynnistää hypnoottisen matkan Perun menneisyyteen, jota varjostaa Amazonin kumibuumin aikana viidakkoon tuotu kolonialismi."
        },
        screenings: [
            { date: "2026-02-03T18:00", venue: "Kinopalatsi 6" },
            { date: "2026-02-07T13:45", venue: "Kiasma-teatteri" },
            { date: "2026-02-08T13:15", venue: "Kinopalatsi 7" },
        ]
    },
    {
        id: 68,
        title: { en: "TRUTH OR DARE", fi: "TOTUUS VAI TEHTÄVÄ" },
        director: "Tonislav Hristov",
        duration: "85 min",
        description: {
            en: "The documentary follows in parallel a Bulgarian journalist investigating fake news and an engineer running for office who spreads conservative conspiracy theories.",
            fi: "Dokumentti seuraa rinnakkain valeuutisia tutkivaa bulgarialaista journalistia sekä vaaleissa ehdokkaaksi lähtevää insinööriä, joka levittää konservatiivisia salaliittoteorioita."
        },
        screenings: [
            { date: "2026-02-05T17:45", venue: "Kinopalatsi 9" },
            { date: "2026-02-06T19:15", venue: "Kinopalatsi 6" },
            { date: "2026-02-08T14:45", venue: "Kinopalatsi 5" },
        ]
    },
    {
        id: 69,
        title: { en: "UNDER THE FLAGS, THE SUN", fi: "UNDER THE FLAGS, THE SUN" },
        director: "Juanjo Pereira",
        duration: "90 min",
        description: {
            en: "Rare archival footage paints a portrait of Alfredo Stroessner’s 35-year dictatorship in Paraguay and exposes the hidden structures of his rule—whose effects are still felt today.",
            fi: "Harvinainen arkistomateriaali rakentaa kuvan Stroessnerin 35-vuotisesta diktatuurista Paraguayassa ja paljastaa diktaattorin vallan piilotetut rakenteet, joiden vaikutukset tuntuvat edelleen."
        },
        screenings: [
            { date: "2026-02-06T18:45", venue: "Kinopalatsi 9" },
            { date: "2026-02-07T19:00", venue: "Kino Regina" },
            { date: "2026-02-08T17:15", venue: "Kinopalatsi 7" },
        ]
    },
    {
        id: 70,
        title: { en: "A NEW SET OF EYES: STUDENT FILMS FROM FINLAND", fi: "UUSIN SILMIN: OPISKELIJAELOKUVIA SUOMESTA" },
        director: "",
        duration: "90 min",
        description: {
            en: "A screening showcasing some of the year’s best student films features the short documentaries Aeternus Florere, Dancers Only, Between Us, Scent of an Ancestral Dream and Drawn in Water.",
            fi: "Vuoden parhaita opiskelijaelokuvia yhteen kokoavassa näytöksessä esitetään lyhytdokumentit Aeternus Florere, Dancers Only, Meidän kesken, Scent of an Ancestral Dream ja Veteen piirretty."
        },
        screenings: [
            { date: "2026-02-06T17:00", venue: "Maxim 1" },
            { date: "2026-02-07T15:00", venue: "Kinopalatsi 9" },
        ]
    },
    {
        id: 71,
        title: { en: "THE LAST CHAPTER", fi: "VIIMEINEN KOTIMAA" },
        director: "Mohamed El Aboudi",
        duration: "83 min",
        description: {
            en: "Three immigrants of African descent face an unexpected culture shock: what is it like to grow old far from your roots—and to navigate a strained relationship with your children who have grown up in Finland?",
            fi: "Kolme afrikkalaistaustaista maahanmuuttajaa kohtaa odottamattoman kulttuurishokin: millaista on vanheta kaukana juuristaan ja käsitellä jännitteistä suhdetta omiin Suomessa kasvaneisiin lapsiin?"
        },
        screenings: [
            { date: "2026-02-04T17:00", venue: "Maxim 2" },
            { date: "2026-02-06T15:30", venue: "Kinopalatsi 6" },
            { date: "2026-02-08T15:15", venue: "Kinopalatsi 9" },
        ]
    },
    {
        id: 72,
        title: { en: "WE LIVE HERE", fi: "WE LIVE HERE" },
        director: "Zhanana Kurmasheva",
        duration: "80 min",
        description: {
            en: "A visually striking documentary follows three generations grappling with the burden of the past on the fringes of an abandoned nuclear test site in Kazakhstan.",
            fi: "Visuaalisesti säväyttävä dokumentti seuraa kolmen eri sukupolven taistelua menneisyyden painolastin kanssa hylätyn ydinkoealueen liepeillä Kazakstanissa."
        },
        screenings: [
            { date: "2026-02-07T17:00", venue: "Kinopalatsi 9" },
            { date: "2026-02-08T19:15", venue: "Cinema Orion" },
        ]
    },
    {
        id: 73,
        title: { en: "WITH HASAN IN GAZA", fi: "WITH HASAN IN GAZA" },
        director: "Kamal Aljafri",
        duration: "106 min",
        description: {
            en: "In 2001, Kamal Aljafri travels across Gaza with a local guide in search of a former prison companion from a decade earlier. The documentary is a heartbreaking tribute to everything that has been erased.",
            fi: "Vuonna 2001 Kamal Aljafri matkaa paikallisoppaan kanssa halki Gazan etsiessään vuosikymmenen takaista vankilatoveriaan. Dokumentti on sydäntäsärkevä kunnianosoitus kaikelle poispyyhitylle."
        },
        screenings: [
            { date: "2026-02-03T20:45", venue: "Cinema Orion" },
            { date: "2026-02-04T18:45", venue: "Bio Rex Lasipalatsi" },
        ]
    },
    {
        id: 74,
        title: { en: "WRITING LIFE – ANNIE ERNAUX THROUGH THE EYES OF HIGH SCHOOL STUDENTS", fi: "WRITING LIFE – ANNIE ERNAUX THROUGH THE EYES OF HIGH SCHOOL STUDENTS" },
        director: "Claire Simon",
        duration: "90 min",
        description: {
            en: "Claire Simon’s film Writing Life begins in French classrooms where Annie Ernaux is read aloud. The reading is attentive and slightly cautious. Now and then someone stumbles over a word and chuckles—more at themselves than at the text—then continues. During breaks, the corridors fill with laughter and movement, but in class the talk sharpens and comes into focus. The film glides from one school to another and from one group to the next, never lingering on any single person, following the flow of the conversations.",
            fi: "Claire Simonin elokuva Writing Life alkaa ranskalaisista luokkahuoneista, joissa luetaan ääneen Annie Ernaux’ta. Lukeminen on tarkkaa ja hieman varovaista. Välillä joku kompastuu sanaan ja naurahtaa, enemmän itselleen kuin tekstille, ja jatkaa. Välitunnilla käytävät täyttyvät naurusta ja liikkeestä, mutta tunnilla puhe kirkastuu. Elokuva liukuu koulusta toiseen ja ryhmästä seuraavaan pysähtymättä kehenkään yksittäiseen, seuraten keskustelujen kulkua."
        },
        screenings: [
            { date: "2026-02-07T16:00", venue: "Bio Rex Lasipalatsi" },
        ]
    },
    {
        id: 75,
        title: { en: "YINTAH", fi: "YINTAH" },
        director: "Brenda Michell, Michael Toledano, Jennifer Wickham",
        duration: "110 min",
        description: {
            en: "An Indigenous community protects its lands from the Canadian government and major corporations. Spanning more than a decade, the documentary portrays resistance—and the entanglement of colonization, capitalism, and the climate crisis.",
            fi: "Alkuperäiskansa suojelee maitaan Kanadan hallitukselta ja suuryrityksiltä. Yli vuosikymmenen ajalle sijoittuva dokumentti on kuvaus vastarinnasta sekä kolonisaation, kapitalismin ja ilmastokriisin limittymisestä."
        },
        screenings: [
            { date: "2026-02-03T17:30", venue: "Kiasma-teatteri" },
            { date: "2026-02-04T16:00", venue: "Kinopalatsi 7" },
            { date: "2026-02-06T18:00", venue: "Bio Rex Lasipalatsi" },
        ]
    },
    {
        id: 76,
        title: { en: "ZLATAN’S NOSE", fi: "ZLATAN’S NOSE" },
        director: "Nils Toftenow, Mathias Rosberg, Olle Toftenow",
        duration: "84 min",
        description: {
            en: "The Swedish film begins as a true-crime documentary about the stolen nose of Zlatan’s statue, but grows into a compelling portrait of the private detective investigating the case.",
            fi: "Ruotsalaisteos alkaa true crime -dokumenttina Zlatanin patsaan varastetusta nenästä, mutta kasvaa vetäväksi henkilökuvaksi asiaa selvittävästä yksityisetsivästä."
        },
        screenings: [
            { date: "2026-02-03T17:00", venue: "Kinopalatsi 5" },
            { date: "2026-02-05T19:10", venue: "Maxim 2" },
            { date: "2026-02-08T19:15", venue: "Kinopalatsi 7" },
        ]
    },
]

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
    document.getElementById('headerTitle').textContent = t.headerTitle;
    document.getElementById('headerSubtitle').textContent = t.headerSubtitle;
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
initializeAvailableDates();
renderDateSelector();
renderFilms();
renderSchedule();
updateDownloadButton();
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
