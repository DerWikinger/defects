export default class DefectAddController {
	
	constructor ($state, defectService, loginService) {
		this.$onInit = this.onInit;
		this.state = $state;
		this.defect = defectService.getNewDefect();
		this.defectService = defectService;
		this.loginService = loginService;
	}

	onInit() {
		// $('.btn').focus();
	}

	onOkClick() {
		let authorizationData = this.loginService.getAuthorizationData();
		this.defectService.addDefect(this.defect, authorizationData)
		.then((defectId)=> {		
			alert('Данные успешно добавлены');
			this.state.go('^');		
		})
		.catch((err)=> {
			$('.defect-form').css('cursor', 'default');
			alert('Что-то пошло не так');
		})
	}

	onCancelClick() {
		this.state.go('^');
	}
}