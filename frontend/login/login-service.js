export class LoginService {

	constructor($http, $q) {
		this.$http = $http;
		this.$q = $q;				
		localStorage.token = '';
		localStorage.userId = '';
	}

	login(loginData) {

		let deferred = this.$q.defer();

		let headers = {
			'Content-Type': 'application/x-www-form-urlencoded'
		}

		this.$http.post('/login', loginData, { headers }).then((response)=> {
			//alert(JSON.stringify(response));
			let data = response.data;
			if(!data) {				
				localStorage.token = '';
				localStorage.userId = '';
				alert('Что-то пошло не так! :-)');	
				deferred.reject();			
			} else {
				localStorage.token = data.token;
				localStorage.userId = data.userId;
				deferred.resolve();
			}
		}, (error)=> {
			localStorage.token = '';
			localStorage.userId = '';	
			//console.log(error);		
			alert('Неверные имя пользователя и/или пароль!');
			deferred.reject(error);
		});

		return deferred.promise;
	}

	checkUser() {
		console.log('CHECK USER');
		let result = (localStorage.userId && localStorage.token ? true: false);
		console.log(result);
		return result;
	}

}

export default function factory($http, $q) {

	return new LoginService($http, $q);

}