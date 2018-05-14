"use strict"

import Defect from '..frontend/classes/defect';
import Tube from '..frontend/classes/tube';

function hello () {
	let a = 5;

	if(process.env.NODE_ENV === 'development') {
		console.log('DEVELOPMENT');
	}

	debugger;
	let s = `Hello ${a}!`;
	console.log(s);
}

exports.hello = hello;