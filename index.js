var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/messages', function(req, res){
  res.sendFile(__dirname + '/messages.html');
});

/* io.configure(function () {  
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
 */
var msgs = io.of('/messages');

msgs.on('connection', function(socket){
  console.log('someone connected');
});

io.on('connection', function(socket){   
  //io.set("transports", ["xhr-polling"]);
  //io.set("polling duration", 10);

  socket.on("feedback", function(feedback){
    io.emit("feedback", feedback);
	msgs.emit("feedback", feedback);
	console.log(feedback);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening');
});