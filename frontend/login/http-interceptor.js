let Q;

export class HTTPInterceptor {

	constructor() {
		
	}

	request (request) {
		request.headers.Authorization = localStorage.userId + ' ' + localStorage.token;
		return Q.resolve(request);
	}

	responseError (rejection) {
		if (rejection.status === 403) {
			alert('У вас не достаточно прав для выполнения данного запроса!');
		}
		return Q.reject(rejection);
	}
}

export default function factory($q) {
	Q = $q;
	return new HTTPInterceptor();
}