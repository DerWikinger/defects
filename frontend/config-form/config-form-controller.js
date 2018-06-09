export default class ConfigFormController {
	
	constructor ($state, configService) {
		this.$onInit = this.onInit;
		this.state = $state;
		this.configService = configService;
	}

	onInit() {
		this.oldConfig = this.config.clone();
	}

	onOkClick() {
		this.configService.updateConfig()
		.then(()=> {
			alert('Данные успешно сохранены!');
		})
		.catch(()=> {
			alert('Что-то пошло не так!');
		})
		
	}

	onCancelClick() {
		for(let property in this.config) {
			this.config[property] = this.oldConfig[property];
		}
	}

	onUsersClick() {
		alert('Users');
	}
}