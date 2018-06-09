export default class LoginController {

	constructor( $http, $state, loginService ) {
		
		this.password = '';
		let controller = this;

		$(".form-control").focus( ()=> {
			$(this).removeClass("error");
		});

		$("#login").on('blur', (event)=> {
			let elem = event.target;
			this.checkLength(elem);
		});

		$("#pwd").on('blur', (event)=> { 
			if(this.checkLength(event.target)) {
				this.password = this.value;
			} else {
				this.password = ' ';
			}		
		});

		$("#loginForm").on('submit', (event)=>{

			event.preventDefault();

			let container = angular.element('.main-content');
			container.prepend(`<div class="loading-indicator">
								<div class="main-loader loader"></div>
							   </div>`);
		
			let valid = false;
			let login = $("#login");
			let pwd = $("#pwd");
			valid = this.checkLength(login) && this.checkLength(pwd);

			let loginData = 'username=' + encodeURIComponent($("#login").val().replace(' ', '+') || 'guest') 
			+ '&password=' + encodeURIComponent($("#pwd").val().replace(' ', '+') || ' ');
		
			if(valid) {
				loginService.login(loginData).then(()=> {
					// console.log("GO");		
					let user = loginService.getUser();
					if(user.rights === 0) {
						$('#config-menu').css({ 'display': 'inline-block'});
						$state.go('config-form');
					} else {
						$state.go('defect-list');
					}	
					//default view
				}).catch((error) => {
					angular.element('.loading-indicator').remove();
					console.log(error);
					$("#login").val('');
					$("#pwd").val('');
				});				
			}
		});
	}

	onBlur(event) {
		var elem = event.target;
		checkLength(elem);
	}

	error(elem) {
		$(elem).val('');
		$(elem).toggleClass("error", true);
	}

	checkLength(elem) {
	
		let minLength = $(elem).attr('min');
		let val = $(elem).val() || '';

		// console.log(val);
			
		if(val.length < minLength) {
			error(elem);
			return false;
		}
		
		return true;
	}
}