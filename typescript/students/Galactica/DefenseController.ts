import { couldStartTrivia } from '../../../node_modules/typescript/lib/typescript.js'
import DefenceController from '../../src/subsystems/defenceController.js'
import { Vector2, withinPiRange, angleDiff } from '../helpers.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import YourSensorsController from './SensorsController.js'
export default class YourDefenceController extends DefenceController {
	// To get other subsystem information, use the attributes below. 
	// @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	sensors: YourSensorsController // @ts-ignore
	propulsion: YourPropulsionController
	//Add additional attributes here
	
	defenceUpdate(aimTurret: (angle: number) => void, getTubeCooldown: (i: number) => number | Error, fireTorpedo: (i: number) => Error | null) {
		//Student code goes here
		if (!this.sensors.target) return
		/*
		if (this.sensors.activeArray.length>0){
			for (let i =0; i<this.sensors.activeArray.length; i++ ){
					if(!(this.sensors.activeArray[i])) continue
					aimTurret(this.sensors.activeArray[i].angle)
					fireTorpedo(i%4)
			}
		}
		*/
		
		if (this.sensors.activeArray.length>0){
			for (let i =0; i<this.sensors.activeArray.length; i++ ){
					if(!(this.sensors.activeArray[i])) continue
					
					let dxa= this.sensors.activeArray[i].distance * Math.cos(this.sensors.activeArray[i].angle)
					let vxa = this.sensors.activeArray[i].velocity.x
					let dya = this.sensors.activeArray[i].distance * Math.sin(this.sensors.activeArray[i].angle)
					let vya = this.sensors.activeArray[i].velocity.y
					let a = (3*dxa)
					let b = (3*dya)
					let c = (dya*(this.navigation.xVelocity-vxa) - dxa*(this.navigation.yVelocity-vya))
					let torpedoAngle = 0
					let triggerRadius = 40
					let txmax = (dxa+triggerRadius)/(this.navigation.xVelocity-vxa)
					let txmin = (dxa-triggerRadius)/(this.navigation.xVelocity-vxa)
					let tymax = (dya+triggerRadius)/(this.navigation.yVelocity-vya)
					let tymin = (dya-triggerRadius)/(this.navigation.yVelocity-vya)
					if (((txmin< tymax && tymax <txmax)||(txmin< tymin && tymin <txmax)||(txmax<tymax && tymin<txmin)) && txmax>0 && tymax>0){
						if (this.sensors.activeArray[i].distance<50){
							aimTurret(this.sensors.activeArray[i].distance)
							fireTorpedo(i%4)
						}
						else{
							
							if ((Math.cos(this.sensors.activeArray[i].angle) >= 0) && (Math.sin(this.sensors.activeArray[i].angle) >= 0)){
								torpedoAngle = Math.atan(c/(Math.sqrt(Math.pow(a,2)+Math.pow(b,2)+Math.pow(c,2))))-Math.atan(a/b)+Math.PI/2
							}
							else if ((Math.cos(this.sensors.activeArray[i].angle) >= 0) && (Math.sin(this.sensors.activeArray[i].angle) <= 0)){
								torpedoAngle = Math.atan(c/(Math.sqrt(Math.pow(a,2)+Math.pow(b,2)+Math.pow(c,2))))-Math.atan(a/b)-Math.PI/2
							}
							else if(((Math.cos(this.sensors.activeArray[i].angle) <= 0) && (Math.sin(this.sensors.activeArray[i].angle) >= 0))){
								torpedoAngle = Math.atan(c/(Math.sqrt(Math.pow(a,2)+Math.pow(b,2)+Math.pow(c,2))))-Math.atan(a/b)+Math.PI/2
							}
							else{
								torpedoAngle = Math.atan(c/(Math.sqrt(Math.pow(a,2)+Math.pow(b,2)+Math.pow(c,2))))-Math.atan(a/b)-Math.PI/2
							}
							aimTurret(torpedoAngle)
							fireTorpedo(i%4)
							
							
						}
					}
					
					
			}
		}
		
	}
}
