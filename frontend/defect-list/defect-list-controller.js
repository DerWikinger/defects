export default class DefectListController {
	 
	constructor(defectService, loginService) {
	 	// console.log(defectsData);
	 	// defectService.getAllDefects().then((defects)=>{
		 // if($rootScope.defects) {
		 // 	console.log('DEFECTS ARE HERE');
		 // }
		 // console.log('THIS IS CONTROLLER');
		 // console.log()
		this.defects = defectService.DEFECTS;
		this.user = loginService.getUser();
	 	// });
	}

	getUserRights() {
		return this.user.rights;
	}

} 