var http      = require('http');
var fs        = require('fs');
var router    = require('routes')();
var io        = require('socket.io');

var api       = require('./api.js');
var Logger    = require('./logger.js');

(function () {
  var PORT                 = 5001;
  var LOGNAME              = 'server';
  var INDEX_FILE_PATH      = 'public/index.html';
  var MANIFEST_FILE_PATH   = 'public/manifest.json';

  var server;
  var socket;

  function _getClientAddress(req) {
    return (req.headers['x-forwarded-for'] || '').split(',')[0]
      || req.connection.remoteAddress;
  };

  function _getWSClientAddress(ws) {
    if (ws && ws.upgradeReq && ws.upgradeReq.connection) {
      return ws.upgradeReq.connection.remoteAddress || '';
    }
    return '';
  };

  function _generateClientResponse() {
    return fs.readFileSync(INDEX_FILE_PATH);
  };

  function _wsBroadcast(event, msg) {
    socket.emit(event, msg);
  };

  function _info(req) {
    return {
      src: _getClientAddress(req)
    };
  };

  function _sendResponse(res, options) {
    return function () {
      res.write(options ? options.body : '');
      res.statusCode = options ? options.status : 200;
      res.end();
    };
  };

  
  // Routes:
  // index
  router.addRoute('/', function (req, res, params) {
    var html = _generateClientResponse();
    _sendResponse(res, { body: html })();
    Logger.log(Logger.LOGLEVEL.INFO, req.method + ' /', LOGNAME, _info(req));
  });
  // Manifest
  router.addRoute('/manifest.json', function (req, res, params) {
    _sendResponse(res, { body: fs.readFileSync(MANIFEST_FILE_PATH) })();
    Logger.log(Logger.LOGLEVEL.INFO, req.method + ' /', LOGNAME, _info(req));
  });

  
  // Create server
  server = http.createServer(function (req, res) {

  	// Check if the HTTP Request URL matches on of our routes.
  	var match = router.match(req.url);

  	// We have a match!
  	if (match) match.fn(req, res, match.params);
  });

  // Start web sockets+HTTP server
  socket = io.listen(server.listen(PORT));
  Logger.log(Logger.LOGLEVEL.INFO, 'Started HTTP+websocket server on port ' +
             PORT, LOGNAME, { src: 'self' });


  socket.sockets.on('connection', function (client) {
    // API
    client.on('mv', function (coords) {
	  var coordsArray = coords.split(',');
      api.executeCmd(api.COMMAND.MOUSE_MOVE, [coordsArray[0], coordsArray[1]], null,
        _getWSClientAddress(client));
    });
    client.on('lc', function () {
      api.executeCmd(api.COMMAND.LEFT_CLICK, [], null,
        _getWSClientAddress(client));
    });
    client.on('rc', function () {
      api.executeCmd(api.COMMAND.RIGHT_CLICK, [], null,
        _getWSClientAddress(client));
    });
    client.on('ks', function (key) {
      api.executeCmd(api.COMMAND.KEY_STROKE, [key], null,
        _getWSClientAddress(client));
    });
  });
})();