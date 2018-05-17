// const bodyParser = require('body-parser');
const request = require('sync-request');
const config = require('../../config');

const SECRET_KEY = 'tgc-2-secret';

let USERS;

class HTTPRouter {

	constructor(app) {
		
		this.app = app;
		USERS = getAllUsers();
	    
	    this.app.set('views', './views');
	    this.app.set('view engine', 'ejs');

	    this.app.get('/', verifyToken, ( req, res ) => {

			jwt.verify( req.token, SECRET_KEY, ( err, authData )=> {
				if(err) {
					console.log(err);
					res.sendStatus(403);
				} else {

					res.render('home', function(err, html) {
						res.send(html);
					});
				}
			})

			res.end();		

		});

		this.app.get('/login', ( req, res )=> {
			res.render('auth');
		})

		this.app.post('/login', ( req, res, next ) => {
			
			let checkedUser = {
				username: req.body.username,
				password: req.body.password
			}

			let user = findUser(checkedUser);

			if(user) {
				jwt.sign( { user }, SECRET_KEY, { expiresIn: config.TOKEN_LIMIT }, ( err, token ) => {
					
					for(let i=0; i<USERS.length; i++) {
						if(USERS[i].userId === user.userId) {
							USERS[i].token = token;
							break;
						}
					}

					res.json({
						userId: user.userId,
						token: token
					})
				});
			} else {
				res.sendStatus(403);
			}
		});

		this.app.all('/defects', verifyToken, function( req, res) {

			let serviceCallResponse;

			jwt.verify( req.token, SECRET_KEY, ( err, authData )=> {
				if(err) {
					res.sendStatus(403);
				} else {
				
	        		serviceCallResponse = request(req.method, config.PROXY_SERVER + ':' + config.PROXY_PORT + req.originalUrl, {
	            		json:req.body
	        		});
	        
	        		res.send(serviceCallResponse.getBody('utf8'));
				}
			})
		});

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
				if(USERS[i].userId === bearerId && this.users[i].rigths > 1) {
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
		{ userId: 0, username: 'admin', password: '123', rigths: 0, token: '' },
		{ userId: 1, username: 'brad', password: '111', rigths: 1, token: '' },
		{ userId: 2, username: 'guest', password: ' ', rigths: 2, token: '' }
	]
		return users;
}

export { HTTPRouter };
//module.exports.HTTPRouter = HTTPRouter;