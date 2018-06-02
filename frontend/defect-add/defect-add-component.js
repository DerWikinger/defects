import DefectAddController from './defect-add-controller';

export default class DefectAddComponent {

	constructor() {
		this.bindings = {
		};
		this.templateUrl = 'public/views/defect-add.html';
		this.controller = DefectAddController;
		this.controllerAs = 'defectAddController';
	}

}