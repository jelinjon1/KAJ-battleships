document.addEventListener("DOMContentLoaded", function () {
    const fullscreenDiv = document.getElementById("fullscreen-wrapper");

    function openFullscreen() {
        if (fullscreenDiv.requestFullscreen) {
            fullscreenDiv.requestFullscreen();
        } else if (fullscreenDiv.mozRequestFullScreen) {
            // Firefox
            fullscreenDiv.mozRequestFullScreen();
        } else if (fullscreenDiv.webkitRequestFullscreen) {
            // Chrome, Safari, Opera
            fullscreenDiv.webkitRequestFullscreen();
        } else if (fullscreenDiv.msRequestFullscreen) {
            // IE/Edge
            fullscreenDiv.msRequestFullscreen();
        }
    }

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            openFullscreen();
        }
    });

    document.addEventListener("fullscreenchange", function () {
        if (!document.fullscreenElement) {
            console.log("Exited fullscreen mode.");
        }
    });

    document.addEventListener("mozfullscreenchange", function () {
        if (!document.mozFullScreenElement) {
            console.log("Exited fullscreen mode.");
        }
    });

    document.addEventListener("webkitfullscreenchange", function () {
        if (!document.webkitFullscreenElement) {
            console.log("Exited fullscreen mode.");
        }
    });

    document.addEventListener("msfullscreenchange", function () {
        if (!document.msFullscreenElement) {
            console.log("Exited fullscreen mode.");
        }
    });
});
