import Config from './config-class';

class ConfigService {

	constructor($q, $http, loginService) {
		this.q = $q;
		this.http = $http;
		this.config;
		this.authotizationData = loginService.getAuthorizationData();
	}

	getConfigs() {
		let deferer = this.q.defer();
		this.http({
			method: 'POST',
			url: '/config/get',
			headers: {
				'Authorization': this.authotizationData
			},
		})
		.then((response)=> {
			let config = response.data;
			this.config = new Config(config);
			// console.log(this.config);
			deferer.resolve(this.config);
		})
		.catch((err)=> {
			console.log(err);
			// alert('Что-то пошло не так!');
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
				'Authorization': this.authotizationData
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
}

export default function factory($q, $http, loginService) {
	// let defectServer = new DefectService($q, $http).then((ds)=> {
	// 	return ds;
	// });
	return new ConfigService($q, $http, loginService);
}