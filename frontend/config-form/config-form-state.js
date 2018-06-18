//config-form-state.js

let state = {
	data: {
		title: 'Config',
		rights: 1,
	},
	url: '/config-form',
	template: `<config-form config="config"></config-form>`,
	resolve: {
		config: ($q, configService, loginService)=> {

			let deferer = $q.defer();

			if(angular.element('.loading-indicator').length == 0) {
				let container = angular.element('.main-content');
				container.prepend(`<div class="loading-indicator">
					<div class="main-loader loader"></div>
					</div>`);				
			}

			if(configService.config) return configService.config;
			
			configService.getConfigs()
			.then((config)=> {
				
				deferer.resolve(config);
			})
			.catch((err)=> {
				angular.element('.loading-indicator').remove();
				deferer.reject(err);
			});
			return deferer.promise;
		}
	},
	controller: ($scope, config)=> {
		angular.element('.loading-indicator').remove();
		$scope.config = config;
	}
}

export default function get() {
	return state;
}