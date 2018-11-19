//defect.js

import * as init from '../init';

export default class Defect {

	constructor(defect) {

		if(defect) {
			this.defectId = defect.defectId;
			this.defectSys = defect.defectSys;
			this.appearanceDate = defect.appearanceDate;
			this.removeDate = defect.removeDate;
			this.status = defect.status;
			this.equipmentType = defect.equipmentType;
			this.beginPoint = defect.beginPoint;
			this.endPoint = defect.endPoint;
			this.equipmentSys = defect.equipmentSys;
			this.system = defect.system;
			this.category = defect.category;
			this.owner = defect.owner;
			this.source = defect.source;
			this.tubeType = defect.tubeType;
			this.invNumber = defect.invNumber;
			this.location = defect.location;
			this.diameter = defect.diameter;
			this.character = defect.character;
			this.addresse = defect.addresse;
			this.master = defect.master;
			this.period = defect.period;
			this.comment = defect.comment;
			this.flowValue = defect.flowValue;
			this.place = defect.place;
			this.coordX = defect.coordX;
			this.coordY = defect.coordY;
		} else {
			this.defectId = 0;
			this.defectSys = 0;
			this.appearanceDate = new Date();
			this.removeDate = null;
			this.status = init.STATUSES[2];
			this.equipmentType = init.EQUIPMENT_TYPES[1];
			this.beginPoint = '';
			this.endPoint = '';
			this.equipmentSys = 0;
			this.system = init.SYSTEMS[1];
			this.category =init.CATEGORIES[1];
			this.tubeType = init.TUBE_TYPES[0];
			this.owner = init.OWNERS[1];
			this.source = init.SOURCES[1];
			this.invNumber = '';
			this.location = 0;
			this.diameter = init.DIAMETERS[0];
			this.character = init.CHARACTERS[0];
			this.addresse = '';
			this.master = init.MASTERS[0];
			this.period = init.PERIODS[0];
			this.comment = '';
			this.flowValue = 1;
			this.place = init.PLACES[0];
			this.coordX = 0;
			this.coordY = 0;
		}

		// this._observers = [];
	}

	clone() {
		return new Defect(this);
	}

	// addObserver(observer) {
	// 	this._observers.push(observer);
	// }

	// removeObserver(observer) {
	// 	for(let i=0; i<this._observers.length; i++) {
	// 		let obs = this._observers[i];
	// 		if(obs === observer) {
	// 			this._observers.splice(i, 1);
	// 		}
	// 	}		
	// }

	// dataChanged() {
	// 	for(let i=0; i<this._observers.length; i++) {
	// 		this._observers[i].update();
	// 	}
	// }
	
}