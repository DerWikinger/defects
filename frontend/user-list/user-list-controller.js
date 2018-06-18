//user-list-controller.js

export default class UserListController {
	 
	constructor($filter, $state, configService) {
		this.configService = configService;
		this.userRights = [
			{ rightId: 0, rightName: 'Администратор' },
			{ rightId: 1, rightName: 'Диспетчер' },
			{ rightId: 2, rightName: 'Обозреватель' }
		];
		this.state = $state;
	}

	onExit() {
		this.state.go('^');
	}

	onAdd() {
		let user = { userId: undefined, userName: '', userPassword: '', userRights: 2 }
		this.users.push(user);
	}

	onSave(user) {
		if(user.userId) {
			this.configService.editUser(user)
			.then(()=> {
				alert('Данные успешно обновлены!');
			})
			.catch((err)=> {
				alert('Что-то пошло не так!');
			})
		} else {
			this.configService.addUser(user)
			.then((newUserId)=> {
				alert('Данные успешно добавлены!');
				user.userId = newUserId;
			})
			.catch((err)=> {
				alert('Что-то пошло не так!');
			})
		}
	}

	onDelete(user) {
		if(!user.userId) return;

		let result = confirm('Учётные данные пользователя будут безвозвратно удалены!\nВы действительно хотите удалить данные?');
		if(!result) return;
		
		this.configService.deleteUser(user.userId)
		.then(()=> {
			for(let i=0; i<this.users.length; i++) {
				let _user = this.users[i];
				if(_user.userId == user.userId) {
					this.users.splice(i, 1);
					break;
				}
			}
			alert('Учётные данные пользователя удалены!');
		})
		.catch((err)=> {
			alert('Что-то пошло не так!');
		})
	}
} 