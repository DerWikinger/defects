import { isDate } from 'angular';

export default class DefectItemController {
	
	constructor (defectService) {

		this.$onInit = this.onInit;
		defectService.pushObserver(this);
	}

	onInit() {
		this.appearanceDateString = this.defect ? this.getDateString(this.defect.appearanceDate) : '???';
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
		this.appearanceDateString = this.defect ? this.getDateString(this.defect.appearanceDate) : '???';
		// console.log(this.appearanceDateString);
		angular.element('.appearanceDateString').text(this.appearanceDateString);		
	}
}