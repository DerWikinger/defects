let state = {
	// reloadOnSearch: false,
	parent: 'defects',
	data: {
		title: 'Defect list'
	},
	resolve: {
		// defects: (defectService)=> { 
		// 	console.log("RESOLVE IS STARTED");	
		// 	return defectService.getAllDefects(); 
		// },
		isLoaded: ($q, defectService)=> {
			let deferer = $q.defer(); 
			defectService.getAllDefects()
			.then(()=>{
				// return true;
				deferer.resolve(true);
			})
			.catch((err)=> {
				// return false;
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