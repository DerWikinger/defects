import ConfigFormController from './config-form-controller';

export default class ConfigFormComponent {

	constructor() {
		this.bindings = {
			config: '='
		};
		this.templateUrl = 'public/views/config-form.html';
		this.controller = ConfigFormController;
		this.controllerAs = 'configFormController';
	}

}