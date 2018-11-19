//defectt-edit-controller.js

export default class DefectEditController {
	
	constructor ($state, defectService) {
		this.$onInit = this.onInit;
		this.state = $state;
		this.defectService = defectService;
	}

	onInit() {
		this.oldDefect = this.defect.clone();
		let elem = $(`defect-item[defect.defectId=${this.defect.defectId}]`);
		console.log(elem);
		// this.defect.addObserver(this);
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