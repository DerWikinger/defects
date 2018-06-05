"use strict"

import Initialization from './init';
import Defect from './classes/defect';
// import Tube from './classes/tube';
// import Compensator from './classes/compensator';
// import Armature from './classes/armature';
// import EquipmentType from './classes/equipment-type';
// import Category from './classes/category';
// import System from './classes/system';
// import Owner from './classes/owner';
// import Source from './classes/source';
// import Character from './classes/character';
// import Diameter from './classes/diameter';
// import Period from './classes/period';
// import Place from './classes/place';
// import Status from './classes/status';
// import TubeType from './classes/tube-type';
// import Region from './classes/region';
// import Master from './classes/master';
import $http from 'angular';

export class DefectService {

	constructor($q, $http, loginService) {
		
		this.DEFECTS = [];
		this.q = $q;
		this.http = $http;
		this.init = new Initialization();
		this.filter = { 
			status: { 
				value: this.init.STATUSES[1], equal: false 
			} 
		};
		this.VIEW_DEFECTS = [];
		this.observers = [];

		console.log('INITIALIZE IS COMPLETE');
	}

	getAllDefects() {
		let deferer = this.q.defer();

		this.getAllRecords('dbo.viewAllDefects').then((_defects)=> {
			
			for(let i = 0; i < _defects.length; i++){
				let db_obj = _defects[i];
				let defect = this.createDefectFromDBObject(db_obj);
				this.DEFECTS.push(defect);				
			}

			deferer.resolve(this.DEFECTS);
		}).catch((err)=> {
			deferer.reject(err);
		});

		return deferer.promise;
	}

	getAllRecords(tableName) {

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

		this.VIEW_DEFECTS = [];

		for(let i = 0; i < this.DEFECTS.length; i++) {
			let defect = this.DEFECTS[i];
			for(let prop in this.filter) {
				let property = this.filter[prop];
				if(defect[prop].equal(property.value) === property.equal) {
					this.VIEW_DEFECTS.push(defect);
				}
			}
		}

		return this.VIEW_DEFECTS;

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

	createDefectFromDBObject(obj) {
		return new Defect({
			defectId: +obj.defectId,
			defectSys: +obj.defectSys,
			appearanceDate: (obj.appearanceDate ? new Date(obj.appearanceDate) : null),
			removeDate: (obj.removeDate ? new Date(obj.removeDate) : null),
			status: this.init.STATUSES[+obj.statusId || 0],
			equipmentType: this.init.EQUIPMENT_TYPES[+obj.equipmentTypeId || 0],
			beginPoint: obj.beginPoint,
			endPoint: obj.endPoint,
			equipmentSys: +obj.equipmentSys,
			system : this.init.SYSTEMS[+obj.systemId || 0],
			category: this.init.CATEGORIES[+obj.categoryId || 0],
			tubeType: this.init.TUBE_TYPES[+obj.tubeTypeId || 0],
			owner: this.init.OWNERS[+obj.ownerId || 0],
			source: this.init.SOURCES[+obj.sourceId || 0],
			invNumber: obj.invNumber,
			location: +obj.location,
			diameter: this.init.DIAMETERS[+obj.diameterId || 0],
			character: this.init.CHARACTERS[+obj.characterId || 0],
			addresse: obj.addresse,
			master: this.init.MASTERS[+obj.masterId || 0],
			period: this.init.PERIODS[+obj.periodId || 0],
			comment: obj.comment,
			flowValue: +obj.flowValue,
			place: this.init.PLACES[+obj.placeId || 0],
			coordX: +obj.coordX,
			coordY: +obj.coordY			
		})
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

	clone(defect) {
		return new Defect(defect);
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
		.then((response)=> {
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

	editDefect(defect, authorizationData) {
		console.log(defect);
		let deferer = this.q.defer();
		this.http({
			method: 'POST',
			url: '/defects',
			headers: {
				'Authorization': authorizationData
			},
			data: { defect: defect }
		})
		.then((response)=> {
			this.onDataChange(defect);
			deferer.resolve();
		}, (error)=> {
			console.log(error);
			deferer.reject(error);
		});

		return deferer.promise;
	}

	deleteDefect(defectId, authorizationData) {

		let deferer = this.q.defer();
		this.http({
			method: 'DELETE',
			url: `/defects?defectId=${defectId}`,
			headers: {
				'Authorization': authorizationData
			},
			// data: { defectId: defectId }
		})
		.then((response)=> {

			for(let i = 0; i < this.DEFECTS.length; i++) {
				if(this.DEFECTS[i].defectId === defectId){
					this.DEFECTS.splice(i, 1);
					break;
				}				
			}
			deferer.resolve();
		}, (error)=> {
			console.log(error);
			deferer.reject(error);
		});

		return deferer.promise;
	}

	pushObserver(observer) {
		this.observers.push(observer);
	}

	onDataChange(defect) {
		for(let i = 0; i < this.observers.length; i++) {
			let observer = this.observers[i];
			if(observer.defect.defectId === defect.defectId) {
				observer.onUpdate();
				break;
			}
		}
	} 

}

export default function factory($q, $http) {
	// let defectServer = new DefectService($q, $http).then((ds)=> {
	// 	return ds;
	// });
	return new DefectService($q, $http);
}