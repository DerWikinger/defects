//db-manager.js

import mssql from 'mssql';

export default class DBManager {

	constructor(config) {
		this.config = {
			user: config.dbAdminLogin,
    		password: config.dbAdminPassword,
    		server: config.dbServerAddresse,
    		port: config.dbServerPort,
		    database: config.dbName,
		    pool: {
		        max: 100,
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
			var sqlString = 'SELECT * FROM ' + tableName;
			this.getDataBySQL(sqlString).then((data) => {
				resolve(data);
			})
			.catch((err) => {
				reject(err);
			})
		});
	}

	getDataBySQL(sqlString) {

		return new Promise((resolve, reject)=> {
			mssql.connect(this.config).then((pool)=> {
			    return pool.request()
			    //.input('input_parameter', sql.Int, value)
			    .query(sqlString);
			}).then((response) => {
			    mssql.close();
			    resolve(response.recordset);
			})
			.catch((err) => {
				mssql.close();
				reject(err);
			});

			mssql.on('error', err => {
			})

		});

	}

	addDefect(defect) {

		return new Promise((resolve, reject)=> {

			mssql.connect(this.config).then((pool) => {

				let appearanceDate = this.dateToSQL(defect.appearanceDate);
				let removeDate = this.dateToSQL(defect.removeDate);
				let location = defect.location.toFixed(2).replace(',', '.');
				let flowValue = defect.flowValue.toFixed(2).replace(',', '.');
    			let sqlString = `INSERT INTO dbo.tblDefects (
					defectSys, 
					appearanceDate,
					removeDate,
					statusId,
					equipmentTypeId,
					beginPoint,
					endPoint,
					equipmentSys,
					systemId,
					categoryId,
					ownerId,
					sourceId,
					tubeTypeId,
					invNumber,
					location,
					diameterId,
					characterId,
					addresse,
					masterId,
					periodId,
					comment,
					flowValue,
					placeId,
					coordX,
					coordY ) OUTPUT inserted.defectId VALUES (
					${defect.defectSys}, 
					${appearanceDate},
					${removeDate},
					${defect.status.statusId},
					${defect.equipmentType.equipmentTypeId},
					'${defect.beginPoint}',
					'${defect.endPoint}',
					${defect.equipmentSys},
					${defect.system.systemId},
					${defect.category.categoryId},
					${defect.owner.ownerId},
					${defect.source.sourceId},
					${defect.tubeType.tubeTypeId},
					'${defect.invNumber}',
					${location},
					${defect.diameter.diameterId},
					${defect.character.characterId},
					'${defect.addresse}',
					${defect.master.masterId},
					${defect.period.periodId},
					'${defect.comment}',
					${flowValue},
					${defect.place.placeId},
					${defect.coordX},
					${defect.coordY}
					)`;
			    return pool.request()
			    .output('defectId', mssql.Int)
			    .query(sqlString);
			}).then((response) => {
				mssql.close();
			    resolve(response.recordset);
			})
			.catch((err) => {
				mssql.close();
				console.log('DB ERROR');
				console.log(err);
				reject(err);
			});
		});
	}

	editDefect(defect) {

		return new Promise((resolve, reject)=> {

			mssql.connect(this.config).then((pool) => {
				let appearanceDate = this.dateToSQL(defect.appearanceDate);
				let removeDate = this.dateToSQL(defect.removeDate);
				let location = defect.location.toFixed(2).replace(',', '.');
				let flowValue = defect.flowValue.toFixed(2).replace(',', '.');
    			let sqlString = `UPDATE dbo.tblDefects SET
					defectSys = ${defect.defectSys},
					appearanceDate = ${appearanceDate},
					removeDate = ${removeDate},
					statusId = ${defect.status.statusId},
					equipmentTypeId = ${defect.equipmentType.equipmentTypeId},
					beginPoint = '${defect.beginPoint}',
					endPoint = '${defect.endPoint}',
					equipmentSys = ${defect.equipmentSys},
					systemId = ${defect.system.systemId},
					categoryId = ${defect.category.categoryId},
					ownerId = ${defect.owner.ownerId},
					sourceId = ${defect.source.sourceId},
					tubeTypeId = ${defect.tubeType.tubeTypeId},
					invNumber = '${defect.invNumber}',
					location = ${location},
					diameterId = ${defect.diameter.diameterId},
					characterId = ${defect.character.characterId},
					addresse = '${defect.addresse}',
					masterId = ${defect.master.masterId},
					periodId = ${defect.period.periodId},
					comment = '${defect.comment}',
					flowValue = ${flowValue},
					placeId = ${defect.place.placeId},
					coordX = ${defect.coordX},
					coordY = ${defect.coordY} 
					WHERE dbo.tblDefects.defectId = ${defect.defectId}`;
				// console.log(sqlString);
			    return pool.request()
			    // .input('appearanceDate', mssql.date, defect.appearanceDate)
			    .query(sqlString);
			}).then((response) => {
				mssql.close();
			    resolve(response.recordset);
			})
			.catch((err) => {
				mssql.close();
				console.log('DB ERROR');
				console.log(err);
				reject(err);
			    // ... error checks
			});
		});
	}

	deleteDefect(defectId) {

		return new Promise((resolve, reject)=> {

			mssql.connect(this.config).then((pool) => {

    			let sqlString = `DELETE FROM dbo.tblDefects WHERE dbo.tblDefects.defectId = ${defectId}`;
			    return pool.request()
			    .query(sqlString);
			}).then((response) => {
				mssql.close();
			    resolve(response.recordset);
			})
			.catch((err) => {
				mssql.close();
				console.log('DB ERROR');
				console.log(err);
				reject(err);
			});
		});
	}

	dateToSQL (date) {

		if(!date) return 'null';

		let _date = null;

		try {
			_date = new Date(date);
		} catch(err) {
			return 'null';
		}		

		let yy = _date.getFullYear();
		let mm = (_date.getMonth() + 1);
		let dd = _date.getDate();
		let dateString = "'" + yy + '-' + (mm < 10 ? '0' + mm : mm) + '-' + (dd < 10 ? '0' + dd : dd) + "'";

		return dateString;
	}
	
}