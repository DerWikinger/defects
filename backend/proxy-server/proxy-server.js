require('babel-register')({
    presets: [ 'es2015' ]
});

var config = require('../../config');

var HTTPRouter = require('./router');
var bodyParser = require('body-parser');
var express = require('express');
var proxyApp = express();

proxyApp.use( bodyParser.urlencoded( { extended: true } ));
proxyApp.use( bodyParser.json() );

var proxyRouter = new HTTPRouter.HTTPRouter(proxyApp);

proxyApp.listen(config.PROXY_PORT, ()=> {
	console.log('Proxy Server works on port: ' + config.PROXY_PORT);
});