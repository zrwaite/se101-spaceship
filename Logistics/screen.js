// Animation handling, Drawing, and Parallax

import Ship from "../Sandbox/Scripts/Ship/ColonyShip";

// SOME GLOBAL VARIABLES are below:

let frame = 0; // Game animation frame.
let paused = false; // Game can be paused.
let fpsInterval = 1000 / 60; // frame rate in ms.
let unit = window.innerWidth / 25; // screen unit.


// DRAWING FUNCTIONS are below:

// The canvas names are:
/*
MissileCanvas
ObjectCanvas
ThrusterCanvas
ShipCanvas
ItemCanvas
*/

function clearCanvas(canvasName) { // clears contexts
    ctx[index].clearRect(coor[0] - unit / 20, coor[1] - unit / 20, unit * 1.1, unit * 1.1);
}

// draw things on to the screen

// inputs:
/*object {
    canvas: "ShipCanvas", // canvas ID
    size: [1, 1], // size, in units
    location: [0, 0]. // coordinates in the world
}
*/
let testShip = new Ship();

function drawOnScreen(object, clear = false) {
    if (!clear) { // draw the given shape

    } else { // clear where they are

    }
}

class Element {
    constructor (type, coordinates, size) {

    }
}


// ANIMATION LOOP is below:

window.onload = function () {
    // any images that need to be loaded first (*cough cough* the ship) can be drawn for the first time here.
    startAnimating();
}

let frameCount = 0;
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

            
            drawOnScreen(testShip);

            console.log("Frame: " + frame);
        }
    }
}
