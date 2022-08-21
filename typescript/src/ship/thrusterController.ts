import Vector2 from '../helpers/Vector2.js'
import ColonyShip from './colonyShip.js'
import RenderedObject from '../renderedObject.js'
import Game from '../game.js'

const thrusterNames = ['main', 'bow', 'clockwise', 'counterClockwise'] as const
type ThrusterName = typeof thrusterNames[number]

export default class ThrusterController extends RenderedObject {
	parentShip: ColonyShip
	ctx = 'ships'
	manualControlDisabled = false
	thrusterPower = {
		main: 0,
		bow: 0,
		clockwise: 0,
		counterClockwise: 0,
	}
	flames: {
		[key: string]: {
			pos: Vector2
			size: Vector2
			angle: number
			thruster: ThrusterName
		}
	} = {
		main: {
			pos: new Vector2(17, 0),
			size: new Vector2(5, 5),
			angle: 0,
			thruster: 'main',
		},
		mainLeftClose: {
			pos: new Vector2(15, 4),
			size: new Vector2(2, 2),
			angle: 0,
			thruster: 'main',
		},
		mainLeftFar: {
			pos: new Vector2(14, 6),
			size: new Vector2(2, 2),
			angle: 0,
			thruster: 'main',
		},
		mainRightClose: {
			pos: new Vector2(15, -4),
			size: new Vector2(2, 2),
			angle: 0,
			thruster: 'main',
		},
		mainRightFar: {
			pos: new Vector2(14, -6),
			size: new Vector2(2, 2),
			angle: 0,
			thruster: 'main',
		},
		frontLeft: {
			pos: new Vector2(-12, 5),
			size: new Vector2(3, 3),
			angle: Math.PI,
			thruster: 'bow',
		},
		frontRight: {
			pos: new Vector2(-12, -5),
			size: new Vector2(3, 3),
			angle: Math.PI,
			thruster: 'bow',
		},
		leftFront: {
			pos: new Vector2(-7, 8.5),
			size: new Vector2(3, 3),
			angle: Math.PI / 2,
			thruster: 'clockwise',
		},
		leftBack: {
			pos: new Vector2(11, 10.5),
			size: new Vector2(3, 3),
			angle: Math.PI / 2,
			thruster: 'counterClockwise',
		},
		rightFront: {
			pos: new Vector2(-7, -8.5),
			size: new Vector2(3, 3),
			angle: -Math.PI / 2,
			thruster: 'counterClockwise',
		},
		rightBack: {
			pos: new Vector2(11, -10.5),
			size: new Vector2(3, 3),
			angle: -Math.PI / 2,
			thruster: 'clockwise',
		},
	}
	constructor(parentShip: ColonyShip, game: Game) {
		super(parentShip.pos, game)
		this.parentShip = parentShip
		this.image = this.game.images['thrusterFlame']
	}
	// Successful responses contains a numeric field `power` giving the actually power the thruster was set to (in case power was out of bounds)
	// and a boolean field `powerLimited` indicating whether the power requested was greater than the MAX_POWER and thus reduced to equal MAX_POWER
	setThruster(thrusterName: ThrusterName, power: number): Error | null{
		this.manualControlDisabled = true
		if (power < 0) return new Error('power must be non-negative')
		if (power > 100) return new Error('Too much power! Anything over 100 fries the system, you used ' + power)
		switch (thrusterName) {
			case 'main':
			case 'bow':
			case 'clockwise':
			case 'counterClockwise':
				this.thrusterPower[thrusterName] = power
				break
			default:
				return new Error(`Invalid thrusterName <${thrusterName}>`)
		}
		return null
	}
	getAccel() {
		this.parentShip.energyUsed += this.thrusterPower.main / 200
		this.parentShip.energyUsed += this.thrusterPower.bow / 400
		this.parentShip.energyUsed += this.thrusterPower.clockwise / 1000
		this.parentShip.energyUsed += this.thrusterPower.counterClockwise / 5000
		return {
			linear: Vector2.right.rotateTo(this.parentShip.angle).scale(0.0001 * this.thrusterPower.main + -0.00005 * this.thrusterPower.bow),
			angular: 0.00001 * this.thrusterPower.clockwise + -0.00001 * this.thrusterPower.counterClockwise,
		}
	}
	update() {
		this.angle = this.parentShip.angle
		this.pos = this.parentShip.pos
	}
	draw() {
		if (!this.image) return
		// Set the context's translation.
		let ctx: CanvasRenderingContext2D = this.game.contexts[this.ctx]
		for (const key in this.flames) {
			const flameName = key as keyof typeof this.flames
			const flame = this.flames[flameName]
			const power = this.thrusterPower[flame.thruster]
			if (power) {
				const angle = this.angle + flame.angle
				const flamePos = this.pos.subtract(flame.pos.rotate(this.angle))
				ctx.setTransform(1, 0, 0, 1, ((flamePos.x / 10) * this.game.unit - this.game.camera.x) * this.game.zoom, ((flamePos.y / 10) * this.game.unit - this.game.camera.y) * this.game.zoom)
				if (angle !== 0) ctx.rotate(angle)
				// Draw the image with a half-size offset, so that rotating works properly and the coordinate represent the center.
				const opacity = 0.5 + power * 0.005
				ctx.globalAlpha = opacity
				ctx.drawImage(
					this.image,
					((-(flame.size.x / 10) * this.game.unit) / 2) * this.game.zoom,
					((-(flame.size.y / 10) * this.game.unit) / 2) * this.game.zoom,
					(flame.size.x / 10) * this.game.unit * this.game.zoom,
					(flame.size.y / 10) * this.game.unit * this.game.zoom
				)
				ctx.globalAlpha = 1
			}
		}
	}
}

export type { ThrusterName }
