var b = require('bonescript'),
	config = require('./config.js'),
	net = require('net');

function jsToServo(input) {
	conf.controls.forEach(function(c) {
		if(c.type == input.type && c.number = input.number) {
			normalized_pos = input.value + (c.joy_range / 2);
			scale = c.servo_max / c.joy_range;
			duty_cycle = (normalized_pos * scale * (c.servo_max - c.servo_min)) + c.servo_min;
			b.analogWrite(c.servo, duty_cycle, 60, null);
			return;
		}
	});
}

function init() {
	config.controls.forEach(function(c) {
		b.pinMode(c.pin, b.OUTPUT);
	});
	net.createServer(onConnection).listen(config.beaglebone_port);
	console.log("Server running at port "+port+"\n");
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
  socket.write("Succesfully connected to BeagleBone. ");
  socket.on('data', onData);
  socket.on('end', function () {
	  console.log("Client has left")
  });
}

init();
