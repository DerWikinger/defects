import angular from 'angular'

export default class DefectListController {
	 
	constructor(defectService, loginService) {

		this.defectService = defectService;
		this.defects = defectService.getCurrentDefects();
		this.user = loginService.getUser();
		this.authorizationData = loginService.getAuthorizationData();

	}

	getUserRights() {
		return this.user.rights;
	}

	onDelete(defect) {

		let result = confirm('Сведения о данном дефекте будут безвозвратно удалены!\nВы действительно хотите удалить данные?');
		if(result) {
			this.defectService.deleteDefect(defect, this.authorizationData)
			.then(()=> {
				console.log('DEFECT IS REMOVED');
			})
			.catch((err)=> {
				alert('Что-то пошло не так!');
			});
		}
	}

} 