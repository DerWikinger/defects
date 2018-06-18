//defect-service.js

"use strict"

import Initialization from './init';
import Filter from './filter';
import Defect from './classes/defect';
import $http from 'angular';

export class DefectService {

	constructor($q, $http, loginService) {
		
		this.DEFECTS = [];
		this.q = $q;
		this.http = $http;
		this.authorizationData = loginService.getAuthorizationData();
		this.init = new Initialization(this.authorizationData);
		this.filter = new Filter();
		this.VIEW_DEFECTS = [];
		this.OBSERVERS = [];
		this.listChangeObserver;	

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

		console.log(tableName);

		let deferer = this.q.defer();

		this.http({
			method: 'GET',
			url: `/defects?tableName=${tableName}`,
			headers: {
				'Authorization': this.authorizationData
			},
		})
		.then( (response)=> {
			deferer.resolve(response.data);			
		}, (error)=> {
			console.log(error);
			deferer.reject(error);
		});

		return deferer.promise;
	}

	getCurrentDefects () {

		this.VIEW_DEFECTS = [];
		this.OBSERVERS = [];

		for(let i = 0; i < this.DEFECTS.length; i++) {
			let defect = this.DEFECTS[i];
			if(this.filter.match(defect)) {
				this.VIEW_DEFECTS.push(defect);
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

	addDefect(defect) {

		let deferer = this.q.defer();

		this.http({
			method: 'PUT',
			url: `/defects`,
			headers: {
				'Authorization': this.authorizationData
			},
			data: { defect: defect }
		})
		.then((response)=> {
			let defectId = response.data[0].defectId;
			defect.defectId = defectId;
			this.DEFECTS.push(defect);
			if(this.filter.match(defect)) {
				this.VIEW_DEFECTS.push(defect);
				if(this.listChangeObserver) this.listChangeObserver.onUpdate();
			}
			deferer.resolve(defectId);			
		}, (error)=> {
			console.log(error);
			deferer.reject(error);
		});

		return deferer.promise;
	}

	editDefect(defect) {
		let deferer = this.q.defer();
		this.http({
			method: 'POST',
			url: '/defects',
			headers: {
				'Authorization': this.authorizationData
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

	deleteDefect(defect) {

		let deferer = this.q.defer();
		this.http({
			method: 'DELETE',
			url: `/defects?defectId=${defect.defectId}`,
			headers: {
				'Authorization': this.authorizationData
			},
		})
		.then((response)=> {

			for(let i = 0; i < this.DEFECTS.length; i++) {
				if(this.DEFECTS[i].defectId === defect.defectId){
					this.DEFECTS.splice(i, 1);
					break;
				}				
			}
			if(this.filter.match(defect)) {
				for(let i = 0; i < this.VIEW_DEFECTS.length; i++) {
					if(this.VIEW_DEFECTS[i].defectId === defect.defectId){
						this.VIEW_DEFECTS.splice(i, 1);
						if(this.listChangeObserver) this.listChangeObserver.onUpdate();
						break;
					}					
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
		this.OBSERVERS.push(observer);
	}

	onDataChange(defect) {
		for(let i = 0; i < this.OBSERVERS.length; i++) {
			let observer = this.OBSERVERS[i];
			if(observer.defect.defectId === defect.defectId) {
				observer.update();
				break;
			}
		}
	} 

}

export default function factory($q, $http, loginService) {

	return new DefectService($q, $http, loginService);
}