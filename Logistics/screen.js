// Animation handling, Drawing, and Parallax

//import Ship from "../Sandbox/Scripts/Ship/ColonyShip";
// cannot use import statement outside of module....

// SOME GLOBAL VARIABLES are below:

let frame = 0; // Game animation frame.
let paused = false; // Game can be paused.
let fpsInterval = 1000 / 60; // frame rate in ms.
let screenSize = [window.innerWidth * 2, window.innerHeight * 2];
let screenUnit = window.innerWidth / 25; // screen unit.


// DRAWING FUNCTIONS are below:

// The canvas names are:
/*
    MissileCanvas
    ObjectCanvas
    ThrusterCanvas
    ShipCanvas
    ItemCanvas
*/

// Initialize the canvases.
let contexts = {
    MissileCanvas: document.body.querySelector("#MissileCanvas").getContext('2d'),
    ObjectCanvas: document.body.querySelector("#ObjectCanvas").getContext('2d'),
    ThrusterCanvas: document.body.querySelector("#ThrusterCanvas").getContext('2d'),
    ShipCanvas: document.body.querySelector("#ShipCanvas").getContext('2d'),
    ItemCanvas: document.body.querySelector("#ItemCanvas").getContext('2d')
}

// Function for clearing a context!
function clearContext(canvasName) {
    contexts[canvasName].clearRect(0, 0, screenSize[0], screenSize[1]);
}

// let testShip = new Ship(); // issues from importing

/*
NEXT TASK IN FUTURE:::::

Extend the Ship class so it has a method
that draws itself on the screen in the correct orientation.
*/

let shipImageDefault = new Image();
shipImageDefault.src = "Sandbox/Sprites/ShipSprites/ColonyShip.png";
console.log(shipImageDefault);
console.log(contexts["ShipCanvas"]);

function drawOnScreen(item, clear = false) {
    if (!clear) { // draw the given shape
        contexts["ShipCanvas"].drawImage(shipImageDefault, 0, 0, item.width, item.height);
    } else { // clear the context, only where the item is...

    }
}


// ANIMATION LOOP is below:

window.onload = function () {
    // any images that need to be loaded first (*cough cough* the ship) can be drawn for the first time here.
    startAnimating();
}

let startTime, now, then, elapsed;

function startAnimating() {
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    // draw next frame
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        if (!paused) {
            frame++;
            
            // run the game here!!!!!

            clearContext("ShipCanvas");
            //drawOnScreen(testShip); // issues from importing
            drawOnScreen({width: 66, height: 50});

            console.log("Frame: " + frame);
        }
    }
}
