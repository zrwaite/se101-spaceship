import Game from './game.js'
import { imageSrcs } from './images.js'
import Planet from './spaceObjects/planet.js'

let game: Game | null // Initialized properly in DOM.doneLoad().

const windowSize = {
	// Accessible through game.width and game.height.
	x: 72,
	y: 54,
	border: 2,
}
const unit =
	(window.innerWidth - windowSize.border * 2) / (window.innerHeight - windowSize.border * 2) > windowSize.x / windowSize.y
		? Math.floor((window.innerHeight - windowSize.border * 2) / windowSize.y)
		: Math.floor((window.innerWidth - windowSize.border * 2) / windowSize.x)

// Initialize the CSS variables so that the css can do dynamic calculations for displays.
document.body.style.setProperty('--unit', unit + 'px')
document.body.style.setProperty('--border', windowSize.border + 'px')
document.body.style.setProperty('--width', windowSize.x + '')
document.body.style.setProperty('--height', windowSize.y + '')

const spritePath = 'assets/images/'
const images: { [key: string]: HTMLImageElement } = {} // image locations, by name
const contexts: { [key: string]: CanvasRenderingContext2D } = {} // contexts, by name
const galaxies = ['Noob', 'Compiles', 'Cracked', 'Joziac'] as const
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
]

let imagesLoaded = 0 // Updates as the images load, until all are loaded.

function initializeImages(imageInfo: string[][]) {
	/* Create the images with the given info: [imageName, src]. */
	for (let i = 0; i < imageInfo.length; i++) {
		let image = new Image()
		image.src = spritePath + imageInfo[i][1]
		image.onload = () => iterateLoad(imageInfo.length)
		images[imageInfo[i][0]] = image
	}
}

function initializeShipSelect(shipNames: string[], active: string) {
	/* Create the ship DOM elements with the given names, in alphabetical order. */
	let activeShipSet = false
	let firstShip
	for (let i = 0; i < shipNames.length; i++) {
		let ship = document.createElement('FIGURE')
		ship.id = shipNames[i]
		ship.innerHTML = shipNames[i]
		ship.onclick = (event: any) => {
			DOM.shipActive(event.target)
		}
		if (shipNames[i].length >= 12) ship.classList.add('small')
		if (shipNames[i] === active) {
			ship.classList.add('active')
			activeShipSet = true
		}
		let ShipSelectElement = document.body.querySelector('#ShipSelect')
		if (ShipSelectElement) ShipSelectElement.appendChild(ship)
		else throw Error('Element ShipSelect not found')
		if (i === 0) firstShip = ship
	}
	if (!activeShipSet) {
		if (firstShip) firstShip.classList.add('active')
		else throw Error('firstShip not found')
	}
}

function initializeContexts(contextNames: string[]) {
	/* Create the contexts with the given names: first name is the farthest back. */
	for (let i = 0; i < contextNames.length; i++) {
		let canvas: HTMLCanvasElement = document.createElement('CANVAS') as HTMLCanvasElement
		canvas.id = contextNames[i]
		canvas.width = unit * windowSize.x
		canvas.height = unit * windowSize.y
		let canvasHolderElement = document.body.querySelector('.canvasHolder')
		if (canvasHolderElement) canvasHolderElement.appendChild(canvas)
		else throw Error('Element canvasHolder not found')
		let ctx = canvas.getContext('2d')
		if (ctx) {
			ctx.imageSmoothingEnabled = false
			contexts[contextNames[i]] = ctx
		} else throw Error('Failed to create context')
	}
}

function iterateLoad(length: number) {
	imagesLoaded++
	if (imagesLoaded >= length) {
		// **** This begins the whole system! *** //

		DOM.doneLoad()
	}
}

