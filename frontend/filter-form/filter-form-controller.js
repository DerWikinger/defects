//defectt-edit-controller.js

export default class FilterFormController {
	
	constructor ($state, filterService, defectService) {
		this.$onInit = this.onInit;
		this.state = $state;
		this.defectService = defectService;
		this.filterService = filterService;

		this.defectId;

		this.statuses = filterService.statuses;
		this.status = this.statuses[1];
	}

	onInit() {

		// setFilters();
		// console.log('HHHH');
		// console.log(this.filter);
	}

	setFilters() {

		// if(this.defectId) {
		// 	this.filterService.addFilter('defectId', (item)=> {
		// 		return this.defectId === item.defectId;
		// 	});			
		// } else {
		// 	this.filterService.removeFilter('defectId');
		// }

		// if(this.status.statusId > -1) {
		// 	this.filterService.addFilter('status', (item)=> {
		// 		if (this.status.statusId == Infinity) {
		// 			return item.status.statusId > 1; 
		// 		} else {
		// 			return item.status.statusId === this.status.statusId;	
		// 		}
		// 	})
		// } else {
		// 	this.filterService.removeFilter('status');
		// }
	}

	onOkClick() {
		// this.filterService.filter();
		this.setFilters();
		// 
		this.state.go('^');
	}

	onCancelClick() {
		this.state.go('^');
	}

	onResestClick() {

	}

	onStatusChange(value) {
		// this.filterService.status = value;
		// console.log(value);
	}
}