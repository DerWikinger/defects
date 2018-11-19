//defect-controller.js

import * as init from '../../services/init';

export default class DefectFormController {
	
	constructor () {

		this.$onInit = this.onInit;
		this.categories = init.CATEGORIES;
		this.systems = init.SYSTEMS;
		this.owners = init.OWNERS;
		this.sources = init.SOURCES;
		this.characters = init.CHARACTERS;
		this.diameters = init.DIAMETERS;
		this.periods = init.PERIODS;
		this.places = init.PLACES;
		this.statuses =init.STATUSES;
		this.tubeTypes = init.TUBE_TYPES;		
		this.equipmentTypes = init.EQUIPMENT_TYPES;
		this.masters = init.MASTERS;
		
	}

	onInit() {
		if(this.disabled) {
			$('.form-control').attr('disabled', true);
		}
	}
}