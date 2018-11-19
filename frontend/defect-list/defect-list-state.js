//defect-list-state.js

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
			
			if(defectService.getDefectList().length > 0) return true;
			
			let deferer = $q.defer();

			defectService.getCurrentDefects()
			.then(()=>{
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
	controller: ($timeout, isLoaded, defectService)=> {
		console.log('DATA ARE LOADED');
		let count = defectService.getDefectList().length;
		console.log(count);
		angular.element('.loading-indicator').remove();
	},
}

export default function get() {
	return state;
}