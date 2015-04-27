var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/messages', function(req, res){
  res.sendFile(__dirname + '/messages.html');
});


var msgs = io.of('/messages');

msgs.on('connection', function(socket){
  console.log('someone connected');
});
msgs.emit('hi', 'everyone!');

io.on('connection', function(socket){ 
  //var tweet = {user: "nodesource", text: "Hello, world!"};	
	
  /* socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  }); */
  
  socket.on("feedback", function(feedback){
    io.emit("feedback", feedback);
	msgs.emit("feedback", feedback);
	console.log(feedback);
  });
  
});





http.listen(process.env.PORT || 3000, function(){
  console.log('listening');
});