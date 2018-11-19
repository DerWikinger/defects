//defectt-edit-controller.js

import { isDate } from 'angular';

export default class DefectEditController {
	
	constructor ($state, defectService) {
		this.$onInit = this.onInit;
		this.state = $state;
		this.defectService = defectService;
	}

	onInit() {
		this.oldDefect = this.defect.clone();
	}

	onOkClick() {
		this.defectService.editDefect(this.defect, this.authorizationData)
		.then(()=> {		
			alert('Данные успешно сохранены');
			this.update();
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

	getDateString(date) {
		let dateString = '';
		if(isDate(date)) {
			let yy = '' + date.getFullYear();
			let mm = date.getMonth() + 1;
			let dd = date.getDate();
			dateString = (dd < 10 ? '0' + dd : dd) + '.' + (mm < 10 ? '0' + mm : mm) + '.' + yy;
		}
		return dateString;
	}

	update() {
		let appearanceDateString = this.defect ? this.getDateString(this.defect.appearanceDate) : '???';
		let elem = angular.element('defect-item#' + this.defect.defectId);
		elem.find('[name="appearanceDateString"]').text(appearanceDateString);		
	}
}