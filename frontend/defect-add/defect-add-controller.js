export default class DefectAddController {
	
	constructor ($state, defectService, loginService) {
		this.$onInit = this.onInit;
		this.state = $state;
		this.defect = defectService.getNewDefect();
		this.defectService = defectService;
		this.authorizationData = loginService.getAuthorizationData();
	}

	onInit() {
		// $('.btn').focus();
	}

	onOkClick() {
		this.defectService.addDefect(this.defect, this.authorizationData)
		.then((defectId)=> {		
			alert('Данные успешно добавлены');
			this.state.go('^');		
		})
		.catch((err)=> {
			alert('Что-то пошло не так');
		})
	}

	onCancelClick() {
		this.state.go('^');
	}
}