//defect-add-state.js

let state = {
	data: {
		title: 'Defect add',
		rights: 2,
	},
	parent: 'defect-list',
	url: '/defect-add',
	template: `<defect-add ></defect-add>`,
}

export default function get() {
	return state;
}