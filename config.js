var PROXY_SERVER = 'http://localhost';
var PROXY_PORT = 3000;
var TOKEN_LIMIT = '120m';
var HTTP_PORT = 8080;

function setParameter(parameterName, parameterValue) {

	switch(parameterName) {
		case 'PROXY_SERVER':
			PROXY_SERVER = parameterValue;
			break;
		case 'PROXY_PORT':
			PROXY_PORT = parameterValue;
			break;
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

module.exports.PROXY_SERVER = PROXY_SERVER;
module.exports.PROXY_PORT = PROXY_PORT;
module.exports.TOKEN_LIMIT = TOKEN_LIMIT;
module.exports.HTTP_PORT = HTTP_PORT;
module.exports.setParameter = setParameter;