function toggleList(sectionId, hiddenId) {
    var hiddenLinks = document.getElementById(hiddenId);
    var button = document.querySelector("#" + sectionId + " .show-more");

    if (!hiddenLinks) return;

    if (hiddenLinks.classList.contains("expanded")) {
        hiddenLinks.style.overflow = "hidden";
        hiddenLinks.style.maxHeight = hiddenLinks.scrollHeight + "px";
        hiddenLinks.offsetHeight;
        hiddenLinks.style.maxHeight = "0";
        hiddenLinks.classList.remove("expanded");
        button.textContent = "Show";
    } else {
        hiddenLinks.style.maxHeight = hiddenLinks.scrollHeight + "px";
        hiddenLinks.classList.add("expanded");
        hiddenLinks.addEventListener("transitionend", function handler() {
            if (hiddenLinks.classList.contains("expanded")) {
                hiddenLinks.style.maxHeight = "none";
            }
            hiddenLinks.removeEventListener("transitionend", handler);
        });
        button.textContent = "Hide";
    }
}

document.getElementById('menu-icon').onclick = function() {
    document.getElementById('nav-links').classList.toggle('show-menu');
};

/* Apply high contrast styles for older screens */
function applyHighContrastIfNeeded() {
    var colorDepth = window.screen.colorDepth || 24;
    var lowResolution = (window.screen.width < 1280 || window.screen.height < 720);
    var lowColorDepth = (colorDepth < 24);

    if (lowResolution || lowColorDepth) {
        document.body.classList.add('high-contrast');
    }
}

applyHighContrastIfNeeded();