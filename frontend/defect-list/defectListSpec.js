import DefectListController from './defect-list-controller'
// var DefectListController = require('./defect-list-controller');
// 
describe('proc', ()=>{

	// var defectListController = new DefectListController();

	it('sum', ()=> {
		// var str = '123456798';
		// expect(findPosition(str)).toEqual(1000000071);
		// var str = '455';
		// expect(findPosition(str)).toEqual(98);
		var str = '6723367';
		expect(DefectListController.sum(3,5)).toEqual(8);
	});

})