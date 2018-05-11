'use strict'

var password = '';

$(".form-control").focus(function(){
	$(this).removeClass("error");
});

jQuery(function($){
	
	$.mask.definitions['l'] = '[А-ЯЁа-яёA-Za-z]';
	$.mask.definitions['n'] = '[А-ЯЁа-яёA-Za-z0-9]';
	$("#login").mask("ln?nnnnnnnnnnnnnnnnnn",{placeholder:" "}).on('blur', onBlur);
	
	$.mask.definitions['s'] = '[A-Za-z0-9,.!?;:]';	
	$("#pwd").mask("s?sssssssss",{placeholder:"" }).on('blur', function(event){ 
		if(checkLength(event.target)) {
			password = this.value;
		} else {
			password = '';
		}		
	});
	
});

$("#form").submit( function(event){

	event.preventDefault();

	var valid = false;

	var login = $("#login");
	var pwd = $("#pwd");

	valid = checkLength(login) && checkLength(pwd);
		
	if(valid) {

		var http = new XMLHttpRequest();
		http.open('POST', '/login', false);

		var body = 'username=' + encodeURIComponent($("#login").val()) + '&password=' + encodeURIComponent($("#pwd").val());
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		http.send( body );

		if(http.status != 200){
			alert('Ошибка при вводе имени пользователя или пароля');
		} else {
			var response = JSON.parse(http.responseText);
			localStorage.token = response.token;
			localStorage.userId = response.userId;

			http.open('GET', '/', false);

			http.setRequestHeader('Authorization', localStorage.userId + ' ' + localStorage.token);
			http.send();

			if(http.status != 200){
				alert('Что-то пошло не так :-)');
			} else {
				var data = http.responseText;
				document.write(data);
			}
		}
	}
});

function onBlur(event) {
	var elem = event.target;
	checkLength(elem);
}

function error(elem) {
	$(elem).val('');
	$(elem).toggleClass("error", true);
}

function checkLength(elem) {
	
	var length = $(elem).attr('min');
	var val = $(elem).val();
		
	if(!val || val.length < length) {
		error(elem);
		return false;
	}
	
	return true;
}


