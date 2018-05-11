import express from 'express';
import bodyParser from 'body-parser';
import HTTPRouter from './router';
import HTTPListener from './listener';

export class HTTPServer {

	constructor() {

		this.app = express();
		this.app.use( bodyParser.urlencoded( { extended: true } ));
		this.app.use( bodyParser.json() );

		this.listener = new HTTPListener(this.app, 3000);
		this.router = new HTTPRouter(this.app);
	}

	start() {
		this.listener.listen( ()=> {
			console.log(`Server listens to port: ${this.listener.port}`);
		});
	}
}