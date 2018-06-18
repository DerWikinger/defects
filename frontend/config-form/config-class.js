//config-class.js

export default class Config {

	constructor(config) {
		this.dbServerAddresse = config.dbServerAddresse;
		this.dbServerPort = config.dbServerPort;
		this.dbAdminLogin = config.dbAdminLogin;
		this.dbAdminPassword = config.dbAdminPassword;
		this.dbName = config.dbName;
		this.dbIdleTimeout = config.dbIdleTimeout;
		this.tokenTimeLimit = config.tokenTimeLimit;
		this.codeWord = config.codeWord;
	}

	clone() {
		return new Config(this);
	}

}