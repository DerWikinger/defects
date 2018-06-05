let state = {
	data: {
		title: 'Defect edit',
		rights: 1,
	},
	parent: 'defect-list',
	url: '/defect-edit/:defectId',
	template: `<defect-edit defect="defect"></defect-edit>`,
	controller: ($scope, $stateParams, defectService)=> {
		$scope.defect =  defectService.getDefectById($stateParams.defectId);
	},
}

export default function get() {
	return state;
}