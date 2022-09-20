import SensorsController from "../../src/subsystems/sensorsController.js";
let allObjects = [];
export default class YourSensorsController extends SensorsController {
  constructor() {
    super(...arguments);
    this.target = null;
  }
  //Add additional attributes here
  sensorsUpdate(activeScan, passiveScan) {
    const scanResult = passiveScan();
    if (!(scanResult instanceof Error)) {
      console.log("here is passive scan", scanResult);
      console.log("all objects");
      console.log(allObjects);
      allObjects.forEach((v) => {
        if (JSON.stringify(v) == JSON.stringify(scanResult)) {
          console.log("found the planet");
          console.log(scanResult);
          this.target = scanResult[0];
        }
      });
      allObjects.push(scanResult);
    }
    //this is a test
  }
}
