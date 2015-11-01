var xctrl   = require('./xctrl.js');
var Logger  = require('./logger.js');

module.exports = (function (config) {
  var LOGNAME = 'api';

  var COMMAND = {
    INIT_DISPLAY : 'id',
    MOUSE_MOVE   : 'mv',
    LEFT_CLICK   : 'lc',
    RIGHT_CLICK  : 'rc',
    KEY_STROKE   : 'ks'
  }

  var _cmdMap = {};
  _cmdMap[COMMAND.INIT_DISPLAY] = function (args) {
    xctrl.initDisplay();
  };
  _cmdMap[COMMAND.MOUSE_MOVE] = function (args) {
    xctrl.moveMouse(args[0], args[1], args[2]);
  };
  _cmdMap[COMMAND.LEFT_CLICK] = function (args) {
    xctrl.leftClick();
  };
  _cmdMap[COMMAND.RIGHT_CLICK] = function (args) {
    xctrl.rightClick();
  };
  _cmdMap[COMMAND.KEY_STROKE] = function (args) {
    xctrl.keyStroke(args[0], args[1]);
  };

  function _executeApiCmd(cmdName, args, callback, info) {
    if (typeof _cmdMap[cmdName] === 'function') {
      _cmdMap[cmdName](args);
      // Logger.log(Logger.LOGLEVEL.INFO, 'Execute command: ' + cmdName +
      //   ' '  + args, LOGNAME, info);
      callback();
    } else {
      Logger.log(Logger.LOGLEVEL.ERROR, 'Unknown command: ' + cmdName,
        LOGNAME, info);
    }
  }

  return {
    COMMAND: COMMAND,
    executeCmd: function (cmdName, args, callback, info) {
      var _callback = typeof callback === 'function' ? callback :
        function () {};
      _executeApiCmd(cmdName, args, _callback, info);
    }
  }
})();
