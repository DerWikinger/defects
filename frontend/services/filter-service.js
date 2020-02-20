export class FilterService {
	constructor() {
		this._observers = [];
		this.filters = {};

		this.operatorNothing = { 
			name: 'не используется',
			operate: function() { return true; }
		};
		
		this.operatorEqual = {
			name: 'равно',
			operate: function(arg1, arg2) { return arg1 == arg2; }
		}

		this.operatorNoEqual = {
			name: 'не равно',
			operate: function(arg1, arg2) { return arg1 != arg2; }
		}

		this.operatorLess = {
			name: 'меньше',
			operate: function(arg1, arg2) { return arg1 < arg2; }
		}

		this.operatorNoLess = {
			name: 'больше или равно',
			operate: function(arg1, arg2) { return arg1 >= arg2; }
		}

		this.operatorMore = {
			name: 'больше',
			operate: function(arg1, arg2) { return arg1 > arg2; }
		}

		this.operatorNoMore = {
			name: 'меньше или равно',
			operate: function(arg1, arg2) { return arg1 <= arg2; }
		}

		this.operatorBetween = {
			name: 'между',
			operate: function(arg1, arg2, arg3) { return arg1 >= arg2 && arg1 <= arg3; }
		}

		this.operatorOutOf = {
			name: 'вне',
			operate: function(arg1, arg2, arg3) { return arg1 < arg2 || arg1 > arg3; }
		}
	}

	filterApply(list) {
		let _filters = [];
		for(let fName in this.filters) {
			let filter = this.filters[fName];
			if(filter.operator == this.operatorNothing) continue;
			_filters.push(filter);
		}

		let result = list.filter( (item)=> {
			for(let i = 0; i < _filters.length; i++) {
				if(!_filters[i].operator.operate(this._getValue(_filters[i].property, item), _filters[i].value, _filters[i].value2)) return false;
			}
			return true;
		});
		return result;
	}

	_getValue(property, obj) {
		if(~property.indexOf('.')) {
			let names = property.split('.');
			return names.reduce( (a, b)=> {
				return a[b];
			}, obj );
		}
		return obj[property];
	}

	addFilter(name, property, operator, value, value2) {
		this.filters[name] = {
			'property': property,
			'operator': operator,
			'value': value,
			'value2': value2
		}
	}

	removeFilter(name) {
		delete this.filters[name];
	}

	getFilter(name) {
		if(name in this.filters) return this.filters[name];
		return null;
	}

	changeFilter(filterArray) {
		let _filters = Object.getOwnPropertyNames(this.filters);
		_filters.forEach( (name)=> {
			if(name in filterArray) {
				this.filters[name].operator = filterArray[name].operator;
				this.filters[name].value = filterArray[name].value;
				this.filters[name].value2 = filterArray[name].value2;
			} else {
				this.filters[name].operator = this.operatorNothing;
				this.filters[name].value = 0;
				this.filters[name].value2 = 0;
			} 
		} )
		this.listChanged();
	}

	_isDate(value) {
		let date = new Date(value);
		return date != 'Invalid Date';
	}

	addObserver(obj) {
		this._observers.push(obj);
	}

	removeObserver(obj) {
		for(let i=0; i<this._observers.length; i++) {
			if(this._observers[i] === observer) {
				this._observers.splice(i, 1);
				break;
			}
		}
	}

	listChanged() {
		for(let i=0; i<this._observers.length; i++) {
			this._observers[i].update();
		}		
	}

}

export default function factory() {

	return new FilterService();
}