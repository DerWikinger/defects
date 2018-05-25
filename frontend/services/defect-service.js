"use strict"

import * as init from './init';
import Defect from './classes/defect';
import Tube from './classes/tube';
import Compensator from './classes/compensator';
import Armature from './classes/armature';
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

// export const EQUIPMENTS = [new Tube({
// 	equipmentId: 0,
// 	beginPoint: '',
// 	endPoint: '',
// 	equipmentSys: 0,
// 	system : init.SYSTEMS[0],
// 	category: init.CATEGORIES[0],
// 	owner: init.OWNERS[0],
// 	source: init.SOURCES[0],
// 	invNumber: '0'
// })];

export const DEFECTS = [new Defect({
	defectId: 0,
	defectSys: 0,
	appearanceDate: new Date(),
	removeDate: null,
	status: init.STATUSES[0],
	equipment: new Tube({
		equipmentId: 0,
		beginPoint: '',
		endPoint: '',
		equipmentSys: 0,
		system : init.SYSTEMS[0],
		category: init.CATEGORIES[0],
		owner: init.OWNERS[0],
		source: init.SOURCES[0],
		invNumber: '0'
	}),
	location: 0,
	diameter: init.DIAMETERS[0],
	character: init.CHARACTERS[0],
	addresse: '',
	master: init.MASTERS[0],
	period: init.PERIODS[0],
	comment: '',
	folowValue: 0,
	place: init.PLACES[0],
	coordX: NaN,
	coordY: NaN
})] 

export class DefectService {

	constructor($http) {

		this.http = $http;

		//this.ngApp = ngApp;

		console.log("MODEL");

		for(let i = 1; i < 1000; i++) {
			let _equip = {
				equipmentId: i,
				beginPoint: '',
				endPoint: '',
				equipmentSys: i * 10 + i,
				system : init.SYSTEMS[0],
				category: init.CATEGORIES[0],
				owner: init.OWNERS[0],
				source: init.SOURCES[0],
				invNumber: '0'
			};
			let equipment = ( i % 3 + 1 == 1 ? new Tube(_equip) : i % 3 + 1 == 2 ? new Armature(_equip) : new Compensator(_equip));
			//EQUIPMENTS.push(equipment);
			let defect = new Defect({
				defectId: i,
				defectSys: i * 100 + i * 5 + i,
				appearanceDate: new Date(),
				removeDate: null,
				status: init.STATUSES[0],
				equipment: equipment,
				location: 0,
				diameter: init.DIAMETERS[0],
				character: init.CHARACTERS[0],
				addresse: '',
				master: init.MASTERS[0],
				period: init.PERIODS[0],
				comment: '',
				folowValue: 0,
				place: init.PLACES[0],
				coordX: 300 * i + 25 * i + i,
				coordY: 250 * i + 30 * i + i
			});
			DEFECTS.push(defect);
		}

		//console.log(DEFECTS);

		//callback();
		// init.initialize(this).then(()=> {
		// 	init.getAllEquipments(this).then(()=> {
		// 		console.log('INITIALIZE IS COMPLETE');
		// 		callback();
		// 	})
		// });
	}

	getAll(tableName) {

		return new Promise( (resolve, reject) => {

			let xhr;

			if (window.XMLHttpRequest) {
            	xhr = new XMLHttpRequest(); 
			} else if (window.ActiveXObject) { 
            	xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            if(!xhr) {
            	reject('Error');
            } else {
				//let body = 'tableName=' + encodeURIComponent(tableName);
				xhr.open("GET", `/defects?tableName=${tableName}`, true);
				xhr.setRequestHeader('Authorization', localStorage.userId + ' ' + localStorage.token);
				xhr.onreadystatechange = function() {			  	
				  	if (xhr.readyState == 4) {
				  		if(xhr.status == 200) {
				  			//debugger;
				  			let data = xhr.responseText;
				  			resolve(JSON.parse(data));
				  		} else {
				  			reject(xhr.statusText);
				  		}
				  	}
				}
				xhr.send();
			}
		});
	}

	getAllEquipments () {
		return init.EQUIPMENTS;
		// return new Promise((resolve, reject) => {
		// 	//console.log('GET_ALL_EQUIPMENTS');
		// 	this.getAll('dbo.tblEquipments').then((_equipments) => {
		// 		//console.dir(_equipments);
		// 		//debugger;
		// 		for(let i = 0; i < _equipments.length; i++){
		// 			let obj = _equipments[i];
		// 			let equipment = {
		// 				equipmentId: obj.equipmentId,
		// 				beginPoint: obj.beginPoint,
		// 				endPoint: obj.endPoint,
		// 				equipmentSys: obj.equipmentSys,
		// 				system : init.SYSTEMS[obj.systemId || 0],
		// 				category: init.CATEGORIES[obj.categoryId || 0],
		// 				owner: init.OWNERS[obj.ownerId || 0],
		// 				source: init.SOURCES[obj.sourceId || 0],
		// 				invNumber: obj.invNumber || '0'
		// 			};
		// 			//console.log(equipment);
		// 			switch(obj.equipmentTypeId || 0) {
		// 				case 1:
		// 					let tube = new Tube(equipment);
		// 					EQUIPMENTS.push(tube);
		// 					break;				
		// 				case 2:
		// 					let armature = new Armature(equipment);
		// 					EQUIPMENTS.push(armature);
		// 					break;				
		// 				case 3:
		// 					let compensator = new Compensator(equipment);
		// 					EQUIPMENTS.push(compensator);
		// 					break;
		// 			}
		// 		}
		// 		resolve(EQUIPMENTS);
		// 	})
		// 	.catch((err)=> {
		// 		reject(err);
		// 	});
		// });
	}

	getAllDefects () {

		return DEFECTS;
		// return new Promise((resolve, reject) => {
		// 	//console.log('GET_ALL_EQUIPMENTS');
		// 	this.getAll('dbo.tblDefects').then((_defects) => {
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
}

export default function factory($http) {
	return new DefectService($http);
}

//export { Model };