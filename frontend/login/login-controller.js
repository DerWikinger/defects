export default class LoginController {

	constructor( $http, $state, loginService ) {
		
		this.password = '';
		let controller = this;

		$(".form-control").focus( ()=> {
			$(this).removeClass("error");
		});

		//$.mask.definitions['l'] = '[А-ЯЁа-яёA-Za-z]';
		//$.mask.definitions['n'] = '[А-ЯЁа-яёA-Za-z0-9]';
		//$("#login").mask("lnnnnnnnnnnnnnnnnnnn",{placeholder:" "});
		// $("#login").mask("lnnnnnnnnnnnnnnnnnnn",{placeholder:" "}).on('blur', function(event) {
		// 	let elem = event.target;
		// 	//controller.checkLength(elem);
		// });

		$("#login").on('blur', (event)=> {
			let elem = event.target;
			//controller.checkLength(elem);
		});
		
		//$.mask.definitions['s'] = '[A-Za-z0-9,.!?;:]';
		//$("#pwd").mask("ssssssssss",{placeholder:"" });

		// $("#pwd").mask("ssssssssss",{placeholder:"" }).on('blur', (event)=> { 
		// 	if(controller.checkLength(event.target)) {
		// 		controller.password = this.value;
		// 	} else {
		// 		controller.password = ' ';
		// 	}		
		// });

		$("#pwd").on('blur', (event)=> { 
			if(controller.checkLength(event.target)) {
				controller.password = this.value;
			} else {
				controller.password = ' ';
			}		
		});

		$("#loginForm").on('submit', (event)=>{

			event.preventDefault();
			let valid = false;
			let login = $("#login");
			let pwd = $("#pwd");
			valid = controller.checkLength(login) && controller.checkLength(pwd);

			let loginData = 'username=' + encodeURIComponent($("#login").val().replace(' ', '+') || 'guest') 
			+ '&password=' + encodeURIComponent($("#pwd").val().replace(' ', '+') || ' ');
		
			if(valid) {
				loginService.login(loginData).then(()=> {
					$state.go('list');//default view
				}).catch((error) => {
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
			
		if(val.length < minLength) {
			error(elem);
			return false;
		}
		
		return true;
	}
}