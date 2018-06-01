export default class Equipment {

	constructor(equipment) {
		this.equipmentId = equipment.equipmentId;
		this.beginPoint = equipment.beginPoint;
		this.endPoint = equipment.endPoint;
		this.equipmentSys = equipment.equipmentSys;
		this.system = equipment.system;
		this.category = equipment.category;
		this.owner = equipment.owner;
		this.source = equipment.source;
		this.invNumber = equipment.invNumber;
		this.equipmentName = 'Не выбран';
	}	

	getName() {
		return 'Не выбран';
	}

}