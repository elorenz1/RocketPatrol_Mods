class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        //this.scene = scene;
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.trip = 0;
    }

    /*dumbFunction(){
        if(this.scene.clock.getElapsed() > 2500){
            console.log("bruh");
        }
    }*/

    update() {
        // move spaceship left
        this.x -= this.moveSpeed;
        //console.log(this.scene.clock.getElapsed());
        //console.log((game.settings.gameTimer)/2);
        //this.dumbFunction();
        //if(this.scene.clock.getElapsed() > 2500) console.log(this.trip);
        if ((Math.floor(this.scene.clock.getElapsed()) >= (game.settings.gameTimer)/2) && this.trip == 0) {
            this.moveSpeed += 1;
            this.trip = 1;
        }
        // wrap around from left to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }
    
    // position reset
    reset() {
        this.x = game.config.width;
    }
}