function storageAvailable(type: any) {
	let storage: any
	try {
		storage = window[type]
		let x = '__storage_test__'
		storage.setItem(x, x)
		storage.removeItem(x)
		return true
	} catch (e) {
		return e instanceof DOMException && (e.code === 22 || e.code === 1014 || e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') && storage && storage.length !== 0
	}
}

// localStorage.setItem('data', JSON.stringify(DOM.data));
// DOM.data = JSON.parse(localStorage.getItem('data'));

let DOM: any = {
	loaded: false,
	gameInitialized: false,
	canStore: false,
	data: {
		veryFirst: true, // NOT CHANGED BY USER: Haven't ever pressed play on the game before...
		skipMenu: false, // `true`: skip menu; get right in to the game!
		defaultShip: 'Bebop', // Ship the camera follows
		devDisplay: true, // The default toggle state of the dev window when starting to play
		defaultGalaxy: 0, // Galaxy index default
		allShips: false, // Watch all ships?
		zoom: 1, // zoom aspect ratio (1 vs 2.5)
	},
	elements: {
		TitleStart: document.querySelector('#Title .start'), // `Start` button on first title screen
		TitleWarning: document.querySelector('#Title .warning'), // Storage warning on the title screen
		checkboxes: document.querySelectorAll("input[type='checkbox']"), // An array of the checkboxes
		Info: document.querySelector('#Info'), // Info button
		PauseButton: document.querySelector('#PauseButton'),
		GalaxyName: document.querySelector('#GalaxyName'),
		SolarSystemName: document.querySelector('#SolarSystemName'),
		DevTools: document.querySelector('#DevTools'),
		ShipSelect: document.querySelector('#ShipSelect'), // Ship selection menu holder
		SolarFade: document.querySelector('#SolarFade'), // `div` for fading between solar systems
		galaxy1: document.querySelector('#galaxy1'), // First galaxy ... index 0 everywhere in the code
		galaxy2: document.querySelector('#galaxy2'),
		galaxy3: document.querySelector('#galaxy3'),
		galaxy4: document.querySelector('#galaxy4'),
		EndMainMenu: document.querySelector('#EndScreen button.top'), // EndScreen Main Menu button
		EndRetry: document.querySelector('#EndScreen button.middle'), // EndScreen Retry button
		EndNextGalaxy: document.querySelector('#EndScreen button.bottom'), // EndScreen Next Galaxy button
	} as any,
	menus: {
		Title: document.querySelector('#Title'), // Very first title screen
		Game: document.querySelector('#Game'), // Game menu; appears when in the game (dev tools, etc)
		Main: document.querySelector('#Main'), // Main ship, galaxy, and preference selection page
		EndScreen: document.querySelector('#EndScreen'), // On completion; acts like Level Complete menu
	},
	previousDamage: [0, 0], // [<previousDamage>, <number of layered animations>]
	initialize() {
		// Event Listeners
		document.addEventListener('click', function (event: MouseEvent) {
			let evTarget = event?.target as HTMLElement
			if (evTarget?.tagName !== 'FIGURE') {
				if (DOM.elements['ShipSelect']) DOM.elements['ShipSelect'].classList.remove('open')
			}
		})
    this.elements['EndMainMenu'].onclick = () => {
      DOM.resetGame()
      DOM.newMenu('Main')
      ;(document.activeElement as HTMLElement).blur();
    }
    this.elements['EndRetry'].onclick = () => {
			if (game) {
        let galaxyNumber = galaxies.indexOf(game.galaxy?.name ?? 'Noob')
        DOM.resetGame()
        DOM.startGame(galaxyNumber)
        ;(document.activeElement as HTMLElement).blur()
        let galaxyElement = document.querySelector('#galaxy' + (galaxyNumber + 1) + '>.quit');
        if (galaxyElement)
            galaxyElement.classList.remove('hidden');
        else 
            throw Error('Element ' + '#galaxy' + (galaxyNumber + 1) + '>.quit' + ' not found');
      } else throw Error('Game not defined')
    }
    this.elements['EndNextGalaxy'].onclick = () => {
      if (game) {
        let galaxyName = game.galaxy?.name
        
        let nextGalaxyNumber = galaxyName !== undefined ? galaxies.indexOf(galaxyName) + 1 : 0
        DOM.resetGame()
        DOM.startGame(nextGalaxyNumber)
        ;(document.activeElement as HTMLElement).blur()
        let galaxyElement = document.querySelector('#galaxy' + (nextGalaxyNumber + 1) + '>.quit');
        if (galaxyElement)
            galaxyElement.classList.remove('hidden');
        else 
            throw Error('Element ' + '#galaxy' + (nextGalaxyNumber + 1) + '>.quit' + ' not found');
      } else throw Error('Game not defined')
    }
		this.elements['TitleStart'].onclick = () => {
			DOM.newMenu('Main')
		}
		this.elements['PauseButton'].onclick = () => {
			if (game) game.paused = true
			else throw Error('Game not defined')
			DOM.newMenu('Main')
		}
		this.elements['ShipSelect'].onclick = () => {
			DOM.elements['ShipSelect'].classList.toggle('open')
		}
		this.elements['Info'].onclick = () => {
			DOM.elements['Info'].classList.toggle('active')
			if (DOM.elements['Info'].classList.contains('active')) {
				DOM.elements['Info'].querySelector('button').innerHTML =
					`<h3>Info & Tips</h3>
					Use the ship select to choose which code from the students folder.<br/>
					Use the settings to adjust how the UI appears.<br/>
					Arrow keys or WASD to move.<br/>
					Spacebar to shoot, M to warp, L to land.<br/><br/>
					For more information, see our <a target='_blank' href='https://github.com/zrwaite/SE101-Spaceship/blob/main/README.md'>Manual/Documentation</a><br/>`
			} else {
				DOM.elements['Info'].querySelector('button').innerHTML = 'Info & Tips'
			}
		}
		let galaxyNames = ['galaxy1', 'galaxy2', 'galaxy3', 'galaxy4']
		galaxyNames.forEach(function (name) {
			let galaxyElement: HTMLElement = document.querySelector('#' + name + '>.quit') as HTMLElement
			galaxyElement.onclick = function (event: MouseEvent) {
				DOM.resetGame()
				galaxyElement.classList.add('hidden')
				event.stopPropagation()
			}
		})

		// Set Data
		for (let i = 0; i < 4; i++) {
			this.elements['galaxy' + (i + 1)].onclick = () => {
				if (DOM.data['defaultGalaxy'] !== i) {
					DOM.data['defaultGalaxy'] = i
					DOM.save()
				}
				DOM.startGame(i)

				let galaxyElement = document.querySelector('#galaxy' + (i + 1) + '>.quit')
				if (galaxyElement) galaxyElement.classList.remove('hidden')
				else throw Error('Element ' + '#galaxy' + (i + 1) + '>.quit' + ' not found')
			}
		}
    setTimeout(() => {
			document.querySelectorAll('.menu').forEach(function (menu: any): void {
				menu.style['transition-duration'] = '0.3s'
				menu.style['-o-transition-duration'] = '0.3s'
				menu.style['-moz-transition-duration'] = '0.3s'
				menu.style['-webkit-transition-duration'] = '0.3s'
			})
      if (DOM.data["skipMenu"] && !DOM.data["veryFirst"]) {
        let galaxyName = game?.galaxy?.name
        let galaxyNumber = galaxyName !== undefined ? galaxies.indexOf(galaxyName) : 0
        let galaxyElement = document.querySelector('#galaxy' + (galaxyNumber + 1) + '>.quit')
				if (galaxyElement) galaxyElement.classList.remove('hidden')
				else throw Error('Element ' + '#galaxy' + (galaxyNumber + 1) + '>.quit' + ' not found')
      }
		}, 0)
		for (let i = 0; i < DOM.elements['checkboxes'].length; i++) {
			DOM.elements['checkboxes'][i].onclick = () => {
				DOM.updatePreference(DOM.elements['checkboxes'][i].id, DOM.elements['checkboxes'][i].checked)
			}
		}

		if (storageAvailable('localStorage')) {
      console.log("Your browser supports localStorage!")
			this.canStore = true
			let possibleData = localStorage.getItem('data')
			if (possibleData) {
				console.log('Updating current choices based on your saved data...')
				this.data = JSON.parse(possibleData)

				// update everything about the game based on these stored values

				if (!this.data['veryFirst']) {
					let boxes = this.elements['checkboxes']
					for (let i = 0; i < boxes.length; i++) {
						if (boxes[i].id !== 'zoom') boxes[i].checked = this.data[boxes[i].id]
						else boxes[i].checked = this.data[boxes[i].id] !== 1
					}
					if (this.data['skipMenu']) {
						this.newMenu()
						this.startGame(this.data['defaultGalaxy'])
					} else {
						this.newMenu('Main')
					}
					initializeShipSelect(ships, this.data['defaultShip'])
					return /* Don't forget that I DO return from this function early. */
				}
			}
			console.log('This is your first time playing Intergalactic Adventures!')
			this.newMenu('Title')
			setTimeout(() => {
				DOM.save()
			}, 0)
		} else {
			console.log("Your browser doesn't support localStorage.")
			this.newMenu('Title')
			this.elements['TitleWarning'].classList.add('on')
		}
		/* Initialize stuff in the UI */
		let boxes = this.elements['checkboxes']
		for (let i = 0; i < boxes.length; i++) {
			if (boxes[i].id !== 'zoom') boxes[i].checked = this.data[boxes[i].id]
			else boxes[i].checked = this.data[boxes[i].id] !== 1
		}
		initializeShipSelect(ships, this.data['defaultShip'])
	},
	shipActive: function (ship: HTMLElement) {
		if (ship.classList.contains('active') || !this.elements['ShipSelect'].classList.contains('open')) return
		this.elements['ShipSelect'].querySelector('.active').classList.remove('active')
		ship.classList.add('active')
		this.updatePreference('defaultShip', ship.id)
	},
	newMenu: function (menu = 'Game') {
		for (const key in this.menus) this.menus[key].classList.remove('on')
		if (menu === 'Game') {
			if (this.data['devDisplay']) this.elements['DevTools'].style.display = 'block'
			else this.elements['DevTools'].style.display = 'none'
		}
		this.menus[menu].classList.add('on')
	},
	save: () => {
		localStorage.setItem('data', JSON.stringify(DOM.data))
	},
	updatePreference: function (type: string, value: number) {
		if (type === 'zoom') DOM.data[type] = value ? 2.5 : 1
		else DOM.data[type] = value
		DOM.save()
	},
	doneLoad: () => {
		contexts['background'].drawImage(images['background'], 0, 0, windowSize.x * unit, windowSize.y * unit)
		game = new Game(windowSize.x, windowSize.y, images, contexts, DOM.landSuccessful)
		game.unit = unit
		DOM.loaded = true
		DOM.initialize()
	},
	gameMenuTitle: function (galaxy: string, solarSystem: string) {
		this.elements['GalaxyName'].innerHTML = galaxy
		this.elements['SolarSystemName'].innerHTML = solarSystem
	},
	devToolsUpdate: () => {
		let entries = DOM.elements['DevTools'].querySelectorAll('tr:not(.title)>td')
		if (!game || !game.watchShip) throw Error('Game or game watchship undefined')
		entries[0].innerHTML = 'X: ' + Math.floor(game.watchShip.speed.x * 100) / 100
		entries[1].innerHTML = 'Y: ' + Math.floor(game.watchShip.speed.y * 100) / 100
		entries[2].innerHTML = 'X: ' + Math.floor(game.watchShip.pos.x * 10) / 10
		entries[3].innerHTML = 'Y: ' + Math.floor(game.watchShip.pos.y * 10) / 10
		let angle = Math.floor(game.watchShip.angle * 100) / 100
		entries[4].innerHTML = '&theta;: ' + angle
		entries[5].innerHTML = Math.floor(game.watchShip.energyUsed * 100) + ' J'
		if (DOM.previousDamage[0] !== Math.floor(game.watchShip.totalDamage * 10)) {
			DOM.previousDamage[0] = Math.floor(game.watchShip.totalDamage * 10)
			entries[6].innerHTML = DOM.previousDamage[0] + ' Ns'
			DOM.previousDamage[1]++
			entries[6].classList.add('blink')
			setTimeout(() => {
				DOM.previousDamage[1]--
				if (!DOM.previousDamage[1]) {
					entries[6].classList.remove('blink')
				}
			}, 900)
		} else if (game.watchShip.totalDamage === 0) {
      entries[6].innerHTML = Math.floor(game.watchShip.totalDamage * 10) + ' Ns'
    }
		for (let i = 0; i < 4 /* 4 turrets! */; i++) {
			entries[7].children[0].children[i].style.width = 100 - Math.floor((game.watchShip.turretControls.getTubeCooldown(i) as number / game.watchShip.turretControls.cooldownFrames) * 100) + '%'
		}
		DOM.gameMenuTitle(game.galaxy?.name, game.drawnProcess?.solarSystem.name)
	},
	fadeInOut: function (func: Function, params = [], middletime = 250) {
		let fade = this.elements['SolarFade'].classList
		if (fade.contains('on')) return
		fade.add('on')
		setTimeout(() => {
			setTimeout(() => {
				func(...params)
				fade.remove('on')
			}, middletime)
		}, 400 /* transition-duration of the `#SolarFade` */)
	},
	startGame: function (galaxy = 0) {
		if (!game) throw Error('Game not defined')
		if (this.loaded && !this.gameInitialized) {
			game.paused = false
			game.zoom = this.data['zoom']
			game.start(galaxies[galaxy], this.data['allShips'], this.data['defaultShip'])
			this.previousDamage[0] = 0 // Stop the damage from blinking when you start!
			if (!game.galaxy) throw Error('Game galaxy not defined')
			this.gameMenuTitle(galaxies[galaxy], game.galaxy.startingSolarSystem.name)
			startAnimating()
			this.newMenu()
			this.gameInitialized = true
			if (this.data['veryFirst']) {
				this.data['veryFirst'] = false
				this.save()
			}
		} else if (this.gameInitialized) {
			//console.log(game)
			if (!game.galaxy) throw Error('Game galaxy not defined')
			if (galaxies[galaxy] !== game.galaxy.name || game.watchShipName !== this.data['defaultShip']) {
				this.resetGame()

				game.paused = false

				// actually initializing the game!
				this.gameInitialized = true // Cause this.resetGame(); sets it to false.
				game.start(galaxies[galaxy], this.data['allShips'], this.data['defaultShip'])
				this.previousDamage[0] = 0 // Stop the damage from blinking when you start!
				this.gameMenuTitle(galaxies[galaxy], game.galaxy.startingSolarSystem.name)
			}
			game.paused = false
			this.newMenu()
		}
	},
	resetGame: () => {
		if (!game) throw new Error('Game not defined')
		//console.log('Destroying the game object and remaking it...')
		for (let i = 0; i < 4; i++) {
			let galaxyElement = document.querySelector('#galaxy' + (i + 1) + '>.quit')
			if (galaxyElement) galaxyElement.classList.add('hidden')
			else throw Error('Element ' + '#galaxy' + (i + 1) + '>.quit' + ' not found')
		}
		game.endGame()
		game = new Game(windowSize.x, windowSize.y, images, contexts, DOM.landSuccessful)
		game.unit = unit
		game.zoom = DOM.data['zoom']
		game.paused = true
		DOM.gameInitialized = false
	},
  landSuccessful: function (planet: Planet) {
    console.log("You won! You landed on " + planet.name + "!")
    if (DOM.menus["EndScreen"].classList.contains('on')) return; // We already landed
    let galaxyName = game?.galaxy?.name
    let nextGalaxyNumber = galaxyName !== undefined ? galaxies.indexOf(galaxyName) + 1 : 0
    if (nextGalaxyNumber > 3) {
      DOM.elements["EndNextGalaxy"].style.display = "none"
    } else {
      DOM.elements["EndNextGalaxy"].style.display = "block"
    }
    DOM.elements["EndNextGalaxy"]
    DOM.menus["EndScreen"].querySelector("#ESGalaxy").innerHTML = game?.galaxy?.name ?? '<em>unknown<em>'
    DOM.menus["EndScreen"].querySelector("#ESShipName").innerHTML = game?.watchShipName ?? '<em>unknown<em>'
    DOM.menus["EndScreen"].querySelector("#ESEnergy").innerHTML = game?.watchShip?.energyUsed !== undefined ? Math.floor(game.watchShip.energyUsed * 100) : '<em>unknown<em>'
    DOM.menus["EndScreen"].querySelector("#ESDamage").innerHTML = game?.watchShip?.totalDamage !== undefined ? Math.floor(game.watchShip.totalDamage * 10) : '<em>unknown<em>'
    // Composition has: land, metal, danger, survivabilityChance, air, water, temperature, which are all numbers. We could use them, eventually.
    DOM.menus["EndScreen"].querySelector("#ESResources").innerHTML = Math.round(planet.composition.survivabilityChance)
    DOM.menus["EndScreen"].querySelector("#ESScore").innerHTML = '69420'
    const ourImageSrc = imageSrcs.filter((element) => {return element[0] === planet.imageName});
    DOM.menus["EndScreen"].querySelector("#ESPlanetImage").src = spritePath + ourImageSrc[0][1] ?? 'planets/Mars.png'
    DOM.menus["EndScreen"].querySelector("#ESPlanetName").innerHTML = planet.name
    DOM.newMenu("EndScreen")
  },
}

///////////////////////////////////////////////
//////   Full Initialization Functions   //////
///////////////////////////////////////////////

initializeContexts([
	'background', // static background
	'planets', // only drawn once if game.zoom == 1
	'missiles',
	'objects',
	'thrusters',
	'ships',
	'items',
])

initializeImages(imageSrcs)

let startTime, now, then: number, elapsed

function startAnimating() {
	then = Date.now()
	startTime = then
	animate()
}

function animate() {
	if (!game) throw new Error('Game not defined')
	requestAnimationFrame(animate)
	now = Date.now()
	elapsed = now - then
	if (elapsed > game.fpsInterval) {
		then = now - (elapsed % game.fpsInterval)
		if (!game.paused) {
			game.update()
			;['missiles', 'planets', 'objects', 'thrusters', 'ships', 'items'].forEach((object) => {
				//if (object !== "planets" || game.zoom !== 1 || game.initializing || game.drawnProcess.initializing) {
				if (!game || !game.drawnProcess) throw new Error('Game drawnProcess not defined')
				game.drawnProcess.contexts[object].setTransform(1, 0, 0, 1, 0, 0)
				game.drawnProcess.contexts[object].clearRect(0, 0, game.width * game.unit, game.height * game.unit)
				//}
			})
			game.draw()
			DOM.devToolsUpdate()
		}
	}
}
