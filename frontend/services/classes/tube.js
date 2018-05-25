import Equipment from './equipment';

export default class Tube extends Equipment {

	constructor(equipment){
		super(equipment);
		this.equipmentTypeId = 1;
	}

}