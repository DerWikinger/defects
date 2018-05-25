"use strict"

// import Defect from './defect';
import Tube from './tube';
import * as init from '../init';

export function test() {

	// let equipment = {
	// 	equipmentId: 1,
	// 	equipmentSys: 12345,
	// 	beginPoint: 'GGGGG',
	// 	endPoint: 'jdhvbsjhdc',
	// 	system: system,
	// 	category: category,
	// 	owner: owner,
	// 	source: source,
	// 	invNumber: NaN
	// }

	// console.log(equipment);

	// let tube = new Tube(equipment);

	// console.log(tube);

	//let dbManager = new DBManager();

	//console.log(init);

	init.initialize().then(()=> {

		let limit = 10;
		// console.log('INITIALIZE COMPLETE');
		// console.log('CATEGORIES: ');
		// console.log(init.CATEGORIES);
		// console.log('SYSTEMS: ');
		// console.log(init.SYSTEMS);
		// console.log('OWNERS LENGTH: ');
		// console.log(init.OWNERS.length);
		// console.log('SOURCES: ');
		// console.log(init.SOURCES);
		// console.log('CHARACTERS: ');
		// console.log(init.CHARACTERS);
		// console.log('DIAMETERS: ');
		// console.log(init.DIAMETERS);
		// console.log('PERIODS: ');
		// console.log(init.PERIODS);
		// console.log('PLACES: ');
		// console.log(init.PLACES);
		// console.log('STATUSES: ');
		// console.log(init.STATUSES);
		// console.log('TUBE_TYPES: ');
		// console.log(init.TUBE_TYPES);
		// console.log('REGIONS: ');
		// console.log(init.REGIONS);
		// console.log('MASTERS: ');
		// console.log(init.MASTERS);
		init.getAllEquipments().then(() => {
			console.log('EQUIPMENTS: ');
			console.log(init.EQUIPMENTS.length);
			// for(let i = 0; i < (init.EQUIPMENTS.length < limit ? init.EQUIPMENTS.length : limit); i++){
			// 	console.log(init.EQUIPMENTS[i]);
			// }
			init.getAllDefects().then(() => {
				console.log('DEFECTS: ');
				console.log(init.DEFECTS.length);
				for(let i = 0; i < (init.DEFECTS.length < limit ? init.DEFECTS.length : limit); i++){
					console.log(init.DEFECTS[i]);
				}
			});			
		});
	}, (err)=> {
		console.log('ERROR');
		console.log(err);
	});
}