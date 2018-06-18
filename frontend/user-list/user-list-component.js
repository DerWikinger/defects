//user-list-component.js

import UserListController from './user-list-controller';

export default class UserListComponent {

	constructor() {
		this.bindings = {
			users: '=',
		};
		this.templateUrl = 'public/views/user-list.html';
		this.controller = UserListController;
		this.controllerAs = 'userListController';
	}

}