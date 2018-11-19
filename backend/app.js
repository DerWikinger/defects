//app.js

require('babel-register')({
    presets: [ 'es2015' ]
});

var configModule = require('./http-server/config.js');
var httpServer = require('./http-server/server');
var httpRouter = require('./http-server/router');

var express = require('express');
var app = express();

const config = new configModule.Config();

//windows
var path = __dirname.replace('backend', '');
//app.use('/public', express.static(path + '\\public'));

//linux
app.use('/public', express.static(path + '/public'));


var server = new httpServer.HTTPServer(app, 8080, new httpRouter.HTTPRouter(app, config));

var t = setTimeout(function() {
	server.start();//задержка для инициализации данных, выполнямой ассинхронно
}, 5000);





