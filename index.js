var express = require('express');
var app = express.createServer(express.logger());
var io = require('socket.io').listen(app);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile('/index.html');
});

app.get('/messages', function(req, res){
  res.sendfile('/messages.html');
});

io.configure(function () {  
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

//var msgs = io.of('/messages');

/* msgs.on('connection', function(socket){
  console.log('someone connected');
}); */

io.sockets.on('connection', function(socket){   
  //io.set("transports", ["xhr-polling"]);
  //io.set("polling duration", 10);

  socket.on("feedback", function(feedback){
    io.sockets.emit("feedback", feedback);
	//msgs.sockets.emit("feedback", feedback);
	console.log(feedback);
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log('listening');
});