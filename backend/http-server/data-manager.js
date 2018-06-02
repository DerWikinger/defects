'use strict'

import DBManager from './db-manager';

export const TABLES = {};
export const CATEGORIES = [];
export const SYSTEMS = [];
export const OWNERS = [];
export const SOURCES = [];
export const CHARACTERS = [];
export const DIRECTIONS = [];
export const DIAMETERS = [];
export const PERIODS = [];
export const PLACES = [];
export const STATUSES = [];
export const TUBE_TYPES = [];
export const EQUIPMENT_TYPES = [];
export const REGIONS = [];
export const MASTERS = [];

export default class DataManager {

	constructor (callback) {

		this.dbManager = new DBManager();

		this._initialize().then(()=> {
			console.log('INITIALIZE COMPLETE');
			for(let el in TABLES) {
				console.log(TABLES[el]);
			}
			if(callback) {
				callback();
			}
		});
		
	}

	_getAll(tableName) {
		return new Promise((resolve, reject)=> {
			let sql = `SELECT * FROM ${tableName}`;
			this.dbManager.getDataBySQL(sql)
			.then((data) => {
				resolve(data);
			})
			.catch((err)=> {
				console.log('DATA MANAGER: _getAll');
				console.log(err);
				reject(err);
			})
		});
	}

	getAll(tableName) {
		return new Promise((resolve, reject)=> {
			let table = TABLES[tableName];
			console.log(tableName);
			if(!table) {
				console.log('REQUEST IS STARTED');
				this._getAll(tableName)
				.then((recordset) => {
					console.log('REQUEST IS COMPLETE');
					//console.log(recordset);
					resolve(recordset);				
				})
				.catch((err)=> {
					console.log('DATA MANAGER: getAll');
					console.log(err);
					reject(err);
				});
			} else {
				console.log(table);
				resolve(table);
			}
		});
	}

	_initialize() {

		return new Promise( (resolve, reject) => {
			this._getAll('dbo.tblCategories')
				//CATEGORIES
				.then( (_categories)=> {
					for(let i = 0; i < _categories.length; i++) {
						let obj = _categories[i];
						let category = { 
							categoryId: obj.categoryId, 
							categoryName: obj.categoryName 
						};
						CATEGORIES.push(category);
					}
					TABLES['dbo.tblCategories'] = CATEGORIES;
					//SYSTEMS
					this._getAll('dbo.tblSystems')
					.then((_systems)=> {
						for(let i = 0; i < _systems.length; i++) {
							let obj = _systems[i];
							let system = { 
								csystemId: obj.systemId, 
								systemName: obj.systemName 
							};
							SYSTEMS.push(system);
						}
						TABLES['dbo.tblSystems'] = SYSTEMS;
						//OWNERS
						this._getAll('dbo.tblOwners')
						.then((_owners)=> {
							for(let i = 0; i < _owners.length; i++) {
								let obj = _owners[i];
								let owner = {
									ownerId: obj.ownerId, 
									ownerName: obj.ownerName, 
									ownerShortName: obj.ownerShortName
								};
								OWNERS.push(owner);
							}
							TABLES['dbo.tblOwners'] = OWNERS;
							//SOURCES
							this._getAll('dbo.tblSources')
							.then((_sources)=> {
								for(let i = 0; i < _sources.length; i++) {
									let obj = _sources[i];
									let source = {
										sourceId: obj.sourceId, 
										sourceName: obj.sourceName
									};
									SOURCES.push(source);
								}
								TABLES['dbo.tblSources'] = SOURCES;
								//CHARACTERS
								this._getAll('dbo.tblCharacters')
								.then((_characters)=> {
									for(let i = 0; i < _characters.length; i++) {
										let obj = _characters[i];
										let character = {
											characterId: obj.characterId, 
											characterName: obj.characterName
										};
										CHARACTERS.push(character);
									}
									TABLES['dbo.tblCharacters'] = CHARACTERS;
									//DIAMETERS
									this._getAll('dbo.tblDiameters')
									.then((_diameters)=> {
										for(let i = 0; i < _diameters.length; i++) {
											let diameter = _diameters[i];
											//const diameter = new Diameter(obj.diameterId, obj.diameterValue);
											DIAMETERS.push(diameter);
										}
										TABLES['dbo.tblDiameters'] = DIAMETERS;
										//PERIODS
										this._getAll('dbo.tblPeriods')
										.then((_periods)=> {
											for(let i = 0; i < _periods.length; i++) {
												let period = _periods[i];
												//const period = new Period(obj.periodId, obj.periodName);
												PERIODS.push(period);
											}
											TABLES['dbo.tblPeriods'] = PERIODS;
											//PLACES
											this._getAll('dbo.tblPlaces')
											.then((_places)=> {
												for(let i = 0; i < _places.length; i++) {
													let place = _places[i];
													//const place = new Place(obj.placeId, obj.placeName);
													PLACES.push(place);
												}
												TABLES['dbo.tblPlaces'] = PLACES;
												//STATUSES
												this._getAll('dbo.tblStatuses')
												.then((_statuses)=> {
													for(let i = 0; i < _statuses.length; i++) {
														let status = _statuses[i];
														//const status = new Status(obj.statusId, obj.statusName);
														STATUSES.push(status);
													}
													TABLES['dbo.tblStatuses'] = STATUSES;
													//TUBE_TYPES
													this._getAll('dbo.tblTubeTypes')
													.then((_tubeTypes)=> {
														for(let i = 0; i < _tubeTypes.length; i++) {
															let tubeType = _tubeTypes[i];
															//const tubeType = new TubeType(obj.tubeTypeId, obj.tubeTypeName);
															TUBE_TYPES.push(tubeType);
														}
														TABLES['dbo.tblTubeTypes'] = TUBE_TYPES;
														//EQUIPMENT_TYPES
													this._getAll('dbo.tblEquipmentTypes')
													.then((_equipmentTypes)=> {
														for(let i = 0; i < _equipmentTypes.length; i++) {
															let equipmentType = _equipmentTypes[i];
															EQUIPMENT_TYPES.push(equipmentType);
														}
														TABLES['dbo.tblEquipmentTypes'] = EQUIPMENT_TYPES;
														//REGIONS
														this._getAll('dbo.tblRegions')
														.then((_regions)=> {
															for(let i = 0; i < _regions.length; i++) {
																let region = _regions[i];
																//const region = new Region(obj.regionId, obj.regionName);
																REGIONS.push(region);
															}
															TABLES['dbo.tblRegions'] = REGIONS;
															//MASTER
															this._getAll('dbo.tblMasters')
															.then((_masters)=> {
																for(let i = 0; i < _masters.length; i++) {
																	let master = _masters[i];
																	//const master = new Master(obj.masterId, obj.masterName, REGIONS[obj.regionId || 0], obj.number);
																	MASTERS.push(master);
																}
																TABLES['dbo.tblMasters'] = MASTERS;
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

														})//EQUIPMENT_TYPES

													.catch((err)=>{ //ERROR IN EQUIPMENT_TYPES
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

	addDefect(defect) {
		return new Promise((resolve, reject)=> {
			this.dbManager.addDefect(defect)
			.then((data)=> {
				console.log(data);
				resolve(data);
			})
			.catch((err)=> {
				console.log(err);
				reject(err);
			})
		});
	}
}