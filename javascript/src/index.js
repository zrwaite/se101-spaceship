import Game from './game.js';
import { imageSrcs } from './images.js';
import { generateSummary, getScore } from './score.js';
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
const galaxies = ['Noob', 'Compiles', 'Cracked', 'Joziac'];
const currentDate = new Date(Date.now());
const joziacConst = currentDate.getFullYear() > 2022 || currentDate.getMonth() > 8 || currentDate.getDate() > 20;
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
        // **** This begins the whole service! *** //
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
            document.activeElement.blur();
        };
        this.elements['EndRetry'].onclick = () => {
            var _a, _b;
            if (game) {
                let galaxyNumber = galaxies.indexOf((_b = (_a = game.galaxy) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'Noob');
                DOM.resetGame();
                DOM.startGame(galaxyNumber);
                document.activeElement.blur();
                let galaxyElement = document.querySelector('#galaxy' + (galaxyNumber + 1) + '>.quit');
                if (galaxyElement)
                    galaxyElement.classList.remove('hidden');
                else
                    throw Error('Element ' + '#galaxy' + (galaxyNumber + 1) + '>.quit' + ' not found');
            }
            else
                throw Error('Game not defined');
        };
        this.elements['EndNextGalaxy'].onclick = () => {
            var _a;
            console.log("next-galaxy oof");
            if (game) {
                let galaxyName = (_a = game.galaxy) === null || _a === void 0 ? void 0 : _a.name;
                let nextGalaxyNumber = galaxyName !== undefined ? galaxies.indexOf(galaxyName) + 1 : 0;
                DOM.resetGame();
                DOM.startGame(nextGalaxyNumber);
                document.activeElement.blur();
                let galaxyElement = document.querySelector('#galaxy' + (nextGalaxyNumber + 1) + '>.quit');
                if (galaxyElement)
                    galaxyElement.classList.remove('hidden');
                else
                    throw Error('Element ' + '#galaxy' + (nextGalaxyNumber + 1) + '>.quit' + ' not found');
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
        this.elements['ShipSelect'].onclick = () => {
            DOM.elements['ShipSelect'].classList.toggle('open');
        };
        this.elements['Info'].onclick = () => {
            DOM.elements['Info'].classList.toggle('active');
            if (DOM.elements['Info'].classList.contains('active')) {
                DOM.elements['Info'].querySelector('button').innerHTML =
                    `<h3>Info & Tips</h3>
					Use <span>WASD</span> or <span>←↑→↓</span> to move.
          <br/>
					<span>Spacebar</span> to shoot, <span>M</span> to warp, <span>L</span> to land.
          <br/><br/>
          Use the <span>Ship</span> selector to watch your ship.
          <br/>
					Use the <span>Settings</span> to adjust the interface.
          <br/><br/>
					For more information, see our <a target='_blank' href='https://github.com/zrwaite/SE101-Spaceship/blob/main/README.md'>Manual/Documentation</a><br/>`;
            }
            else {
                DOM.elements['Info'].querySelector('button').innerHTML = 'Info & Tips';
            }
        };
        let galaxyNames = ['galaxy1', 'galaxy2', 'galaxy3', 'galaxy4'];
        galaxyNames.forEach(function (name) {
            if (name !== 'galaxy4' || joziacConst) {
                let galaxyElement = document.querySelector('#' + name + '>.quit');
                galaxyElement.onclick = function (event) {
                    DOM.resetGame();
                    galaxyElement.classList.add('hidden');
                    event.stopPropagation();
                };
            }
        });
        // Set Data
        for (let i = 0; i < 4; i++) {
            if (i !== 3 || joziacConst) {
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
            else {
                const joziacPanel = DOM.elements["galaxy4"];
                const contents = ["Coming<br>Soon", "Coming<br>Soon.", "Coming<br>Soon..", "Coming<br>Soon...", "Why do you keep clicking this?", "Hmmm.", "You won't stop, hey?", "Well,", "since", "you're", "curious,", "I'll", "make", "you", "work", "for", "this.", "this..", "this...", "Let's", "count", "to", "500,", "shall", "we?", "1", "2", "3", "4", "5", "50", "500", "500!", "Nice job!", "Of", "course", "I'm", "not", "that", "cruel.", "cruel. ", "cruel.  ", "JUST KIDDING", "JUST KIDDING!", "501", "502", "503", "504", "505", "506", "507", "508", "509", "510", "511", "512", "513", "514", "515", "516", "517", "518", "519", "520", "521", "522", "523", "ur mom", "524", "525", "526", "527", "528", "529", "530", "531", "532", "533", "534", "535", "Okay", "Okay, ", "Okay, e", "Okay, en", "Okay, eno", "Okay, enou", "Okay, enoug", "Okay, enough", "Okay, enough g", "Okay, enough ga", "Okay, enough gam", "Okay, enough game", "Okay, enough games", "Okay, enough games.", "Okay, enough games..", "Okay, enough games...", "Errrr", "Well, I guess", "I'll tell you", "I'll tell you:", "The real reason", "this button says", `"Coming<br>Soon"`, "is because", "another galaxy <em>actually</em> is!", "It will be available", "on your fourth day", "of this class.", "There, you satisfied", "There, you satisfied?", "...", "Hmf.", "Apparently not.", "Well, ", "I", "do", "hope", "this", "easter", "egg", "made", "you ", "all", "smile", "smile.", "... ", "..", ".", " ", "  ", "Sincerely,", "Josiah<br>Plett", "Josiah<br>Plett ", "Josiah<br>Plett  ", "Josiah<br>Plett   ", "Josiah<br>Plett    ", "Josiah<br>Plett     ", "Josiah<br>Plett      ", "Why are you still clicking? Look at the Javascript console, you silly willy.", " Josiah<br>Plett"];
                joziacPanel.innerHTML = contents[0];
                joziacPanel.style.backgroundColor = "rgba(0, 0, 0, 0)";
                joziacPanel.onclick = () => {
                    const innerText = joziacPanel.innerHTML;
                    for (let i = 0; i < contents.length; i++) {
                        if (innerText === contents[i]) {
                            joziacPanel.innerHTML = contents[i < contents.length - 1 ? i + 1 : i];
                            if (contents.length - i < 10) {
                                console.log("%cNo more text from the easter egg. I hope you enjoyed it!", 'font-weight: 600; font-size: 15px; color: white; background: rgb(0, 0, 0); text-align: center; font-family: sans-serif; display: inline-block; border-radius: 5px; padding: 10px; margin: 10px;');
                            }
                            break;
                        }
                    }
                };
            }
        }
        setTimeout(() => {
            var _a;
            document.querySelectorAll('.menu').forEach(function (menu) {
                menu.style['transition-duration'] = '0.3s';
                menu.style['-o-transition-duration'] = '0.3s';
                menu.style['-moz-transition-duration'] = '0.3s';
                menu.style['-webkit-transition-duration'] = '0.3s';
            });
            if (DOM.data["skipMenu"] && !DOM.data["veryFirst"]) {
                let galaxyName = (_a = game === null || game === void 0 ? void 0 : game.galaxy) === null || _a === void 0 ? void 0 : _a.name;
                let galaxyNumber = galaxyName !== undefined ? galaxies.indexOf(galaxyName) : 0;
                let galaxyElement = document.querySelector('#galaxy' + (galaxyNumber + 1) + '>.quit');
                if (galaxyElement)
                    galaxyElement.classList.remove('hidden');
                else
                    throw Error('Element ' + '#galaxy' + (galaxyNumber + 1) + '>.quit' + ' not found');
            }
        }, 0);
        for (let i = 0; i < DOM.elements['checkboxes'].length; i++) {
            DOM.elements['checkboxes'][i].onclick = () => {
                DOM.updatePreference(DOM.elements['checkboxes'][i].id, DOM.elements['checkboxes'][i].checked);
            };
        }
        if (storageAvailable('localStorage')) {
            console.log("Your browser supports localStorage!");
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
            DOM.data[type] = value ? 2.5 : 1;
        else
            DOM.data[type] = value;
        DOM.save();
    },
    doneLoad: () => {
        contexts['background'].drawImage(images['background'], 0, 0, windowSize.x * unit, windowSize.y * unit);
        ;
        window.game = game = new Game(windowSize.x, windowSize.y, images, contexts, DOM.landSuccessful);
        game.unit = unit;
        DOM.loaded = true;
        DOM.initialize();
    },
    gameMenuTitle: function (galaxy, solarSystem) {
        this.elements['GalaxyName'].innerHTML = galaxy;
        this.elements['SolarSystemName'].innerHTML = solarSystem;
    },
    devToolsUpdate: () => {
        var _a, _b;
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
        if (DOM.previousDamage[0] !== Math.floor(game.watchShip.totalDamage * 10)) {
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
        else if (game.watchShip.totalDamage === 0) {
            entries[6].innerHTML = Math.floor(game.watchShip.totalDamage * 10) + ' Ns';
        }
        for (let i = 0; i < 4 /* 4 turrets! */; i++) {
            entries[7].children[0].children[i].style.width = 100 - Math.floor((game.watchShip.turretControls.getTubeCooldown(i) / game.watchShip.turretControls.cooldownFrames) * 100) + '%';
        }
        DOM.gameMenuTitle((_a = game.galaxy) === null || _a === void 0 ? void 0 : _a.name, (_b = game.drawnProcess) === null || _b === void 0 ? void 0 : _b.solarSystem.name);
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
            //console.log(game)
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
        //console.log('Destroying the game object and remaking it...')
        for (let i = 0; i < 4; i++) {
            if (i !== 3 || joziacConst) {
                let galaxyElement = document.querySelector('#galaxy' + (i + 1) + '>.quit');
                if (galaxyElement)
                    galaxyElement.classList.add('hidden');
                else
                    throw Error('Element ' + '#galaxy' + (i + 1) + '>.quit' + ' not found');
            }
        }
        game.endGame();
        window.game = game = new Game(windowSize.x, windowSize.y, images, contexts, DOM.landSuccessful);
        game.unit = unit;
        game.zoom = DOM.data['zoom'];
        game.paused = true;
        DOM.gameInitialized = false;
    },
    landSuccessful: function (planet) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        console.log("You won! You landed on " + planet.name + "!");
        if (DOM.menus["EndScreen"].classList.contains('on'))
            return; // We already landed
        let galaxyName = (_a = game === null || game === void 0 ? void 0 : game.galaxy) === null || _a === void 0 ? void 0 : _a.name;
        let nextGalaxyNumber = galaxyName !== undefined ? galaxies.indexOf(galaxyName) + 1 : 0;
        if (nextGalaxyNumber > 3 || (!joziacConst && nextGalaxyNumber === 3)) {
            DOM.elements["EndNextGalaxy"].style.display = "none";
        }
        else {
            DOM.elements["EndNextGalaxy"].style.display = "block";
        }
        DOM.elements["EndNextGalaxy"];
        if (!game)
            throw Error('Game not defined');
        if (!game.galaxy)
            throw Error('Game galaxy not defined');
        DOM.menus["EndScreen"].querySelector("#ESGalaxy").innerHTML = (_b = game.galaxy.name) !== null && _b !== void 0 ? _b : '<em>unknown<em>';
        DOM.menus["EndScreen"].querySelector("#ESShipName").innerHTML = (_c = game.watchShipName) !== null && _c !== void 0 ? _c : '<em>unknown<em>';
        DOM.menus["EndScreen"].querySelector("#ESEnergy").innerHTML = ((_d = game.watchShip) === null || _d === void 0 ? void 0 : _d.energyUsed) !== undefined ? Math.floor(game.watchShip.energyUsed * 100) : '<em>unknown<em>';
        DOM.menus["EndScreen"].querySelector("#ESDamage").innerHTML = ((_e = game.watchShip) === null || _e === void 0 ? void 0 : _e.totalDamage) !== undefined ? Math.floor(game.watchShip.totalDamage * 10) : '<em>unknown<em>';
        // Composition has: land, metal, danger, survivabilityChance, air, water, temperature, which are all numbers. We could use them, eventually.
        DOM.menus["EndScreen"].querySelector("#ESResources").innerHTML = Math.round(planet.composition.survivabilityChance);
        DOM.menus["EndScreen"].querySelector("#ESScore").innerHTML = getScore(planet.composition.survivabilityChance, ((_f = game.watchShip) === null || _f === void 0 ? void 0 : _f.energyUsed) || 0, ((_g = game.watchShip) === null || _g === void 0 ? void 0 : _g.totalDamage) || 0, game.galaxy);
        const ourImageSrc = imageSrcs.filter((element) => { return element[0] === planet.imageName; });
        DOM.menus["EndScreen"].querySelector("#ESPlanetImage").src = (_h = spritePath + ourImageSrc[0][1]) !== null && _h !== void 0 ? _h : 'planets/Mars.png';
        DOM.menus["EndScreen"].querySelector("#ESPlanetName").innerHTML = planet.name;
        const summary = generateSummary(planet.composition);
        DOM.menus["EndScreen"].querySelector("#ESPlanetInfo").innerHTML = summary;
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
