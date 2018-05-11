var cookieParser = require('cookie-parser');
var session = require('express-session');
var MSSQLStore = require('connect-mssql')(session);
var mssql = require('mssql');

// mssql.connect('mssql://sa:123@192.168.1.34:62905/dbDefects').then(()=> {
// 	new mssql.Request().query('select * from dbo.tblAppUsers').then((recordset)=>{
// 		console.log(recordset);
// 	}).catch((err)=>{
// 		console.log(err);
// 	})
// })

function createStore() {
		var config = {
			user: 'sa',
			password: '123',
			server: '192.168.1.34',
			database: 'dbDefects',
			port: 62905,
			pool: {
				max: 10,
				min: 0,
				idleTimeoutMillis: 30000
			}
		}
		return new MSSQLStore(config);
	}

module.exports = {
	createStore: createStore
}