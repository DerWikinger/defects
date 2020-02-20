//defectt-edit-controller.js

import * as init from '../../services/init';

export default class FilterFormController {
	
	constructor ($state, filterService, defectService) {
		this.$onInit = this.onInit;
		this.state = $state;
		this.defectService = defectService;
		this.filterService = filterService;

		this.simpleOperators = [
			filterService.operatorNothing,
			filterService.operatorEqual,
			filterService.operatorNoEqual,
			filterService.operatorMore,
			filterService.operatorNoLess,
			filterService.operatorLess,
			filterService.operatorNoMore
		]

		this.objectOperators = [
			filterService.operatorNothing,
			filterService.operatorEqual,
			filterService.operatorNoEqual,
		]

		this.dateOperators = [
			filterService.operatorNothing,
			filterService.operatorEqual,
			filterService.operatorNoEqual,
			filterService.operatorMore,
			filterService.operatorNoLess,
			filterService.operatorLess,
			filterService.operatorNoMore,
			filterService.operatorBetween,
			filterService.operatorOutOf
		]

		let filterDefectId = filterService.getFilter('defectId');
		this.defectId = {
			'operator': ( filterDefectId ? filterDefectId.operator : filterService.operatorNothing ),
			'value': ( filterDefectId ? filterDefectId.value : 0 )
		};

		let filterStatus = filterService.getFilter('status');
		this.status = {
			'operator': ( filterStatus ? filterStatus.operator : filterService.operatorNothing ),
			'value': ( filterStatus ? filterStatus.value : 0 )
		};

		let filterAppearanceDate = filterService.getFilter('appearanceDate');
		this.appearanceDate = {
			'operator': ( filterAppearanceDate ? filterAppearanceDate.operator : filterService.operatorNothing ),
			'value': ( filterAppearanceDate ? filterAppearanceDate.value : 0 ),
			'value2': ( filterAppearanceDate ? filterAppearanceDate.value2 : 0 ),
		};

		let filterRemoveDate = filterService.getFilter('removeDate');
		this.removeDate = {
			'operator': ( filterRemoveDate ? filterRemoveDate.operator : filterService.operatorNothing ),
			'value': ( filterRemoveDate ? filterRemoveDate.value : 0 ),
			'value2': ( filterRemoveDate ? filterRemoveDate.value2 : 0 ),
		};

		let filterEquipmentType = filterService.getFilter('equipmentType');
		this.equipmentType = {
			'operator': ( filterEquipmentType ? filterEquipmentType.operator : filterService.operatorNothing ),
			'value': ( filterEquipmentType ? filterEquipmentType.value : 0 )
		};

		let filterPeriod = filterService.getFilter('period');
		this.period = {
			'operator': ( filterPeriod ? filterPeriod.operator : filterService.operatorNothing ),
			'value': ( filterPeriod ? filterPeriod.value : 0 )
		};

		let filterRegion = filterService.getFilter('region');
		this.region = {
			'operator': ( filterRegion ? filterRegion.operator : filterService.operatorNothing ),
			'value': ( filterRegion ? filterRegion.value : 0 )
		};

		let filterMaster = filterService.getFilter('master');
		this.master = {
			'operator': ( filterMaster ? filterMaster.operator : filterService.operatorNothing ),
			'value': ( filterMaster ? filterMaster.value : 0 )
		};

		let filterDiameter = filterService.getFilter('diameter');
		this.diameter = {
			'operator': ( filterDiameter ? filterDiameter.operator : filterService.operatorNothing ),
			'value': ( filterDiameter ? filterDiameter.value : 0 )
		};

		let filterCharacter = filterService.getFilter('character');
		this.character = {
			'operator': ( filterCharacter ? filterCharacter.operator : filterService.operatorNothing ),
			'value': ( filterCharacter ? filterCharacter.value : 0 )
		};

		let filterTubeType = filterService.getFilter('tubeType');
		this.tubeType = {
			'operator': ( filterTubeType ? filterTubeType.operator : filterService.operatorNothing ),
			'value': ( filterTubeType ? filterTubeType.value : 0 )
		};

		this.statuses = init.STATUSES.map( (status) => { return { 'id': status.statusId, 'name': status.statusName }; } );
		this.equipmentTypes = init.EQUIPMENT_TYPES.map( (equipmentType) => { return { 'id': equipmentType.equipmentTypeId, 'name': equipmentType.equipmentTypeName }; } );
		this.periods = init.PERIODS.map( (period) => { return { 'id': period.periodId, 'name': period.periodName }; } );
		this.regions = init.REGIONS.map( (region) => { return { 'id': region.regionId, 'name': region.regionName }; } );
		this.masters = init.MASTERS.map( (master) => { return { 'id': master.masterId, 'name': master.masterName }; } );
		this.diameters = init.DIAMETERS.map( (diameter) => { return { 'id': diameter.diameterValue, 'name': diameter.diameterValue }; } );
		this.characters = init.CHARACTERS.map( (character) => { return { 'id': character.characterId, 'name': character.characterName }; } );
		this.tubeTypes = init.TUBE_TYPES.map( (tubeType) => { return { 'id': tubeType.tubeTypeId, 'name': tubeType.tubeTypeName }; } );
	}

	onInit() {	

	}

	onOkClick() {
		this.filterService.changeFilter({ 
			'defectId': this.defectId,
			'status': this.status,
			'appearanceDate': this.appearanceDate,
			'removeDate': this.removeDate,
			'equipmentType': this.equipmentType,
			'period': this.period,
			'region': this.region,
			'master': this.master,
			'diameter': this.diameter,
			'character': this.character,
			'tubeType': this.tubeType,
		});
		this.state.go('^');
	}

	onCancelClick() {
		this.state.go('^');
	}

	onResetClick() {
		this.defectId.operator = this.filterService.operatorNothing;
		this.defectId.value = 0;

		this.status.operator = this.filterService.operatorNothing;
		this.status.value = 0;

		this.appearanceDate.operator = this.filterService.operatorNothing;
		this.appearanceDate.value = 0;
		this.appearanceDate.value2 = 0;

		this.removeDate.operator = this.filterService.operatorNothing;
		this.removeDate.value = 0;
		this.removeDate.value2 = 0;

		this.equipmentType.operator = this.filterService.operatorNothing;
		this.equipmentType.value = 0;

		this.period.operator = this.filterService.operatorNothing;
		this.period.value = 0;

		this.region.operator = this.filterService.operatorNothing;
		this.region.value = 0;

		this.master.operator = this.filterService.operatorNothing;
		this.master.value = 0;

		this.diameter.operator = this.filterService.operatorNothing;
		this.diameter.value = 'Не выбран';

		this.character.operator = this.filterService.operatorNothing;
		this.character.value = 0;

		this.tubeType.operator = this.filterService.operatorNothing;
		this.tubeType.value = 0;
	}
}