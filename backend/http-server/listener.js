//listener.js

export default class HTTPListener {

	constructor(app, port){
		this.app = app;
		this.port = port;
	}

	listen(callback) {
		this.app.listen(this.port, callback);
	}
}