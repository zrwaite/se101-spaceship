class AbstractSubsystemController{
	constructor(){
		this.isProcessing = true;
		this.parentShip;
	}
	_Process(delta){
		Update();
	}
	_Draw(){
		//draw function
	}
}
