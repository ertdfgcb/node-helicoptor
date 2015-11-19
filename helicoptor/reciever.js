var b = require('bonescript'),
	jsToServo = require('./joystickToServo.js'),
	SERVO_ROLL = 'P9_14',
	SERVO_PITCH = 'P9_21',
	SERVO_YAW = 'P8_13',
	PITCH_AXIS = 1,
	ROLL_AXIS = 0,
	YAW_AXIS = 5,
	net = require('net'),
	PORT = 5000,
	clients = [];

function init() {
	b.pinMode(SERVO_ROLL, b.OUTPUT);
	b.pinMode(SERVO_PITCH, b.OUTPUT);
	b.pinMode(SERVO_YAW, b.OUTPUT);
	net.createServer(onConnection).listen(PORT);
	console.log("Chat server running at port "+PORT+"\n");
}

function onData(data) {
   console.log(data.toString())
   try {
       var json = JSON.parse(data.toString());
       if(json.number === ROLL_AXIS) {
            var SERVO = SERVO_ROLL;
       }else if(json.number === PITCH_AXIS) {
            var SERVO = SERVO_PITCH;
       }else if (json.number === YAW_AXIS) {
		var SERVO = SERVO_YAW;
	}
       console.log(SERVO + " " + json.number);
       jsToServo(json, SERVO)
   } catch (e) {
     console.log(e)
   }
}

function onConnection(socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  // Put this new client in the list
  clients.push(socket);

  // On Client Connect
  socket.write("Succesfully connected to BeagleBone. ");


  // Handle incoming messages from clients.
  socket.on('data', onData);
  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    console.log("Client has left")
  });
}
  

init();
