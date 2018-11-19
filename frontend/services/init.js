//init.js

"use strict"

import Defect from './classes/defect';
import EquipmentType from './classes/equipment-type';
import Category from './classes/category';
import System from './classes/system';
import Owner from './classes/owner';
import Source from './classes/source';
import Character from './classes/character';
import Diameter from './classes/diameter';
import Period from './classes/period';
import Place from './classes/place';
import Status from './classes/status';
import TubeType from './classes/tube-type';
import Region from './classes/region';
import Master from './classes/master';

export const CATEGORIES = [new Category(0, 'Не выбран')];
export const SYSTEMS = [new System(0, 'Не выбран')];
export const OWNERS = [new Owner(0, 'Не выбран', 'Не выбран')];
export const SOURCES = [new Source(0, 'Не выбран')];
export const CHARACTERS = [new Character(0, 'Не выбран')];
export const DIAMETERS = [new Diameter(0, 'Не выбран')];
export const PERIODS = [new Period(0, 'Не выбран')];
export const PLACES = [new Place(0, 'Не выбран')];
export const STATUSES = [new Status(0, 'Не выбран')];
export const TUBE_TYPES = [new TubeType(0, 'Не выбран')];
export const EQUIPMENT_TYPES = [new EquipmentType(0, 'Не выбран')];
export const REGIONS = [new Region(0, 'Не выбран')];
export const MASTERS = [new Master(0, 'Не выбран', REGIONS[0], 0)];

let aData;

export function initialize(authorizationData) {

		aData = authorizationData;

		let tables = [
			{ tableName: 'dbo.tblCategories', module: Category, array: CATEGORIES },
			{ tableName: 'dbo.tblSystems', module: System, array: SYSTEMS },
			{ tableName: 'dbo.tblOwners', module: Owner, array: OWNERS },
			{ tableName: 'dbo.tblSources', module: Source, array: SOURCES },
			{ tableName: 'dbo.tblCharacters', module: Character, array: CHARACTERS },
			{ tableName: 'dbo.tblDiameters', module: Diameter, array: DIAMETERS },
			{ tableName: 'dbo.tblPeriods', module: Period, array: PERIODS },
			{ tableName: 'dbo.tblPlaces', module: Place, array: PLACES },
			{ tableName: 'dbo.tblStatuses', module: Status, array: STATUSES },
			{ tableName: 'dbo.tblTubeTypes', module: TubeType, array: TUBE_TYPES },
			{ tableName: 'dbo.tblEquipmentTypes', module: EquipmentType, array: EQUIPMENT_TYPES },
			{ tableName: 'dbo.tblRegions', module: Region, array: REGIONS },
			{ tableName: 'dbo.tblMasters', module: Master, array: MASTERS },
		];

		let i = 0;
		for(; i < tables.length; i++) {
			let table = tables[i];
			_createTable(table);
			console.log(`${table.tableName} COMPLETE`);
		}		
	}

function _getRecordset(tableName) {

		let result;

		$.ajax({
			url: '/defects',
			data: {
				'tableName': tableName
			},
			headers: { 'Authorization': aData },
			async: false,	
			success: (response)=> {
				result = JSON.parse(response);//Array of elemects
			}
		});

		return result;
	}

function _createTable(table) {

	let data = _getRecordset(table.tableName);

	data.forEach((elem) => {
		let item;
		if(table.tableName === 'dbo.tblOwners') {
			item = new table.module(elem.ownerId, elem.ownerName, elem.ownerShortName);
		} else if(table.tableName === 'dbo.tblMasters') {
			item = new table.module(+elem.masterId, elem.masterName, REGIONS[+elem.regionId], elem.number);
		} else {
			let id;
			let name;
			for(let property in elem) {

				if(property.match(/Id$/)) {
					id = elem[property];
				}
				if(property.match(/Name$/) || property.match(/Value$/)) {
					name = elem[property];
				}
			}
			if(typeof(id) !== 'undefined' && typeof(name) !== 'undefined') {
				item = new table.module(id, name);
			}				
		}
		table.array.push(item);
	});			
}
