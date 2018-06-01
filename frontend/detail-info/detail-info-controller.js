export default class DetailInfoController {
	
	constructor ($state) {
		this.$onInit = this.onInit;
		this.state = $state;
	}

	onInit() {
		$('.btn').focus();
	}

	onClick() {
		console.log(this.defect);
		this.state.go('^');
	}
}