//filter-form-state.js

let state = {
	parent: 'defect-list',
	data: {
		title: 'Filter form'
	},
	url: '/filter-form',
	template: `<filter-form config="config"></filter-form>`,
	controller: ($scope, $stateParams, filterService)=> {
		$scope.config =  filterService.config;
	},
}

export default function get() {
	return state;
}