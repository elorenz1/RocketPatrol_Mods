/* **************************************************************
Name: Emersen Lorenz
Project Title: RocketPatrol_Mods
Time to Complete: 11 hours
Points BreakDown:
    - high score tracker (5 pts)
    - FIRE UI text (5 pts)
    - my own background music (5 pts)
    - speed increase (5 pts)
    - randomized enemy ship direction (5 pts)
    - new scrolling background sprite (5 pts)
    - player control after firing rocket (5 pts)
    - 4 new explosion fx (10 pts)
    - time remaining (10 pts)
    - new enemy spaceship (20 pts)
    - mouse control (20 pts)
    - final point count: 95
    - thoughts: USE mouse instead of arrow keys
        because the mouse will override it usually.
    - received a push in the right direction for 
        how to implement mouse control from 
        Enrico W. and Adam Smith. They pointed me
        to this site: 
        https://phaser.io/examples/v3/view/input/mouse/mouse-down
*****************************************************************/

// game configuration lol
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 4;

// reserve keyboard bindings
let keyF, keyP, keyR, keyLEFT, keyRIGHT;

// set a high score counter
let p1HiScore = 0;