import bodyParser from 'body-parser';
import request from 'sync-request';
import config from '../../config';
import jwt from 'jsonwebtoken';
import DataManager from './data-manager';

const SECRET_KEY = 'tgc-2-secret';

let USERS = [];

class HTTPRouter {

	constructor(app, callback) {
		
		this.dataManager = new DataManager(callback);
		this.app = app;
		this.app.use( bodyParser.urlencoded( { extended: true } ));
		this.app.use( bodyParser.json() );

		USERS = getAllUsers();

	    this.app.get('/', /*verifyToken, */( req, res ) => {
/*
			jwt.verify( req.token, SECRET_KEY, ( err, authData )=> {
				if(err) {
					console.log(err);
					res.sendStatus(403);
				} else {*/

					//console.log('GET');
					res.setHeader('Access-Control-Allow-Orogin', '*');
					res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
					res.setHeader('Content-Type', 'text/html');
					let path = __dirname.replace('\\backend\\http-server', '');
					path += '\\index.html';
					//console.log(req.originalUrl);
					res.sendFile(path);
					// res.render('home', function(err, html) {
					// 	console.log('GET');
					// 	res.setHeader('Access-Control-Allow-Orogin', '*');
					// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
					// 	res.setHeader('Content-Type', 'text/plain');
					// 	res.send(html);
					// });
/*				}
			})*/

			//res.end();		

		});		
		
		this.app.get(/\/[defects].*/, ( req, res )=> {

			console.log ('This is a "GET" request');
			if(req.query){
				let tableName = req.query.tableName
				if(tableName){
					this.dataManager.getAll(tableName).then( (data)=> {
						res.send(JSON.stringify(data));
					}).catch((err)=> {
						res.send(err);
					});					
				}
			}			
		});

		this.app.post('/login', ( req, res, next ) => {

			//console.log(req.body);
			
			let checkedUser = {
				username: req.body.username,
				password: req.body.password
			}

			//console.log(checkedUser);

			let user = findUser(checkedUser);

			if(user) {
				jwt.sign( { user }, SECRET_KEY, { 
					expiresIn: config.TOKEN_LIMIT,  
				}, ( err, token ) => {

					//console.log(jwt.decode(token));
					
					// for(let i=0; i<USERS.length; i++) {
					// 	if(USERS[i].userId === user.userId) {
					// 		USERS[i].token = token;
					// 		break;
					// 	}
					// }

					res.json({
						userId: user.userId,
						token: token
					})
				});
			} else {
				res.sendStatus(403);
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

		// this.app.all(/\/[defects].*/, verifyToken, function( req, res) {

		// 	let serviceCallResponse;

		// 	jwt.verify( req.token, SECRET_KEY, ( err, authData )=> {
		// 		if(err) {
		// 			res.sendStatus(403);
		// 		} else {
				
	 //        		serviceCallResponse = request(req.method, config.PROXY_SERVER + ':' + config.PROXY_PORT + req.originalUrl, {
	 //            		json:req.body
	 //        		});
	        
	 //        		res.send(serviceCallResponse.getBody('utf8'));
		// 		}
		// 	})
		// });

	} 

}

function verifyToken( req, res, next ) {
	let bearerHeader = req.headers['authorization'];

	if( typeof bearerHeader !== 'undefined' ) {
			
		let bearer = bearerHeader.split(' ');
		let bearerId = +bearer[0];
		let bearerToken = bearer[1];

		let method = req.method;
		let path = req.path;

		if(path === '/defects' && method !== 'GET') {
			for(let i = 0; i < USERS.length; i++){
				if(USERS[i].userId === bearerId && USERS[i].rights > 1) {
					req.token = null;
					next();
				}
			}
		}

		req.token = bearerToken;
		next();
	} else {
		res.redirect('/login');
	}
}

function findUser(user) {
	let result;
	if(!user) return result;
	for(let i = 0; i < USERS.length; i++){
		if(user.username === USERS[i].username && user.password === USERS[i].password) {
			result = USERS[i];
			break;
		}
	}
	return result;
}

function getAllUsers() {
	let users = [
		{ userId: 0, username: 'admin', password: '123', rights: 0  },
		{ userId: 1, username: 'brad', password: '111', rights: 1 },
		{ userId: 2, username: 'guest', password: ' ', rights: 2 }
	]
		return users;
}

export { HTTPRouter };