import Vector2 from '../helpers/Vector2.js';
import Sprite from '../sprite.js';
import PassiveSensors from './passiveSensors.js';
import ActiveSensors from './activeSensors.js';
import TurretControls from './turretControls.js';
import ThrusterController from './thrusterController.js';
import APIResponse from '../helpers/response.js';
import Torpedo from './torpedo.js';
export default class ColonyShip extends Sprite {
    constructor(name, process, DefenceClass, NavigationClass, PropulsionClass, SensorsClass, ...args) {
        var _a;
        super(...args); //parent constructor
        /* Other info */
        this.totalDamage = 0;
        this.energyUsed = 0;
        this.primary = false;
        this.torpedoesFired = 0;
        this.size = new Vector2(30, 20);
        this.hasLanded = false;
        this.ctx = 'ships';
        this.mass = 3;
        this.maxASpeed = 0.3;
        this.maxSpeed = 5;
        this.energyTimeCount = 0;
        this.destructed = false;
        this.name = name;
        this.process = process;
        this.defenceController = new DefenceClass();
        this.navigationController = new NavigationClass();
        this.propulsionController = new PropulsionClass();
        this.sensorsController = new SensorsClass();
        //Initialize each subsystem to give them access to each other.
        this.defenceController.initializeConnection(undefined, this.navigationController, this.propulsionController, this.sensorsController);
        this.navigationController.initializeConnection(this.defenceController, undefined, this.propulsionController, this.sensorsController);
        this.propulsionController.initializeConnection(this.defenceController, this.navigationController, undefined, this.sensorsController);
        this.sensorsController.initializeConnection(this.defenceController, this.navigationController, this.propulsionController, undefined);
        this.turretControls = new TurretControls(this, this.pos, this.game);
        this.passiveSensors = new PassiveSensors(this, this.game);
        this.activeSensors = new ActiveSensors(this, this.game);
        this.thrusterController = new ThrusterController(this, this.game);
        this.image = this.game.images['ship'];
        this.radius = (this.size.x + this.size.y) / 4; // we say the hurt box is avg of width and height
        if (this.process.game.galaxy)
            this.shipStatusInfo = {
                galaxyName: (_a = this.process.game.galaxy) === null || _a === void 0 ? void 0 : _a.name,
                solarSystemName: this.process.solarSystem.name,
                position: this.pos.clone(),
                radius: this.radius,
                linearVelocity: this.speed.clone(),
                angularVelocity: this.aSpeed,
                angle: this.angle,
                torpedoSpeed: this.turretControls.launchSpeed,
                hasLanded: this.hasLanded,
                thrusterPower: this.thrusterController.thrusterPower
            };
        else
            throw Error('Galaxy not found');
        this.solarSystem = this.process.solarSystem;
    }
    update() {
        if (this.destructed)
            return;
        this.updateShipStatusInfo();
        this.energyTimeCount++;
        if (this.energyTimeCount > 4) {
            this.energyUsed += 0.06;
            this.energyTimeCount = 0;
        }
        if (this.primary && !this.thrusterController.manualControlDisabled)
            this.manualControls(); //use the data from keyboard control for testing
        const thusterAccels = this.thrusterController.getAccel();
        this.aAccel = thusterAccels.angular;
        this.accel = thusterAccels.linear;
        try {
            this.defenceController.defenceUpdate(this.shipStatusInfo, this.turretControls.aimTurret.bind(this.turretControls), this.turretControls.getTubeCooldown.bind(this.turretControls), this.turretControls.fireTorpedo.bind(this.turretControls));
            this.sensorsController.sensorsUpdate(this.shipStatusInfo, this.activeSensors.scan.bind(this.activeSensors), this.passiveSensors.scan.bind(this.passiveSensors));
            this.navigationController.navigationUpdate(this.shipStatusInfo, this.tryWarp.bind(this), this.tryLand.bind(this), this.process.solarSystem.getMapData());
            this.propulsionController.propulsionUpdate(this.shipStatusInfo, this.thrusterController.setThruster.bind(this.thrusterController));
        }
        catch (e) {
            console.error(`Code malfunction on ship ${this.name}: ${e}. \n Self destructing.`);
            this.selfDestruct();
        }
        this.boundaries();
        this.activeSensors.update();
        this.passiveSensors.update();
        super.update(); //parent update;
        this.turretControls.update();
        this.thrusterController.update();
    }
    manualControls() {
        if (!this.game.inputs)
            throw Error('Game inputs not defined');
        if (this.game.inputs.pressed.left) {
            this.thrusterController.thrusterPower.counterClockwise = 100;
            this.thrusterController.thrusterPower.clockwise = 0;
        }
        else if (this.game.inputs.pressed.right) {
            this.thrusterController.thrusterPower.clockwise = 100;
            this.thrusterController.thrusterPower.counterClockwise = 0;
        }
        else {
            this.thrusterController.thrusterPower.clockwise = 0;
            this.thrusterController.thrusterPower.counterClockwise = 0;
        }
        if (this.game.inputs.pressed.up) {
            this.thrusterController.thrusterPower.main = 100;
            this.thrusterController.thrusterPower.bow = 0;
        }
        else if (this.game.inputs.pressed.down) {
            this.thrusterController.thrusterPower.bow = 100;
            this.thrusterController.thrusterPower.main = 0;
        }
        else {
            this.thrusterController.thrusterPower.bow = 0;
            this.thrusterController.thrusterPower.main = 0;
        }
    }
    updateShipStatusInfo() {
        this.shipStatusInfo.solarSystemName = this.process.solarSystem.name;
        this.shipStatusInfo.position = this.pos.clone();
        this.shipStatusInfo.radius = this.radius;
        this.shipStatusInfo.linearVelocity = this.speed.clone();
        this.shipStatusInfo.angularVelocity = this.aSpeed;
        this.shipStatusInfo.angle = this.angle;
        this.shipStatusInfo.torpedoSpeed = this.turretControls.launchSpeed;
        this.shipStatusInfo.hasLanded = this.hasLanded;
    }
    boundaries() {
        if (this.pos.y > this.game.height) {
            //y pos bounds
            this.pos.y = this.game.height;
            this.speed.y = 0;
            this.accel.y = 0;
        }
        else if (this.pos.y < 0) {
            this.pos.y = 0;
            this.speed.y = 0;
            this.accel.y = 0;
        }
        if (this.pos.x > this.game.width) {
            // x pos bounds
            this.pos.x = this.game.width;
            this.speed.x = 0;
            this.accel.x = 0;
        }
        else if (this.pos.x < 0) {
            this.pos.x = 0;
            this.speed.x = 0;
            this.accel.x = 0;
        }
        //Max speeds
        if (this.speed.magnitude() > this.maxSpeed) {
            this.speed = this.speed.scaleTo(this.maxSpeed);
        }
        if (this.aSpeed > this.maxASpeed) {
            this.aSpeed = this.aSpeed = this.maxASpeed;
        }
        if (this.aSpeed < -this.maxASpeed) {
            this.aSpeed = this.aSpeed = -this.maxASpeed;
        }
    }
    // called when ship hits an asteroid
    receiveDamage(amount) {
        this.totalDamage += amount;
    }
    tryFire() {
        this.turretControls.aimTurret(this.angle);
        for (let i = 0; i < 4; i++) {
            if (this.turretControls.fireTorpedo(i).success)
                break;
        }
    }
    tryWarp() {
        this.energyUsed += 50;
        this.process.solarSystem.warpGates.forEach((warpGate) => {
            if (this.game.ifCollide(this, warpGate)) {
                warpGate.warp(this);
                this.receiveDamage(this.speed.magnitude());
                return new APIResponse(200, [], undefined, true);
            }
        });
        return new APIResponse(400, ['No warp gates in range']);
    }
    tryLand() {
        this.energyUsed += 20;
        this.process.solarSystem.planets.forEach((planet) => {
            if (this.game.ifCollide(this, planet)) {
                const speedMag = this.speed.magnitude();
                if (speedMag > 2) {
                    return new APIResponse(400, ['Too fast! Your speed was: ' + speedMag]);
                }
                else {
                    this.receiveDamage(speedMag * 10);
                    if (speedMag > 0.5)
                        console.log(`Ouch! You crash landed and took ${speedMag * 10} damage`);
                    this.land(planet);
                    return new APIResponse(200, [], undefined, true);
                }
            }
        });
        return new APIResponse(400, ['No planets in range']);
    }
    land(planet) {
        this.game.landSuccessful(planet);
    }
    draw() {
        if (this.destructed)
            return;
        this.activeSensors.draw();
        this.passiveSensors.draw();
        super.draw();
        this.turretControls.draw();
        this.thrusterController.draw();
    }
    selfDestruct() {
        const explosion = new Torpedo(Vector2.zero, this.pos, this.game);
        explosion.explode();
        this.process.spawnDeletableObject(explosion);
        this.destructed = true;
    }
}
