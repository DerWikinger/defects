import bodyParser from 'body-parser';
import request from 'sync-request';
import jwt from 'jsonwebtoken';
import DataManager from './data-manager';

let codeWord = '';

class HTTPRouter {

	constructor(app, config, callback) {
		
		this.dataManager = new DataManager(config, callback);
		this.app = app;
		this.app.use( bodyParser.urlencoded( { extended: true } ));
		this.app.use( bodyParser.json() );
		this.config = config;
		codeWord = config.codeWord;

		this.app.get('/', (req, res)=> {

			res.setHeader('Access-Control-Allow-Orogin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
			res.setHeader('Content-Type', 'text/html');
			let path = __dirname.replace('\\backend\\http-server', '');
			path += '\\index.html';
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
					res.json({
						userId: user.userId,
						token: token
					})
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
				res.sendStatus(500);
			})
		})
	}

	verifyToken(req, res, next) {

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
			} else	if(path.match(/config/)) {
				if(user.rights === 0) {
					next();
				}				
			} else if (user.rights < 2) {
					next();
			} else {
				res.sendStatus(403);
			}
			
		} else {
			res.redirect('/login');
		}

	}
}

// function verifyToken(req, res, next) {

// 	let bearerHeader = req.headers['authorization'];

// 	if( typeof bearerHeader !== 'undefined' ) {

// 		let bearer = bearerHeader.split(' ');
// 		let bearerId = +bearer[0];
// 		let bearerToken = bearer[1];

// 		let decoded;

// 		try {
// 			decoded = jwt.verify(bearerToken, codeWord);
// 		} catch(err) {
// 			console.log(err);
// 			res.sendStatus(403);
// 			return;		
// 		}


// 		let method = req.method;
// 		let path = req.path;

// 		let user = decoded.user;

// 		if(path.match(/defects/) && method === 'GET') {
// 			console.log('SIMPLE GET ', path);
// 			next();
// 		} else	if(path === '/config/get' || path === '/config/update') {
// 			if(user.rights === 0) {
// 				next();
// 			}				
// 		} else if (user.rights < 2) {
// 				next();
// 		} else {
// 			res.sendStatus(403);
// 		}
		
// 	} else {
// 		res.redirect('/login');
// 	}

// }

export { HTTPRouter };