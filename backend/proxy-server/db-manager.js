import mssql from 'mssql';
const DB_SERVER = '192.168.1.34:62905';
const USER = 'sa';
const PASSWORD = '123';

export default class DBManager {

	constructor() {
		
	}

	getAll(tableName) {
		return new Promise((resolve, reject)=> {
			let sql = `SELECT * FROM ${tableName}`;
			mssql.connect(`mssql://${USER}:${PASSWORD}@${DB_SERVER}/dbDefects`)
			.then( ()=> {
				new mssql.Request().query(sql)
				.then( (response)=> {
					mssql.close();
					resolve(response.recordset);
					//mssql.close();
				}).catch((err)=>{
					//mssql.close();
					reject(err);
				})
			})
		});
	}
}