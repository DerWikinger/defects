//filter-status-controller.js

import FilterDateController from './filter-date-controller';

export default class FilterDateComponent {

	constructor() {
		this.bindings = {
			filter: '=',
			operators: '=',
			label: '@'
		};
		this.templateUrl = 'public/views/filter-date.html';
		this.controller = FilterDateController;
		this.controllerAs = 'filterDateController';
	}

}