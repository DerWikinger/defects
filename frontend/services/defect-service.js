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

export class DefectService {

	constructor($q, $http, loginService) {
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
					tubeType: this.init.TUBE_TYPES[+obj.tubeTypeId],
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

	getNewDefect() {
		let defect = new Defect({
			defectId: 0,
			defectSys: 0,
			appearanceDate: new Date(),
			removeDate: null,
			status: this.init.STATUSES[2],
			equipmentType: this.init.EQUIPMENT_TYPES[1],
			beginPoint: '',
			endPoint: '',
			equipmentSys: 0,
			system : this.init.SYSTEMS[1],
			category: this.init.CATEGORIES[1],
			tubeType: this.init.TUBE_TYPES[0],
			owner: this.init.OWNERS[1],
			source: this.init.SOURCES[1],
			invNumber: '',
			location: 0,
			diameter: this.init.DIAMETERS[0],
			character: this.init.CHARACTERS[0],
			addresse: '',
			master: this.init.MASTERS[0],
			period: this.init.PERIODS[0],
			comment: '',
			flowValue: 1,
			place: this.init.PLACES[0],
			coordX: 0,
			coordY: 0
		});
				
		return defect;
	}

	addDefect(defect, authorizationData) {

		let deferer = this.q.defer();

		this.http({
			method: 'PUT',
			url: `/defects`,
			headers: {
				'Authorization': authorizationData
			},
			data: { defect: defect }
		})
		.then( (response)=> {
			let defectId = response.data[0].defectId;
			defect.defectId = defectId;
			this.DEFECTS.push(defect);
			deferer.resolve(defectId);			
		}, (error)=> {
			console.log(error);
			deferer.reject(error);
		});

		return deferer.promise;
	}
}

export default function factory($q, $http) {
	// let defectServer = new DefectService($q, $http).then((ds)=> {
	// 	return ds;
	// });
	return new DefectService($q, $http);
}