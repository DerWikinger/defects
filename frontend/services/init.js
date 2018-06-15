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

export default class Initialization {

	constructor(authorizationData) {

		this.CATEGORIES = [new Category(0, 'Не выбран')];
		this.SYSTEMS = [new System(0, 'Не выбран')];
		this.OWNERS = [new Owner(0, 'Не выбран', 'Не выбран')];
		this.SOURCES = [new Source(0, 'Не выбран')];
		this.CHARACTERS = [new Character(0, 'Не выбран')];
		this.DIAMETERS = [new Diameter(0, 'Не выбран')];
		this.PERIODS = [new Period(0, 'Не выбран')];
		this.PLACES = [new Place(0, 'Не выбран')];
		this.STATUSES = [new Status(0, 'Не выбран')];
		this.TUBE_TYPES = [new TubeType(0, 'Не выбран')];
		this.EQUIPMENT_TYPES = [new EquipmentType(0, 'Не выбран')];
		this.REGIONS = [new Region(0, 'Не выбран')];
		this.MASTERS = [new Master(0, 'Не выбран', this.REGIONS[0], 0)];
		this.authorizationData = authorizationData;

		let tables = [
		{ tableName: 'dbo.tblCategories', module: Category, array: this.CATEGORIES },
		{ tableName: 'dbo.tblSystems', module: System, array: this.SYSTEMS },
		{ tableName: 'dbo.tblOwners', module: Owner, array: this.OWNERS },
		{ tableName: 'dbo.tblSources', module: Source, array: this.SOURCES },
		{ tableName: 'dbo.tblCharacters', module: Character, array: this.CHARACTERS },
		{ tableName: 'dbo.tblDiameters', module: Diameter, array: this.DIAMETERS },
		{ tableName: 'dbo.tblPeriods', module: Period, array: this.PERIODS },
		{ tableName: 'dbo.tblPlaces', module: Place, array: this.PLACES },
		{ tableName: 'dbo.tblStatuses', module: Status, array: this.STATUSES },
		{ tableName: 'dbo.tblTubeTypes', module: TubeType, array: this.TUBE_TYPES },
		{ tableName: 'dbo.tblEquipmentTypes', module: EquipmentType, array: this.EQUIPMENT_TYPES },
		{ tableName: 'dbo.tblRegions', module: Region, array: this.REGIONS },
		{ tableName: 'dbo.tblMasters', module: Master, array: this.MASTERS },
		];

		let i = 0;
		for(; i < tables.length; i++) {
			let table = tables[i];
			this._createTable(table);
			console.log(`${table.tableName} COMPLETE`);
		}		
	}

	_getRecordset(tableName) {

		let result;

		$.ajax({
			url: '/defects',
			data: {
				'tableName': tableName
			},
			headers: { 'Authorization': this.authorizationData },
			async: false,	
			success: (response)=> {
				//console.log('RESPONSE');
				//console.log(response);
				result = JSON.parse(response);//Array of elemects
			}
		});

		return result;
	}

	_createTable(table) {

		let data = this._getRecordset(table.tableName);

		data.forEach((elem) => {
			let item;
			if(table.tableName === 'dbo.tblOwners') {
				item = new table.module(elem.ownerId, elem.ownerName, elem.ownerShortName);
			} else if(table.tableName === 'dbo.tblMasters') {
				item = new table.module(+elem.masterId, elem.masterName, this.REGIONS[+elem.regionId], elem.number);
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
}