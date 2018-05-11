export default class HTTPRouter {
	
	constructor(app) {
		this.app = app;
		
		this.app.get('/defects', ( req, res )=> {

			console.log ('This is a "GET" request');

			//var path = __dirname.replace('server', 'client/public');

			res.send('Hello GET!');

			// var reqURL  = req.url;
			// if (reqURL == '/')
			// 	res.sendFile(path + '/index.html');
			// else
			// 	res.sendFile(path + reqURL);

		});

		this.app.post( '/defects', ( req, res ) => {

			console.log ('This is a "POST" request');

			res.send('Hello POST!')
		})

		this.app.put( '/defects', ( req, res ) => {

			console.log ('This is a "PUT" request');

			res.send('Hello PUT!')
		})

		this.app.delete( '/defects', ( req, res ) => {

			console.log ('This is a "DELETE" request');

			res.send('Hello DELETE!')
		})
	}
} 