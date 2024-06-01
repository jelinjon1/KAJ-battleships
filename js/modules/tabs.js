const guideOpenButton = document.querySelector(".guide-open");
const guideCloseButton = document.querySelector(".guide-close");
const guideTab = document.querySelector("#guide-tab-button");
const aboutTab = document.querySelector("#about-tab-button");
const leaderboardTab = document.querySelector("#leaderboard-tab-button");
const leaderboardTable = document.querySelector("#leaderboard-table");

let guideVisible = false;

function renderResults() {
    const results = JSON.parse(localStorage.getItem("gameResults")) || [];

    leaderboardTable.innerHTML = "";
    leaderboardTable.innerHTML += `<tr><th>Player</th><th>Time</th></tr>`;
    results.forEach((result) => {
        console.log(
            `Player: ${result.player}, time: ${result.time}, Date: ${result.date}`
        );
        leaderboardTable.innerHTML += `<tr><td>${result.player}</td><td>${result.time}</td></tr>`;
    });
}

// Function to handle opening tabs
function openTab(target, tabName, pushState = true) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";

    const linkName = `${tabName.toLocaleLowerCase()}-tab-button`;
    document.getElementById(linkName).className += " active";

    if (pushState) {
        // Push state to history
        history.pushState(
            { guideVisible: true, tab: tabName },
            `Tab: ${tabName}`,
            `#${tabName}`
        );
    }

    if (tabName == "Leaderboard") {
        renderResults();
    }
}

// Shows the modal window that includes a guide to the game
function showGuide() {
    guideVisible = !guideVisible;
    if (guideVisible) {
        document.body.classList.add("guide-visible");
        openTab(guideTab, "Guide", true);
    } else {
        document.body.classList.remove("guide-visible");
        // history.replaceState(null, "", "/");
        history.pushState(null, "", "/");
    }
}

guideOpenButton.addEventListener("click", showGuide);
guideCloseButton.addEventListener("click", showGuide);
guideTab.addEventListener("click", (e) => openTab(e, "Guide"));
aboutTab.addEventListener("click", (e) => openTab(e, "About"));
leaderboardTab.addEventListener("click", (e) => openTab(e, "Leaderboard"));

// Event listener for the browser back button
window.addEventListener("popstate", function (event) {
    if (event.state) {
        if (event.state.guideVisible) {
            document.body.classList.add("guide-visible");
            guideVisible = true;
            if (event.state.tab) {
                const fakeEvent = {
                    currentTarget: document.querySelector(
                        `#${event.state.tab.toLowerCase()}-tab-button`
                    ),
                };
                openTab(fakeEvent.currentTarget, event.state.tab, false);
            }
        } else {
            document.body.classList.remove("guide-visible");
            guideVisible = false;
        }
    } else {
        document.body.classList.remove("guide-visible");
        guideVisible = false;
    }
});

// Initial load handling
window.addEventListener("load", (e) => {
    if (location.hash === "#Guide") {
        showGuide();
    } else if (
        location.hash.startsWith("#Guide") ||
        location.hash.startsWith("#About")
    ) {
        const tab = location.hash.substring(1);
        showGuide();
        const fakeEvent = {
            currentTarget: document.querySelector(
                `#${tab.toLowerCase()}-tab-button`
            ),
        };
        console.log(tab.toLocaleLowerCase);
        openTab(fakeEvent.currentTarget, tab, false);
    } else {
        openTab(e, "Guide", false); // Default tab
    }
});
