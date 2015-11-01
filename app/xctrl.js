var exec = require('child_process').exec;

module.exports = (function () {
  var LEFT_MOUSE_BUTTON   = 1;
  var RIGHT_MOUSE_BUTTON  = 3;
  
  var KEY_CODE = {
    BACKSPACE: 8,
	ENTER    : 13,
	LEFT     : 37,
	RIGHT    : 39
  };

  function _initDisplay() {
    exec('export DISPLAY=\':0.0\'');
  };
  function _moveMouseRelative(x, y, negativeDelta) {
	  exec('xdotool mousemove_relative ' +
      (negativeDelta === '1' ? '-- ' : '') + x + ' ' + y);
  };

  function _leftClick() {
    exec('xdotool click ' + LEFT_MOUSE_BUTTON);
  };

  function _rightClick() {
    exec('xdotool click ' + RIGHT_MOUSE_BUTTON);
  };
  
  function _sendNonPrintableKeyStroke(keyStroke) {
    exec('xdotool key ' + keyStroke);
  };

  function _keyStroke(key, keyCode) {
    switch (keyCode) {
	  case KEY_CODE.BACKSPACE: 
	    _sendNonPrintableKeyStroke('BackSpace');
	    break;
	  case KEY_CODE.ENTER:
	    _sendNonPrintableKeyStroke('Return');
	    break;
	  case KEY_CODE.LEFT:
	    _sendNonPrintableKeyStroke('Left');
		break;
	  case KEY_CODE.RIGHT:
	    _sendNonPrintableKeyStroke('Right');
		break;
	  default:
	    exec('xdotool type \'' + key + '\'');
		break;
	}
  };

  return {
    initDisplay : _initDisplay,
    moveMouse   : _moveMouseRelative,
	leftClick   : _leftClick,
	rightClick  : _rightClick,
	keyStroke   : _keyStroke  
  };
})();
