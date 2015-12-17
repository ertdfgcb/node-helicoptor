var net = require('net'),
	config = require('./config.js');

console.log('Starting joystick server');

var joystick = new (require('joystick'))(0, config.deadzone, config.sensitivity),
	client = new net.Socket();

function send (data) {
    var str = JSON.stringify(data);
    client.write(str);
}

client.connect(config.beaglebone_port, config.beaglebone_host, function() {
    joystick.on('button', send);
    joystick.on('axis', send);
    console.log('CONNECTED TO: ' + config.beaglebone_addr);
});

client.on('data', function(data) {
    console.log('HELICOPTOR: ' + data);
});

client.on('close', function() {
    console.log('Connection closed');
});
