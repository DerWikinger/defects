//defect-service.js

"use strict"

import * as init from './init';
import Defect from './classes/defect';
import $http from 'angular';

export class DefectService {

	constructor($q, $http, loginService) {
		
		this._defects = [];
		this._observers = [];
		this.q = $q;
		this.http = $http;
		this.authorizationData = loginService.getAuthorizationData();
		init.initialize(this.authorizationData);

		console.log('INITIALIZE IS COMPLETE');
	}

	concatArray(array) {
		for(let i=0; i<array.length; i++) {
			this._defects.push(array[i]);
		}

		this.listChanged();
	}

	_getAllRecords(tableName) {

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

		let deferer = this.q.defer();

		this._getAllRecords('dbo.viewCurrentDefects').then((_defects)=> {
			
			for(let i=0; i<_defects.length; i++){
				let db_obj = _defects[i];
				// console.log(db_obj);
				let defect = this.createDefectFromDBObject(db_obj);
				this._defects.push(defect);				
			}

			deferer.resolve(this._defects);
		}).catch((err)=> {
			deferer.reject(err);
		});

		return deferer.promise;
	}

	getOldDefects() {

		let deferer = this.q.defer();
		let _oldDefects = [];

		this._getAllRecords('dbo.viewOldDefects').then((defects)=> {

			for(let i = 0; i < defects.length; i++) {
				let db_obj = defects[i];
				let defect = this.createDefectFromDBObject(db_obj);
				_oldDefects.push(defect);				
			}

			deferer.resolve(_oldDefects);
		}).catch((err)=> {
			deferer.reject(err);
		});

		return deferer.promise;
	}

	getDefectList() {
		return this._defects;
	}

	getDefectById(defectId) {
		let _defectId = +defectId;
		let i = 0;
		for(; i < this._defects.length; i++) {
			if(this._defects[i].defectId === _defectId) {
				return this._defects[i];
			}			
		}
		return null;
	}

	createDefectFromDBObject(obj) {

		return new Defect({
			defectId: +obj.defectId,
			defectSys: +obj.defectSys,
			appearanceDate: (obj.appearanceDate ? new Date(obj.appearanceDate) : null),
			removeDate: (obj.removeDate ? new Date(obj.removeDate) : null),
			status: init.STATUSES[+obj.statusId || 0],
			equipmentType: init.EQUIPMENT_TYPES[+obj.equipmentTypeId || 0],
			beginPoint: obj.beginPoint,
			endPoint: obj.endPoint,
			equipmentSys: +obj.equipmentSys,
			system : init.SYSTEMS[+obj.systemId || 0],
			category: init.CATEGORIES[+obj.categoryId || 0],
			tubeType: init.TUBE_TYPES[+obj.tubeTypeId || 0],
			owner: init.OWNERS[+obj.ownerId || 0],
			source: init.SOURCES[+obj.sourceId || 0],
			invNumber: obj.invNumber,
			location: +obj.location,
			diameter: init.DIAMETERS[+obj.diameterId || 0],
			character: init.CHARACTERS[+obj.characterId || 0],
			addresse: obj.addresse,
			master: init.MASTERS[+obj.masterId || 0],
			period: init.PERIODS[+obj.periodId || 0],
			comment: obj.comment,
			flowValue: +obj.flowValue,
			place: init.PLACES[+obj.placeId || 0],
			coordX: +obj.coordX,
			coordY: +obj.coordY			
		});
	}

	getNewDefect() {
		return new Defect();
	}

	cloneDefect(defect) {
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
			this._defects.push(defect);
			this.listChanged();
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
			this.listChanged();
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
			for(let i = 0; i < this._defects.length; i++) {
				if(this._defects[i].defectId === defect.defectId){
					this._defects.splice(i, 1);
					break;
				}				
			}
			this.listChanged();
			deferer.resolve();
		}, (error)=> {
			console.log(error);
			deferer.reject(error);
		});

		return deferer.promise;
	}

	addObserver(observer) {
		this._observers.push(observer);
	}

	removeObserver(observer) {
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

export default function factory($q, $http, loginService) {

	return new DefectService($q, $http, loginService);
}