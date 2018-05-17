// import HTTPListener from './listener';

// class HTTPServer {

// 	constructor(app, port, router) {
// 		this.listener = new HTTPListener(app, port);
// 		this.router = router;
// 	}

// 	start() {
// 		this.listener.listen( ()=> {
// 			console.log(`Server listens to port: ${this.listener.port}`);
// 		});
// 	}
// }

// export { HTTPServer };

require('babel-register')({
    presets: [ 'es2015' ]
});

var config = require('../../config');
var httpRouter = require('./router');
var bodyParser = require('body-parser');
var express = require('express');

function start(app) {
	app.use( bodyParser.urlencoded( { extended: true } ));
	app.use( bodyParser.json() );
	var router = new httpRouter.HTTPRouter(app);
	app.listen(config.HTTP_PORT, () => {
		console.log('HTTPServer works on port: ' + config.HTTP_PORT);
	});
}

module.exports.start = start;