//filter-form-component.js

import FilterFormController from './filter-form-controller';

export default class FilterFormComponent {

	constructor() {
		this.bindings = {};
		this.templateUrl = 'public/views/filter-form.html';
		this.controller = FilterFormController;
		this.controllerAs = 'filterFormController';
	}

}