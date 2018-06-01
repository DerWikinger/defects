export default class DefectFormController {
	
	constructor (defectService) {

		this.$onInit = this.onInit;
		this.categories = defectService.getArray('CATEGORIES');
		this.statuses = defectService.getArray('STATUSES');
		this.owners = defectService.getArray('OWNERS');
		this.systems = defectService.getArray('SYSTEMS');
		this.sources = defectService.getArray('SOURCES');
		this.diameters = defectService.getArray('DIAMETERS');
		this.characters = defectService.getArray('CHARACTERS');
		this.equipmentTypes = defectService.getArray('EQUIPMENT_TYPES');
	}

	onInit() {
		if(this.disabled) {
			$('.form-control').attr('disabled', true);
		}
	}
}