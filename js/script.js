/* =========================================================
   THE LOCAL VOICE
   PART 4 — HEADER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const hamburgerBtn =
        document.getElementById("hamburgerBtn");

    const mobileNavigation =
        document.getElementById("mobileNavigation");

    const mobileDropdowns =
        document.querySelectorAll(".mobile-dropdown");

    const rtlToggle =
        document.getElementById("rtlToggle");

    const mobileRtlToggle =
        document.getElementById("mobileRtlToggle");

    const darkToggle =
        document.getElementById("darkToggle");

    const mobileDarkToggle =
        document.getElementById("mobileDarkToggle");


    /* =====================================================
       HAMBURGER MENU
    ====================================================== */

    if (hamburgerBtn && mobileNavigation) {

        hamburgerBtn.addEventListener("click", function () {

            const isOpen =
                mobileNavigation.classList.toggle("active");


            hamburgerBtn.setAttribute(
                "aria-expanded",
                isOpen
            );


            /* Change hamburger ↔ close icon */

            if (isOpen) {

                hamburgerBtn.innerHTML =
                    '<i class="fa-solid fa-xmark" aria-hidden="true"></i>';

                hamburgerBtn.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            } else {

                hamburgerBtn.innerHTML =
                    '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

                hamburgerBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                /* Close mobile dropdowns */

                mobileDropdowns.forEach(function (dropdown) {

                    dropdown.classList.remove("active");

                    const toggle =
                        dropdown.querySelector(
                            ".mobile-dropdown-toggle"
                        );

                    if (toggle) {

                        toggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                });

            }

        });

    }


    /* =====================================================
       MOBILE DROPDOWNS
    ====================================================== */

    mobileDropdowns.forEach(function (dropdown) {

        const toggle =
            dropdown.querySelector(
                ".mobile-dropdown-toggle"
            );


        if (!toggle) return;


        toggle.addEventListener("click", function () {

            const isActive =
                dropdown.classList.contains("active");


            /* Close all other dropdowns */

            mobileDropdowns.forEach(function (item) {

                if (item !== dropdown) {

                    item.classList.remove("active");


                    const itemToggle =
                        item.querySelector(
                            ".mobile-dropdown-toggle"
                        );


                    if (itemToggle) {

                        itemToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            });


            /* Toggle current dropdown */

            if (isActive) {

                dropdown.classList.remove("active");

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                dropdown.classList.add("active");

                toggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* =====================================================
       RTL MODE
    ====================================================== */

    function toggleRTL() {

        const html =
            document.documentElement;


        const currentDirection =
            html.getAttribute("dir") || "ltr";


        if (currentDirection === "ltr") {

            html.setAttribute(
                "dir",
                "rtl"
            );

            localStorage.setItem(
                "siteDirection",
                "rtl"
            );

        } else {

            html.setAttribute(
                "dir",
                "ltr"
            );

            localStorage.setItem(
                "siteDirection",
                "ltr"
            );

        }

    }


    /* Desktop RTL */

    if (rtlToggle) {

        rtlToggle.addEventListener(
            "click",
            toggleRTL
        );

    }


    /* Mobile RTL */

    if (mobileRtlToggle) {

        mobileRtlToggle.addEventListener(
            "click",
            toggleRTL
        );

    }


    /* =====================================================
       LOAD SAVED RTL MODE
    ====================================================== */

    const savedDirection =
        localStorage.getItem(
            "siteDirection"
        );


    if (savedDirection === "rtl") {

        document.documentElement.setAttribute(
            "dir",
            "rtl"
        );

    } else {

        document.documentElement.setAttribute(
            "dir",
            "ltr"
        );

    }


    /* =====================================================
       DARK MODE
    ====================================================== */

    function updateDarkIcons() {

        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        const icons =
            document.querySelectorAll(
                "#darkToggle i, #mobileDarkToggle i"
            );


        icons.forEach(function (icon) {

            if (isDark) {

                icon.classList.remove(
                    "fa-moon"
                );

                icon.classList.add(
                    "fa-sun"
                );

            } else {

                icon.classList.remove(
                    "fa-sun"
                );

                icon.classList.add(
                    "fa-moon"
                );

            }

        });

    }


    function toggleDarkMode() {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        localStorage.setItem(
            "darkMode",
            isDark ? "enabled" : "disabled"
        );


        updateDarkIcons();

    }


    /* Desktop Dark Mode */

    if (darkToggle) {

        darkToggle.addEventListener(
            "click",
            toggleDarkMode
        );

    }


    /* Mobile Dark Mode */

    if (mobileDarkToggle) {

        mobileDarkToggle.addEventListener(
            "click",
            toggleDarkMode
        );

    }


    /* =====================================================
       LOAD SAVED DARK MODE
    ====================================================== */

    const savedDarkMode =
        localStorage.getItem(
            "darkMode"
        );


    if (savedDarkMode === "enabled") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    /* Set correct icon when page loads */

    updateDarkIcons();


    /* =====================================================
       CLOSE MOBILE MENU AFTER CLICKING NORMAL LINK
    ====================================================== */

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-nav-link, .mobile-dropdown-menu a"
        );


    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                mobileNavigation &&
                hamburgerBtn
            ) {

                mobileNavigation.classList.remove(
                    "active"
                );


                hamburgerBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                hamburgerBtn.innerHTML =
                    '<i class="fa-solid fa-bars" aria-hidden="true"></i>';


                hamburgerBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ====================================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !mobileNavigation ||
                !hamburgerBtn
            ) {
                return;
            }


            const clickedInsideHeader =
                event.target.closest(
                    ".site-header"
                );


            if (!clickedInsideHeader) {

                mobileNavigation.classList.remove(
                    "active"
                );


                hamburgerBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                hamburgerBtn.innerHTML =
                    '<i class="fa-solid fa-bars" aria-hidden="true"></i>';

            }

        }
    );


    /* =====================================================
       ESC KEY — CLOSE MOBILE MENU
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            if (
                mobileNavigation &&
                hamburgerBtn
            ) {

                mobileNavigation.classList.remove(
                    "active"
                );


                hamburgerBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                hamburgerBtn.innerHTML =
                    '<i class="fa-solid fa-bars" aria-hidden="true"></i>';


                mobileDropdowns.forEach(
                    function (dropdown) {

                        dropdown.classList.remove(
                            "active"
                        );

                    }
                );

            }

        }
    );


});









/* =========================================================
   HOME 1 — HERO SLIDER
========================================================= */

const home1Hero = document.getElementById("home1Hero");

if (home1Hero) {

    const slides = home1Hero.querySelectorAll(".home1-hero-slide");
    const dots = home1Hero.querySelectorAll(".home1-hero-dot");

    const prevButton = document.getElementById("home1HeroPrev");
    const nextButton = document.getElementById("home1HeroNext");

    let currentSlide = 0;
    let autoSlideTimer = null;

    const slideDuration = 5000;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showHome1Slide(index) {

        if (!slides.length) return;

        /* Keep index inside range */

        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }


        currentSlide = index;


        /* Remove active from all slides */

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });


        /* Remove active from all dots */

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });


        /* Activate current slide */

        slides[currentSlide].classList.add("active");


        /* Activate current dot */

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }
    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function nextHome1Slide() {

        showHome1Slide(currentSlide + 1);

    }


    /* =====================================================
       PREVIOUS SLIDE
    ===================================================== */

    function previousHome1Slide() {

        showHome1Slide(currentSlide - 1);

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener("click", function () {

            nextHome1Slide();

            restartAutoSlide();

        });

    }


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    if (prevButton) {

        prevButton.addEventListener("click", function () {

            previousHome1Slide();

            restartAutoSlide();

        });

    }


    /* =====================================================
       DOT NAVIGATION
    ===================================================== */

    dots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showHome1Slide(index);

            restartAutoSlide();

        });

    });


    /* =====================================================
       AUTO SLIDE
    ===================================================== */

    function startAutoSlide() {

        stopAutoSlide();

        autoSlideTimer = setInterval(function () {

            nextHome1Slide();

        }, slideDuration);

    }


    /* =====================================================
       STOP AUTO SLIDE
    ===================================================== */

    function stopAutoSlide() {

        if (autoSlideTimer) {

            clearInterval(autoSlideTimer);

            autoSlideTimer = null;

        }

    }


    /* =====================================================
       RESTART AUTO SLIDE
    ===================================================== */

    function restartAutoSlide() {

        startAutoSlide();

    }


    /* =====================================================
       PAUSE ON HOVER
    ===================================================== */

    home1Hero.addEventListener("mouseenter", function () {

        stopAutoSlide();

    });


    home1Hero.addEventListener("mouseleave", function () {

        startAutoSlide();

    });


    /* =====================================================
       TOUCH / SWIPE
    ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    home1Hero.addEventListener(
        "touchstart",
        function (event) {

            touchStartX = event.changedTouches[0].screenX;

            stopAutoSlide();

        },
        { passive: true }
    );


    home1Hero.addEventListener(
        "touchend",
        function (event) {

            touchEndX = event.changedTouches[0].screenX;

            handleHome1Swipe();

            startAutoSlide();

        },
        { passive: true }
    );


    function handleHome1Swipe() {

        const swipeDistance = touchEndX - touchStartX;

        /* Ignore very small movements */

        if (Math.abs(swipeDistance) < 50) {
            return;
        }


        /* RTL changes swipe direction */

        const isRTL =
            document.documentElement.getAttribute("dir") === "rtl";


        if (isRTL) {

            if (swipeDistance > 0) {
                nextHome1Slide();
            } else {
                previousHome1Slide();
            }

        } else {

            if (swipeDistance < 0) {
                nextHome1Slide();
            } else {
                previousHome1Slide();
            }

        }

    }


    /* =====================================================
       INITIAL SLIDE
    ===================================================== */

    showHome1Slide(0);


    /* =====================================================
       START
    ===================================================== */

    startAutoSlide();

}







