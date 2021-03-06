class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
        //this.scene = scene;
        //this.sfxMusic = scene.sound.add('sfx_music');
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('S-tier_spaceship', './assets/spaceship04V2.png');
        this.load.image('starfield', './assets/spirals.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 8,
            endFrame: 9
        });
        //sfxMusic = scene.sound.add('sfx_music');
    }

    create() {
        // place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);


        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    
        // add rocket player 1
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
    
        // 60-second play clock    
        // scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall((game.settings.gameTimer), () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu',
                scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // add spaceship (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'S-tier_spaceship', 0, 50).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 20).setOrigin(0, 0);

        this.ship02.moveSpeed = game.settings.spaceshipSpeed + 3;

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        //keyP = this.input.keyboard.addKey(Phaser.Input.Pointer.KeyCodes.P);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
   
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });
        
        // initialize score
        this.p1Score = 0;

        // fire UI
        this.fireUI = "FIRE";

        // timer UI
        this.timerUI = 0;

        // initialize high score
        // this.p1HiScore = "High Score: " + this.p1Score;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2,
            this.p1Score, scoreConfig);

        scoreConfig.fixedWidth = 0;

        this.scoreRight = this.add.text(borderUISize * 8 + borderPadding * 8, borderUISize + borderPadding*2,
            "High Score: " + p1HiScore, scoreConfig);

        this.fireUI = this.add.text(borderUISize * 4 + borderPadding * 4, borderUISize + borderPadding*2,
            this.fireUI, scoreConfig);

        this.timerUI = this.add.text(borderUISize * 6 + borderPadding * 6, borderUISize + borderPadding*2,
            this.timerUI, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock    
        // scoreConfig.fixedWidth = 0; 
        /*
        this.clock = this.time.delayedCall((game.settings.gameTimer), () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu',
                scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this); */

        this.sound.play('sfx_music');
    }

    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
            this.sound.pauseAll('sfx_music');
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.sound.pauseAll('sfx_music');
        }  
        
        for(let i = 1; i < this.game.settings.gameTimer; i++) {
            if(this.clock.getRemainingSeconds() > i) {
                this.timerUI.text = Math.floor(this.clock.getRemainingSeconds());
            }
        }
        //console.log(this.clock.getRemainingSeconds());
        //this.timerUI = Math.floor(this.clock.getRemainingSeconds());

        this.starfield.tilePositionX -= starSpeed;

        if (!this.gameOver) {
        this.p1Rocket.update();    // update the rocket
        this.ship01.update();      // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();            
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

        checkCollision(rocket, ship) {
            // simple AABB checking
            if(rocket.x < ship.x + ship.width && 
                rocket.x + rocket.width > ship.x &&
                rocket.y < ship.y + ship.height &&
                rocket.height + rocket.y > ship.y) {
                    return true;
            } else {
                return false;
            }
        }

        shipExplode(ship) { 
            // tempararily hide the ship
            ship.alpha = 0;
            // create explosion sprite at ship's position
            let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
            boom.anims.play('explode');
            boom.on('animationcomplete', () => {
                ship.reset();
                ship.alpha = 1;
                boom.destroy();
            })
            // score add and repaint
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
            //console.log(this.p1Score + " " + p1HiScore);
            if (this.p1Score > p1HiScore) {
                p1HiScore = this.p1Score;
                this.scoreRight.text = "High Score: " + this.p1Score;
            }
            let w = Math.floor(Math.random()*4.8 + 1);
            switch(w){
                case 1:
                    this.sound.play('sfx_explosion01');
                    break;
                case 2:
                    this.sound.play('sfx_explosion02');
                    break;
                case 3: 
                    this.sound.play('sfx_explosion03');
                    break;
                case 4:
                    this.sound.play('sfx_explosion04');
                    break;
                case 5:
                    this.sound.play('sfx_explosion');
                    break;
            }
        }

}