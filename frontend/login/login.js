const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var request = require('sync-request');

const TOKEN_LIMIT = '120m';
const PROXY_SERVER = 'http://localhost:3000';
const SECRET_KEY = 'tgc-2-secret';


module.exports = function(app) {

	var users = getAllUsers();

	app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.set('view engine', 'ejs');

    app.get('/', verifyToken, ( req, res ) => {

		jwt.verify( req.token, SECRET_KEY, ( err, authData )=> {
			if(err) {
				console.log(err);
				res.sendStatus(403);
			} else {

				res.render('index', function(err, html) {
					res.send(html);
				});
			}
		})

		res.end();		

	});

	app.get('/login', ( req, res )=> {
		res.render('auth');
	})

	app.post('/login', ( req, res, next ) => {
		
		let checkedUser = {
			username: req.body.username,
			password: req.body.password
		}

		var user = findUser(checkedUser);

		if(user) {
			jwt.sign( { user }, SECRET_KEY, { expiresIn: TOKEN_LIMIT }, ( err, token ) => {
				
				for(var i=0; i<users.length; i++) {
					if(users[i].userId === user.userId) {
						users[i].token = token;
						break;
					}
				}

				//console.log(users);

				res.json({
					userId: user.userId,
					token: token
				})
			});
		} else {
			res.sendStatus(403);
		}
	});

	app.all('/defects', verifyToken, function( req, res) {

		jwt.verify( req.token, SECRET_KEY, ( err, authData )=> {
			if(err) {
				res.sendStatus(403);
			} else {
			
        		var serviceCallResponse = request(req.method, PROXY_SERVER + req.originalUrl, {
            		json:req.body
        		});
        
        		res.send(serviceCallResponse.getBody('utf8'));
			}
		})
	});
 
	function verifyToken( req, res, next ) {
		var bearerHeader = req.headers['authorization'];

		if( typeof bearerHeader !== 'undefined' ) {
			
			var bearer = bearerHeader.split(' ');
			var bearerId = +bearer[0];
			var bearerToken = bearer[1];

			var method = req.method;
			var path = req.path;

			if(path === '/defects' && method !== 'GET') {
				for(var i = 0; i < users.length; i++){
					if(users[i].userId === bearerId && users[i].rigths > 1) {
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
		var result;
		if(!user) return result;
		for(var i = 0; i < users.length; i++){
			if(user.username === users[i].username && user.password === users[i].password) {
				result = users[i];
				break;
			}
		}
		return result;
	}

	function getAllUsers() {
		var users = [
			{ userId: 0, username: 'admin', password: '123', rigths: 0, token: '' },
			{ userId: 1, username: 'brad', password: '111', rigths: 1, token: '' },
			{ userId: 2, username: '', password: '', rigths: 2, token: '' }
		]

		return users;
	}
}
