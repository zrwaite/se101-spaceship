import Game from "./game.js";

let game; // YEET

const gameSize = {
	x: 32,
	y: 24
}
const unit = (window.innerWidth / window.innerHeight > gameSize.x / gameSize.y) ? Math.floor(window.innerHeight / 4 * gameSize.y) * 4 : Math.floor(window.innerWidth / 4 * gameSize.x) * 4;

// Initialize the CSS variables so that the css can do dynamic calculations for displays.
document.body.style.setProperty("--unit", unit + "px");
document.body.style.setProperty("--width", gameSize.x * unit + "px");
document.body.style.setProperty("--height", gameSize.y * unit + "px");

let spritePath = "Sandbox/Sprites/";
let imagesLoaded = 0; // Updates as the images load, until all are loaded.
let images = {}; // image locations, by name
let contexts = {}; // contexts, by name

function initializeImages(imageInfo) {
    /* Create the images with the given info: [imageName, src]. */
    for (let i = 0; i < imageInfo.length; i++) {
        let image = new Image();
        image.src = spritePath + imageInfo[i][1];
        image.onload = () => iterateLoad(imageInfo.length);
        images[imageInfo[i][0]] = image;
    }
}

function initializeContexts(contextNames) {
    /* Create the contexts with the given names: first name is farthest back. */
    for (let i = 0; i < contextNames.length; i++) {
        let canvas = document.createElement("CANVAS");
        canvas.id = contextNames[i];
        canvas.width = unit * gameSize.x;
        canvas.height = unit * gameSize.y;
        document.body.querySelector(".canvasHolder").appendChild(canvas);
        let ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        
        contexts[contextNames[i]] = ctx;
    }
}

function iterateLoad(length) {
    imagesLoaded++;
    if (imagesLoaded >= length) {

        // **** This begins the whole game! *** //

        initializeGame();

    }
}

function initializeGame() {
    contexts["background"].drawImage(images["background"], 0, 0, gameSize.x * unit, gameSize.y * unit);
    game = new Game(gameSize.x, gameSize.y, images, contexts);
    startAnimating();
}

initializeContexts([
    "background", // static background
    "missiles",
    "objects",
    "thrusters",
    "ships",
    "items"
]);

initializeImages([
    ["background", "SpaceObjects/Space.png"],
    ["ship", "ShipSprites/ColonyShip.png"],
    ["thruster", "ShipSprites/ThrusterNozzle.png"],
    ["thrusterFlame", "ShipSprites/ThrusterFlame.png"],
    ["turret", "ShipSprites/TurretSprite.png"],
    ["planet1", "SpaceObjects/CreamVioletPlanet.png"],
    ["planet2", "SpaceObjects/CyanPlanet.png"],
    ["planet3", "SpaceObjects/CyanPlanet1.png"],
    ["planet4", "SpaceObjects/DarkPlanet.png"],
    ["planet5", "SpaceObjects/EarthLikePlanet.png"],
    ["planet6", "SpaceObjects/FrostPlanet.png"],
    ["planet7", "SpaceObjects/IcePlanet.png"],
    ["planet8", "SpaceObjects/OrangePlanet.png"],
    ["planet9", "SpaceObjects/PurplePlanet.png"],
    ["planet10", "SpaceObjects/RedLinesPlanet.png"],
    ["planet11", "SpaceObjects/RedPlanet1.png"],
    ["planet12", "SpaceObjects/RedPlanetSputnik.png"],
    ["planet13", "SpaceObjects/SandPlanet.png"],
    ["planet14", "SpaceObjects/StormPlanet.png"]
]);

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
    if (elapsed > game.fpsInterval) {
        then = now - (elapsed % game.fpsInterval);
        if (!game.paused) {
            game.update();
            game.draw();
        }
    }
}

// The below initialization will disappear as soon as I make a system to store the ships.
/*let testShip = new TestShip();
testShip.linearVelocity.x = 0.07;
let testShip2 = new TestShip();
testShip2.angularPosition = Math.PI * 3 / 2;
testShip2.linearPosition.y = 15;
testShip2.linearVelocity.y = -0.12;
let testShip3 = new TestShip();
testShip3.angularPosition = Math.PI / 4;
testShip3.linearPosition.x = 15;
testShip3.linearVelocity = {x: 0.034, y: 0.034};*/