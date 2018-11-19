//defect-list-controller.js

import angular from 'angular'

export default class DefectListController {
	 
	constructor($scope, $filter, filterService, defectService, loginService) {

		this.defectService = defectService;	
		this.filterService = filterService;
		this.defectService.addObserver(this);
		this.filter = $filter;	
		this.user = loginService.getUser();

		this.orderBy = this.filter('orderBy');
		this.sorter = 'defectId';
		this.reverse = false;

		this.defects = [];
		this.update();

		// this.$onInit = this.onInit;

		this.defectService.getOldDefects().then((old_defects)=> {
			this.defectService.concatArray(old_defects);
			console.log('OLD DEFECTS ARE LOADED');
			let count = old_defects.length;
			console.log(count);
		});
	}

	getUserRights() {
		return this.user.userRights;
	}

	onInit() {

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
    	this.defects = this.orderBy(this.defects, this.sorter, this.reverse);
	}

	update() {
		
		this.defects = this.defectService.getDefectList();
		this.defects = this.filter('filter')(this.defects, (defect)=> {
			return this.filterService.filter(defect);
		});	

		this.reverse = !this.reverse;//Для сортировки списка без изменения порядка
		this.sortBy(this.sorter);

	}
} 