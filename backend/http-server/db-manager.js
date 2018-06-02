import mssql from 'mssql';

// const DB_SERVER = '192.168.1.34';
const DB_SERVER = 'localhost';
const DB_PORT = '62905';
const DB_NAME = 'dbDefects';
const USER = 'sa';
const PASSWORD = '123';


export default class DBManager {

	constructor(callback) {
		this.config = {
			user: USER,
    		password: PASSWORD,
    		server: DB_SERVER,
    		port: DB_PORT,
		    database: DB_NAME,
		    pool: {
		        max: 20,
		        min: 0,
		        idleTimeoutMillis: 60000		    
			}
		}
	}

	getDataBySQL(sqlString) {

		return new Promise((resolve, reject)=> {

			mssql.connect(this.config).then((pool) => {
    
			    return pool.request()
			    //.input('input_parameter', sql.Int, value)
			    .query(sqlString)
			}).then((response) => {
				mssql.close();

			    resolve(response.recordset);
			    // // Stored procedure
			    
			    // return pool.request()
			    // .input('input_parameter', sql.Int, value)
			    // .output('output_parameter', sql.VarChar(50))
			    // .execute('procedure_name')
			})
			.catch((err) => {
				mssql.close();
				reject(err);
			    // ... error checks
			});

			mssql.on('error', err => {
			    // ... error handler
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
					'${appearanceDate}',
					'${removeDate}',
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
			    // .input('input_parameter', sql.Int, value)
			    .output('defectId', mssql.Int)
			    .query(sqlString);
			}).then((response) => {
				mssql.close();
				console.log(response);
			    resolve(response.recordset);
			    // // Stored procedure
			    
			    // return pool.request()
			    // .input('input_parameter', sql.Int, value)
			    // .output('output_parameter', sql.VarChar(50))
			    // .execute('procedure_name')
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

	dateToSQL (date) {
		let _date = null;
		try {
			_date = new Date(date);
		} catch(err) {

		}
		if(!_date) return 'null';
		let yy = _date.getFullYear();
		let mm = (_date.getMonth() + 1);
		let dd = _date.getDate();
		let dateString = (dd < 10 ? '0' + dd : dd) + '-' + (mm < 10 ? '0' + mm : mm) + '-' + yy;
		return dateString;
	}
	
}