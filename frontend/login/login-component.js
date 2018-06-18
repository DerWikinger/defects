//login-component.js

import LoginController from './login-controller';

export default class LoginComponent {

	constructor() {
		this.bindings = {};
		this.templateUrl = 'public/views/login-user.html';
		this.controller = LoginController;
		this.controllerAs = 'loginController';
	}

}