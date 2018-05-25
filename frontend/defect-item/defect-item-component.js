import DefectItemController from './defect-item-controller';

export default class DefectItemComponent {

	constructor() {
		this.bindings = {
			defect: '='
		};
		this.templateUrl = 'public/views/defect-item.html';
		this.controller = DefectItemController;
		this.controllerAs = 'defectController';
	}
	
}