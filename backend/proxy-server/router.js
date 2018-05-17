import DBManager from './db-manager';

class HTTPRouter {
	
	constructor(app) {
		this.app = app;
		this.dbManager = new DBManager();
		
		this.app.get(/\/[defects].*/, ( req, res )=> {

			console.log ('This is a "GET" request');
			if(req.query){
				let tableName = req.query.tableName
				if(tableName){
					this.dbManager.getAll(tableName).then( (data)=> {
						res.send(JSON.stringify(data));
					}).catch((err)=> {
						res.send(err);
					});					
				}
			}			
		});

		this.app.post( '/defects', ( req, res ) => {

			console.log ('This is a "POST" request');

			res.send('Hello POST!');
		});

		this.app.put( '/defects', ( req, res ) => {

			console.log ('This is a "PUT" request');

			res.send('Hello PUT!');
		});

		this.app.delete( '/defects', ( req, res ) => {

			console.log ('This is a "DELETE" request');

			res.send('Hello DELETE!');
		});
	}
} 

export { HTTPRouter };