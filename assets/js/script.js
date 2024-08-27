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
