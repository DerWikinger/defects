import DefectEditController from './defect-edit-controller';

export default class DefectEditComponent {

	constructor() {
		this.bindings = {
			defect: '=',
		};
		this.templateUrl = 'public/views/defect-edit.html';
		this.controller = DefectEditController;
		this.controllerAs = 'defectEditController';
	}

}