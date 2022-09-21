import { withinPiRange, Vector2 } from '../helpers.js'
import SensorsController from '../../src/subsystems/sensorsController.js'
import YourDefenceController from './DefenseController.js'
import YourNavigationController from './NavigationController.js'
import YourPropulsionController from './PropulsionController.js'
import { EMSReading, PassiveReading } from '../types.js'

export default class YourSensorsController extends SensorsController {
	// To get other subsystem information, use the attributes below.
	// @ts-ignore
	defence: YourDefenceController // @ts-ignore
	navigation: YourNavigationController // @ts-ignore
	propulsion: YourPropulsionController
	
	//Add additional attributes here
	target: PassiveReading | null=null;
	landTarget: Vector2 | null=null;
	warpTarget: Vector2 | null=null;
	
	donePassive = false

  	collisionCheck(target: Vector2, selfVelocity: Vector2, targetVelocity: Vector2): number {
		//given target, selfvelocity, and target velocity; return time to impact; negative means wont impact
		if(selfVelocity.x ==  targetVelocity.x) return -1;
		if(selfVelocity.y ==  targetVelocity.y) return -1;
		
		var xf = (selfVelocity.x * target.x)/(selfVelocity.x- targetVelocity.x)
		var yf = (selfVelocity.y * target.y)/(selfVelocity.y - targetVelocity.y)

		return xf/selfVelocity.x 
	}
	cartesian(angle: number, distance: number): Vector2 {
		// Given angle and distance of an object, return x,y cords assuming ship pos is 0,0
		angle = 0-angle
		if(angle<0) angle+=2*Math.PI
		return new Vector2(distance*Math.cos(angle), distance*Math.sin(angle))
 	} 

 	polar(xy: Vector2): Vector2{
 		// Given x,y coords assuming ship pos is 0,0, return [angle (in radians), distance]
		if(xy.x==0){
			if(xy.y<0) return new Vector2(Math.sqrt(xy.x*xy.x + xy.y*xy.y), 0-Math.PI/2)
			else return new Vector2(Math.sqrt(xy.x*xy.x + xy.y*xy.y), 0+Math.PI/2)
		}
		var ret = new Vector2(Math.sqrt(xy.x*xy.x + xy.y*xy.y), Math.atan(xy.y/xy.x))
		if(xy.x<0){
			ret.y= Math.PI - ret.y
			if(ret.y>Math.PI) ret.y -= Math.PI;
		}else{
			ret.y-=Math.PI/2
		}
 		return ret
 	}

	

 	sensorsUpdate(activeScan: (heading: number, arc: number, range: number) => EMSReading[] | Error, passiveScan: () => PassiveReading[] | Error) {
 		//Student code goes here
		if(!this.donePassive){
			this.donePassive = true
			const scanResult = passiveScan()
			
			if(!(scanResult instanceof Error)) {
				for(let i=0; i<scanResult.length; i++){
					if(scanResult[i].gravity<0){
						const ems = activeScan(scanResult[i].heading,0.1,720)
						if(!(ems instanceof Error)) {
							for(let j=0; j<ems.length; j++){
								if(ems[j].radius==15){
									this.warpTarget = this.cartesian(ems[j].angle, ems[j].distance).add(this.navigation.shipPosition)
								}
							}
						}
						continue;
					}
					const ems = activeScan(scanResult[i].heading,0.1,720)
					console.log(ems)
					if(!(ems instanceof Error)) {
						console.log(ems.length)
						for(let j=0; j<ems.length; j++){
							console.log(ems[j].angle)
							if(ems[j].distance>0 && ems[j].radius<=45 && ems[j].radius>=25){
								this.landTarget = this.cartesian(ems[j].angle, ems[j].distance).add(this.navigation.shipPosition)
							}
						}
					}
				}
			}

		}else{
			var scanAngle = this.polar(this.navigation.shipVelocity).y
			const ems = activeScan(scanAngle, Math.PI, 300)
			console.log(ems)
			if(!(ems instanceof Error)) {
				var prev_min = 9999999999999;
				var min_index =0;
				var astroid_heading = []
				for(let j=0; j<ems.length; j++){
					if(ems[j].radius>0 && (ems[j].radius==5 || ems[j].radius==15) ){
						astroid_heading.push(ems[j].angle)
						//tti is time to impact
						var tti = this.collisionCheck(this.cartesian(ems[j].angle, ems[j].distance),this.navigation.shipVelocity,ems[j].velocity)
						if(tti>0 && tti<prev_min){
							if(this.warpTarget && ems[j].velocity.x == 0 && ems[j].velocity.y == 0) continue;
							prev_min=tti
							min_index=astroid_heading.length-1
						}
					}
				}
				if(prev_min!=9999999999999){
					this.target = new PassiveReading(ems[min_index].angle,0)
				}else{
					this.target = null
				}
			}
		}
	}
}