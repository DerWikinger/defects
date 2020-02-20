//router.js

import bodyParser from 'body-parser';
import request from 'sync-request';
import jwt from 'jsonwebtoken';
import DataManager from './data-manager';
import DBManager from './db-manager';

let codeWord = '';

class HTTPRouter {

	constructor(app, config) {
		
		this.dataManager = new DataManager(new DBManager(config));
		this.app = app;
		this.app.use( bodyParser.urlencoded( { extended: true } ));
		this.app.use( bodyParser.json() );
		this.config = config;
		codeWord = config.codeWord;

		this.app.get('/', (req, res)=> {

			res.setHeader('Access-Control-Allow-Orogin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
			res.setHeader('Content-Type', 'text/html');

			
			//Windows
			let path = __dirname.replace('\\backend\\http-server', '');
			path += '\\index.html';

			//Linux			
			//let	path = __dirname.replace('/backend/http-server', '');
			//path += '/index.html';

			res.sendFile(path);

		});		
		
		this.app.get(/[defects].*/, this.verifyToken, (req, res, next)=> {

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

		this.app.post('/login', (req, res, next)=> {

			let checkedUser = {
				username: req.body.username,
				password: req.body.password
			}

			let user = this.config.findUser(checkedUser);

			if(user) {
				jwt.sign( { user }, codeWord, { 
					expiresIn: this.config.tokenTimeLimit,  
				}, ( err, token ) => {
					if(err) {
						console.log(err);
						res.sendStatus(500);
					} else {
						res.json({
							userId: user.userId,
							token: token
						})
					}
				});
			} else {
				res.sendStatus(403);
			}
		});

		this.app.post( '/defects', this.verifyToken, (req, res)=> {

			console.log ('This is a "POST" request');

			let defect = req.body.defect;
			this.dataManager.editDefect(defect).then((data)=> {
				console.log(data);
				res.send(data);
			})
			.catch((err)=> {
				console.log(err);
				res.sendStatus(500);
			})
		});

		this.app.put( '/defects', this.verifyToken, (req, res) => {

			console.log ('This is a "PUT" request');

			let defect = req.body.defect;
			this.dataManager.addDefect(defect).then((data)=> {
				console.log(data);
				res.send(data);
			})
			.catch((err)=> {
				console.log(err);
				res.sendStatus(500);
			})
		});

		this.app.delete( '/defects', this.verifyToken, (req, res)=> {

			console.log ('This is a "DELETE" request');

			let defectId = req.query.defectId;
			this.dataManager.deleteDefect(defectId).then((data)=> {
				console.log(data);
				res.send(data);
			})
			.catch((err)=> {
				console.log(err);
				res.sendStatus(500);
			})
		});

		this.app.post('/config/get', this.verifyToken, (req, res)=> {
			
			console.log ('This is a "CONFIG GET" request');

			res.send(this.config);

		})

		this.app.post('/config/update', this.verifyToken, (req, res)=> {

			console.log ('This is a "CONFIG POST" request');

			let config = req.body.config;

			this.config.update(config)
			.then(()=> {
				codeWord = config.codeWord;
				res.sendStatus(200);
			})
			.catch(()=> {
				console.log(err);
				res.sendStatus(500);
			})
		})

		this.app.post('/users/all', this.verifyToken, (req, res)=> {
			
			console.log ('This is a "USERS ALL" request');

			res.send(this.config.USERS);			
		})

		this.app.put('/users', this.verifyToken, (req, res)=> {
			
			console.log ('This is a "USERS ADD" request');

			let user = req.body.user;
			console.log(user);
			this.config.addUser(user).then((newUserId)=> {
				res.send({newUserId: newUserId});
			})
			.catch((err)=> {
				console.log(err);
				res.sendStatus(500);
			})				
		})

		this.app.post('/users/update', this.verifyToken, (req, res)=> {
			
			console.log ('This is a "USERS UPDATE" request');

			let user = req.body.user;
			this.config.updateUser(user).then(()=> {
				res.sendStatus(200);
			})
			.catch((err)=> {
				console.log(err);
				res.sendStatus(500);
			})			
		})

		this.app.delete( '/users', this.verifyToken, (req, res)=> {

			console.log ('This is a "USERS DELETE" request');

			let userId = req.query.userId;
			
			this.config.deleteUser(+userId)
			.then(()=> {
				console.log('USER IS DELETED');
				res.sendStatus(200);
			})
			.catch((err)=> {
				console.log(err);
				res.sendStatus(500);
			})
		});
	}

	verifyToken(req, res, next) {

		console.log('VERIFY TOKEN');

		let bearerHeader = req.headers['authorization'];

		if( typeof bearerHeader !== 'undefined' ) {

			let bearer = bearerHeader.split(' ');
			let bearerId = +bearer[0];
			let bearerToken = bearer[1];

			let decoded;

			try {
				decoded = jwt.verify(bearerToken, codeWord);
			} catch(err) {
				console.log(err);
				res.sendStatus(403);
				return;		
			}

			let method = req.method;
			let path = req.path;
			let user = decoded.user;

			if(path.match(/defects/) && method === 'GET') {
				console.log('SIMPLE GET ', path);
				next();
			} else	if(path.match(/config/) || path.match(/users/)) {
				if(user.userRights === 0) {
					next();
				}				
			} else if (user.userRights < 2) {
					next();
			} else {
				res.sendStatus(403);
			}
			
		} else {
			res.redirect('/login');
		}

	}
}

export { HTTPRouter };