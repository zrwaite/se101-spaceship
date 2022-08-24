# Software Engineering Spaceship Collaboration 🚀

<div align="left">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="50rem" height="50rem" />
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="50rem" height="50rem" />
<img src="manual/Zac.png" alt="zac" width="50rem" height="50rem" />
<img src="manual/Josiah.png" alt="zac" width="50rem" height="50rem" />
<img src="assets/images/ship/ColonyShip.png" alt="ship" width="65rem" height="50rem" />
</div>

<table>
<tr>
<td><img width="300" src="manual/Preview1.png"/></td>
<td><img width="300" src="manual/Preview2.png"/></td>
<td><img width="300" src="manual/Preview3.png"/></td>
</tr>
<tr>
<td><img width="300" src="manual/Preview4.png"/></td>
<td><img width="300" src="manual/Preview5.png"/></td>
<td><img width="300" src="manual/Preview6.png"/></td>
</tr>
</table>

## University of Waterloo Ideas Clinic 💻

_Adventure and glory await you!_ With the recent discovery of the galactic warp gate network, an international coalition of world governments has been hard at work design- ing and constructing humanity’s first interstellar colony ships. Bound for Kepler-438b, an exoplanet only 472.9 light-years away from Earth in the constellation Lyra, you and your colleagues have been tasked with developing the software control systems that will guide the ship through the hazards of deep space. The fate of thousands of pioneering souls rests on your collective ability to design, implement, and test your code and _work as a team!_

<img src="manual/CoverImage.png" alt="https://exoplanets.nasa.gov/alien-worlds/exoplanet-travel-bureau/" width="100%">

---

### Credits:

-   Faculty & Staff: Derek Rayside, John Harris
-   Student Volunteers: Zac Waite, Josiah Plett.

## Table of Contents

### 1: [Playing the Game](#1)

