const buildShip = (shipName, pos, game) => {
	switch (shipName){
		case "Bebop": case "bebop":
			import buildBebop from "./userShips/bebop.js";
			return buildBebop(pos, game); //build the ship and return it 
		// fill out cases for all ships
		case "All": case "all":
			let ships = []; 
			ships.push(getShip("bebop", pos, game)); //Build each ship into array to return
			// ship.push(getShip("bismark")); // get all ships
			// Fill this out for all ships
			return ships;
	}
}	
export default {buildShip};