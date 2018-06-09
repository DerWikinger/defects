let state = {
	reloadOnSearch: false,
	parent: 'defects',
	data: {
		title: 'Defect list'
	},
	resolve: {

		isLoaded: ($q, defectService)=> {


			if(angular.element('.loading-indicator').length == 0) {
				let container = angular.element('.main-content');
				container.prepend(`<div class="loading-indicator">
					<div class="main-loader loader"></div>
					</div>`);				
			}
			
			if(defectService.DEFECTS.length > 0) return true;
			
			let deferer = $q.defer();

			defectService.getAllDefects()
			.then(()=>{
				// return true;
				deferer.resolve(true);
			})
			.catch((err)=> {
				angular.element('.loading-indicator').remove();
				deferer.reject(err);
			})
			return deferer.promise;
		}
	},
	url: '/defect-list',
	template: `<defect-list></defect-list>`,
	controller: (isLoaded, defectService)=> {
		console.log('DATA ARE LOADED');
		console.log(defectService.DEFECTS.length);
		angular.element('.loading-indicator').remove();
		// defectService.getAllDefects().then(()=> {
		// 	alert('ALL DEFECTS ARE LOADED!');
		// })
		// $rootScope.defects = defects;
	},
}

export default function get() {
	return state;
}