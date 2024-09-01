function toggleBlogList() {
    var hiddenLinks = document.getElementById("blog-hidden-links");
    var button = document.querySelector("#blogs .show-more");

    if (hiddenLinks.classList.contains("expanded")) {
        hiddenLinks.classList.remove("expanded");
        button.textContent = "See more...";
    } else {
        hiddenLinks.classList.add("expanded");
        button.textContent = "See less...";
    }
}

function toggleProjectList() {
    var hiddenLinks = document.getElementById("project-hidden-links");
    var button = document.querySelector("#projects .show-more");

    if (hiddenLinks.classList.contains("expanded")) {
        hiddenLinks.classList.remove("expanded");
        button.textContent = "See more...";
    } else {
        hiddenLinks.classList.add("expanded");
        button.textContent = "See less...";
    }
}

function togglePublicationList() {
    var hiddenLinks = document.getElementById("publication-hidden-links");
    var button = document.querySelector("#publication .show-more");

    if (hiddenLinks.classList.contains("expanded")) {
        hiddenLinks.classList.remove("expanded");
        button.textContent = "See more...";
    } else {
        hiddenLinks.classList.add("expanded");
        button.textContent = "See less...";
    }
}

// Toggle the navigation menu
document.getElementById('menu-icon').onclick = function() {
    var navLinks = document.getElementById('nav-links');
    if (navLinks.classList.contains('show-menu')) {
        navLinks.classList.remove('show-menu');
    } else {
        navLinks.classList.add('show-menu');
    }
};

/* Script to manage contrast for older monitors */
function applyHighContrastIfNeeded() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const pixelDensity = window.devicePixelRatio || 1;
    const colorDepth = window.screen.colorDepth || 24; // Usually 24 or 32 bits

    // Conditions to identify older screens
    const lowResolution = (screenWidth < 1280 || screenHeight < 720); 
    const lowPixelDensity = (pixelDensity < 1.5); 
    const lowColorDepth = (colorDepth < 24);

    if (lowResolution || lowPixelDensity || lowColorDepth) {
        document.body.classList.add('high-contrast'); // Add a class to apply high contrast styles
    }
}

applyHighContrastIfNeeded();