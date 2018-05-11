"use strict"

function hello () {
	let a = 5;

	if(process.env.NODE_ENV === 'development') {
		console.log('DEVELOPMENT');
	}

	//debugger;
	let s = `Hello ${a}!`;
	console.log(s);
}

exports.hello = hello;

//module.exports hello = hello;