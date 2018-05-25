"use strict"

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
//import Model from './model';
//import DBManager from '../backend/db-manager';//здесь на будет заменить модуль на model.js

export const CATEGORIES = [new Category(0, 'Не выбран')];
export const SYSTEMS = [new System(0, 'Не выбран')];
export const OWNERS = [new Owner(0, 'Не выбран', 'Не выбран')];
export const SOURCES = [new Source(0, 'Не выбран')];
export const CHARACTERS = [new Character(0, 'Не выбран')];
export const DIAMETERS = [new Diameter(0, 'Не выбран')];
export const PERIODS = [new Period(0, 'Не выбран')];
export const PLACES = [new Place(0, 'Не выбран')];
export const STATUSES = [new Status(0, 'Не выбран')];
export const TUBE_TYPES = [new TubeType(0, 'Не выбран')];
export const REGIONS = [new Region(0, 'Не выбран')];
export const MASTERS = [new Master(0, 'Не выбран', REGIONS[0], 0)];
// export const EQUIPMENTS = [new Tube({
// 	equipmentId: 0,
// 	beginPoint: '',
// 	endPoint: '',
// 	equipmentSys: 0,
// 	system : SYSTEMS[0],
// 	category: CATEGORIES[0],
// 	owner: OWNERS[0],
// 	source: SOURCES[0],
// 	invNumber: '0'
// })];
// export const DEFECTS = [ new Defect({
// 	defectId: 0,
// 	objSys: 0,
// 	appearanceDate: new Date(),
// 	removeDate: null,
// 	status: STATUSES[0],
// 	equipment: EQUIPMENTS[0],
// 	location: 0,
// 	diameter: DIAMETERS[0],
// 	character: CHARACTERS[0],
// 	addresse: '',
// 	master: MASTERS[0],
// 	period: PERIODS[0],
// 	comment: '',
// 	folowValue: 0,
// 	place: PLACES[0],
// 	coordX: NaN,
// 	coordY: NaN
// })] 

//let dbManager = new DBManager();
//let model = new Model();

