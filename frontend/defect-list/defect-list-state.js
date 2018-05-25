let state = {
	reloadOnSearch: false,
	data: {
		title: 'Defect list'
	},
		// resolve: {
		// 	auth: ($q, $state, loginService) => {
		// 		let deferred = $q.defer();
		// 		if(!loginService.checkUser()) {
		// 			//deferred.reject();
		// 			alert('Необходимо авторизоваться!');
		// 			$state.go('login');
		// 			return deferred.promise;
		// 		}
		// 	},
		// defects: ($q, model)=> {
		// 	console.log('RESOLVE');
		// 	$q.resolve(model.getAllDefects());
		// },
		//},
	url: '/defect-list',
	template: `<defect-list></defect-list>`
}

export default function get() {
	return state;
}