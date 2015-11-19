var net = require('net');
var joystick = new (require('./node-joystick/joystick'))(0, 3000, 3);


var HOST = 'localhost'
var PORT = 5000;

console.log('starting');

var client = new net.Socket();

function send (data) {
    var str = JSON.stringify(data);
    console.log(str);
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
    
    console.log('DATA: ' + data);
    // Close the client socket completely
    
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});
