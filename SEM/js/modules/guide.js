const guideOpenButton = document.querySelector(".guide-open");
const guideCloseButton = document.querySelector(".guide-close");

let guideVisible = false;

// Shows the modal window that includes a guide to the game
function showGuide() {
    guideVisible = !guideVisible;
    if (guideVisible) {
        document.body.classList.add("guide-visible");
    } else {
        document.body.classList.remove("guide-visible");
    }
}

guideOpenButton.addEventListener("click", showGuide);
guideCloseButton.addEventListener("click", showGuide);
