//defect-list-component.js

import DefectListController from './defect-list-controller';

export default class DefectListComponent {

	constructor() {
		this.bindings = {};
		this.templateUrl = 'public/views/defect-list.html';
		this.controller = DefectListController;
		this.controllerAs = 'defectListController';
	}

}