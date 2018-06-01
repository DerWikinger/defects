require('babel-register')({
    presets: [ 'es2015' ]
});

var config = require('../config');
var httpServer = require('./http-server/server');
var httpRouter = require('./http-server/router');

var express = require('express');
var app = express();

var path = __dirname.replace('backend', '');
app.use('/public', express.static(path + '\\public'));

var server = new httpServer.HTTPServer(app, config.HTTP_PORT, new httpRouter.HTTPRouter(app, () => {
	server.start();
}));
