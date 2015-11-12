var b = require('bonescript');
var SERVO_ROLL = 'P9_14';
var SERVO_PITCH = 'P9_21';

// Load the TCP Library
net = require('net');

var PORT = 5000;
// Keep track of the chat clients
var clients = [];

b.pinMode(SERVO_ROLL, b.OUTPUT);
//b.pinMode(SERVO_PITCH, b.OUTPUT);

// Start a TCP Server
net.createServer(function (socket) {

  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  // Put this new client in the list
  clients.push(socket);

  // On Client Connect
  socket.write("Succesfully connected to BeagleBone. ");


  // Handle incoming messages from clients.
  socket.on('data', function (data) {
   console.log(data.toString())
   try {
       var json = JSON.parse(data.toString());
       if(json.number === 0) {
            var SERVO = SERVO_ROLL;
       }else if(json.number === 1) {
            var SERVO = SERVO_PITCH;
       }
       console.log(SERVO + " " + json.number);
       joystickToServo(json, -32767, 65534, SERVO)
   } catch (e) {
     console.log(e)
   }
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    console.log("Client has left")
  });
  
function joystickToServo(data, joy_min, joy_range, servo) {
  if(data.type === 'axis' && servo != null) {
    var limitrange = 0.062;
    joystick_pos = data.value
    norm_pos = (joystick_pos - joy_min)/joy_range
    duty_cycle = (norm_pos * limitrange) + limitrange;
    b.analogWrite(servo, duty_cycle, 60, null);
    console.log("Duty Cycle: " + 
        parseFloat(duty_cycle*100).toFixed(1) + " % / " + norm_pos);
  }
}

}).listen(PORT);

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port "+PORT+"\n");
