export function saveGameResult(playerName, time) {
    const gameResult = {
        player: playerName,
        time: time, // time in ms
        date: new Date().toISOString(),
    };

    // Get existing results from localStorage
    let results = JSON.parse(localStorage.getItem("gameResults")) || [];

    // Add new result to the array
    results.push(gameResult);

    // Save updated results back to localStorage
    localStorage.setItem("gameResults", JSON.stringify(results));
}

function getGameResults() {
    const results = JSON.parse(localStorage.getItem("gameResults")) || [];
    return results;
}

export function displayGameResults() {
    const results = getGameResults();

    results.forEach((result) => {
        console.log(
            `Player: ${result.player}, time: ${result.time}, Date: ${result.date}`
        );
    });
}
