//config-service.js

import Config from './config-class';

class ConfigService {

	constructor($q, $http, loginService) {
		this.q = $q;
		this.http = $http;
		this.config;
		this.authorizationData = loginService.getAuthorizationData();
	}

	getConfigs() {
		let deferer = this.q.defer();
		this.http({
			method: 'POST',
			url: '/config/get',
			headers: {
				'Authorization': this.authorizationData
			},
		})
		.then((response)=> {
			let config = response.data;
			this.config = new Config(config);
			deferer.resolve(this.config);
		})
		.catch((err)=> {
			console.log(err);
			deferer.reject(err);
		});

		return deferer.promise;
	}

	updateConfig() {
		let deferer = this.q.defer();
		this.http({
			method: 'POST',
			url: '/config/update',
			headers: {
				'Authorization': this.authorizationData
			},
			data: { config: this.config }
		})
		.then((data)=> {
			deferer.resolve();
		})
		.catch((err)=> {
			console.log(err);
			deferer.reject(err);
		});

		return deferer.promise;		
	}

	getUsers() {
		let deferer = this.q.defer();
		this.http({
			method: 'POST',
			url: '/users/all',
			headers: {
				'Authorization': this.authorizationData
			},
		})
		.then((response)=> {
			let users = response.data;
			deferer.resolve(users);
		})
		.catch((err)=> {
			console.log(err);
			deferer.reject(err);
		});

		return deferer.promise;	
	}

	addUser(user) {
		let deferer = this.q.defer();
		this.http({
			method: 'PUT',
			url: '/users',
			headers: {
				'Authorization': this.authorizationData
			},
			data: { user: user }
		})
		.then((response)=> {
			let newUserId = response.data.newUserId;
			deferer.resolve(newUserId);
		})
		.catch((err)=> {
			console.log(err);
			deferer.reject(err);
		});

		return deferer.promise;	
	}

	editUser(user) {
		let deferer = this.q.defer();
		this.http({
			method: 'POST',
			url: '/users/update',
			headers: {
				'Authorization': this.authorizationData
			},
			data: { user: user },
		})
		.then((response)=> {
			deferer.resolve();
		})
		.catch((err)=> {
			console.log(err);
			deferer.reject(err);
		});

		return deferer.promise;	
	}

	deleteUser(userId) {

		let deferer = this.q.defer();
		this.http({
			method: 'DELETE',
			url: `/users?userId=${userId}`,
			headers: {
				'Authorization': this.authorizationData
			},
		})
		.then((response)=> {
			deferer.resolve();
		}, (error)=> {
			console.log(error);
			deferer.reject(error);
		});

		return deferer.promise;	
	}
}

export default function factory($q, $http, loginService) {

	return new ConfigService($q, $http, loginService);
}