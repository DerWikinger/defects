//filter.js

export default class Filter {

	constructor() {
		this.filterFunctions = [];
		this.functionId = 0;
		let id = this.pushFilterFunction((defect)=> {
			return defect.status.statusId != 1;
		});
		console.log(id);
	}

	match(obj) {
		let result = true;

		for(let i = 0; i < this.filterFunctions.length; i++) {
			if(!result) return false;
			let filterFunction = this.filterFunctions[i].filterFunction;
			// console.log(filterFunction);
			result = filterFunction(obj);
		}
		return result;
	}

	pushFilterFunction(filterFunction) {
		this.filterFunctions.push({
			'functionId': this.functionId,
			'filterFunction': filterFunction
		});
		return this.functionId++;
	}

	popFilterFunction(functionId) {
		for(let i = 0; i < this.filterFunctions.length; i++) {
			if(this.filterFunctions[i].functionId === functionId) {
				this.filterFunctions.splice(i, 1);
				this.functionId--;
				break;
			}
		}
	}
}