//filter-form-component.js

import FilterFormController from './filter-form-controller';

export default class FilterFormComponent {

	constructor() {
		this.bindings = {
			config: '='
		};
		this.templateUrl = 'public/views/filter-form.html';
		this.controller = FilterFormController;
		this.controllerAs = 'filterFormController';
	}

}