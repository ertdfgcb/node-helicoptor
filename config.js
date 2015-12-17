module.exports = {
	joy_range: 65536,
	beaglebone_host: "localhost",
	beaglebone_port: 5000,
	deadzone: 3500,
	sensitivity: 350,
	controls: [
		{ // roll
			pin: 'P9_14',
			number: 0,
			type: 'axis',
			servo_min: 0.003,
			servo_max: 0.145
		},
		{ // pitch
			pin: 'P9_21',
			number: 1,
			type: 'axis',
			servo_min: 0.003,
			servo_max: 0.145
		}
	]
}
