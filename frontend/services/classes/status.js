//status.js

export default class Status {

	constructor (statusId, statusName) {

		this.statusId = statusId;
		this.statusName = statusName;

	}

	equal (other) {
		if(!other) return false;
		return this.statusId === other.statusId;
	}
} 