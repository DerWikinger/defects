//data-manager.js

'use strict'

export default class DataManager {

	constructor (dbManager) {

		this.dbManager = dbManager;

		this.CATEGORIES = [];
		this.SYSTEMS = [];
		this.OWNERS = [];
		this.SOURCES = [];
		this.CHARACTERS = [];
		this.DIAMETERS = [];
		this.PERIODS = [];
		this.PLACES = [];
		this.STATUSES = [];
		this.TUBE_TYPES = [];
		this.EQUIPMENT_TYPES = [];
		this.REGIONS = [];
		this.MASTERS = [];

		this._tables = [
			{ tableName: 'dbo.tblCategories', tableData: this.CATEGORIES },
			{ tableName: 'dbo.tblSystems', tableData: this.SYSTEMS },
			{ tableName: 'dbo.tblOwners', tableData:  this.OWNERS },
			{ tableName: 'dbo.tblSources', tableData: this.SOURCES },
			{ tableName: 'dbo.tblCharacters', tableData: this.CHARACTERS },
			{ tableName: 'dbo.tblDiameters', tableData: this.DIAMETERS },
			{ tableName: 'dbo.tblPeriods', tableData: this.PERIODS },
			{ tableName: 'dbo.tblPlaces', tableData: this.PLACES },
			{ tableName: 'dbo.tblStatuses', tableData: this.STATUSES },
			{ tableName: 'dbo.tblTubeTypes', tableData: this.TUBE_TYPES },
			{ tableName: 'dbo.tblEquipmentTypes', tableData: this.EQUIPMENT_TYPES },
			{ tableName: 'dbo.tblRegions', tableData: this.REGIONS },
			{ tableName: 'dbo.tblMasters', tableData: this.MASTERS },
		];

		try {
			this._initialize();
		} catch(err) {
			console.log('ERROR IN INITIALIZE');
		};
		
	}

	_getTableData(tableName) {
		return new Promise((resolve, reject)=> {
			this.dbManager.getTableData(tableName)
			.then((data) => {
				resolve(data);
			})
			.catch((err)=> {
				console.log('DATA MANAGER: _getTableData');
				console.log(err);
				reject(err);
			})
		});
	}	

	_getTable(tableName) {
		for(let i=0; i<this._tables.length; i++) {
			if(this._tables.tableName === tableName) return this._tables.tableData;
		}
	}

	_initialize() {

		for(let tableIndex=0; tableIndex < this._tables.length; tableIndex++) {

			let tableName = this._tables[tableIndex].tableName;
								
			if(tableName === 'dbo.tblOwners') {
				this._getTableData('dbo.tblOwners')
					.then((_owners)=> {
						for(let i = 0; i < _owners.length; i++) {
							let obj = _owners[i];
							let owner = {
								ownerId: obj.ownerId, 
								ownerName: obj.ownerName, 
								ownerShortName: obj.ownerShortName
							};
							this.OWNERS.push(owner);
						}
						console.log(`Initialization of the table '${tableName}' is complete`);
					})
					.catch((err)=> {
						console.log('INITIALIZE ERROR');
					})					
			} else if (tableName === 'dbo.tblMasters') {
				this._getTableData('dbo.tblRegions')
				.then((_regions)=> {
					
					for(let i = 0; i < _regions.length; i++) {
						let obj = _regions[i];
						let region = {
							regionId: obj.regionId, 
							regionName: obj.regionName
						};
						this.REGIONS.push(region);
					};
						
					this._getTableData('dbo.tblMasters')
					.then((_masters)=> {
						for(let i = 0; i < _masters.length; i++) {
							let obj = _masters[i];
							let master = {
								masterId: obj.masterId, 
								masterName: obj.masterName,
								regionId: obj.regionId,
								number: obj.number
							};
							this.MASTERS.push(master);
						}
						console.log(`Initialization of the table 'dbo.tblMasters' is complete`);
						console.log(this.MASTERS);
					})
					.catch((err) => {
						console.log(err);							
					});
				
					console.log(`Initialization of the table 'dbo.tblRegions' is complete`);
					console.log(this.REGIONS);
				})
				.catch((err)=> {
					console.log('INITIALIZE ERROR');
				});
			} else if(tableName === 'dbo.tblRegions') {
				continue;
			} else {
				this._getTableData(tableName)
				.then((data)=> {
					let subjectName = this._getSubjectName(tableName);
					for(let i = 0; i < data.length; i++) {
						let obj = data[i];
						// console.log(obj);
						let item = {};
						let fieldName = subjectName + 'Id';
						item[fieldName] = obj[fieldName];
						fieldName = subjectName + (subjectName == 'diameter' ? 'Value' : 'Name');
						item[fieldName] = obj[fieldName];
						this._tables[tableIndex].tableData.push(item);
					}
					console.log(`Initialization of the table '${tableName}' is complete`);
					console.log(this._tables[tableIndex].tableData);
				})
				.catch((err)=> {
					console.log(err);
				});
			}
		}; //END OF LOOP FOR TABLEINDEX
	} //END OF INITIALIZE

	_getSubjectName(tableName) {
		switch(tableName) {
			case 'dbo.tblCategories' :
				return 'category';
			case 'dbo.tblSystems' :
				return 'system';
			case 'dbo.tblSources' :
				return 'source';
			case 'dbo.tblCharacters' :
				return 'character';
			case 'dbo.tblDiameters' :
				return 'diameter';
			case 'dbo.tblPeriods' :
				return 'period';
			case 'dbo.tblPlaces' :
				return 'place';
			case 'dbo.tblStatuses' :
				return 'status';
			case 'dbo.tblTubeTypes' :
				return 'tubeType';
			case 'dbo.tblEquipmentTypes' :
				return 'equipmentType';
			default:
				throw Exception('Ooops');
		}
	}

	getAll(tableName) {
		return new Promise((resolve, reject)=> {
			let table = this._getTable(tableName);
			console.log(tableName);
			if(!table) {
				console.log('REQUEST IS STARTED');
				this._getTableData(tableName)
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

	addDefect(defect) {
		return new Promise((resolve, reject)=> {
			this.dbManager.addDefect(defect)
			.then((data)=> {
				resolve(data);
			})
			.catch((err)=> {
				console.log(err);
				reject(err);
			})
		});
	}

	editDefect(defect) {
		return new Promise((resolve, reject)=> {
			this.dbManager.editDefect(defect)
			.then((data)=> {
				resolve(data);
			})
			.catch((err)=> {
				console.log(err);
				reject(err);
			})
		});
	}

	deleteDefect(defectId) {
		return new Promise((resolve, reject)=> {
			this.dbManager.deleteDefect(defectId)
			.then((data)=> {
				resolve(data);
			})
			.catch((err)=> {
				console.log(err);
				reject(err);
			})
		});
	}
}