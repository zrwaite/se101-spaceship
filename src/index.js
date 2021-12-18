import Game from "./game.js";

let game; // Initialized properly in DOM.doneLoad().

const windowSize = { // Accessable through game.width and game.height.
	x: 72,
	y: 54,
    border: 2
}
const unit = ((window.innerWidth - windowSize.border * 2) / (window.innerHeight - windowSize.border * 2) > windowSize.x / windowSize.y) ? Math.floor((window.innerHeight - windowSize.border * 2) / windowSize.y) : Math.floor((window.innerWidth - windowSize.border * 2) / windowSize.x);

// Initialize the CSS variables so that the css can do dynamic calculations for displays.
document.body.style.setProperty("--unit", unit + "px");
document.body.style.setProperty("--border", windowSize.border + "px");
document.body.style.setProperty("--width", windowSize.x + "");
document.body.style.setProperty("--height", windowSize.y + "");

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
        canvas.width = unit * windowSize.x;
        canvas.height = unit * windowSize.y;
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

        DOM.doneLoad();

    }
}

initializeContexts([
    "background", // static background
    "planets", // only drawn once if game.zoom == 1
    "missiles",
    "objects",
    "thrusters",
    "ships",
    "items"
]);

initializeImages([
    //["titleBackground", "UIImages/TitleBackground.png"],
    ["background", "SpaceObjects/Space.png"],
    ["ship", "ShipSprites/ColonyShip.png"],
    ["thruster", "ShipSprites/ThrusterNozzle.png"],
    ["thrusterFlame", "ShipSprites/ThrusterFlame.png"],
    ["turret", "ShipSprites/TurretSprite.png"],
    ["asteroid", "SpaceObjects/SpaceMeteors001.png"],
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
    ["planet14", "SpaceObjects/StormPlanet.png"],
    ["warpgate", "SpaceObjects/WhiteDwarfStar.png"],
    ["torpedo", "SpaceObjects/SpaceMissiles040.png"],
    ["explosion0", "Explosions/regularExplosion00.png"],
    ["explosion1", "Explosions/regularExplosion01.png"],
    ["explosion2", "Explosions/regularExplosion02.png"],
    ["explosion3", "Explosions/regularExplosion03.png"],
    ["explosion4", "Explosions/regularExplosion04.png"],
    ["explosion5", "Explosions/regularExplosion05.png"],
    ["explosion6", "Explosions/regularExplosion06.png"],
    ["explosion7", "Explosions/regularExplosion07.png"],
    ["explosion8", "Explosions/regularExplosion08.png"]
]);

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            e.code === 22 ||
            e.code === 1014 ||
            e.name === 'QuotaExceededError' ||
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
        ) && (storage && storage.length !== 0);
    }
}



// localStorage.setItem('data', JSON.stringify(DOM.data));
// DOM.data = JSON.parse(localStorage.getItem('data'));


let DOM = {
    loaded: false,
    gameInitialized: false,
    canStore: false,
    data: {
        "veryFirst": true, // NOT CHANGED BY USER: Haven't ever pressed play on the game before...
        "skipMenu": false, // `true`: skip menu; get right in to the game!
        "focusShip": "Bebop", // Ship the camera follows
        "devDefault": false, // The default toggle state of the dev window when starting to play
        "defaultGalaxy": 0, // Galaxy index default
        "manualControls": true, // Use manual controls, not student-programmed systems
        "zoom": 1 // zoom aspect ratio (1 vs 2.5)
    },
    elements: {
        "TitleStart": document.querySelector("#Title .start"), // `Start` button on first title screen
        "TItleWarning": document.querySelector("#Title .warning"), // Storage warning on the title screen
        "checkboxes": document.querySelectorAll("input[type='checkbox']"), // An array of the checkboxes
        "galaxy1": document.querySelector("#galaxy1"), // First galaxy (the only one that can be clicked atm)
    },
    menus: {
        "Title": document.querySelector("#Title"), // Very first title screen
        "Main": document.querySelector("#Main"), // Main ship, galaxy, and preference selection page
        "Pause": document.querySelector("#Title"), // Pause menu :)
    },
    initialize() {
        this.elements["TitleStart"].onclick = function() {DOM.newMenu("Main");}
        // WILL EVENTUALLY WRITE A FOR LOOP to initialize all the galaxy buttons, like below
        this.elements["galaxy1"].onclick = function() {
            if (DOM.data["defaultGalaxy"] !== 0) {
                DOM.data["defaultGalaxy"] = 0;
                DOM.save();
            }
            DOM.startGame(0);
        }
        setTimeout(function () {
            document.querySelectorAll(".menu").forEach(function (menu) {
                menu.style["transition-duration"] = "0.3s";
                menu.style["-o-transition-duration"] = "0.3s";
                menu.style["-moz-transition-duration"] = "0.3s";
                menu.style["-webkit-transition-duration"] = "0.3s";
            });
        }, 0);
        for (let i = 0; i < this.elements["checkboxes"].length; i++) {
            this.elements["checkboxes"][i].onclick = function() {
                DOM.updatePreference(this.id, this.checked);
            }
        }


        if (storageAvailable("localStorage")) {
            this.canStore = true;
            let possibleData = localStorage.getItem('data');
            if (possibleData) {
                console.log("Updating current choices based on your saved data...");
                this.data = JSON.parse(possibleData);

                // update everything about the game based on these stored values

                if (!this.data["veryFirst"]) {
                    let boxes = this.elements["checkboxes"];
                    for (let i = 0; i < boxes.length; i++) {
                        if (boxes[i].id !== "zoom") boxes[i].checked = this.data[boxes[i].id];
                        else boxes[i].checked = (this.data[boxes[i].id] == 1) ? false : true;
                    }
                    if (this.data["skipMenu"]) {
                        this.newMenu();
                        this.startGame(this.data["defaultGalaxy"]);
                    } else {
                        this.newMenu("Main");
                    }
                    return;
                }
            }
            console.log("This is your first time playing Intergalactic Adventures!");
            this.newMenu("Title");
            setTimeout(function() {DOM.save();}, 0);
        } else {
            console.log("Your browser doesn't support localStorage.");
            this.newMenu("Title");
            this.elements["TitleWarning"].classList.add("on");
        }
    },
    newMenu: function(menu) {
        for (const key in this.menus) this.menus[key].classList.remove("on");
        if (menu) this.menus[menu].classList.add("on");
    },
    save: function() {
        localStorage.setItem('data', JSON.stringify(this.data));
    },
    updatePreference: function(type, value) {
        if (type == "zoom") this.data[type] = (value) ? 2.5 : 1;
        else this.data[type] = value;
        this.save();
    },
    doneLoad: function() {
        contexts["background"].drawImage(images["background"], 0, 0, windowSize.x * unit, windowSize.y * unit);
        game = new Game(windowSize.x, windowSize.y, images, contexts);
        game.unit = unit;
        this.loaded = true;
        DOM.initialize();
    },
    startGame: function(galaxy = 0) {
        if (this.loaded && !this.gameInitialized) {

            // USE GALAXY TO START THE ACTUAL RIGHT GALAXY
            game.zoom = this.data["zoom"];
            game.start("test", 1, "bebop");
            startAnimating();
            this.newMenu();
            this.gameInitialized = true;
            if (this.data["veryFirst"]) {
                this.data["veryFirst"] = false;
                this.save();
            }
        }
    }
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
    if (elapsed > game.fpsInterval) {
        then = now - (elapsed % game.fpsInterval);
        if (!game.paused) {
            game.update();
            game.draw();
        }
    }
}
