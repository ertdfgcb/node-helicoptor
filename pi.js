var net = require('net'),
	config = require('./config.js');

var joystick = new (require('joystick'))(0, config.deadzone, config.sensitivity); 

var HOST = '192.168.1.80'
var PORT = 5000;

console.log('starting');

var client = new net.Socket();

function send (data) {
    var str = JSON.stringify(data);
    client.write(str);
}

client.connect(PORT, HOST, function() {
    joystick.on('button', send);
    joystick.on('axis', send);
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
//    client.write("Joystick server connected");

});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
    console.log('HELICOPTOR: ' + data);
    // Close the client socket completely
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