//LOADS ALL CONSTANT DATA FROM SPECIFIC TABLES
export function initialize(model) {

	return new Promise( (resolve, reject) => {
		model.getAll('dbo.tblCategories')
			//CATEGORIES
			.then( (_categories)=> {
				for(let i = 0; i < _categories.length; i++) {
					let obj = _categories[i];
					const category = new Category(obj.categoryId, obj.categoryName);
					CATEGORIES.push(category);
				}
				//SYSTEMS
				model.getAll('dbo.tblSystems')
				.then((_systems)=> {
					for(let i = 0; i < _systems.length; i++) {
						let obj = _systems[i];
						const system = new System(obj.systemId, obj.systemName);
						SYSTEMS.push(system);
					}
					//OWNERS
					model.getAll('dbo.tblOwners')
					.then((_owners)=> {
						for(let i = 0; i < _owners.length; i++) {
							let obj = _owners[i];
							const owner = new Owner(obj.ownerId, obj.ownerName, obj.ownerShortName);
							OWNERS.push(owner);
						}
						//SOURCES
						model.getAll('dbo.tblSources')
						.then((_sources)=> {
							for(let i = 0; i < _sources.length; i++) {
								let obj = _sources[i];
								const source = new Source(obj.sourceId, obj.sourceName);
								SOURCES.push(source);
							}
							//CHARACTERS
							model.getAll('dbo.tblCharacters')
							.then((_characters)=> {
								for(let i = 0; i < _characters.length; i++) {
									let obj = _characters[i];
									const character = new Character(obj.characterId, obj.characterName);
									CHARACTERS.push(character);
								}
								//DIAMETERS
								model.getAll('dbo.tblDiameters')
								.then((_diameters)=> {
									for(let i = 0; i < _diameters.length; i++) {
										let obj = _diameters[i];
										const diameter = new Diameter(obj.diameterId, obj.diameterValue);
										DIAMETERS.push(diameter);
									}
									//PERIODS
									model.getAll('dbo.tblPeriods')
									.then((_periods)=> {
										for(let i = 0; i < _periods.length; i++) {
											let obj = _periods[i];
											const period = new Period(obj.periodId, obj.periodName);
											PERIODS.push(period);
										}
										//PLACES
										model.getAll('dbo.tblPlaces')
										.then((_places)=> {
											for(let i = 0; i < _places.length; i++) {
												let obj = _places[i];
												const place = new Place(obj.placeId, obj.placeName);
												PLACES.push(place);
											}
											//STATUSES
											model.getAll('dbo.tblStatuses')
											.then((_statuses)=> {
												for(let i = 0; i < _statuses.length; i++) {
													let obj = _statuses[i];
													const status = new Status(obj.statusId, obj.statusName);
													STATUSES.push(status);
												}
												//TUBE_TYPES
												model.getAll('dbo.tblTubeTypes')
												.then((_tubeTypes)=> {
													for(let i = 0; i < _tubeTypes.length; i++) {
														let obj = _tubeTypes[i];
														const tubeType = new TubeType(obj.tubeTypeId, obj.tubeTypeName);
														TUBE_TYPES.push(tubeType);
													}
													//REGIONS
													model.getAll('dbo.tblRegions')
													.then((_regions)=> {
														for(let i = 0; i < _regions.length; i++) {
															let obj = _regions[i];
															const region = new Region(obj.regionId, obj.regionName);
															REGIONS.push(region);
														}
														//MASTER
														model.getAll('dbo.tblMasters')
														.then((_masters)=> {
															for(let i = 0; i < _masters.length; i++) {
																let obj = _masters[i];
																const master = new Master(obj.masterId, obj.masterName, REGIONS[obj.regionId || 0], obj.number);
																MASTERS.push(master);
															}

															//LATEST ACTION - RESOLVE()
															//console.log('LATEST ACTION');
															resolve();
														})//MASTERS
														.then(()=> {

														})

														.catch((err)=>{ //ERROR IN MASTERS
															reject(err);
														});

													})//REGIONS

													.catch((err)=>{ //ERROR IN REGIONS
														reject(err);
													});

												})//TUBE_TYPES

												.catch((err)=>{ //ERROR IN TUBE_TYPES
													reject(err);
												});

											})//STATUSES

											.catch((err)=>{ //ERROR IN STATUSES
												reject(err);
											});

										})//PLACES

										.catch((err)=>{ //ERROR IN PLACES
											reject(err);
										});

									})//PERIODS

									.catch((err)=>{ //ERROR IN PERIODS
										reject(err);
									});	

								})//DIAMETERS

								.catch((err)=>{ //ERROR IN DIAMETERS
									reject(err);
								});	

							})//CHARACTERS

							.catch((err)=>{ //ERROR IN CHARACTERS
								reject(err);
							});	

						})//SOURCES	

						.catch((err)=>{ //ERROR IN SOURCES
							reject(err);
						});	

					})//OWNERS

					.catch((err)=>{ //ERROR IN OWNERS
						reject(err);
					});
				
				})//SYSTEMS	

				.catch((err)=>{ //ERROR IN SYSTEMS
					reject(err);
				});			
		
		})//CATEGORIES
		
		.catch((err)=>{ //ERROR IN CATEGORIES
			reject(err);
		});

	});//PROMISE

};//FUNCTION INITIALIZE

export function getAllEquipments (model) {
		return new Promise((resolve, reject) => {
			//console.log('GET_ALL_EQUIPMENTS');
			model.getAll('dbo.viewEquipments').then((_equipments) => {
				//console.dir(_equipments);
				//debugger;
				for(let i = 0; i < _equipments.length; i++){
					//debugger;
					let obj = _equipments[i];
					let equipment = {
						equipmentId: obj.equipmentId,
						beginPoint: obj.beginPoint,
						endPoint: obj.endPoint,
						equipmentSys: obj.equipmentSys,
						system : SYSTEMS[obj.systemId || 0],
						category: CATEGORIES[obj.categoryId || 0],
						owner: OWNERS[obj.ownerId || 0],
						source: SOURCES[obj.sourceId || 0],
						invNumber: obj.invNumber || '0'
					};
					//console.log(equipment);
					switch(obj.equipmentTypeId || 0) {
						case 1:
							const tube = new Tube(equipment);
							EQUIPMENTS.push(tube);
							break;				
						case 2:
							const armature = new Armature(equipment);
							EQUIPMENTS.push(armature);
							break;				
						case 3:
							const compensator = new Compensator(equipment);
							EQUIPMENTS.push(compensator);
							break;
					}
				}
				resolve();
			})
			.catch((err)=> {
				reject(err);
			});
		});
	}

