export default class DefectFormController {
	
	constructor (defectService) {

		this.$onInit = this.onInit;
		this.categories = defectService.getArray('CATEGORIES');
		this.systems = defectService.getArray('SYSTEMS');
		this.owners = defectService.getArray('OWNERS');
		this.sources = defectService.getArray('SOURCES');
		this.characters = defectService.getArray('CHARACTERS');
		this.diameters = defectService.getArray('DIAMETERS');
		this.periods = defectService.getArray('PERIODS');
		this.places = defectService.getArray('PLACES');
		this.statuses = defectService.getArray('STATUSES');
		this.tubeTypes = defectService.getArray('TUBE_TYPES');		
		this.equipmentTypes = defectService.getArray('EQUIPMENT_TYPES');
		this.masters = defectService.getArray('MASTERS');
		
	}

	onInit() {
		if(this.disabled) {
			$('.form-control').attr('disabled', true);
		}
	}
}