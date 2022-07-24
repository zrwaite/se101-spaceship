import Game from './game.js';
let game; // Initialized properly in DOM.doneLoad().
const windowSize = {
    // Accessible through game.width and game.height.
    x: 72,
    y: 54,
    border: 2,
};
const unit = (window.innerWidth - windowSize.border * 2) / (window.innerHeight - windowSize.border * 2) > windowSize.x / windowSize.y
    ? Math.floor((window.innerHeight - windowSize.border * 2) / windowSize.y)
    : Math.floor((window.innerWidth - windowSize.border * 2) / windowSize.x);
// Initialize the CSS variables so that the css can do dynamic calculations for displays.
document.body.style.setProperty('--unit', unit + 'px');
document.body.style.setProperty('--border', windowSize.border + 'px');
document.body.style.setProperty('--width', windowSize.x + '');
document.body.style.setProperty('--height', windowSize.y + '');
const spritePath = 'assets/images/';
const images = {}; // image locations, by name
const contexts = {}; // contexts, by name
const galaxies = ['test', 'Alpha', 'Beta', 'Gamma'];
const ships = [
    'Bebop',
    'Bismark',
    'Enterprise',
    'Event Horizon',
    'Flying Dutchman',
    'Galactica',
    'Milano',
    'Normandy',
    'Nostromo',
    'Pillar Of Autumn',
    'Planet Express',
    'Rama',
    'Red Dwarf',
    'Serenity',
    'ssAnne',
    'Thunderbird III',
    'Yamato',
];
const imageSrcs = [
    //["titleBackground", "UIImages/TitleBackground.png"],
    ['background', 'SpaceObjects/Space.png'],
    ['ship', 'ShipSprites/ColonyShip.png'],
    ['thruster', 'ShipSprites/ThrusterNozzle.png'],
    ['thrusterFlame', 'ShipSprites/ThrusterFlame.png'],
    ['turret', 'ShipSprites/TurretSprite.png'],
    ['asteroid', 'SpaceObjects/SpaceMeteors001.png'],
    ['planet1', 'SpaceObjects/CreamVioletPlanet.png'],
    ['planet2', 'SpaceObjects/CyanPlanet.png'],
    ['planet3', 'SpaceObjects/CyanPlanet1.png'],
    ['planet4', 'SpaceObjects/DarkPlanet.png'],
    ['planet5', 'SpaceObjects/EarthLikePlanet.png'],
    ['planet6', 'SpaceObjects/FrostPlanet.png'],
    ['planet7', 'SpaceObjects/IcePlanet.png'],
    ['planet8', 'SpaceObjects/OrangePlanet.png'],
    ['planet9', 'SpaceObjects/PurplePlanet.png'],
    ['planet10', 'SpaceObjects/RedLinesPlanet.png'],
    ['planet11', 'SpaceObjects/RedPlanet1.png'],
    ['planet12', 'SpaceObjects/RedPlanetSputnik.png'],
    ['planet13', 'SpaceObjects/SandPlanet.png'],
    ['planet14', 'SpaceObjects/StormPlanet.png'],
    ['warpgate', 'SpaceObjects/WhiteDwarfStar.png'],
    ['torpedo', 'SpaceObjects/SpaceMissiles040.png'],
    ['explosion0', 'Explosions/regularExplosion00.png'],
    ['explosion1', 'Explosions/regularExplosion01.png'],
    ['explosion2', 'Explosions/regularExplosion02.png'],
    ['explosion3', 'Explosions/regularExplosion03.png'],
    ['explosion4', 'Explosions/regularExplosion04.png'],
    ['explosion5', 'Explosions/regularExplosion05.png'],
    ['explosion6', 'Explosions/regularExplosion06.png'],
    ['explosion7', 'Explosions/regularExplosion07.png'],
    ['explosion8', 'Explosions/regularExplosion08.png'],
];
let imagesLoaded = 0; // Updates as the images load, until all are loaded.
function initializeImages(imageInfo) {
    /* Create the images with the given info: [imageName, src]. */
    for (let i = 0; i < imageInfo.length; i++) {
        let image = new Image();
        image.src = spritePath + imageInfo[i][1];
        image.onload = () => iterateLoad(imageInfo.length);
        images[imageInfo[i][0]] = image;
    }
}
function initializeShipSelect(shipNames, active) {
    /* Create the ship DOM elements with the given names, in alphabetical order. */
    let activeShipSet = false;
    let firstShip;
    for (let i = 0; i < shipNames.length; i++) {
        let ship = document.createElement('FIGURE');
        ship.id = shipNames[i];
        ship.innerHTML = shipNames[i];
        ship.onclick = (event) => {
            DOM.shipActive(event.target);
        };
        if (shipNames[i].length >= 12)
            ship.classList.add('small');
        if (shipNames[i] === active) {
            ship.classList.add('active');
            activeShipSet = true;
        }
        let ShipSelectElement = document.body.querySelector('#ShipSelect');
        if (ShipSelectElement)
            ShipSelectElement.appendChild(ship);
        else
            throw Error('Element ShipSelect not found');
        if (i === 0)
            firstShip = ship;
    }
    if (!activeShipSet) {
        if (firstShip)
            firstShip.classList.add('active');
        else
            throw Error('firstShip not found');
    }
}
function initializeContexts(contextNames) {
    /* Create the contexts with the given names: first name is the farthest back. */
    for (let i = 0; i < contextNames.length; i++) {
        let canvas = document.createElement('CANVAS');
        canvas.id = contextNames[i];
        canvas.width = unit * windowSize.x;
        canvas.height = unit * windowSize.y;
        let canvasHolderElement = document.body.querySelector('.canvasHolder');
        if (canvasHolderElement)
            canvasHolderElement.appendChild(canvas);
        else
            throw Error('Element canvasHolder not found');
        let ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.imageSmoothingEnabled = false;
            contexts[contextNames[i]] = ctx;
        }
        else
            throw Error('Failed to create context');
    }
}
function iterateLoad(length) {
    imagesLoaded++;
    if (imagesLoaded >= length) {
        // **** This begins the whole system! *** //
        DOM.doneLoad();
    }
}
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage && storage.length !== 0;
    }
}
// localStorage.setItem('data', JSON.stringify(DOM.data));
// DOM.data = JSON.parse(localStorage.getItem('data'));
let DOM = {
    loaded: false,
    gameInitialized: false,
    canStore: false,
    data: {
        veryFirst: true,
        skipMenu: false,
        defaultShip: 'Bebop',
        devDisplay: true,
        defaultGalaxy: 0,
        manualControls: true,
        allShips: false,
        zoom: 1, // zoom aspect ratio (1 vs 2.5)
    },
    elements: {
        TitleStart: document.querySelector('#Title .start'),
        TitleWarning: document.querySelector('#Title .warning'),
        checkboxes: document.querySelectorAll("input[type='checkbox']"),
        Info: document.querySelector('#Info'),
        PauseButton: document.querySelector('#PauseButton'),
        GalaxyName: document.querySelector('#GalaxyName'),
        SolarSystemName: document.querySelector('#SolarSystemName'),
        DevTools: document.querySelector('#DevTools'),
        ShipSelect: document.querySelector('#ShipSelect'),
        SolarFade: document.querySelector('#SolarFade'),
        galaxy1: document.querySelector('#galaxy1'),
        galaxy2: document.querySelector('#galaxy2'),
        galaxy3: document.querySelector('#galaxy3'),
        galaxy4: document.querySelector('#galaxy4'),
        EndMainMenu: document.querySelector('#EndScreen button.top'),
        EndRetry: document.querySelector('#EndScreen button.middle'),
        EndNextGalaxy: document.querySelector('#EndScreen button.bottom'), // EndScreen Next Galaxy button
    },
    menus: {
        Title: document.querySelector('#Title'),
        Game: document.querySelector('#Game'),
        Main: document.querySelector('#Main'),
        EndScreen: document.querySelector('#EndScreen'), // On completion; acts like Level Complete menu
    },
    previousDamage: [0, 0],
    initialize() {
        // Event Listeners
        document.addEventListener('click', function (event) {
            let evTarget = event === null || event === void 0 ? void 0 : event.target;
            if ((evTarget === null || evTarget === void 0 ? void 0 : evTarget.tagName) !== 'FIGURE') {
                if (DOM.elements['ShipSelect'])
                    DOM.elements['ShipSelect'].classList.remove('open');
            }
        });
        this.elements['EndMainMenu'].onclick = () => {
            DOM.resetGame();
            DOM.newMenu('Main');
        };
        this.elements['EndRetry'].onclick = () => {
            var _a, _b;
            if (game) {
                let galaxyNumber = galaxies.indexOf((_b = (_a = game.galaxy) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'test');
                DOM.resetGame();
                DOM.startGame(galaxyNumber);
            }
            else
                throw Error('Game not defined');
        };
        this.elements['EndNextGalaxy'].onclick = () => {
            var _a, _b;
            if (game) {
                let nextGalaxyNumber = galaxies.indexOf((_b = (_a = game.galaxy) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'wontbeinthelist') + 1;
                if (nextGalaxyNumber > 3)
                    nextGalaxyNumber = 3;
                DOM.resetGame();
                DOM.startGame(nextGalaxyNumber);
            }
            else
                throw Error('Game not defined');
        };
        this.elements['TitleStart'].onclick = () => {
            DOM.newMenu('Main');
        };
        this.elements['PauseButton'].onclick = () => {
            if (game)
                game.paused = true;
            else
                throw Error('Game not defined');
            DOM.newMenu('Main');
        };
        this.elements['ShipSelect'].onclick = (event) => {
            DOM.elements['ShipSelect'].classList.toggle("open");
        };
        this.elements['Info'].onclick = () => {
            DOM.elements['Info'].classList.toggle("active");
            if (DOM.elements['Info'].classList.contains("active")) {
                DOM.elements['Info'].querySelector('button').innerHTML =
                    "<h3>&#x1F6C8; Info & Tips</h3>&emsp;&emsp;&emsp;Here we write a bit of information and tips the students could benefit from.<br>&emsp;&emsp;&emsp;To do with the UI, we'll mention stuff like how the local storage works, and for the game, we'll perhaps give some tips or troubleshooting advice.<br>&emsp;&emsp;&emsp;We'll link to the README.md and stuff, too.";
            }
            else {
                DOM.elements['Info'].querySelector('button').innerHTML = '&#x1F6C8; Info & Tips';
            }
        };
        let galaxyNames = ['galaxy1', 'galaxy2', 'galaxy3', 'galaxy4'];
        galaxyNames.forEach(function (name) {
            let galaxyElement = document.querySelector('#' + name + '>.quit');
            galaxyElement.onclick = function (event) {
                DOM.resetGame();
                galaxyElement.classList.add('hidden'); // used to be this.classList - was this a mistake?
                event.stopPropagation();
            };
        });
        // Set Data    
        for (let i = 0; i < 4; i++) {
            this.elements['galaxy' + (i + 1)].onclick = () => {
                if (DOM.data['defaultGalaxy'] !== i) {
                    DOM.data['defaultGalaxy'] = i;
                    DOM.save();
                }
                DOM.startGame(i);
                let galaxyElement = document.querySelector('#galaxy' + (i + 1) + '>.quit');
                if (galaxyElement)
                    galaxyElement.classList.remove('hidden');
                else
                    throw Error('Element ' + '#galaxy' + (i + 1) + '>.quit' + ' not found');
            };
        }
        setTimeout(() => {
            document.querySelectorAll('.menu').forEach(function (menu) {
                menu.style['transition-duration'] = '0.3s';
                menu.style['-o-transition-duration'] = '0.3s';
                menu.style['-moz-transition-duration'] = '0.3s';
                menu.style['-webkit-transition-duration'] = '0.3s';
            });
        }, 0);
        for (let i = 0; i < this.elements['checkboxes'].length; i++) {
            this.elements['checkboxes'][i].onclick = () => {
                DOM.updatePreference(this.id, this.checked);
            };
        }
        if (storageAvailable('localStorage')) {
            this.canStore = true;
            let possibleData = localStorage.getItem('data');
            if (possibleData) {
                console.log('Updating current choices based on your saved data...');
                this.data = JSON.parse(possibleData);
                // update everything about the game based on these stored values
                if (!this.data['veryFirst']) {
                    let boxes = this.elements['checkboxes'];
                    for (let i = 0; i < boxes.length; i++) {
                        if (boxes[i].id !== 'zoom')
                            boxes[i].checked = this.data[boxes[i].id];
                        else
                            boxes[i].checked = this.data[boxes[i].id] !== 1;
                    }
                    if (this.data['skipMenu']) {
                        this.newMenu();
                        this.startGame(this.data['defaultGalaxy']);
                    }
                    else {
                        this.newMenu('Main');
                    }
                    initializeShipSelect(ships, this.data['defaultShip']);
                    return; /* Don't forget that I DO return from this function early. */
                }
            }
            console.log('This is your first time playing Intergalactic Adventures!');
            this.newMenu('Title');
            setTimeout(() => {
                DOM.save();
            }, 0);
        }
        else {
            console.log("Your browser doesn't support localStorage.");
            this.newMenu('Title');
            this.elements['TitleWarning'].classList.add('on');
        }
        /* Initialize stuff in the UI */
        let boxes = this.elements['checkboxes'];
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].id !== 'zoom')
                boxes[i].checked = this.data[boxes[i].id];
            else
                boxes[i].checked = this.data[boxes[i].id] !== 1;
        }
        initializeShipSelect(ships, this.data['defaultShip']);
    },
    shipActive: function (ship) {
        if (ship.classList.contains('active') || !this.elements['ShipSelect'].classList.contains('open'))
            return;
        this.elements['ShipSelect'].querySelector('.active').classList.remove('active');
        ship.classList.add('active');
        this.updatePreference('defaultShip', ship.id);
    },
    newMenu: function (menu = 'Game') {
        for (const key in this.menus)
            this.menus[key].classList.remove('on');
        if (menu === 'Game') {
            if (this.data['devDisplay'])
                this.elements['DevTools'].style.display = 'block';
            else
                this.elements['DevTools'].style.display = 'none';
        }
        this.menus[menu].classList.add('on');
    },
    save: () => {
        localStorage.setItem('data', JSON.stringify(DOM.data));
    },
    updatePreference: function (type, value) {
        if (type === 'zoom')
            this.data[type] = value ? 2.5 : 1;
        else
            this.data[type] = value;
        this.save();
    },
    doneLoad: () => {
        contexts['background'].drawImage(images['background'], 0, 0, windowSize.x * unit, windowSize.y * unit);
        game = new Game(windowSize.x, windowSize.y, images, contexts, DOM.landSuccessful);
        game.unit = unit;
        DOM.loaded = true;
        DOM.initialize();
    },
    gameMenuTitle: function (galaxy, solarSystem) {
        this.elements['GalaxyName'].innerHTML = galaxy;
        this.elements['SolarSystemName'].innerHTML = solarSystem;
    },
    devToolsUpdate: () => {
        let entries = DOM.elements['DevTools'].querySelectorAll('tr:not(.title)>td');
        if (!game || !game.watchShip)
            throw Error('Game or game watchship undefined');
        entries[0].innerHTML = 'X: ' + Math.floor(game.watchShip.speed.x * 100) / 100;
        entries[1].innerHTML = 'Y: ' + Math.floor(game.watchShip.speed.y * 100) / 100;
        entries[2].innerHTML = 'X: ' + Math.floor(game.watchShip.pos.x * 10) / 10;
        entries[3].innerHTML = 'Y: ' + Math.floor(game.watchShip.pos.y * 10) / 10;
        let angle = Math.floor(game.watchShip.angle * 100) / 100;
        entries[4].innerHTML = '&theta;: ' + angle;
        entries[5].innerHTML = Math.floor(game.watchShip.energyUsed * 100) + ' J';
        if (DOM.previousDamage[0] != Math.floor(game.watchShip.totalDamage * 10)) {
            DOM.previousDamage[0] = Math.floor(game.watchShip.totalDamage * 10);
            entries[6].innerHTML = DOM.previousDamage[0] + ' Ns';
            DOM.previousDamage[1]++;
            entries[6].classList.add('blink');
            setTimeout(() => {
                DOM.previousDamage[1]--;
                if (!DOM.previousDamage[1]) {
                    entries[6].classList.remove('blink');
                }
            }, 900);
        }
        for (let i = 0; i < 4 /* 4 turrets! */; i++) {
            entries[7].children[0].children[i].style.width = 100 - Math.floor((game.watchShip.turretControls.getTubeCooldown(i).response / game.watchShip.turretControls.cooldownFrames) * 100) + '%';
        }
        this.gameMenuTitle((_a = game.galaxy) === null || _a === void 0 ? void 0 : _a.name, (_b = game.drawnProcess) === null || _b === void 0 ? void 0 : _b.solarSystem.name);
    },
    fadeInOut: function (func, params = [], middletime = 250) {
        let fade = this.elements['SolarFade'].classList;
        if (fade.contains('on'))
            return;
        fade.add('on');
        setTimeout(() => {
            setTimeout(() => {
                func(...params);
                fade.remove('on');
            }, middletime);
        }, 400 /* transition-duration of the `#SolarFade` */);
    },
    startGame: function (galaxy = 0) {
        if (!game)
            throw Error('Game not defined');
        if (this.loaded && !this.gameInitialized) {
            game.paused = false;
            game.zoom = this.data['zoom'];
            game.start(galaxies[galaxy], this.data['allShips'], this.data['defaultShip']);
            this.previousDamage[0] = 0; // Stop the damage from blinking when you start!
            if (!game.galaxy)
                throw Error('Game galaxy not defined');
            this.gameMenuTitle(galaxies[galaxy], game.galaxy.startingSolarSystem.name);
            startAnimating();
            this.newMenu();
            this.gameInitialized = true;
            if (this.data['veryFirst']) {
                this.data['veryFirst'] = false;
                this.save();
            }
        }
        else if (this.gameInitialized) {
            console.log(game);
            if (!game.galaxy)
                throw Error('Game galaxy not defined');
            if (galaxies[galaxy] !== game.galaxy.name || game.watchShipName !== this.data['defaultShip']) {
                this.resetGame();
                game.paused = false;
                // actually initializing the game!
                this.gameInitialized = true; // Cause this.resetGame(); sets it to false.
                game.start(galaxies[galaxy], this.data['allShips'], this.data['defaultShip']);
                this.previousDamage[0] = 0; // Stop the damage from blinking when you start!
                this.gameMenuTitle(galaxies[galaxy], game.galaxy.startingSolarSystem.name);
            }
            game.paused = false;
            this.newMenu();
        }
    },
    resetGame: () => {
        if (!game)
            throw new Error('Game not defined');
        console.log('Destroying the game object and remaking it!');
        for (let i = 0; i < 4; i++) {
            let galaxyElement = document.querySelector('#galaxy' + (i + 1) + '>.quit');
            if (galaxyElement)
                galaxyElement.classList.add('hidden');
            else
                throw Error('Element ' + '#galaxy' + (i + 1) + '>.quit' + ' not found');
        }
        game.endGame();
        game = new Game(windowSize.x, windowSize.y, images, contexts, DOM.landSuccessful);
        game.unit = unit;
        game.zoom = DOM.data['zoom'];
        game.paused = true;
        DOM.gameInitialized = false;
    },
    landSuccessful: function (planet) {
        var _a, _b, _c, _d, _e, _f;
        console.log("You won! You landed on " + planet.name + "!");
        if (DOM.menus["EndScreen"].classList.contains('on'))
            return; // We already landed
        DOM.menus["EndScreen"].querySelector("#ESGalaxy").innerHTML = (_b = (_a = game === null || game === void 0 ? void 0 : game.galaxy) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '<em>unknown<em>';
        DOM.menus["EndScreen"].querySelector("#ESShipName").innerHTML = (_c = game === null || game === void 0 ? void 0 : game.watchShipName) !== null && _c !== void 0 ? _c : '<em>unknown<em>';
        DOM.menus["EndScreen"].querySelector("#ESEnergy").innerHTML = ((_d = game === null || game === void 0 ? void 0 : game.watchShip) === null || _d === void 0 ? void 0 : _d.energyUsed) ? Math.floor(game.watchShip.energyUsed * 100) : '<em>unknown<em>';
        DOM.menus["EndScreen"].querySelector("#ESDamage").innerHTML = ((_e = game === null || game === void 0 ? void 0 : game.watchShip) === null || _e === void 0 ? void 0 : _e.totalDamage) ? Math.floor(game.watchShip.totalDamage * 10) : '<em>unknown<em>';
        // Composition has: land, metal, danger, survivabilityChance, air, water, temperature, which are all numbers. We could use them, eventually.
        DOM.menus["EndScreen"].querySelector("#ESResources").innerHTML = Math.round(planet.composition.survivabilityChance);
        DOM.menus["EndScreen"].querySelector("#ESScore").innerHTML = '69420';
        const ourImageSrc = imageSrcs.filter((element) => { return element[0] === planet.name; });
        DOM.menus["EndScreen"].querySelector("#ESPlanetImage").src = (_f = spritePath + ourImageSrc[0][1]) !== null && _f !== void 0 ? _f : 'SpaceObjects/RedLinesPlanet.png';
        DOM.menus["EndScreen"].querySelector("#ESPlanetName").innerHTML = planet.name;
        DOM.newMenu("EndScreen");
    },
};
///////////////////////////////////////////////
//////   Full Initialization Functions   //////
///////////////////////////////////////////////
initializeContexts([
    'background',
    'planets',
    'missiles',
    'objects',
    'thrusters',
    'ships',
    'items',
]);
initializeImages(imageSrcs);
let startTime, now, then, elapsed;
function startAnimating() {
    then = Date.now();
    startTime = then;
    animate();
}
function animate() {
    if (!game)
        throw new Error('Game not defined');
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > game.fpsInterval) {
        then = now - (elapsed % game.fpsInterval);
        if (!game.paused) {
            game.update();
            ['missiles', 'planets', 'objects', 'thrusters', 'ships', 'items'].forEach((object) => {
                //if (object !== "planets" || game.zoom !== 1 || game.initializing || game.drawnProcess.initializing) {
                if (!game || !game.drawnProcess)
                    throw new Error('Game drawnProcess not defined');
                game.drawnProcess.contexts[object].setTransform(1, 0, 0, 1, 0, 0);
                game.drawnProcess.contexts[object].clearRect(0, 0, game.width * game.unit, game.height * game.unit);
                //}
            });
            game.draw();
            DOM.devToolsUpdate();
        }
    }
}
