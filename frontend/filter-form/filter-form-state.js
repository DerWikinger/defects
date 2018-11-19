//filter-form-state.js

let state = {
	parent: 'defect-list',
	data: {
		title: 'Filter form'
	},
	url: '/filter-form',
	template: `<filter-form></filter-form>`,
	// controller: ($scope, $stateParams)=> {
	// 	$scope.filter =  $stateParams.filter;
	// },
}

export default function get() {
	return state;
}