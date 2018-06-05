import path from 'path';
import fs from 'fs';


var TOKEN_LIMIT = '120m';
var HTTP_PORT = 8080;

function setParameter(parameterName, parameterValue) {

	switch(parameterName) {
		case 'TOKEN_LIMIT':
			TOKEN_LIMIT = parameterValue;
			break;
		case 'HTTP_PORT':
			HTTP_PORT = parameterValue;
			break;
		default:
			console.log('ParameterName is not correct');
			break;
	}

};

module.exports.TOKEN_LIMIT = TOKEN_LIMIT;
module.exports.HTTP_PORT = HTTP_PORT;
module.exports.setParameter = setParameter;

class Config {

	consructor() {

	}

	readFileConfig() {

	}

	writeFileConfig() {

	}

	getPropertyValue(name) {

	}

	setPropertyValue(name, value) {

	}
}