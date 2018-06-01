import Equipment from './equipment';

export default class Tube extends Equipment {

	constructor(equipment){
		super(equipment);
		this.equipmentTypeId = 1;
		this.equipmentName = 'Труба';
	}

	getName() {
		return 'Труба';
	}

}