/* =========================================================
   HOME 2 — HERO BACKGROUND SLIDER
   PART 4 : JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const home2Hero = document.getElementById("home2Hero");

    if (!home2Hero) return;


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const slides =
        home2Hero.querySelectorAll(".home2-hero-slide");

    const dots =
        home2Hero.querySelectorAll(".home2-hero-dot");

    const prevButton =
        document.getElementById("home2HeroPrev");

    const nextButton =
        document.getElementById("home2HeroNext");

    const currentNumber =
        document.getElementById("home2HeroCurrent");


    /* =====================================================
       SETTINGS
    ====================================================== */

    let currentSlide = 0;

    let autoSlideTimer = null;

    const slideDuration = 5000;


    /* =====================================================
       SHOW SLIDE
    ====================================================== */

    function showHome2Slide(index) {

        if (!slides.length) return;


        /* Keep index inside range */

        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }


        currentSlide = index;


        /* Remove active */

        slides.forEach(function (slide) {

            slide.classList.remove("active");

        });


        dots.forEach(function (dot) {

            dot.classList.remove("active");

        });


        /* Add active */

        slides[currentSlide].classList.add("active");


        if (dots[currentSlide]) {

            dots[currentSlide].classList.add("active");

        }


        /* Update number */

        if (currentNumber) {

            currentNumber.textContent =
                String(currentSlide + 1).padStart(2, "0");

        }

    }


    /* =====================================================
       NEXT SLIDE
    ====================================================== */

    function nextHome2Slide() {

        showHome2Slide(currentSlide + 1);

    }


    /* =====================================================
       PREVIOUS SLIDE
    ====================================================== */

    function previousHome2Slide() {

        showHome2Slide(currentSlide - 1);

    }


    /* =====================================================
       NEXT BUTTON
    ====================================================== */

    if (nextButton) {

        nextButton.addEventListener("click", function () {

            nextHome2Slide();

            restartAutoSlide();

        });

    }


    /* =====================================================
       PREVIOUS BUTTON
    ====================================================== */

    if (prevButton) {

        prevButton.addEventListener("click", function () {

            previousHome2Slide();

            restartAutoSlide();

        });

    }


    /* =====================================================
       DOT NAVIGATION
    ====================================================== */

    dots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showHome2Slide(index);

            restartAutoSlide();

        });

    });


    /* =====================================================
       AUTO SLIDE
    ====================================================== */

    function startAutoSlide() {

        stopAutoSlide();

        autoSlideTimer = setInterval(function () {

            nextHome2Slide();

        }, slideDuration);

    }


    /* =====================================================
       STOP AUTO SLIDE
    ====================================================== */

    function stopAutoSlide() {

        if (autoSlideTimer) {

            clearInterval(autoSlideTimer);

            autoSlideTimer = null;

        }

    }


    /* =====================================================
       RESTART AUTO SLIDE
    ====================================================== */

    function restartAutoSlide() {

        startAutoSlide();

    }


    /* =====================================================
       PAUSE ON HOVER
    ====================================================== */

    home2Hero.addEventListener("mouseenter", function () {

        stopAutoSlide();

    });


    home2Hero.addEventListener("mouseleave", function () {

        startAutoSlide();

    });


    /* =====================================================
       TOUCH / SWIPE
    ====================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    home2Hero.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

            stopAutoSlide();

        },
        {
            passive: true
        }
    );


    home2Hero.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleHome2Swipe();

            startAutoSlide();

        },
        {
            passive: true
        }
    );


    function handleHome2Swipe() {

        const swipeDistance =
            touchEndX - touchStartX;


        /* Ignore small movements */

        if (Math.abs(swipeDistance) < 50) {

            return;

        }


        const isRTL =
            document.documentElement.getAttribute("dir") === "rtl";


        if (isRTL) {

            if (swipeDistance > 0) {

                nextHome2Slide();

            } else {

                previousHome2Slide();

            }

        } else {

            if (swipeDistance < 0) {

                nextHome2Slide();

            } else {

                previousHome2Slide();

            }

        }

    }


    /* =====================================================
       KEYBOARD NAVIGATION
    ====================================================== */

    document.addEventListener("keydown", function (event) {

        /* Only respond when hero is visible */

        const rect =
            home2Hero.getBoundingClientRect();

        const isVisible =
            rect.top < window.innerHeight &&
            rect.bottom > 0;


        if (!isVisible) return;


        if (event.key === "ArrowRight") {

            nextHome2Slide();

            restartAutoSlide();

        }


        if (event.key === "ArrowLeft") {

            previousHome2Slide();

            restartAutoSlide();

        }

    });


    /* =====================================================
       INITIAL SLIDE
    ====================================================== */

    showHome2Slide(0);

    startAutoSlide();

});









