import angular from 'angular'

export default class DefectListController {
	 
	constructor($filter, defectService, loginService) {

		this.defectService = defectService;	
		this.defectService.listChangeObserver = this;	
		this.user = loginService.getUser();
		this.orderBy = $filter('orderBy');
		this.sorter = 'defectId';
		this.reverse = false;
		this.defects = this.orderBy(defectService.getCurrentDefects(), this.sorter, this.reverse);


	}

	getUserRights() {
		return this.user.rights;
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
		this.sorter = propertyName;
    	this.defects = this.orderBy(this.defectService.getCurrentDefects(), this.sorter, this.reverse);
	}

	onUpdate() {
		this.defects = this.orderBy(this.defectService.getCurrentDefects(), this.sorter, this.reverse);	
	}
} 