//server.js

import HTTPListener from './listener';

class HTTPServer {

	constructor(app, port, router) {

		this.app = app;
		//windows
		//let path = __dirname.replace('backend\\http-server', '');
		
		//linux
		//let path = __dirname.replace('backend/http-server', '');

		this.listener = new HTTPListener(this.app, port);
		this.router = router;
	}

	start() {
		this.listener.listen( ()=> {
			console.log(`HTTPServer works on port: ${this.listener.port}`);
		});
	}
}

export { HTTPServer };