/* =========================================================
   EVENTS SECTION 4 — EVENTS CALENDAR
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const calendarDays = document.getElementById("eventsCalendarDays");
    const calendarMonth = document.getElementById("eventsCalendarMonth");
    const calendarYear = document.getElementById("eventsCalendarYear");
    const previousButton = document.getElementById("eventsCalendarPrev");
    const nextButton = document.getElementById("eventsCalendarNext");

    const eventCategory = document.getElementById("eventsCalendarCategory");
    const eventTitle = document.getElementById("eventsCalendarTitle");
    const eventDate = document.getElementById("eventsCalendarDate");
    const eventTime = document.getElementById("eventsCalendarTime");
    const eventVenue = document.getElementById("eventsCalendarVenue");
    const eventDescription = document.getElementById(
        "eventsCalendarDescription"
    );
    const eventDetailsButton = document.getElementById(
        "eventsCalendarDetailsButton"
    );

    if (!calendarDays) return;


    /* =====================================================
       EVENT DATA
    ===================================================== */

    const calendarEvents = {

        "2026-09-24": {
            category: "COMMUNITY EVENT",
            title: "Local Community Gathering",
            date: "24 September 2026",
            time: "10:00 AM – 4:00 PM",
            venue: "Community Hall",
            description:
                "Residents are invited to take part in a local community gathering featuring activities, discussions, entertainment, and opportunities to connect with people from across the community."
        },

        "2026-09-28": {
            category: "SPORTS EVENT",
            title: "Local Cricket Tournament",
            date: "28 September 2026",
            time: "9:00 AM – 5:00 PM",
            venue: "Municipal Ground",
            description:
                "Local teams will come together for a community cricket tournament featuring competitive matches and activities for sports enthusiasts."
        },

        "2026-10-02": {
            category: "EDUCATION EVENT",
            title: "Learning Workshop for Students",
            date: "02 October 2026",
            time: "10:30 AM – 2:00 PM",
            venue: "Town Library",
            description:
                "Students can take part in an educational workshop designed to encourage learning, skill development, and new opportunities within the local community."
        },

        "2026-10-05": {
            category: "CULTURAL EVENT",
            title: "Local Cultural Evening",
            date: "05 October 2026",
            time: "5:00 PM – 8:30 PM",
            venue: "Community Center",
            description:
                "A community cultural evening featuring local performances, activities, and opportunities for residents to celebrate local talent and traditions."
        },

        "2026-10-08": {
            category: "BUSINESS EVENT",
            title: "Local Business Networking Meet",
            date: "08 October 2026",
            time: "10:00 AM – 1:00 PM",
            venue: "Town Hall",
            description:
                "Local business owners and professionals can meet, exchange ideas, and explore opportunities for collaboration and community growth."
        },

        "2026-10-12": {
            category: "PUBLIC EVENT",
            title: "Community Awareness Program",
            date: "12 October 2026",
            time: "9:30 AM – 1:00 PM",
            venue: "Municipal Hall",
            description:
                "A public awareness program providing useful information and encouraging residents to participate in important community initiatives."
        }

    };


    /* =====================================================
       CURRENT CALENDAR DATE
    ===================================================== */

    let currentMonth = 8;
    let currentYear = 2026;


    /* =====================================================
       MONTH NAMES
    ===================================================== */

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    function formatDateKey(year, month, day) {

        return (
            year +
            "-" +
            String(month + 1).padStart(2, "0") +
            "-" +
            String(day).padStart(2, "0")
        );

    }


    /* =====================================================
       UPDATE EVENT DETAILS
    ===================================================== */

    function updateEventDetails(dateKey) {

        const selectedEvent = calendarEvents[dateKey];

        if (!selectedEvent) {
            return;
        }

        if (eventCategory) {
            eventCategory.textContent = selectedEvent.category;
        }

        if (eventTitle) {
            eventTitle.textContent = selectedEvent.title;
        }

        if (eventDate) {
            eventDate.textContent = selectedEvent.date;
        }

        if (eventTime) {
            eventTime.textContent = selectedEvent.time;
        }

        if (eventVenue) {
            eventVenue.textContent = selectedEvent.venue;
        }

        if (eventDescription) {
            eventDescription.textContent =
                selectedEvent.description;
        }

    }


    /* =====================================================
       CREATE CALENDAR
    ===================================================== */

    function renderCalendar() {

        calendarDays.innerHTML = "";

        calendarMonth.textContent =
            monthNames[currentMonth];

        calendarYear.textContent =
            currentYear;


        const firstDay = new Date(
            currentYear,
            currentMonth,
            1
        ).getDay();

        const daysInMonth = new Date(
            currentYear,
            currentMonth + 1,
            0
        ).getDate();


        const previousMonthDays = new Date(
            currentYear,
            currentMonth,
            0
        ).getDate();


        /* ================================================
           PREVIOUS MONTH DAYS
        ================================================= */

        for (let i = firstDay - 1; i >= 0; i--) {

            const dayButton =
                document.createElement("button");

            dayButton.type = "button";

            dayButton.className =
                "events-calendar-day is-muted";

            dayButton.disabled = true;

            dayButton.textContent =
                previousMonthDays - i;

            calendarDays.appendChild(dayButton);

        }


        /* ================================================
           CURRENT MONTH DAYS
        ================================================= */

        for (let day = 1; day <= daysInMonth; day++) {

            const dayButton =
                document.createElement("button");

            dayButton.type = "button";

            dayButton.className =
                "events-calendar-day";

            const dateKey =
                formatDateKey(
                    currentYear,
                    currentMonth,
                    day
                );


            /* ============================================
               EVENT DAY
            ============================================ */

            if (calendarEvents[dateKey]) {

                dayButton.classList.add("has-event");

                dayButton.dataset.date =
                    dateKey;

                dayButton.dataset.event =
                    "true";


                const dayNumber =
                    document.createElement("span");

                dayNumber.textContent = day;


                const eventDot =
                    document.createElement("i");

                eventDot.className =
                    "events-calendar-dot";


                dayButton.appendChild(dayNumber);
                dayButton.appendChild(eventDot);


                dayButton.addEventListener(
                    "click",
                    function () {

                        selectCalendarDay(
                            dayButton,
                            dateKey
                        );

                    }
                );

            } else {

                dayButton.textContent = day;

            }


            calendarDays.appendChild(dayButton);

        }


        /* ================================================
           NEXT MONTH FILLER DAYS
        ================================================= */

        const totalCells =
            calendarDays.children.length;

        const remainingCells =
            42 - totalCells;


        if (remainingCells < 7) {

            for (let i = 1; i <= remainingCells; i++) {

                const dayButton =
                    document.createElement("button");

                dayButton.type = "button";

                dayButton.className =
                    "events-calendar-day is-muted";

                dayButton.disabled = true;

                dayButton.textContent = i;

                calendarDays.appendChild(dayButton);

            }

        }


        restoreSelectedEvent();

    }


    /* =====================================================
       SELECT CALENDAR DAY
    ===================================================== */

    function selectCalendarDay(
        selectedButton,
        dateKey
    ) {

        const allDays =
            calendarDays.querySelectorAll(
                ".events-calendar-day"
            );

        allDays.forEach(function (day) {

            day.classList.remove(
                "is-selected"
            );

        });


        selectedButton.classList.add(
            "is-selected"
        );


        updateEventDetails(dateKey);


        /*
         * Store selected date so it remains selected
         * when the calendar is rendered again.
         */

        calendarDays.dataset.selectedDate =
            dateKey;

    }


    /* =====================================================
       RESTORE SELECTED EVENT
    ===================================================== */

    function restoreSelectedEvent() {

        const selectedDate =
            calendarDays.dataset.selectedDate;


        if (!selectedDate) {

            const firstEventDate =
                Object.keys(calendarEvents)
                    .find(function (date) {

                        return (
                            date.startsWith(
                                currentYear +
                                "-" +
                                String(
                                    currentMonth + 1
                                ).padStart(2, "0")
                            )
                        );

                    });


            if (firstEventDate) {

                const firstEventButton =
                    calendarDays.querySelector(
                        '[data-date="' +
                        firstEventDate +
                        '"]'
                    );

                if (firstEventButton) {

                    firstEventButton.classList.add(
                        "is-selected"
                    );

                    updateEventDetails(
                        firstEventDate
                    );

                    calendarDays.dataset.selectedDate =
                        firstEventDate;

                }

            }

            return;
        }


        const selectedButton =
            calendarDays.querySelector(
                '[data-date="' +
                selectedDate +
                '"]'
            );


        if (selectedButton) {

            selectedButton.classList.add(
                "is-selected"
            );

            updateEventDetails(
                selectedDate
            );

        } else {

            /*
             * If selected event does not exist
             * in the current month, select the
             * first available event.
             */

            const firstEventDate =
                Object.keys(calendarEvents)
                    .find(function (date) {

                        return (
                            date.startsWith(
                                currentYear +
                                "-" +
                                String(
                                    currentMonth + 1
                                ).padStart(2, "0")
                            )
                        );

                    });


            if (firstEventDate) {

                const firstEventButton =
                    calendarDays.querySelector(
                        '[data-date="' +
                        firstEventDate +
                        '"]'
                    );

                if (firstEventButton) {

                    firstEventButton.classList.add(
                        "is-selected"
                    );

                    updateEventDetails(
                        firstEventDate
                    );

                    calendarDays.dataset.selectedDate =
                        firstEventDate;

                }

            }

        }

    }


    /* =====================================================
       PREVIOUS MONTH
    ===================================================== */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {

                currentMonth--;

                if (currentMonth < 0) {

                    currentMonth = 11;
                    currentYear--;

                }

                calendarDays.dataset.selectedDate =
                    "";

                renderCalendar();

            }
        );

    }


    /* =====================================================
       NEXT MONTH
    ===================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                currentMonth++;

                if (currentMonth > 11) {

                    currentMonth = 0;
                    currentYear++;

                }

                calendarDays.dataset.selectedDate =
                    "";

                renderCalendar();

            }
        );

    }


    /* =====================================================
       VIEW EVENT DETAILS
    ===================================================== */

    if (eventDetailsButton) {

        eventDetailsButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const selectedDate =
                    calendarDays.dataset.selectedDate;

                const selectedEvent =
                    calendarEvents[selectedDate];

                if (!selectedEvent) {
                    return;
                }

                /*
                 * Change this URL later when you create
                 * individual event detail pages.
                 */

                console.log(
                    "Selected event:",
                    selectedEvent
                );

            }
        );

    }


    /* =====================================================
       INITIALIZE CALENDAR
    ===================================================== */

    renderCalendar();

});









