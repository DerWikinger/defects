import Equipment from './equipment';

export default class Armature extends Equipment {

	constructor(equipment){
		super(equipment);
		this.equipmentTypeId = 2;
		this.equipmentName = 'Арматура';
	}

	getName() {
		return 'Арматура';
	}

}