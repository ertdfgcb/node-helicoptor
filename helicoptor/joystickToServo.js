var joy_min = -32768,
	joy_max = 32768,
    servo_const = 0.062;

module.exports = function(data, servo) {
  if(data.type === 'axis' && servo != null) {
    joystick_pos = data.value;
    norm_pos = (joystick_pos - joy_min)/(joy_max * 2);
    duty_cycle = (norm_pos * servo_const) + servo_const;
    b.analogWrite(servo, duty_cycle, 60, null);
    console.log("Duty Cycle: " + 
        parseFloat(duty_cycle*100).toFixed(1) + " % / " + norm_pos);
  }
}
