import path from 'path';
import fs from 'fs';

export class Config {

	constructor() {
		// this.writeFileConfig();
		this.readFileConfig();
		this.observers = [];
		this.USERS = this.getAllUsers();
	}

	readFileConfig() {

		let filePath = path.resolve(__dirname, 'config.doc');

		let content = fs.readFileSync(filePath, {
			encoding: 'utf8',
			flags: 'r'
		});

		// console.log(content);
    	let obj = JSON.parse(content);
    	this.dbServerAddresse = obj.dbServerAddresse || 'localhost';
		this.dbServerPort = +obj.dbServerPort || 62905;
		this.dbAdminLogin = obj.dbAdminLogin || 'sa';
		this.dbAdminPassword = obj.dbAdminPassword || '123';
		this.dbName = obj.dbName || 'dbDefects';
		this.dbIdleTimeout = +obj.dbIdleTimeout || 30000;
		this.tokenTimeLimit = obj.tokenTimeLimit || '120m';
		this.codeWord = obj.codeWord || 'secret_key';
		// console.log(this);
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


	getAllUsers() {
		let users = [
		{ userId: 0, username: 'admin', password: '123', rights: 0  },
		{ userId: 1, username: 'brad', password: '111', rights: 1 },
		{ userId: 2, username: 'guest', password: ' ', rights: 2 }
		]
		return users;
	}

	findUser(user) {
		let result;
		if(!user) return result;
		for(let i = 0; i < this.USERS.length; i++){
			if(user.username === this.USERS[i].username && user.password === this.USERS[i].password) {
				result = this.USERS[i];
				break;
			}
		}
		return result;
	}

	addUser(user) {

	}

	deleteUser(user) {

	}

	updateUser(user) {

	}
}