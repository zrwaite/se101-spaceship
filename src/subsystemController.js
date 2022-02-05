export default class SubsystemController{
	defence;
	navigation;
	propulsion;
	sensors;
	initializeConnection = (defence, navigation, propulsion, sensors) =>{
		this.defence = defence;
		this.navigation = navigation;
		this.propulsion = propulsion;
		this.sensors = sensors;
	}
}
