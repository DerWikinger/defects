export default class DefectListController {
	 
	 constructor(defectService) {

	 	this.defects = defectService.getAllDefects();

	 }

} 