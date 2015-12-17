var b = require('bonescript'),
	jsToServo = require('./joystickToServo.js'),
	config = require('./config.js'),
	net = require('net'),

function init() {
	config.controls.forEach(function(c) {
		b.pinMode(c.pin, b.OUTPUT);
	});
	net.createServer(onConnection).listen(PORT);
	console.log("Chat server running at port "+PORT+"\n");
}

function onData(data) {
   try {
       var json = JSON.parse(data.toString());
	   setTimeout(jsToServo(json), 200);
   } catch (e) {
     console.log("err");
   }
}

function onConnection(socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  // On Client Connect
  socket.write("Succesfully connected to BeagleBone. ");

  // Handle incoming messages from clients.
  socket.on('data', onData);
  // Remove the client from the list when it leaves
  socket.on('end', function () {
    console.log("Client has left")
  });
}

init();
