//defect.js

export default class Defect {

	constructor(defect) {

		this.defectId = defect.defectId;
		this.defectSys = defect.defectSys;
		this.appearanceDate = defect.appearanceDate;
		this.removeDate = defect.removeDate;
		this.status = defect.status;
		this.equipmentType = defect.equipmentType;
		this.beginPoint = defect.beginPoint;
		this.endPoint = defect.endPoint;
		this.equipmentSys = defect.equipmentSys;
		this.system = defect.system;
		this.category = defect.category;
		this.owner = defect.owner;
		this.source = defect.source;
		this.tubeType = defect.tubeType;
		this.invNumber = defect.invNumber;
		this.location = defect.location;
		this.diameter = defect.diameter;
		this.character = defect.character;
		this.addresse = defect.addresse;
		this.master = defect.master;
		this.period = defect.period;
		this.comment = defect.comment;
		this.flowValue = defect.flowValue;
		this.place = defect.place;
		this.coordX = defect.coordX;
		this.coordY = defect.coordY;
	}
	
}