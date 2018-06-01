import Equipment from './equipment';

export default class Compensator extends Equipment {

	constructor(equipment){
		super(equipment);
		this.equipmentTypeId = 3;
		this.equipmentName = 'Компенсатор';
	}

	getName() {
		return 'Компенсатор';
	}

}