import HTTPListener from './listener';

class HTTPServer {

	constructor(app, port, router) {

		this.app = app;
		let path = __dirname.replace('backend\\http-server', '');
		this.app.set('views', path + '\\views');
		this.app.set('view engine', 'ejs');	

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