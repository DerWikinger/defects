//config.js

import path from 'path';
import fs from 'fs';

export class Config {

	constructor() {
		this.readFileConfig();
		this.observers = [];
		this._getAllUsers();
		console.log(this.USERS);
	}

	readFileConfig() {

		let filePath = path.resolve(__dirname, 'config.doc');

		let content = fs.readFileSync(filePath, {
			encoding: 'utf8',
			flags: 'r'
		});

    	let obj = JSON.parse(content);
    	this.dbServerAddresse = obj.dbServerAddresse || 'localhost';
		this.dbServerPort = +obj.dbServerPort || 62905;
		this.dbAdminLogin = obj.dbAdminLogin || 'sa';
		this.dbAdminPassword = obj.dbAdminPassword || '123';
		this.dbName = obj.dbName || 'dbDefects';
		this.dbIdleTimeout = +obj.dbIdleTimeout || 30000;
		this.tokenTimeLimit = obj.tokenTimeLimit || '120m';
		this.codeWord = obj.codeWord || 'secret_key';
	}

	writeFileConfig(config) {

		return new Promise((resolve, reject)=> {
			let obj = {
				dbServerAddresse: config.dbServerAddresse,
				dbServerPort: config.dbServerPort,
				dbAdminLogin: config.dbAdminLogin,
				dbAdminPassword: config.dbAdminPassword,
				dbName: config.dbName,
				dbIdleTimeout: config.dbIdleTimeout,
				tokenTimeLimit: config.tokenTimeLimit,
				codeWord: config.codeWord
			}

			let filePath = path.resolve(__dirname, 'config.doc');
			let content = JSON.stringify(obj);
			fs.writeFile(filePath, content, { encoding: 'utf8'}, (err)=> {
				if(err) {
					reject(err);
				} else {
					resolve();
				}				
			});
		})	

	}

	update(config) {

		return new Promise((resolve, reject)=> {
			this.writeFileConfig(config)
			.then(()=>{
				this.dbServerAddresse = config.dbServerAddresse;
				this.dbServerPort = +config.dbServerPort;
				this.dbAdminLogin = config.dbAdminLogin;
				this.dbAdminPassword = config.dbAdminPassword;
				this.dbName = config.dbName;
				this.dbIdleTimeout = +config.dbIdleTimeout;
				this.tokenTimeLimit = config.tokenTimeLimit;
				this.codeWord = config.codeWord;
				this.onChange();
				resolve();			
			})
			.catch((err)=> {
				console.log(err);
				reject(err);
			})
		})
		
	}

	pushObserver(observer) {
		this.observers.push(observer);
	}

	popObserver(observer) {
		for(let i = 0; i < this.observers.length; i++) {
			if(this.observers[i] === observer) {
				this.observers.splice(i, 1);
			}
		}
	}

	onChange() {
		for(let i = 0; i < this.observers.length; i++) {
			this.observers[i].update(this);
		}
	}


	_getAllUsers() {

		let filePath = path.resolve(__dirname, 'users.doc');

		let content = fs.readFileSync(filePath, {
			encoding: 'utf8',
			flags: 'r'
		});

    	this.USERS = JSON.parse(content);
	}

	findUser(user) {
		let result;
		if(!user) return result;
		for(let i = 0; i < this.USERS.length; i++){
			if(user.username === this.USERS[i].userName && user.password === this.USERS[i].userPassword) {
				result = this.USERS[i];
				break;
			}
		}
		return result;
	}

	addUser(user) {

		return new Promise((resolve, reject)=> {
			let newUserId = this._getMaxUserId() + 1;
			user.userId = newUserId;			
			this.USERS.push(user);
			this.writeFileUsers()
			.then(()=> {
				resolve(newUserId);
			})
			.catch((err)=> {
				reject(err);
			})
		})	

	}

	_getMaxUserId() {

		let result = 1;
		for(let i=0; i<this.USERS.length; i++) {
			let user = this.USERS[i];
			if(result<user.userId) {
				result = user.userId;
			}
		}
		return result;
	}

	deleteUser(userId) {

		return new Promise((resolve, reject)=> {

			let deletedUserId = +userId;

			if(deletedUserId === 1) reject("Don't allow to delete the user with userId == 1!");
			
			for(let i=0; i<this.USERS.length; i++) {
				let _user = this.USERS[i];
				if(_user.userId === deletedUserId) {
					this.USERS.splice(i, 1);
					this.writeFileUsers()
					.then(()=> {
						resolve();
					})
					.catch((err)=> {
						reject(err);
					})
					break;
				}
			}			
		})
	}

	updateUser(user) {

		return new Promise((resolve, reject)=> {
			
			for(let i=0; i<this.USERS.length; i++) {
				let _user = this.USERS[i];
				if(_user.userId === user.userId) {
					this.USERS.splice(i, 1, user);
					this.writeFileUsers()
					.then(()=> {
						resolve();
					})
					.catch((err)=> {
						reject(err);
					})
					break;
				}				
			}			
		})
	}

	writeFileUsers() {

		return new Promise((resolve, reject)=> {

			let filePath = path.resolve(__dirname, 'users.doc');
			let content = JSON.stringify(this.USERS);
			fs.writeFile(filePath, content, { encoding: 'utf8'}, (err)=> {
				if(err) {
					reject(err);
				} else {
					resolve();
				}				
			});
		})
	}
}