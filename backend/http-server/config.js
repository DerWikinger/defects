import path from 'path';
import fs from 'fs';

export class Config {

	constructor() {
		// this.writeFileConfig();
		this.readFileConfig();
	}

	readFileConfig() {

		let filePath = path.resolve(__dirname, 'config.doc');

		let content = fs.readFileSync(filePath, {
			encoding: 'utf8',
			flags: 'r'
		});

		// console.log(content);
    	let obj = JSON.parse(content);
    	this.dbServerAddresse = obj.dbServerAddresse;
		this.dbServerPort = obj.dbServerPort;
		this.dbAdminLogin = obj.dbAdminLogin;
		this.dbAdminPassword = obj.dbAdminPassword;
		this.dbName = obj.dbName;
		this.dbIdleTimeout = obj.dbIdleTimeout;
		this.tokenTimeLimit = obj.tokenTimeLimit;
		this.codeWord = obj.codeWord;
		// console.log(this);
	}

	writeFileConfig() {

		let obj = {
			dbServerAddresse: 'localhost',
			dbServerPort: 62905,
			dbAdminLogin: 'sa',
			dbAdminPassword: '123',
			dbName: 'dbDefects',
			dbIdleTimeout: 60000,
			tokenTimeLimit: '120m',
			codeWord: 'tgc-2-secret'
		}

		let filePath = path.resolve(__dirname, 'config.doc');
		let content = JSON.stringify(obj);
		fs.writeFile(filePath, content, { encoding: 'utf8'}, (err)=> {
			console.log(err);
		});
		

	}

	getPropertyValue(name) {

	}

	setPropertyValue(name, value) {

	}
}