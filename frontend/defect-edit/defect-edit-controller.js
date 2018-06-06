export default class DefectEditController {
	
	constructor ($state, defectService, loginService) {
		this.$onInit = this.onInit;
		this.state = $state;
		this.defectService = defectService;
		this.authorizationData = loginService.getAuthorizationData();
	}

	onInit() {
		this.oldDefect = this.defectService.clone(this.defect);
	}

	onOkClick() {
		this.defectService.editDefect(this.defect, this.authorizationData)
		.then(()=> {		
			alert('Данные успешно сохранены');	
			this.state.go('^');
		})
		.catch((err)=> {
			alert('Что-то пошло не так');
		})
	}

	onCancelClick() {
		for(let property in this.defect) {
			this.defect[property] = this.oldDefect[property];
		}
		this.state.go('^');
	}

	onStatusChange(status) {
		console.log('STATUS');
		console.log(status);
		alert('STATUS');
	}
}