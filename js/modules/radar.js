const svg = document.getElementById("svg");

// generates a random number within a range
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// creates a dot within the circle
function createDot() {
    const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );

    const angle = Math.random() * 2 * Math.PI; // angle in rad
    const distance = Math.sqrt(Math.random()) * 60; // dist from center
    const x = distance * Math.cos(angle);
    const y = distance * Math.sin(angle);

    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "2");
    circle.setAttribute("fill", "white");

    //add to parent elem
    svg.appendChild(circle);

    //remove circle after delay, from creation
    setTimeout(() => {
        svg.removeChild(circle);
    }, 1000);
}

// generates dots at random intervals
function generateDots() {
    createDot();

    //call recursively after rand interval
    setTimeout(generateDots, randomInRange(1000, 3000));
}

generateDots();
