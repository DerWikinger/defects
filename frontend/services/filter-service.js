//filter.js
import Filter from './filter_';
import * as init from './init';

export class FilterService {

	constructor() {
		this.observer;
		this.statuses = [
			{ statusId: -1, statusName: ' ' },
			{ statusId: Infinity, statusName: 'Все не устранённые' }
		].concat(init.STATUSES);

		this._filters = [];

		this.addFilter('status', (defect)=> {
			return defect.status.statusId > 1;
		});
	}

	addFilter(name, filterFunction) {
		this.removeFilter(name);		
		this._filters.push(new Filter(name, filterFunction));
	}

	removeFilter(filterName) {
		
		for(let i = 0; i < this._filters.length; i++) {
			if(this._filters[i].name === filterName) {
				this._filters.splice(i, 1);
				break;
			}				
		}
	}

	filter(item) {
		for(let i=0; i<this._filters.length; i++) {
			let filter = this._filters[i];
			if(!filter.match(item)) return false;
		}
		return true;
	}

}

export default function factory() {

	return new FilterService();
}