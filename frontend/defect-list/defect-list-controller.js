//defect-list-controller.js

import angular from 'angular'

export default class DefectListController {
	 
	constructor($scope, filterService, defectService, loginService) {

		this.defectService = defectService;	
		this.filterService = filterService;
		this.defectService.addObserver(this);
		this.filterService.addObserver(this);
		this.user = loginService.getUser();

		this.sorter = 'defectId';
		this.reverse = false;

		this.defects = [];

		filterService.addFilter('defectId', 'defectId', filterService.operatorNothing, 0);
		filterService.addFilter('status', 'status.statusId', filterService.operatorNoEqual, 1);
		filterService.addFilter('appearanceDate', 'appearanceDate', filterService.operatorNothing, 0, 0);
		filterService.addFilter('removeDate', 'removeDate', filterService.operatorNothing, 0, 0);
		filterService.addFilter('equipmentType', 'equipmentType.equipmentTypeId', filterService.operatorNothing, 0);
		filterService.addFilter('period', 'period.periodId', filterService.operatorNothing, 0);
		filterService.addFilter('region', 'master.region.regionId', filterService.operatorNothing, 0);
		filterService.addFilter('master', 'master.masterId', filterService.operatorNothing, 0);
		filterService.addFilter('diameter', 'diameter.diameterValue', filterService.operatorNothing, 'Не выбран');
		filterService.addFilter('character', 'character.characterId', filterService.operatorNothing, 0);
		filterService.addFilter('tubeType', 'tubeType.tubeTypeId', filterService.operatorNothing, 0);

		this.update();

		setTimeout(this.getOld, 5000, this);
	}

	getOld(self) {
		// console.log(self.defectService);
		self.defectService.getOldDefects().then((old_defects)=> {
			self.defectService.concatArray(old_defects);
			console.log('OLD DEFECTS ARE LOADED');
			let count = old_defects.length;
			console.log(count);
		});		
	}

	getUserRights() {
		return this.user.userRights;
	}

	onInit() {
		// console.log('List Form');
	}

	onDelete(defect) {

		let result = confirm('Сведения о данном дефекте будут безвозвратно удалены!\nВы действительно хотите удалить данные?');
		if(result) {
			this.defectService.deleteDefect(defect)
			.then(()=> {
				console.log('DEFECT IS REMOVED');
			})
			.catch((err)=> {
				alert('Что-то пошло не так!');
			});
		}
	}

	sortBy(propertyName) {
		this.reverse = (propertyName !== null && this.sorter === propertyName) ? !this.reverse : false;
		this.sorter = propertyName ? propertyName : 'defectId';
    	this.defects.sort((a,b)=> {
    		if(propertyName.match(/.*\..*/)) {
    			let properties = propertyName.split('.');
    			let objA = a[properties[0]];
    			let objB = b[properties[0]];
    			if(!objA && !objB) return 0;
    			else if(!objA) return this.reverse ? 1 : -1;
    			else if(!objB) return this.reverse ? -1 : 1;
    			else return this.reverse ? (objA[properties[1]]<objB[properties[1]] ? 1 : -1) : (objA[properties[1]]>objB[properties[1]] ? 1 : -1); 
    		} else {
    			return this.reverse ? (a[this.sorter]<b[this.sorter] ? 1 : -1) : (a[this.sorter]>b[this.sorter] ? 1 : -1);
    		}
    	});
	}

	update() {
		this.defects = this.filterService.filterApply(this.defectService.getDefectList());
		this.reverse = !this.reverse;//Для сортировки списка без изменения порядка
		this.sortBy(this.sorter);
	}
} 