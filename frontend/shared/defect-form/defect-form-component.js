import DefectFormController from './defect-form-controller';

export default class DefectFormComponent {

	constructor() {
		this.bindings = {
			defect: '=',
			disabled: '='
		};
		this.require = {
			ngModelCtrl: 'ngModel'
		};
		this.templateUrl = 'public/views/defect-form.html';
		this.controller = DefectFormController;
		this.controllerAs = 'defectFormController';
	}
	
}