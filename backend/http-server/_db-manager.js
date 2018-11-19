//db-manager.js

// import mssql from 'mssql';

export default class DBManager {

	constructor(config) {
		this.config = {
			user: config.dbAdminLogin,
    		password: config.dbAdminPassword,
    		server: config.dbServerAddresse,
    		port: config.dbServerPort,
		    database: config.dbName,
		    pool: {
		        max: 20,
		        min: 0,
		        idleTimeoutMillis: config.dbIdleTimeout		    
			}
		}
		config.pushObserver(this);
	}

	update(newConfig) {
		this.config = {
			user: newConfig.dbAdminLogin,
    		password: newConfig.dbAdminPassword,
    		server: newConfig.dbServerAddresse,
    		port: newConfig.dbServerPort,
		    database: newConfig.dbName,
		    pool: {
		        max: 20,
		        min: 0,
		        idleTimeoutMillis: newConfig.dbIdleTimeout		    
			}
		}		
	}

	getTableData(tableName) {

		return new Promise((resolve, reject)=> {
			var data = this._getData(tableName);
			resolve(data);
		});
	}

	_getData(tableName) {
		switch(tableName) {
			case 'dbo.tblCategories':
				return [ 
					{categoryId: 1, categoryName: 'Основное'},
					{categoryId: 2, categoryName: 'Байпас'},
				];
			case 'dbo.tblSystems':
				return [ 
					{systemId: 1, systemName: 'Отопление'},
					{systemId: 2, systemName: 'ГВС'},
				];			
			case 'dbo.tblOwners':
				return [ 
					{ownerId: 1, ownerName: 'АГТС', ownerShortName: 'АГТС'},
					{ownerId: 2, ownerName: 'Другой', ownerShortName: 'Др.'},
				];
			case 'dbo.tblSources':
				return [ 
					{sourceId: 1, sourceName: 'ТЭЦ'},
					{sourceId: 2, sourceName: 'Котельная'},
				];		
			case 'dbo.tblCharacters':
				return [ 
					{characterId: 1, characterName: 'Свищ'},
					{characterId: 2, characterName: 'Разрыв'},
					{characterId: 3, characterName: 'Дефект арматуры'},
					{characterId: 4, characterName: 'Отпотина'},
				];	
			case 'dbo.tblDiameters':
				return [ 
					{diameterId: 1, diameterValue: 50},
					{diameterId: 2, diameterValue: 100},
					{diameterId: 3, diameterValue: 200},
					{diameterId: 4, diameterValue: 300},
				];
			case 'dbo.tblPeriods':
				return [ 
					{periodId: 1, periodName: 'Отопительный сезон'},
					{periodId: 2, periodName: 'Лето'},
				];		
			case 'dbo.tblPlaces':
				return [ 
					{placeId: 1, placeName: 'Тепловая камера'},
					{placeId: 2, placeName: 'Канальная'},
				];	
			case 'dbo.tblStatuses':
				return [ 
					{statusId: 1, statusName: 'Устранён'},
					{statusId: 2, statusName: 'Не устранён'},
					{statusId: 3, statusName: 'Хомут'},
					{statusId: 4, statusName: 'Забит чоп'},
				];	
			case 'dbo.tblTubeTypes':
				return [ 
					{tubeTypeId: 1, tubeTypeName: 'Прямая'},
					{tubeTypeId: 2, tubeTypeName: 'Обратная'},
					{tubeTypeId: 3, tubeTypeName: 'Перемычка'},
					{tubeTypeId: 4, tubeTypeName: 'Неопределено'},
				];	
			case 'dbo.tblEquipmentTypes':
				return [ 
					{equipmentTypeId: 1, equipmentTypeName: 'Труба'},
					{equipmentTypeId: 2, equipmentTypeName: 'Арматура'},
					{equipmentTypeId: 3, equipmentTypeName: 'Компенсатор'},
				];
			case 'dbo.tblRegions':
				return [ 
					{regionId: 1, regionName: 'РЭМТС'},
					{regionId: 2, regionName: 'РЭРТС'},
				];		
			case 'dbo.tblMasters':
				return [ 
					{masterId: 1, masterName: 'Стопкан', regionId: 1, number: 1},
					{masterId: 2, masterName: 'Третьяков', regionId: 2, number: 2},
				];	
			case 'dbo.viewOldDefects':
				return [
					{
						defectId: 3,
						defectSys: null,
						appearanceDate: '06/06/2018',
						removeDate: '',
						statusId: 1,
						equipmentTypeId: 1,
						beginPoint: 'ТК-15',
						endPoint: 'ТК-15-2',
						equipmentSys: 45645,
						systemId: 2,
						categoryId: 1,
						ownerId: 2,
						sourceId: 1,
						tubeTypeId: 2,
						invNumber: '100444',
						location: 5,
						diameterId: 1,
						characterId: 2,
						addresse: 'Попова, 37',
						masterId: 2,
						periodId: 2,
						comment: '',
						flowValue: 0,
						placeId: 2,
						coordX: null,
						coordY: null
					},
					{
						defectId: 4,
						defectSys: null,
						appearanceDate: '05/25/2018',
						removeDate: '30/08/2018',
						statusId: 1,
						equipmentTypeId: 1,
						beginPoint: 'ТК-8',
						endPoint: 'ТК-9',
						equipmentSys: 35476,
						systemId: 1,
						categoryId: 1,
						ownerId: 1,
						sourceId: 1,
						tubeTypeId: 1,
						invNumber: '653653',
						location: 20,
						diameterId: 4,
						characterId: 2,
						addresse: 'Тимме, 10',
						masterId: 1,
						periodId: 1,
						comment: '',
						flowValue: 100,
						placeId: 2,
						coordX: null,
						coordY: null
					}
				]
			case 'dbo.viewCurrentDefects':
				return [
					{
						defectId: 1,
						defectSys: null,
						appearanceDate: '01/10/2018',
						removeDate: '',
						statusId: 2,
						equipmentTypeId: 1,
						beginPoint: 'ТК-10',
						endPoint: 'ТК-11',
						equipmentSys: 54321,
						systemId: 1,
						categoryId: 1,
						ownerId: 1,
						sourceId: 1,
						tubeTypeId: 1,
						invNumber: '100876',
						location: 10,
						diameterId: 3,
						characterId: 1,
						addresse: 'Логиноава, 33',
						masterId: 1,
						periodId: 1,
						comment: '',
						flowValue: 0.5,
						placeId: 2,
						coordX: null,
						coordY: null
					},
					{
						defectId: 2,
						defectSys: null,
						appearanceDate: '03/11/2018',
						removeDate: '',
						statusId: 3,
						equipmentTypeId: 2,
						beginPoint: 'ТК-20',
						endPoint: 'ТК-20-1',
						equipmentSys: 45633,
						systemId: 1,
						categoryId: 1,
						ownerId: 1,
						sourceId: 1,
						tubeTypeId: 1,
						invNumber: '100555',
						location: 0,
						diameterId: 2,
						characterId: 3,
						addresse: 'Выучейского, 16',
						masterId: 1,
						periodId: 2,
						comment: '',
						flowValue: 0,
						placeId: 1,
						coordX: null,
						coordY: null
					}
				]
			default:
				console.log(tableName);	
		}
	}

	getDataBySQL(sqlString) {
		throw new Exception("Oops");
	}

	addDefect(defect) {
		throw new Exception("Oops");
	}

	editDefect(defect) {
		throw new Exception("Oops");
	}

	deleteDefect(defectId) {
		throw new Exception("Oops");
	}	
}