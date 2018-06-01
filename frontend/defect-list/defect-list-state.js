let state = {
	reloadOnSearch: false,
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
			defectService.getCurrentDefects()
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
	controller: (isLoaded)=> {
		console.log('DATA ARE LOADED');
		// $rootScope.defects = defects;
	},
}

export default function get() {
	return state;
}