const express = require('express')
const app = express();
const server = require('http').createServer(app);
const options = { /* ... */ };
const io = require('socket.io')(server, options);
const port = 3000
const path = require('path');

var games = [];
var nextGameID = 0;
var nextPlayerID = 0;
var playerId = 1;


io.on('connection', socket => { 

	socket.on('createGame', function(gameName)  { 
		console.log("Création de la partie" + gameName);
		if(gameName.length > 0){
			let link = "http://localhost:3000/game/"+nextGameID;
			let now = new Date();
			let createdAt = `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;

			let game = {id: nextGameID,
			 name: gameName,
			  link: link,
			  createdAt: createdAt,};
			games.push(game);
			socket.emit('gameCreated', game.link);
			io.emit('addGameToList', game );
			nextGameID++;
		}
		
	});

	socket.on('connectToGame', function() {
		socket.emit('gameConnect', playerId)
		playerId = 2;
	})
	socket.on('dataToServer', function(dataSet) {
		io.emit('dataToClient', dataSet);
		//console.log("Le joueur " + dataSet.player + " est à la position" + dataSet.x + "/" + dataSet.y);
	})

});




app.use(express.static(path.join(__dirname ,'../client')))

.get('/', (req, res) => {
  res.sendFile(path.join(__dirname ,'../client/index.html'), {})
})

.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname ,'../client/game.html'), {})
})

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  var chemin = path.join(__dirname ,'../client')
  //console.log(chemin)
})
