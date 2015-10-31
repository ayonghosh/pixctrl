var exec = require('child_process').exec;

module.exports = (function () {
  var LEFT_MOUSE_BUTTON   = 1;
  var RIGHT_MOUSE_BUTTON  = 3;
  
  function _moveMouseRelative(x, y) {
	exec('xdotool mousemove_relative ' + x + ' ' + y);
  };
  
  function _leftClick() {
    exec('xdotool click ' + LEFT_MOUSE_BUTTON);
  };
  
  function _rightClick() {
    exec('xdotool click ' + RIGHT_MOUSE_BUTTON);
  };
  
  function _keyStroke(key) {
    exec('xdotool key ' + key);
  };
  
  return {
    moveMouse : _moveMouseRelative,
	leftClick : _leftClick,
	rightClick: _rightClick
  };
})();