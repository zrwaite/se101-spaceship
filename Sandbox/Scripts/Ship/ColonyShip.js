//Based on ColonyShip.cs
//import UFODriveParticles
//import ThrusterControls
//import Thruster 
//import PassiveSensors
//import ActiveSensors
//import SensorsController
//import NavigationController
//import PropulsionController
//import DefenceController
//import ShipStatusInfo
export default class Ship{
	constructor(){
		this.shipName="DefaultShip";
		this.image = document.getElementById("colony-ship");//Default image
	  	this.height = 50;
	  	this.width = 66;
		this.maxHealth = 100; 
		this.maxTorque = 10;
		this.maxThrust = 10;
		this.ufoDriveMaxSpeed = 200;
		this.ufoDriveRotationSpeed = 180;
		this.safeJumpSpeed = 100;
		this.jumpVelocityDamageMultiplier = 1;
		this.isLanded = false;
		this.MissionResult = "In progess";
		this.IsAutomaticPropulsionControlEnabled = true;
		//I wasn't able to find initialization for the following: 
		this.CurrentSolarSystemName; //Probably pulled from somewhere
		this.currentHealth; //Needs to be Initialized
		this.TotalScanEnergy; //Needs to be Initialized
		this.TotalCollisionCount; //Needs to be Initialized
		this.TotalDamage; //Needs to be Initialized
		this.TotalJumpCost; //Needs to be initialized
		this.TimeElapsed; //Needs to be initialized (Likely pulled from game, not contained in ship file)
		
		//(I am going to give these values here, 
		//because we add to it later with no other initialization, 
		//which is probably something that works in c# but would be a bug here
		this.TimeElapsed = 0; 
		this.TotalJumpCost = 0;
		this.TotalDamage = 0;
		//Might be godot specific:
		this.CollisionShape2D; 
		this.overlapArea2D;
		
		//initialized in _Ready(): {
			this.gameCore; //I think this is a big object, with game information
			this.TorpedoesFired;
			this.ShipStatusInfo;
			//Thrusters
			this.portForeThruster;
			this.starboardForeThruster;
			this.portAftThruster;
			this.starboardAftThruster;
			this.mainThruster;
			this.portRetroThruster;
			this.starboardRetroThruster;
			//Sensors
			this.ActiveSensors;
			this.PassiveSensors;
			//turret
			this.turret;
			//Controls
			this.ThrusterControls;
			//Don't know what this is:
			this.ufoDriveParticles;
			
			this.SensorsController;
			this.NavigationController;
		this.PropulsionController;
		this.DefenceController;
		// }

		/* Events to watch for?
		isLandedChanged
		OnShipWarped
		*/


		/* Some things are set up as class instances
		GameCore gameCore;
		The following might be objects, 
		might be weirdly initialized getters/setters:
		CurrentSolarSystemName; //Very likely weird g/s

		*/
	}

	//The following is an initilization function (start):
	//It initializes a lot of the game objects from the imports
	_Ready(){
		/* I think these are godot specific maybe?
		gameCore = FindParent("GameCore") as GameCore;
		collisionShape = GetNode<CollisionShape2D>("CollisionShape2D");
		overlapArea2D = GetNode<Area2D>("OverlapArea2D");
		*/

		//Object initialization
		this.gameCore = new GameCore();
		//If gamecore is constant for all ships, don't make a new object
		this.portForeThruster = new Thruster();
		this.starboardForeThruster = new Thruster();
		this.portAftThruster = new Thruster();
		this.starboardAftThruster = new Thruster();
		this.mainThruster = new Thruster();
		this.portRetroThruster = new Thruster();
		this.starboardRetroThruster = new Thruster();

		this.TorpedoesFired = 0;

		this.ThrusterControls = new ThrusterControls(mainThruster, portForeThruster, portAftThruster, starboardForeThruster, starboardAftThruster, portRetroThruster, starboardRetroThruster);
		/*Events I think, not sure how to convert to js, I am tired
		ThrusterControls.OnWarpJumpTriggered += TriggerJumpDrive;
        ThrusterControls.OnLandingSequenceTriggered += TriggerLandingSequence;
		*/

		this.turret = new Turret;
		this.PassiveSensors = new PassiveSensors();
		this.ActiveSensors = new ActiveSensors();
		/*Events I think, not sure how to convert to js, I am tired
		ActiveSensors.OnScanPerformed += HandleScanPerformed;
		*/

		this.ufoDriveParticles = new UFODriveParticles();
		this.SensorsController = new SensorsController();
		this.NavigationController = new NavigationController();
		this.PropulsionController = new PropulsionController();
		this.DefenceController = new DefenceController();

		this.shipStatusInfo = new ShipStatusInfo();

		this.UpdateShipStatusInfo(); //Calls function to update (initialize) shipstatusinfo
	}

