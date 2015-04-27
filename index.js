var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

/* io.on('connection', function(socket){
  console.log('a user connected');
    
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
}); */

io.on('connection', function(socket){ 
  //var tweet = {user: "nodesource", text: "Hello, world!"};	
	
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  
  socket.on("tweet", function(tweet){
    io.emit("tweet", tweet);
	console.log(tweet);
  });
  
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});