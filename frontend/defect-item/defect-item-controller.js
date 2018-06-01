import { isDate } from 'angular';

export default class DefectItemController {
	
	constructor () {

		this.$onInit = this.onInit;

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
			dateString = (dd < 10 ? '0' + dd : dd) + '/' + (mm < 10 ? '0' + mm : mm) + '/' + yy.slice(2);
		}
		return dateString;
	}	
}