/* =========================================================
   LOGIN + REGISTER PAGES
   PART 4 — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const loginRtlToggle =
        document.getElementById("loginRtlToggle");

    const loginDarkToggle =
        document.getElementById("loginDarkToggle");


    const registerRtlToggle =
        document.getElementById("registerRtlToggle");

    const registerDarkToggle =
        document.getElementById("registerDarkToggle");


    const loginPasswordToggle =
        document.getElementById("loginPasswordToggle");

    const loginPassword =
        document.getElementById("loginPassword");


    const registerPasswordToggle =
        document.getElementById("registerPasswordToggle");

    const registerPassword =
        document.getElementById("registerPassword");


    const registerConfirmPasswordToggle =
        document.getElementById("registerConfirmPasswordToggle");

    const registerConfirmPassword =
        document.getElementById("registerConfirmPassword");


    const loginForm =
        document.getElementById("loginForm");

    const registerForm =
        document.getElementById("registerForm");


    /* =====================================================
       RTL
    ====================================================== */

    function applySavedDirection() {

        const savedDirection =
            localStorage.getItem("siteDirection");

        if (savedDirection === "rtl") {

            document.documentElement.setAttribute(
                "dir",
                "rtl"
            );

        } else {

            document.documentElement.setAttribute(
                "dir",
                "ltr"
            );

        }
    }


    function toggleRTL() {

        const html =
            document.documentElement;

        const currentDirection =
            html.getAttribute("dir") || "ltr";


        if (currentDirection === "ltr") {

            html.setAttribute("dir", "rtl");

            localStorage.setItem(
                "siteDirection",
                "rtl"
            );

        } else {

            html.setAttribute("dir", "ltr");

            localStorage.setItem(
                "siteDirection",
                "ltr"
            );

        }

    }


    if (loginRtlToggle) {

        loginRtlToggle.addEventListener(
            "click",
            toggleRTL
        );

    }


    if (registerRtlToggle) {

        registerRtlToggle.addEventListener(
            "click",
            toggleRTL
        );

    }


    applySavedDirection();



    /* =====================================================
       DARK MODE ICON
    ====================================================== */

    function updateDarkModeIcons() {

        const isDark =
            document.body.classList.contains("dark-mode");


        const loginIcon =
            loginDarkToggle
                ? loginDarkToggle.querySelector("i")
                : null;


        const registerIcon =
            registerDarkToggle
                ? registerDarkToggle.querySelector("i")
                : null;


        [loginIcon, registerIcon].forEach(function (icon) {

            if (!icon) return;


            if (isDark) {

                icon.classList.remove("fa-moon");

                icon.classList.add("fa-sun");

            } else {

                icon.classList.remove("fa-sun");

                icon.classList.add("fa-moon");

            }

        });

    }



    /* =====================================================
       DARK MODE
    ====================================================== */

    function toggleDarkMode() {

        document.body.classList.toggle(
            "dark-mode"
        );


        const isDark =
            document.body.classList.contains(
                "dark-mode"
            );


        localStorage.setItem(
            "darkMode",
            isDark
                ? "enabled"
                : "disabled"
        );


        updateDarkModeIcons();

    }


    if (loginDarkToggle) {

        loginDarkToggle.addEventListener(
            "click",
            toggleDarkMode
        );

    }


    if (registerDarkToggle) {

        registerDarkToggle.addEventListener(
            "click",
            toggleDarkMode
        );

    }


    /* =====================================================
       APPLY SAVED DARK MODE
    ====================================================== */

    const savedDarkMode =
        localStorage.getItem("darkMode");


    if (savedDarkMode === "enabled") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    updateDarkModeIcons();



    /* =====================================================
       PASSWORD SHOW / HIDE
    ====================================================== */

    function setupPasswordToggle(
        toggleButton,
        passwordInput
    ) {

        if (!toggleButton || !passwordInput) {
            return;
        }


        toggleButton.addEventListener(
            "click",
            function () {

                const isPassword =
                    passwordInput.type === "password";


                if (isPassword) {

                    passwordInput.type = "text";

                    toggleButton.setAttribute(
                        "aria-label",
                        "Hide password"
                    );

                    toggleButton.setAttribute(
                        "title",
                        "Hide password"
                    );

                } else {

                    passwordInput.type = "password";

                    toggleButton.setAttribute(
                        "aria-label",
                        "Show password"
                    );

                    toggleButton.setAttribute(
                        "title",
                        "Show password"
                    );

                }


                const icon =
                    toggleButton.querySelector("i");


                if (icon) {

                    if (isPassword) {

                        icon.classList.remove(
                            "fa-eye"
                        );

                        icon.classList.add(
                            "fa-eye-slash"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-eye-slash"
                        );

                        icon.classList.add(
                            "fa-eye"
                        );

                    }

                }

            }
        );

    }


    setupPasswordToggle(
        loginPasswordToggle,
        loginPassword
    );


    setupPasswordToggle(
        registerPasswordToggle,
        registerPassword
    );


    setupPasswordToggle(
        registerConfirmPasswordToggle,
        registerConfirmPassword
    );



    /* =====================================================
       FORM MESSAGE HELPER
    ====================================================== */

    function showFormMessage(
        form,
        message,
        type
    ) {

        if (!form) return;


        let messageElement =
            form.querySelector(
                ".form-status-message"
            );


        if (!messageElement) {

            messageElement =
                document.createElement("div");

            messageElement.className =
                "form-status-message";

            form.insertBefore(
                messageElement,
                form.firstChild
            );

        }


        messageElement.textContent =
            message;


        messageElement.dataset.type =
            type || "error";


        messageElement.style.display =
            "block";


        messageElement.style.marginBottom =
            "15px";


        messageElement.style.padding =
            "10px 12px";


        messageElement.style.fontSize =
            "12px";


        messageElement.style.lineHeight =
            "1.6";


        messageElement.style.border =
            "1px solid #D9DDE3";


        messageElement.style.borderRadius =
            "2px";


        if (type === "success") {

            messageElement.style.color =
                "#176B3A";

            messageElement.style.background =
                "#EEF8F1";

        } else {

            messageElement.style.color =
                "#B42318";

            messageElement.style.background =
                "#FFF1F0";

        }

    }



    /* =====================================================
       LOGIN FORM
    ====================================================== */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "loginEmail"
                    );


                const password =
                    document.getElementById(
                        "loginPassword"
                    );


                if (!email || !password) {
                    return;
                }


                if (!email.value.trim()) {

                    email.focus();

                    showFormMessage(
                        loginForm,
                        "Please enter your email address.",
                        "error"
                    );

                    return;

                }


                if (!email.checkValidity()) {

                    email.focus();

                    showFormMessage(
                        loginForm,
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }


                if (!password.value.trim()) {

                    password.focus();

                    showFormMessage(
                        loginForm,
                        "Please enter your password.",
                        "error"
                    );

                    return;

                }


                /*
                 * Front-end demo only.
                 * Connect this form to your backend
                 * authentication system later.
                 */

                showFormMessage(
                    loginForm,
                    "Login form submitted successfully.",
                    "success"
                );

            }
        );

    }



    /* =====================================================
       REGISTER FORM
    ====================================================== */

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "registerName"
                    );


                const email =
                    document.getElementById(
                        "registerEmail"
                    );


                const phone =
                    document.getElementById(
                        "registerPhone"
                    );


                const password =
                    document.getElementById(
                        "registerPassword"
                    );


                const confirmPassword =
                    document.getElementById(
                        "registerConfirmPassword"
                    );


                const terms =
                    document.getElementById(
                        "registerTerms"
                    );


                if (
                    !name ||
                    !email ||
                    !password ||
                    !confirmPassword ||
                    !terms
                ) {
                    return;
                }



                /* =========================================
                   NAME
                ========================================== */

                if (!name.value.trim()) {

                    name.focus();

                    showFormMessage(
                        registerForm,
                        "Please enter your full name.",
                        "error"
                    );

                    return;

                }



                /* =========================================
                   EMAIL
                ========================================== */

                if (!email.value.trim()) {

                    email.focus();

                    showFormMessage(
                        registerForm,
                        "Please enter your email address.",
                        "error"
                    );

                    return;

                }


                if (!email.checkValidity()) {

                    email.focus();

                    showFormMessage(
                        registerForm,
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }



                /* =========================================
                   PASSWORD
                ========================================== */

                if (!password.value) {

                    password.focus();

                    showFormMessage(
                        registerForm,
                        "Please create a password.",
                        "error"
                    );

                    return;

                }


                if (password.value.length < 6) {

                    password.focus();

                    showFormMessage(
                        registerForm,
                        "Password must contain at least 6 characters.",
                        "error"
                    );

                    return;

                }



                /* =========================================
                   CONFIRM PASSWORD
                ========================================== */

                if (!confirmPassword.value) {

                    confirmPassword.focus();

                    showFormMessage(
                        registerForm,
                        "Please confirm your password.",
                        "error"
                    );

                    return;

                }


                if (
                    password.value !==
                    confirmPassword.value
                ) {

                    confirmPassword.focus();

                    showFormMessage(
                        registerForm,
                        "Passwords do not match.",
                        "error"
                    );

                    return;

                }



                /* =========================================
                   TERMS
                ========================================== */

                if (!terms.checked) {

                    terms.focus();

                    showFormMessage(
                        registerForm,
                        "Please agree to the Terms & Conditions and Privacy Policy.",
                        "error"
                    );

                    return;

                }



                /*
                 * Front-end demo only.
                 * Connect this form to your backend
                 * registration system later.
                 */

                showFormMessage(
                    registerForm,
                    "Your account form has been submitted successfully.",
                    "success"
                );

            }
        );

    }



    /* =====================================================
       SOCIAL LOGIN / REGISTER BUTTONS
    ====================================================== */

    const socialButtons =
        document.querySelectorAll(
            ".login-social-button, .register-social-button"
        );


    socialButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const buttonName =
                    button.querySelector("span");


                const provider =
                    buttonName
                        ? buttonName.textContent.trim()
                        : "social account";


                const form =
                    button.closest("form");


                if (form) {

                    showFormMessage(
                        form,
                        "Continue with " +
                        provider +
                        " will be connected to your authentication service.",
                        "success"
                    );

                }

            }
        );

    });



    /* =====================================================
       FORGOT PASSWORD
    ====================================================== */

    const forgotPassword =
        document.getElementById(
            "loginForgotPassword"
        );


    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "loginEmail"
                    );


                if (email && email.value.trim()) {

                    showFormMessage(
                        loginForm,
                        "Password reset instructions can be sent to your email.",
                        "success"
                    );

                } else {

                    if (email) {
                        email.focus();
                    }


                    showFormMessage(
                        loginForm,
                        "Enter your email address first.",
                        "error"
                    );

                }

            }
        );

    }

});














/* =========================================================
   SCROLL TO TOP
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const scrollTopBtn = document.getElementById("scrollTopBtn");

    if (!scrollTopBtn) return;

    function toggleScrollTopButton() {

        if (window.scrollY > 400) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

    }

    window.addEventListener("scroll", toggleScrollTopButton);

    scrollTopBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

    toggleScrollTopButton();

});