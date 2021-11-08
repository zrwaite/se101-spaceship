import Sprite from "../sprite.js"
export default class Asteroid extends Sprite{
  constructor(...args){
    super(...args)
    this.image = document.getElementById("asteroid")
    this.height = 50
    this.width = 50
  }
  update(deltaTime) {
    //Add special update code here if needed
    super.update()
  }
}
