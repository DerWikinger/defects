import DetailInfoController from './detail-info-controller';

export default class DetailInfoComponent {

	constructor() {
		this.bindings = {
			defect: '=',
		};
		this.templateUrl = 'public/views/detail-info.html';
		this.controller = DetailInfoController;
		this.controllerAs = 'detailInfoController';
	}

}