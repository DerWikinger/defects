//user-list-state.js

let state = {
	url: '/user-list',
	parent: 'config-form',
	template: `<user-list users="users"></user-list>`,
	resolve: {
		users: ($q, configService, loginService)=> {

			let deferer = $q.defer();

			if(angular.element('.loading-indicator').length == 0) {
				let container = angular.element('.main-content');
				container.prepend(`<div class="loading-indicator">
					<div class="main-loader loader"></div>
					</div>`);				
			}

			configService.getUsers()
			.then((users)=> {
				deferer.resolve(users);
			})
			.catch((err)=> {
				angular.element('.loading-indicator').remove();
				deferer.reject(err);
			});
			return deferer.promise;
		}
	},
	controller: ($scope, users)=> {
		angular.element('.loading-indicator').remove();
		$scope.users = users;
	}
}

export default function get() {
	return state;
}