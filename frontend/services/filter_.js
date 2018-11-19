//filter.js

export default class Filter {

	constructor(name, filterFunction) {
		this.name = name;
		this.filterFunction = filterFunction;
	}

	match(item) {
		return this.filterFunction(item);
	}
}