	_Process(delta){
		/* Godot code: 
		Update(); //Causes _Draw to be called again (each frame)
		*/
		//I can't find a declared godot function, so that is built in godot function
		//I assume this can be replaced by the draw function, but 
		//I won't delete this yet in case 
	}

	_PhysicsProcess(deltaTime){
		this.UpdateShipStatusInfo(); 
		this.PassiveSensors.GeneratePassiveSensorReadings();
		if (this.SensorsController.IsProcessing){
			this.SensorsController.SensorsUpdate(this.shipStatusInfo, this.ActiveSensors, this.PassiveSensors, deltatime);
		}
		if (this.NavigationController.IsProcessing){
			this.SensorsController.SensorsUpdate(this.shipStatusInfo, this.gameCore.GalaxyMap.GalaxyMapData, deltatime);
		}
		if (this.PropulsionController.IsProcessing){
			this.PropulsionController.PropulsionUpdate(this.shipStatusInfo, this.ThrusterControls, deltatime);
		}
		if (this.DefenceController.IsProcessing){
			this.DefenceController.DefenceUpdate(this.shipStatusInfo, this.turret.TurretControls, deltatime);
		}
		if (!isLanded){
			this.TimeElapsed += deltaTime;
		}

	}

	_IntegrateForces(){ //Physics that will probably be different. Here is godot code for reference:
		/*

public override void _IntegrateForces(Physics2DDirectBodyState state)
    {
        AppliedForce = state.TotalGravity;
        AppliedTorque = 0f;

        if (ThrusterControls.IsUFODriveEnabled)
        {
            var clampedVelocity = ThrusterControls.UFODriveVelocity.Normalized() * Mathf.Min(ThrusterControls.UFODriveVelocity.Length(), ufoDriveMaxSpeed);
            state.LinearVelocity = clampedVelocity;
            //state.LinearVelocity = ThrusterControls.UFODriveVelocity;
            state.AngularVelocity = ThrusterControls.UFODriveAngularVelocity;
        }
        else
        {
            AddForce(mainThruster.GlobalPosition - GlobalPosition, mainThruster.GetResultantThrustVector());
            AddForce(portRetroThruster.GlobalPosition - GlobalPosition, portRetroThruster.GetResultantThrustVector());
            AddForce(starboardRetroThruster.GlobalPosition - GlobalPosition, starboardRetroThruster.GetResultantThrustVector());
            AddForce(portForeThruster.GlobalPosition - GlobalPosition, portForeThruster.GetResultantThrustVector());
            AddForce(portAftThruster.GlobalPosition - GlobalPosition, portAftThruster.GetResultantThrustVector());
            AddForce(starboardForeThruster.GlobalPosition - GlobalPosition, starboardForeThruster.GetResultantThrustVector());
            AddForce(starboardAftThruster.GlobalPosition - GlobalPosition, starboardAftThruster.GetResultantThrustVector());
        }

        //Enable/Disable the UFO Drive visuals depending on chosen PropulsionMode
        //ufoDriveParticles.SetEmitting(PropulsionMode == ShipPropulsionMode.ManualUFODrive);
        ufoDriveParticles.SetEmitting(ThrusterControls.IsUFODriveEnabled);

        if (Input.IsActionJustPressed("MovementStop"))
        {
            state.LinearVelocity = Vector2.Zero;
            state.AngularVelocity = 0f;
        }

        int contactCount = state.GetContactCount();
        if (contactCount > 0)
        {
            //GD.Print("Contact count: " + contactCount);
            for (int i = 0; i < contactCount; i++)
            {
                var vector = state.GetContactColliderVelocityAtPosition(i);
                //GD.Print("Vector: " + vector);
            }
        }

    }

		*/
	}

