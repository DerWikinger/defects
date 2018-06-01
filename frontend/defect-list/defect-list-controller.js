export default class DefectListController {
	 
	 constructor(defectService) {
	 	// console.log(defectsData);
	 	// defectService.getAllDefects().then((defects)=>{
		 // if($rootScope.defects) {
		 // 	console.log('DEFECTS ARE HERE');
		 // }
		 // console.log('THIS IS CONTROLLER');
		 // console.log()
		 this.defects = defectService.DEFECTS;
	 	// });
	 }

} 