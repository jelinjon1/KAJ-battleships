const svg = document.getElementById("svg");

// Function to generate a random number within a range
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Function to create a dot within the circle
function createDot() {
    const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
    );

    const angle = Math.random() * 2 * Math.PI; // angle in rad
    const distance = Math.sqrt(Math.random()) * 60; // dist from center
    const x = distance * Math.cos(angle);
    const y = distance * Math.sin(angle);

    //set coords
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);

    //set radius and fill
    circle.setAttribute("r", "2");
    circle.setAttribute("fill", "white");

    //add to parent elem
    svg.appendChild(circle);

    // Remove circle after delay, from creation
    setTimeout(() => {
        svg.removeChild(circle);
    }, 1000);
}

// Function to generate dots at random intervals
function generateDots() {
    // create dot
    createDot();

    // schedule recursive call after random delay
    setTimeout(generateDots, randomInRange(1000, 3000));
}

// start generating
generateDots();