	UpdateShipStatusInfo(){
		this.shipStatusInfo.currentSystemName = this.CurrentSolarSystemName; //I can't find initialization for this
        this.shipStatusInfo.positionWithinSystem = GlobalPosition; //This is built into godot, we will have to recrete it (get current global position)
        this.shipStatusInfo.shipCollisionRadius = this.GetCollisionRadius();
        this.shipStatusInfo.linearVelocity = LinearVelocity; //This is built into godot, we will have to recrete it (get current linear velocity)
        this.shipStatusInfo.angularVelocity = AngularVelocity; //This is built into godot, we will have to recrete it (get current angular velocity)
        this.shipStatusInfo.forwardVector = GlobalTransform.x; //This is built into godot, we will have to recrete it (vector math)
        this.shipStatusInfo.rightVector = -GlobalTransform.y; //This is built into godot, we will have to recrete it (vector math)
        this.shipStatusInfo.torpedoSpeed = this.turret.TorpedoSpeed;
       	this.shipStatusInfo.hasLanded = this.IsLanded;
	}

	getCollisionRadius(){
		//some algorithm for collision with other objects
		//Returns distance value
		/* Godot code:
			var capsule = collisionShape.Shape as CapsuleShape2D;
        	return Mathf.Max(capsule.Radius, capsule.Height);
		*/
	}

	ReceiveDamage(amount)
    {
        this.TotalDamage += amount;
    }

    RecordJumpCost(jumpCost)
    {
        this.TotalJumpCost += jumpCost;
    }

	HandleScanPerformed(scanCost) //This is added to an event caller I think. 
    {
        this.TotalScanEnergy += scanCost;
    }

	TriggerJumpDrive(){ //This is added to an event caller I think. Not sure what to do with it right now.
		/* Godot code:
        var overlaps = overlapArea2D.GetOverlappingAreas();
        foreach (Area2D area in overlaps)
        {
            if (area is WarpGate)
            {
                WarpGate warpGate = area as WarpGate;
                string departureSolarSystemName = CurrentSolarSystemName;
                bool warpSuccess = warpGate.TryTeleportShip(this, out string arrivalSolarSystemName, out float jumpCost);
                if (warpSuccess)
                {
                    float jumpSpeedOverLimit = Mathf.Max(0, LinearVelocity.Length() - safeJumpSpeed);
                    ReceiveDamage(jumpSpeedOverLimit * jumpVelocityDamageMultiplier);
                    RecordJumpCost(jumpCost);
                    //GD.Print("Jumpcost: " + jumpCost);

                    OnShipWarped?.Invoke(this, departureSolarSystemName, arrivalSolarSystemName);
                }
            }
        }
		*/
    }

	TriggerLandingSequence(){ //This is added to an event caller I think. Not sure what to do with it right now.
        /* Godot code
		if (IsLanded)
            return;

        //GD.Print("Landing sequence triggered. Checking overlaps...");
        var overlaps = overlapArea2D.GetOverlappingAreas();
        foreach (var area in overlaps)
        {
            switch (area)
            {
                case LargeBody largeBody:
                    //GD.Print("Overlapping Large Body...");
                    if (largeBody.Name == "Planet Kepler 438")
                    {
                        //GD.Print("Overlapping Kepler 438");
                        MissionResult = "Mission Accomplished!";
                        IsLanded = true;                        
                    } else {
                        MissionResult = "Wrong planet!";
                        IsLanded = true;                        
                    }
                    break;
            }
        }
		*/
    }

	OnBodyEntered(body){//I can't find this function declared or called anywhere, idk maybe it is an export?
		/* godot code:
        TotalCollisionCount++;

        switch (body)
        {            
            case ColonyShip ship:
                Node node = ship.GetNodeOrNull("VelocityRecord");
                if (node != null)
                {
                    VelocityRecord record = node as VelocityRecord;
                    float collisionEnergy = (LinearVelocity - record.VelocityLastFrame).Length();
                    //GD.Print("Collided with ship. Energy: " + collisionEnergy);
                    ReceiveDamage(collisionEnergy);
                }

                
                break;
            default:
                //GD.Print("Body entered: " + body.Name);
                break;
        }
		*/
    }



	//Getters:
	getUFODriveRotationSpeed(){
		//Getter for UFODriveRotationSpeed
		//Godot has get/set build in, so different function names
		return this.ufoDriveRotationSpeed;
	}
	getShipName(){
		return this.shipName;
	}
	getTurret(){
		return this.turret;
	}
	getScanSignature(){
		//I have no idea what this code is for from Godot:
		return "Plasteel:70|Composites:20|Electronics:5|Misc:5";
	}
	

	//Setters:
	setShipName(shipname){
		this.shipName = shipname;
	}

	update(deltaTime) {
		//Standard javascript update function, change if needed
	}
	draw(ctx) {
		//Standard javascript draw function, change if needed
		if(this.pos!==null){
				ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width, this.height)
			}
		}
  }
  
