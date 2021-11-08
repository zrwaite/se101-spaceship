import Sprite from "../sprite.js"
export default class Planet extends Sprite{
  constructor(...args){
    super(...args)
    this.image = document.getElementById("default-planet")
    this.height = 150
    this.width = 150
  }
  update(deltaTime) {
    //Add special update code here if needed
    super.update()
  }
}
