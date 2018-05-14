export default class HTTPRouter {
	
	constructor(app) {
		this.app = app;
		
		this.app.get('/defects', ( req, res )=> {

			console.log ('This is a "GET" request');

			res.send('Hello GET!');
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