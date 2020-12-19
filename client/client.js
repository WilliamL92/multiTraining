function launchGame(){
    let game = new Phaser.Game({
        type: Phaser.AUTO,
        width: 1350,
        height: 675,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        },
        scene: {
            preload,
            create,
            update
        }
    })

    function preload (){
        this.load.image('background1', 'media/background1.jpg');
        this.load.image('platform1', 'media/platform1.png');
        this.load.spritesheet('player1', 'media/player1/idle.png', { frameWidth: 34, frameHeight: 73 }
    )
    }

    function create (){
        let gameWidth = game.scale.displaySize._width
        let gameHeight = game.scale.displaySize._height

        let platforms = this.physics.add.staticGroup();

        this.add.image(gameWidth/2, gameHeight/2, 'background1').setScale(1.2);

        for(let i = 0; i < 5; i++){
            platforms.create((i*250)+40, 500, 'platform1').setOrigin(0).setScale(0.3).refreshBody()
        }

        player1 = this.physics.add.sprite(200, 450, 'player1')
        player1.setCollideWorldBounds(true)

        this.anims.create({
            key: 'idle1',
            frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 4 }),
            frameRate: 7,
            repeat: -1
        })

        this.physics.add.collider(player1, platforms)

        cursors = this.input.keyboard.createCursorKeys()
    }

    function update(){
        if (cursors.left.isDown){
            player1.setVelocityX(-160)
        }
        else if (cursors.right.isDown){
            player1.setVelocityX(160);
        }
        else{
            player1.setVelocityX(0)
            player1.anims.play('idle1', true)
        }
        if (cursors.up.isDown && player1.body.touching.down){
            player1.setVelocityY(-300)
        }
    }
}

launchGame()