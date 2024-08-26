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