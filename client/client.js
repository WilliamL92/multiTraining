function launchGame(playerId, socket){
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

        if(playerId == 1){
            player1 = this.physics.add.sprite(200, 450, 'player1')
            player2 = this.add.sprite(600, 450, 'player1')
            player1.setCollideWorldBounds(true)
            this.physics.add.collider(player1, platforms)
        }else{
            player1 = this.add.sprite(600, 450, 'player1')
            player2 = this.physics.add.sprite(600, 450, 'player1')
            player2.setCollideWorldBounds(true)
            this.physics.add.collider(player2, platforms)
        }
        
        
        
        
        this.anims.create({
            key: 'idle1',
            frames: this.anims.generateFrameNumbers('player1', { start: 0, end: 4 }),
            frameRate: 7,
            repeat: -1
        })

        
        

        cursors = this.input.keyboard.createCursorKeys()

        var sendDataToServer = setInterval(sendData, 17)

        function sendData(){
            if(playerId == 1){
                var dataSet = {player: 1, x: player1.x, y:player1.y};
                socket.emit('dataToServer', dataSet);
            }else if(playerId == 2){
                var dataSet = {player: 2, x: player2.x, y:player2.y}; 
            }
            socket.emit('dataToServer', dataSet);
        }

        socket.on('dataToClient', dataSet =>{
            if(dataSet.player != playerId){
                if(dataSet.player == 1){
                    player1.x = dataSet.x;
                    player1.y = dataSet.y;
                }else{
                    player2.x = dataSet.x;
                    player2.y = dataSet.y;
                }
            }
        })
    }

    function update(){
        if(playerId == 1){
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
        }else if(playerId == 2){
            if (cursors.left.isDown){
                player2.setVelocityX(-160)
            }
            else if (cursors.right.isDown){
                player2.setVelocityX(160);
            }
            else{
                player2.setVelocityX(0)
                player2.anims.play('idle1', true)
            }
            if (cursors.up.isDown && player2.body.touching.down){
                player2.setVelocityY(-300)
            }
        }
       
    }
}

