//deteail-info-state.js

let state = {
	data: {
		title: 'Detail info'
	},
	parent: 'defect-list',
	url: '/detail-info/:defectId',
	template: `<detail-info defect="defect"></detail-info>`,
	controller: ($scope, $stateParams, defectService)=> {
		$scope.defect =  defectService.getDefectById($stateParams.defectId);
	},	
}

export default function get() {
	return state;
}