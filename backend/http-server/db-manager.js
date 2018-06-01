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
	
}