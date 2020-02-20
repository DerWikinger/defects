//filter-defectId-controller.js

import FilterSimpleController from './filter-simple-controller';

export default class FilterSimpleComponent {

	constructor() {
		this.bindings = {
			filter: '=',
			label: '@',
			operators: '='
		};
		this.templateUrl = 'public/views/filter-simple.html';
		this.controller = FilterSimpleController;
		this.controllerAs = 'filterSimpleController';
	}

}