//defect-add-controller.js

export default class DefectAddController {
	
	constructor ($state, defectService) {
		this.state = $state;
		this.defect = defectService.getNewDefect();
		this.defectService = defectService;
	}

	onOkClick() {
		this.defectService.addDefect(this.defect)
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