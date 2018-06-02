import jwt from 'jsonwebtoken';

export class LoginService {

	constructor($q, $http) {
		this.q = $q;
		this.http = $http;
		this.token = '';
	}

	login(loginData) {

		let deferred = this.q.defer();

		let headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		}

		this.http.post('/login', loginData, { headers }).then((response)=> {
			let data = response.data;
			
			if(!data) {	
				this.token = '';
				alert('Что-то пошло не так! :-)');	
				deferred.reject();			
			} else {
				this.token = data.token;
				deferred.resolve();
			}
		}, (error)=> {
			this.token = '';	
			alert('Неверные имя пользователя и/или пароль!');
			deferred.reject(error);
		});

		return deferred.promise;
	}

	checkUser(rights) {
		let _rights = (arguments.length < 1 ? Infinity : arguments[0]);
		console.log('CHECK USER');
		if(!this.token) return false;
		let user = this.getUser();
		let result = ('' + user.userId) && (user.rights < _rights);		
		return result;
	}

	getUser() {
		let userData = jwt.decode(this.token);
		return userData.user;
	}

	getAuthorizationData() {
		let authData = this.getUser().userId + ' ' + this.token;
		return authData;
	}

}

export default function factory($q, $http) {

	return new LoginService($q, $http);

}