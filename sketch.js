var mongojs = require("mongojs");
var db = mongojs('localhost:27017/basketball',['highscore']['playerID']);
var express = require('express'); // Get the module
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname));
//redirect / to our index.html file
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + 'index.html');
});

//start our web server and socket.io server listening
server.listen(3000, function(){
  console.log('listening on *:3000');
});

var SOCKET_LIST= {};
var PLAYER_LIST= {};
var players=0;
var val = 50; //scores y coordinate
var score =0;

var Player = function(id){
  var self={
    id:id,
    yPos:val,
    score:score
  }
  return self;
}



io.sockets.on('connection', function(socket){
    players++;  // know how many players
    db.playerID.insert({number:players}); // add player to the db upon connection
    socket.id = players;
    socket.y = val;
    socket.score = 0;
    SOCKET_LIST[socket.id] = socket;
    var player = Player(socket.id);
    PLAYER_LIST[socket.id]=player;

    val+=50;

    socket.on('disconnect',function(){
      delete SOCKET_LIST[socket.id];
      delete PLAYER_LIST[socket.id];
      db.playerID.remove({number:players});
      val-=50;
      players--; // decrease player count by 1 upon disconnection
      console.log("disconnected");
    });

    socket.on('score',function(data){
      console.log(data);
      player.score= data;
    });



    socket.on('gameOver',function(data){  //reinitialise game
      db.playerID.insert({highscore:data}); // highscore to the database

      db.collection("highscore").findOne({}, function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
      });

          for(var i in PLAYER_LIST){
            player.score= data;
            socket.emit('gameOver',data);
          }
  });

});


setInterval(function(){   //push packet to player every 25ms
  var pack = [];  // info of every player
  for(var i in PLAYER_LIST){
    var player = PLAYER_LIST[i];
    pack.push({
      score:player.score,
      yPos:player.yPos,
      number:player.id
    });
  }
  for(var i in SOCKET_LIST){
    var socket = SOCKET_LIST[i];
    socket.emit('score',pack);
  }
},1000/25);
