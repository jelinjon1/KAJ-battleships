// const guideOpenButton = document.querySelector(".guide-open");
// const guideCloseButton = document.querySelector(".guide-close");

// let guideVisible = false;

// // Shows the modal window that includes a guide to the game
// function showGuide() {
//     guideVisible = !guideVisible;
//     if (guideVisible) {
//         document.body.classList.add("guide-visible");
//     } else {
//         document.body.classList.remove("guide-visible");
//         // Go back in history
//         // history.back();
//     }
// }

// // Event listener for the guide open button
// guideOpenButton.addEventListener("click", showGuide);

// // Event listener for the guide close button
// guideCloseButton.addEventListener("click", showGuide);

// // Event listener for the browser back button
// window.addEventListener("popstate", function (event) {
//     if (event.state && event.state.guideVisible) {
//         document.body.classList.add("guide-visible");
//         guideVisible = true;
//     } else {
//         document.body.classList.remove("guide-visible");
//         guideVisible = false;
//     }
// });
