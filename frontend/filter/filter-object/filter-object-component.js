//filter-status-controller.js

import FilterObjectController from './filter-object-controller';

export default class FilterObjectComponent {

	constructor() {
		this.bindings = {
			filter: '=',
			values: '=',
			operators: '=',
			label: '@'
		};
		this.templateUrl = 'public/views/filter-object.html';
		this.controller = FilterObjectController;
		this.controllerAs = 'filterObjectController';
	}

}