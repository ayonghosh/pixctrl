var exec = require('child_process').exec;

module.exports = (function () {
  var LEFT_MOUSE_BUTTON   = 1;
  var RIGHT_MOUSE_BUTTON  = 3;

  var KEY_CODE = {
    BACKSPACE: 8,
  ENTER    : 13,
  SHIFT    : 16,
  CTRL     : 17,
  ALT      : 18,
  LEFT     : 37,
  UP       : 38,
  RIGHT    : 39,
  DOWN     : 40,
  ESCAPE   : 27
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

  function _sendNonPrintableKeyStroke(keySym) {
    exec('xdotool key ' + keyStroke);
  };

  function _getModifierKeySym(keyCode) {
    switch (keyCode) {
      case KEY_CODE.SHIFT:
      return 'Shift';
    case KEY_CODE.CTRL:
      return 'Ctrl';
    case KEY_CODE.ALT:
      return 'Alt';
    default:
      return '';
    }
  };

  function _keyStroke(key, keyCode, modifierKeyCode) {
    switch (keyCode) {
    case KEY_CODE.BACKSPACE:
      _sendNonPrintableKeyStroke('BackSpace');
      break;
    case KEY_CODE.ENTER:
      _sendNonPrintableKeyStroke('Return');
      break;
    case KEY_CODE.LEFT:
      _sendNonPrintableKeyStroke('Left'); // 'leftarrow'
    break;
    case KEY_CODE.RIGHT:
      _sendNonPrintableKeyStroke('Right'); // 'rightarrow'
    break;
    case KEY_CODE.UP:
      _sendNonPrintableKeyStroke('Up');
    break;
    case KEY_CODE.DOWN:
      _sendNonPrintableKeyStroke('Down');
    break;
    case KEY_CODE.ESCAPE:
      _sendNonPrintableKeyStroke('Escape');
    break;
    default:
      exec('xdotool type \'' +
      (modifier ? _getModifierKeySym(modifierKeyCode) + '+' : '')
      + ' ' + key + '\'');
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
