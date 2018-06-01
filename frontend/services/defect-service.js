"use strict"

import Initialization from './init';
import Defect from './classes/defect';
// import Tube from './classes/tube';
// import Compensator from './classes/compensator';
// import Armature from './classes/armature';
import EquipmentType from './classes/equipment-type';
import Category from './classes/category';
import System from './classes/system';
import Owner from './classes/owner';
import Source from './classes/source';
import Character from './classes/character';
import Diameter from './classes/diameter';
import Period from './classes/period';
import Place from './classes/place';
import Status from './classes/status';
import TubeType from './classes/tube-type';
import Region from './classes/region';
import Master from './classes/master';
import $http from 'angular';

// export const NEW_DEFECT = {
// 	defectId: 0,
// 	defectSys: 0,
// 	appearanceDate: new Date(),
// 	removeDate: null,
// 	status: init.STATUSES[0],
// 	equipment: new Tube({
// 		equipmentId: 0,
// 		beginPoint: '',
// 		endPoint: '',
// 		equipmentSys: 0,
// 		system : init.SYSTEMS[0],
// 		category: init.CATEGORIES[0],
// 		owner: init.OWNERS[0],
// 		source: init.SOURCES[0],
// 		invNumber: '0'
// 	}),
// 	location: 0,
// 	diameter: init.DIAMETERS[0],
// 	character: init.CHARACTERS[0],
// 	addresse: '',
// 	master: init.MASTERS[0],
// 	period: init.PERIODS[0],
// 	comment: '',
// 	flowValue: 1,
// 	place: init.PLACES[0],
// 	coordX: NaN,
// 	coordY: NaN
// };

export class DefectService {

	constructor($q, $http) {
		this.DEFECTS = [];
		this.q = $q;
		this.http = $http;
		this.init = new Initialization();
		console.log('INITIALIZE IS COMPLETE');
	}

	getAll(tableName) {

		let deferer = this.q.defer();

		this.http({
			method: 'GET',
			url: `/defects?tableName=${tableName}`
		}).then( (response)=> {
			//console.log(response);
			deferer.resolve(response.data);			
		}, (error)=> {
			console.log(error);
			deferer.reject(error);
		});

		return deferer.promise;
	}

	getCurrentDefects () {

		let deferer = this.q.defer();

		this.getAll('dbo.viewCurrentDefects').then((_defects)=> {
			
			for(let i = 0; i < _defects.length; i++){
				let obj = _defects[i];
				let defect = new Defect({
					defectId: +obj.defectId,
					defectSys: +obj.defectSys,
					appearanceDate: (obj.appearanceDate ? new Date(obj.appearanceDate) : null),
					removeDate: (obj.removeDate ? new Date(obj.removeDate) : null),
					status: this.init.STATUSES[+obj.statusId],
					equipmentType: this.init.EQUIPMENT_TYPES[+obj.equipmentTypeId],
					beginPoint: obj.beginPoint,
					endPoint: obj.endPoint,
					equipmentSys: +obj.equipmentSys,
					system : this.init.SYSTEMS[+obj.systemId],
					category: this.init.CATEGORIES[+obj.categoryId],
					owner: this.init.OWNERS[+obj.ownerId],
					source: this.init.SOURCES[+obj.sourceId],
					invNumber: obj.invNumber,
					location: +obj.location,
					diameter: this.init.DIAMETERS[+obj.diameterId],
					character: this.init.CHARACTERS[+obj.characterId],
					addresse: obj.addresse,
					master: this.init.MASTERS[+obj.masterId],
					period: this.init.PERIODS[+obj.periodId],
					comment: obj.comment,
					flowValue: +obj.flowValue,
					place: this.init.PLACES[+obj.placeId],
					coordX: +obj.coordX,
					coordY: +obj.coordY
				});
				this.DEFECTS.push(defect);				
			}

			deferer.resolve(this.DEFECTS);
		}).catch((err)=> {
			deferer.reject(err);
		});

		return deferer.promise;

		//let deferer = this.q.defer();

		// return new Promise((resolve, reject) => {
		// 	this.getAll('dbo.viewCurrentDefects').then((_defects) => {
		// 		//console.log('GET_ALL');
		// 		for(let i = 0; i < _defects.length; i++){
		// 			let obj = _defects[i];
		// 			let defect = {
		// 				defectId: obj.defectId,
		// 				defectSys: obj.defectSys || 0,
		// 				appearanceDate: obj.appearanceDate,
		// 				removeDate: obj.removeDate || null,
		// 				status: init.STATUSES[obj.statusId || 0],
		// 				equipment: EQUIPMENTS[obj.equipmentId],
		// 				location: obj.location || 0,
		// 				diameter: init.DIAMETERS[obj.diameterId || 0],
		// 				character: init.CHARACTERS[obj.characterId || 0],
		// 				addresse: obj.addresse || '',
		// 				master: init.MASTERS[obj.masterId || 0],
		// 				period: init.PERIODS[obj.periodId || 0],
		// 				comment: obj.comment || '',
		// 				folowValue: obj.folowValue || 0,
		// 				place: init.PLACES[obj.placeId || 0],
		// 				coordX: obj.coordX || null,
		// 				coordY: obj.coordY || null
		// 			};
		// 			DEFECTS.push(defect);
		// 		}
		// 		resolve(DEFECTS);
		// 	})
		// 	.catch((err)=> {
		// 		reject(err);
		// 	});
		// });
	}

	getArray(arrayName) {
		return this.init[arrayName];
	}

	getDefectById(defectId) {
		let _defectId = +defectId;
		let i = 0;
		for(; i < this.DEFECTS.length; i++) {
			if(this.DEFECTS[i].defectId === _defectId) {
				break;
			}			
		}
		return (i<this.DEFECTS.length ? this.DEFECTS[i] : null);
	}
}

export default function factory($q, $http) {
	// let defectServer = new DefectService($q, $http).then((ds)=> {
	// 	return ds;
	// });
	return new DefectService($q, $http);
}