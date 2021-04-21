class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x , y, texture, frame) {
        super(scene, x , y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.isFiring = false; // track rocket firing status
        this.moveSpeed = 2; // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx boi
    }
    
    create() {
        this.scene.input.on('pointerdown', function (pointer) {
            console.log('down'); 
        }, this);
    }

    update() {
        // left/right movement
        if((keyLEFT.isDown || this.scene.input.activePointer.x < this.x) 
                && this.x >= borderUISize + this.width) {

            this.x -= this.moveSpeed;
            
        } else if ((keyRIGHT.isDown || this.scene.input.activePointer.x >= this.x)
                && this.x <= game.config.width - borderUISize - this.width) {

            this.x += this.moveSpeed;
        }
        /*
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }*/

        // fire button
        if((Phaser.Input.Keyboard.JustDown(keyF) || this.scene.input.activePointer.isDown) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
        }

        // if fired, move the rocket up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() { 
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding
    }
}