// Takes an input json object
module.exports = function(input) {
	var conf = require('./config.js'),
	conf.controls.forEach(function(c) {
		if(c.type == input.type && c.number = input.number) {
			normalized_pos = input.value + (c.joy_range / 2);
			scale = c.servo_max / c.joy_range;
			duty_cycle = (normalized_pos * scale * (c.servo_max - c.servo_min)) + c.servo_min;
			b.analogWrite(c.servo, duty_cycle, 60, null);
			return;
		}
	}
}