-   1.1: [Main Menu](#1.1)
-   1.2: [Manual Controls](#1.2)
-   1.3: [Game Objectives](#1.3)

### 2: [Installation](#2)

-   2.1: [Download the source code](#2.1)
-   2.2: [Install a server](#2.2)
-   2.3: [Install TypeScript](#2.3)

### 3. [Objectives](#3)

-   3.1. [Project Goal](#3.1)
-   3.2. [Learning Objectives: Teamwork](#3.2)
-   3.3 [Open-Ended Design](#3.3)
-   3.4: [Working Outside Your Comfort Zone](#3.4)
-   3.5: [How to Manage Feeling Lost or Overwhelmed](3.5)
-   3.6: [Feelings Beyond This Activity](#3.6)

### 4: [Team Design Methods](#4)

-   4.1: [Traditional Design: Divide & Conquer](#4.1)
-   4.2: [Modern Design: Integrate & Iterate](#4.2)

### 5: [TypeScript/JavaScript Language](#5)

-   5.1: [JavaScript Tips](#5.1)
-   5.2: [JavaScript Data Structures](#5.2)
-   5.3: [TypeScript Types](#5.3)
-   5.4: [TypeScript Compilation](#5.4)

### 6: [The Joziac Game Engine](#6)

-   6.1: [The Game Loop](#6.1)
-   6.2: [Coordinate System](#6.2)
-   6.3: [Helper Libraries](#6.3)

### 7: [Student API](#7)

-   7.1: [Your Ship](#7.1)
-   7.2: [Navigation](#7.2)
-   7.3: [Sensors](#7.3)
-   7.4: [Defence](#7.4)
-   7.5: [Propulsion](#7.5)

<h2 id='1'>1: Playing the Game!</h2>
<h3 id='1.1'>1.1: Main Menu</h3>
<img src="manual/MainMenu.png" alt="main menu" width="500rem"  />

-   On the main menu screen, there are several options/settings.

**Ship Select**:

-   Select the ship you want to play as - this will change the code used from the students folder.

**Settings**:

-   Toggle `Zoomed-in view` for a better view of the ship, or a better view of the map.
-   Toggle `Dev tools display` to see ship stats like position, speed, energy used and damage taken on the left side of the screen.
-   Toggle `Skip past main menu` to skip the loading screen when you start the game
-   Toggle `All ships are rendered` to see all of the ships on the map, not just the ones you are in control of.

**Galaxy**:

-   These are the levels you can play on - they get progressively harder.
-   Noob: Easy
    -   1 Solar System, 1 planet. Just go to the planet.
-   Compiles: Medium
    -   3 Solar Systems, 2 planets.
    -   Use warp gates to travel between solar systems.
    -   Pick the most survivable planet
-   Cracked: Hard
    -   5 Solar Systems, several planets.
    -   Navigate a looping maze of warp gates.
    -   Pick the most survivable planet, even if that means leaving a solar system behind.
-   Joziac: Impossible
    -   7 Solar Systems, many planets.
    -   Completely new challenges.
    -   A labyrinth of dynamic warp gates.
    -   To truly beat the game, you must land on **_Planet Joziac_**.

<h3 id='1.2'>1.2: Manual Controls</h3>

-   Arrow keys or WASD to move the ship.
-   Space bar to fire weapons - when in manual control, the torpedoes fire out the front.
-   M to warp through a warp gate.
-   L to land on a planet.

    _Manual controls are disabled on your ship if the `setThrusters` function is called_

<h3 id='1.3'>1.3: Game Objectives</h3>

-   **The goal of the game is the land on the best planet you can, without taking too much damage, and without using too much energy**
-   When in manual mode, you will have to make assumptions baaased on the look of the planet. When you are close to the planet, however, you can scan the planet to see its composition.
-   Use warpgates to travel between solar systems. Warping has a high energy cost, to make sure you know where you are going.
-   Avoid asteroids, or destroy them with torpedoes to avoid taking damage. When a large asteroid explodes, it will split into smaller asteroids.
-   You have unlimited torpedoes, but they have a cooldown, and cost energy.
-   Using your thrusters uses a lot of energy, but you also use some energy idling, so make sure to move quickly.

<h2 id='2'>2: Installation</h2>

<h3 id='2.1'>2.1: Download the source code</h3>

-   Find it on Github at https://github.com/zrwaite/SE101-Spaceship
-   Star the Repo ⭐ 👀
    -   <img src='manual/Star.png' height='30px'/>
-   Follow [Zac](https://github.com/zrwaite) and [Josiah](https://github.com/plettj) on Github 🙏 👀
    -   <img src='manual/Follow.png' height='30px'/>
-   Fork the Repo into your own repo
    -   <img src='manual/Fork.png' height='30px'/>
-   Clone your personal repo into your computer:
    -   `git clone https://github.com/{your username}/SE101-Spaceship`

<h3 id='2.2'>2.2: Install a server</h3>

-   To run your JavaScript code, you will need an http server. \*_If you already have one, you can skip this step._
-   The easiest server to install the Live Server extension on VSCode.
-   Install VSCode: https://code.visualstudio.com/download <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" alt="vscode" width="20rem" height="20rem" />
-   Install the Live Server Extension:
    -   <img src='manual/Extensions.png' width='300px'/>
    -   <img src='manual/LiveServer.png' width='300px'/>
-   To run the server, open the SE101-Spaceship folder in VS Code, and click the "Go Live" button at the bottom right.
    -   <img src='manual/Open.png' width='300px'/>
    -   <img src='manual/GoLive.png' width='300px'/>
    -   You can now find the game at in your browser at http://localhost:5500/.
<h3 id='2.3'>2.3: Install TypeScript</h3>

-   If you want to code in TypeScript, for type safety and better API documentation, you will need additional installations.
-   First install [Node.js](https://nodejs.org/en/download/).
-   Next, open the VSCode terminal and run `npm i` in the terminal.
-   You can test that typescript is installed by running `npm run compile` to compile the TypeScript code into JavaScript.
-   To code in TypeScript, use `npm run dev` (or `tsc --watch` if that works better). This will compile your code anytime you save a TypeScript file.

<h2 id='3'>3: Objectives</h2>

<h3 id='3.1'>3.1: Project Goal</h3>

Your goal is to engineer an _'AI'_ to fly your spaceship, to find your crew a habitable planet. While on your journey, each solar system acts like a level in a video game. Your goal is to navigate between solar systems using warp gates to find a planet ideal for your crew. This must be accomplished while avoiding the hazards of space like asteroids, to prevent ship damage. You should also try to reduce the amount of energy you use for the best chance of survival on the new planet.
Your spaceship has four subsystems:

<h3 id='3.2'>3.2: Learning Objectives - Teamwork</h3>

Your spaceship has 4 subsystems:

<table>
<tr>
<th>Subsystem</th>
<th>Functions</th>
</tr>
<tr>
<td>Defence</td>
<td><ul>
<li>aimTurret: Aim the ship's torpedo turret</li>
<li>getTubeCooldown: Get the time until one of the 4 turret tubes can be fired again</li>
<li>fireTorpedo: Attempt to fire a torpedo out of one of the 4 turret tubes</li>
</ul></td>
</tr>
<tr>
<td>Navigation</td>
<td><ul>
<li>warp: Attempt to use the quantum fluxtuator to travel through a nearby warp gate</li>
<li>land: Attempt to land on a nearby planet</li>
<li>mapData: Get data about your current solar system</li>
</ul></td>
</tr>
<tr>
<td>Propulsion</td>
<td><ul>
<li>setThrusters: Set the level of one of the ship's thrusters</li>
</ul></td>
</tr>
<tr>
<td>Sensors</td>
<td><ul>
<li>activeScan: Use a precise sensor to read data about all space objects in the range you define</li>
<li>passiveScan: Use an imprecise sensors to read data about all space objects in the solar system</li>
</ul></td>
</tr>
</table>

The subsystems need to work together in order for the ship to reach a habitable planet. Making this happen will require teamwork in several dimensions:

-   Interpersonal. Listen. Be nice. Many people want to show off their skills and knowledge. That’s ok. But do so in a way that does not denigrate your classmates: also find ways to celebrate their strengths. You are now in the big leagues: everyone here has skills and abilities, but those might not be immediately obvious to you. Pay attention and find something nice to say. You are all in this together, and you will be together for the next five years. You are here to collaborate with your classmates — not to compete with them.
-   Version Control (Git). Version control is a foundational technology for teamwork in software.
-   Division of Labour: How to organize the work to ensure that the subsystems integrate. A common way that software systems failed in the twentieth century is that all of the subsystems could perform their functionality independently, but couldn’t work together. Modern agile design techniques focus on integration and communication first, functionality second.
    While there is a lot of teamwork needed, teams will need people to show their leadership skills. Teams will need leaders to guide them through the hard times and be able to help the group. They will need to be active listeners. Leaders will need to listen to the group and be able to communicate to the group effectively. They will need to be creative and be able to strategically plan on the spot. Leaders are seen everywhere in the world and progress did not happen with just one person, they happened with a team and leaders.

<h3 id='3.3'>3.3: Open-ended Design</h3>

Open-ended design means to allow users to make their own customizations for a software to meet their needs which is what this project is about. Just like this activity, you and your crewmates will have to make your own customizations for your own spaceship. Each crewmate will be given different tasks and each task will be for a subsystem given by the leader or whatever you choose. There are four different subsystems and each subsystem there will be different tasks that everyone will have to do in order to successfully complete the activity.

<h3 id='3.4'>3.4: Working Outside Your Comfort Zone</h3>
This activity is designed to push you outside your comfort zone. By definition, that will feel uncomfortable. This activity is also designed to be fun. Welcome to the complex world of feelings! Being able to work outside your comfort zone is a skill — a skill that few people in the world have. You were admitted to Waterloo, in part, because you have the potential to develop this skill. This activity is designed to help you realize your potential — and to realize that you have this potential. Highschool was within your comfort zone. Maybe, at times, it enlarged your comfort zone — but it did that by pushing the boundary forwards from the inside. In this project, you will be using TypeScript/JavaScript and it will be easy to learn because there are many resources online and people you can talk to for help. Now we are going to take the warp gate to the other side. Hold on!

Some ways in which this activity is outside your comfort zone:
||Highschool|Spaceship Collaboration|
|-------|-------|-------|
|Pre-requisite knowledge|Carefully provided|Uses ideas from classes you haven’t taken yet|
|Time|Just enough to do it perfectly|Not enough|
|Programming Environment |Taught to you|Learn on your own|
|Classmates|Not as talented as you|Very talented|
|Team Size|2–4|∼ 16|

<h3 id='3.5'>3.5: How to Manage Feeling Lost or Overwhelmed</h3>
You might feel uncomfortable during this activity. Don’t worry! These are normal feelings. This activity is a safe space for you to explore managing these feelings. These feelings are very common amongst high-achievers — even amongst high-achievers over thirty years old! The key is to learn positive strategies to manage these feelings so that they don’t ruin your fun and impede your progress.

**We’re not ready to demo!** That’s a 20th century feeling. It’s time to let it go and embrace the century you were born in. The industry has learned from vast experience that this flavour of perfectionism does not produce the best software in most cases. There are two reasons people typically have this feeling: (1) the software is not integrated, and (2) the features are incomplete. A key insight of the late 20th century is that if we integrate first, then the system is always ready to demo — maybe some of the features still need to be improved, but the system does something. See section 2 to learn the right technical skills to work together this way. Integrate first, then your team will always be ready to demo.

**Lost...** Have no idea what to do? You’re feeling lost. How are you going to manage this feeling? You have choices.

**Negative:**

-   Run away! Start fiddling with your phone/computer.
-   Attack others. Maybe if you can make them feel vulnerable by attacking them then they won’t notice that you feel vulnerable.
-   Attack yourself. See Imposter Syndrome below.

**Positive:** Find someone to talk to. Perhaps a teammate. Perhaps a classmate on another team. Perhaps a TA or instructor. They can help get you started. We all feel lost sometimes.

**Overwhelmed!** Too many things! What to do next?!?! You’re feeling overwhelmed. You could choose a negative behaviour described above, or you could choose a positive strategy, such as:

-   Start with something small and achievable.
-   Reflect on your role on the team, and use that to focus your efforts.
-   Ask someone who depends on your work what they want to prioritize.

**Imposter Syndrome?** Do you really belong here? If you have doubts, then you are probably feeling imposter syndrome. (If you really wanted to study Economics or English but your uncle convinced you to come here instead, that’s a different issue — chat with your academic advisor.) Imposter syndrome is a thing that high-achieving people often suffer from: a feeling that you aren’t good enough or don’t belong — despite objective evidence to the contrary. You belong here. We admitted you. Our admissions processes are finely tuned by decades of experience. You can read more about how to manage these normal feelings.

-   [Harvard Business Review](https://hbr.org/2008/05/overcoming-imposter-syndrome).
-   [Imposter Syndrome: Wikipedia](https://en.wikipedia.org/wiki/Impostor_syndrome)

<h3 id='3.6'>3.6: Feelings Beyond This Activity</h3>
The previous discussion is about feelings you might have within this activity — feelings that this activity might provoke in you, by design. In that discussion, find someone to talk to means people doing the activity with you. You might also have these kinds of feelings outside of this activity. Some degree of these feelings is pretty common in first year generally. Going to university is a big adjustment. That’s normal. There are many resources to help you learn how to manage these kinds of feelings. Talking to friends, classmates, family, older students, etc., is always a good first step. The next step is to participate in UW Counselling Services’ workshops: https://uwaterloo.ca/campus-wellness/counselling-services/seminars-and-workshops/ coping-skills-seminars-online You can also speak with your academic advisor, in the First Year Engineering Office or in your home program. Here are some helpful links: 
- https://www.engsoc.uwaterloo.ca/resources/mental-health/ 
- https://uwaterloo.ca/engineering/current-undergraduate-students/engineering-counselling 
- https://uwaterloo.ca/campus-wellness/

<h2 id='4'>4: Team Design Methods</h2>
There are different ways in which a team can be organized to work on an open-ended design task. Experience has shown that some techniques work better than others. Understanding how to best organize the team’s work and communication can improve your chances of success.

<h2 id='4.1'>4.1: Traditional Design: Divide & Conquer</h2>
Divide & Conquer was made popular by the Roman emperor Julius Cesaer over two thousand years ago. It worked for him as a military strategy. It is also a useful technique in algorithms. Here’s what it looks like: 
1. Divide:
	- Split the systems into subsystems.
 	- Develop each subsystem independently. 
	- Test each subsystem in isolation. 
2. Conquer: 
	- Integrate the subsystems together. 
	- Test the system as an integrated whole.

From a teamwork perspective, it can work well for tasks such as harvesting crops, where everyone is doing roughly the same thing and there is relatively little communication required between squads. But for teams designing complex systems, Divide & Conquer tends to fail at integration time: the subsystems end up being incompatible.

<h2 id='4.2'>4.2: Modern Design: Integrate & Iterate</h2>
The solution to the problem of Divide & Conquer is to integrate first, before the tasks are even built: first design the interfaces, then develop the algorithms. This approach is sometimes referred to agile design, and includes concepts such as test-driven development (tdd) and continuous integration (ci). 
1. Integrate: The system as a whole should always be integrated. 
	- Test-First: Agree on some tests before you write code. 
	- Interfaces: Collaboratively design the subsystem interfaces (api). 
	- Mock Data: Demonstrate system integration with mock data.
 2. Iterate: 
	- Generalize to more test inputs. 
	- Improve performance. 
	- Refine interfaces as necessary. 
	- Sprint: a limited time period in which to implement improvements. – If you can’t do it within the sprint, defer it to a future sprint. – Always integrate and test on time.

<h2 id='5'>5: TypeScript/JavaScript Language</h2>

**This activity uses TypeScript \***or**\* JavaScript**

Some of you may have experience with TypeScript/JavaScript, but if not, that is okay! Whether you know them or not, this activity gives you an opportunity to go outside of your comfort zone.

You can write your code in JavaScript or TypeScript. JavaScript is the simplest to set up, since it is instantly available in the browser. However, if you want type safety and better API documentation, you should use TypeScript, which will compile into the JavaScript folder. Whatever you choose, your team must all agree, to avoid overriding JavaScript code when TypeScript is compiled.

TypeScript/JavaScript is an object-oriented language. Maybe you never learned object-oriented programming before. That’s okay. For most of this activity, you just need to use objects/classes that have already been defined, and you will be able to figure that out.

<h3 id='5.1'>5.1: JavaScript Tips</h3>
Semicolons are usually optional at the end of lines of JavaScript.

```javascript
// Single line comments ignore everything after the double slash`

/* Multi line comments
ignore everything
between the asterisks
including this */

const explanation = 'Constant declarations look like this'

let explanation2 = "This creates a scoped variable that can't be redeclared"

var explanation3 = 'This created a non-scoped variable that can be redeclared'

if (true) {
	console.log('This is an if statement')
} else {
	console.log('And this is an else statement')
}
for (let i = 0; i < 5; i++) {
	console.log('This is a for loop')
}
while (true) {
	console.log('This is a while loop with a break statement')
	break
}
```

<h3 id='5.2'>5.2: JavaScript Data Structures</h3>
Below are some JavaScript data types and other things that you will likely encounter in this activity. It is not a comprehensive list, so do not be afraid to research online documentation as needed. www.w3schools.com/js/ is a great resource.

**Objects:**

Can be declared like this:

```javascript
let obj = {}
```

You can declare the object with attributes:

```javascript
let obj = { name: 'Asteroid', distance: 5 }
```

You can add or edit attributes like this:

```javascript
obj.detected = true
```

**Arrays:**

Can be declared like this:

```javascript
let arr = []
```

You can declare the array with items:

```javascript
let arr = [obj, obj2, 'Dave', 5]
```

You can add items like this:

```javascript
arr.push(obj3)
```

And access items like this:

```javascript
arr[2]
```

<h3 id='5.3'>5.3: TypeScript Types</h3>

When you create a variable, the type is inferred from the value.

```typescript
const str = 'Hello' // The type is a string
const num = 5 // The type is a number
const bool = true // The type is a boolean
const arr = [1, 2, 3] // The type is an number[]
const arr2 = [1, 'a', true] // the type is (string | number | boolean)[]
const obj = { name: 'Asteroid', distance: 5 }
/* The type is: {
    name: string
    distance: number
}*/
```

You can also create types explicitly, for example to make sure function parameters are valid, or to make sure that the return value is valid.

```typescript
type spaceObjectName = 'Planet' | 'Asteroid' | 'WarpGate'
type spaceObject = {
	name: spaceObjectName,
	distance: number
}

const findSpaceObjects = (name: spaceObjectName): spaceObject {
	// ...
}
```

When in doubt, google it.

<h3 id='5.4'>5.4: TypeScript Compilation</h3>

-   TypeScript must be compiled to JavaScript before it can be used.
-   To compile your TypeScript code into the JavaScript folder, run `npm run compile` in the terminal.
-   To save time, run `npm run dev` in the terminal. This will compile your code anytime you save a TypeScript file.

<h2 id='6'>6: The Joziac Game Engine</h2>
This spaceship activity was built Josiah Plett and Zac Waite, with help from some other students. However, you don’t need to understand the underlying code to do this activity. Your instructor likely doesn’t understand every part of the system. This section describes the things that you will need to learn about the game.

<h3 id='6.1'>6.1: The Game Loop</h3>
The game loop is the main loop of the game. It runs continuously, and is responsible for updating the game state and rendering the game to the screen.

```typescript
// Behind the scenes, Joziac runs through a loop
// like this about 60 times per second
const gameLoop = () => {
	update() // Read the state of the game and make decisions
	draw() // Show that consequence on screen
}
```

The code you create is called in the middle of that update function, and updates the rest of the logic of the game.

<h3 id='6.2'>6.2: Coordinate System</h3>
The game is played on a 2D coordinate system. The origin is at the top left corner of the screen. The x-axis goes from left to right, and the y-axis goes from top to bottom. The bottom right coordinate is (720, 540).
In polar coordinates, the origin is at the center of the screen. It goes from -π to π starting from the left side. The side with the lower y axis has negative angle. 
<img src='manual/Coordinates.png' width='100%'/>

<h3 id='6.3'>6.3: Helper Libraries</h3>
We have provided you with some helper functions to help you integrate with our system.

**Vector2:**
A class for creating 2D vectors. Used for ship position, speed, acceleration, and more. You can use it like this:

```typescript
const direction = new Vector2(5, 7)
direction.add(new Vector2(1, 2))
direction.scale(2)
direction.subtract(new Vector2(2, 1))
console.log(direction.magnitude(), direction.angle())
//etc
```

**WithinPiRange**
A function that takes an angle and returns it within the range -π to π.
This is very useful, since most of the API parameters expect angles in this range, but angles can still be stored and returned to you outside of this range.

```typescript
const angle = (3 * Math.PI) / 2
console.log(WithinPiRange(angle)) // prints -1.5708 (-π/2)
```

**Math Library**
Not created by us and doesn't need to be imported, but the built in javascript math library has numerous useful mathematical functions and constants such as pow, sqrt, min, max, sin, round, Pi, E, etc. For more information, go to: https://www.w3schools.com/js/js_math.asp

<h2 id='7'>7: Student API!</h2>

To complete the activity, you need to write code to connect to the Joziac API. Your code is run in every game loop (50 times a second), so you will likely want to keep track of the gameframe to avoid running things too quickly.

<h3 id='7.1'>7.1: Your ship</h3>

Your ship is made up of 4 subsystems that work together to allow your ship to navigate the galaxies. No system can work without the others.

-   To find your code, open the folder `typescript/students`.
-   Open find the folder with your ship's name. example: `Bebop`
-   You have 4 files, representing each of the subsystems. This is where you write your code.

<h3 id='7.2'>7.2: Navigation</h3>
The navigation subsystem is used for collecting internal data and performing the automated functions for warping and landing.

This subsystem's update function includes the following abilities:

-   `getShipStatus: (key: shipStatusKey) => number`
    -   ````typescript
        type shipStatusKey: 'radius' | 'angularVelocity' | 'angle' | 'positionX' | 'positionY' | 'linearVelocityX' | 'linearVelocityY' | 'thrusterPowerMain' | 'thrusterPowerBow' | 'thrusterPowerClockwise' | 'thrusterPowerCounterClockwise'```
        ````
    -   Returns the value of the specifed attribute of your ship. This is crucial for decision making.
    -   Energy Cost: 10
-   `warp: () => Error|null`
    -   Attempts to travel through a nearby warpgate.
    -   Returns null if succesful.
    -   Energy cost: 5000
-   `land: () => Error|null`
    -   Attempts to land on a nearby planet.
    -   Returns null if succesful.
    -   Energy cost: 2000
-   `getMapData: () => MapData`
    -   Returns the current map data
    -   ```typescript
        interface MapData: {
        	solarSystemName: string
        	galaxy: GalaxyData
        }
        interface GalaxyData {
            name: string
            solarSystems: SolarSystemData[]
        }
        interface SolarSystemData {
            name: string
            warpGates: string[]
            planets: string[]
        }
        ```
    -   Energy cost: 1000

<h3 id='7.3'>7.3: Sensors</h3>
The sensors subsystem is used for collecting external data about the solar system to help you navigate.

This subsystem's update function includes the following abilities:

-   ` activeScan: (heading: number, arc: number, range: number) => EMSReading | Error`
    -   Scans the area within the 'pizza slice' arc you specify for any space objects, and returns precise data about them.
    -   ```typescript
        interface EMSReading {
        	angle: number
        	distance: number
        	velocity: Vector2
        	radius: number
        	closeRange?: {
        		scanSignature?: object
        	}
        }
        ```
    -   Energy cost: arc \* range^2 / 40
-   `passiveScan: () => PassiveReading[] | Error`

    -   Scans the entire map for any space objects, and returns imprecise data about them.
    -   ```typescript
        interface PassiveReading {
        	heading: number
        	gravity: number
        }
        ```
    -   Energy cost: 2500

<h3 id='7.4'>7.4: Defence</h3>

The defence subsystem is used for defending the ship from asteroids by using the torpedo system.

This subsystem's update function includes the following abilities:

-   `aimTurret: (angle: number) => void`

    -   Sets the turret to aim at the specified angle.
    -   Energy cost: (current angle - new angle) \* 10

-   `getTubeCooldown: (i: number) => number | Error`

    -   Returns the cooldown time of the specified torpedo tube.
    -   Energy cost: 5

-   `fireTorpedo: (i: number) => Error | null`

    -   Tries to fire the torpedo at the specified tube.
    -   Returns null if successful.
    -   Energy cost: 8 if successful, 2 if failed

<h3 id='7.5'>7.5: Propulsion</h3>

The propulsion subsystem is used for moving the ship.

This subsystem's update function includes just one ability. However, it is likely the most difficult to use.

-   setThruster: (thruster: ThrusterName, power: number) => Error | null
    -   Sets the power of the specified thruster.
    -   ```typescript
        type ThrusterName = 'main' | 'bow' | 'clockwise' | 'counterClockwise'
        ```
    -   Energy cost: 0, but you will lose energy over time based on the power of the thrusters.

<h3 id='7.6'>7.6: Using TypeScript</h3>

-   TypeScript must be compiled to JavaScript before it can be used.
-   To compile your TypeScript code into the JavaScript folder, run `npm run compile` in the terminal.
-   To save time, run `npm run dev` in the terminal. This will compile your code anytime you save a TypeScript file.

<h2 id='8'>8: Advanced Information</h2>
