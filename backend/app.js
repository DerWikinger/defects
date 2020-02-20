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


var path = __dirname.replace('backend', '');

//windows
// app.use('/public', express.static(path + '\\public'));

//linux
app.use('/public', express.static(path + '/public'));	

app.setMaxListeners(30);

var server = new httpServer.HTTPServer(app, 8080, new httpRouter.HTTPRouter(app, config));

var t = setTimeout(function() {
	server.start();//задержка для инициализации данных, выполнямой ассинхронно
}, 5000);





