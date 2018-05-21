'use strict'

var password = '';

$(".form-control").focus(function(){
	$(this).removeClass("error");
});

jQuery(function($){
	
	$.mask.definitions['l'] = '[А-ЯЁа-яёA-Za-z]';
	$.mask.definitions['n'] = '[А-ЯЁа-яёA-Za-z0-9]';
	$("#login").mask("lnnnnnnnnnnnnnnnnnnn",{placeholder:" "}).on('blur', function(event) {
		let elem = event.target;
		checkLength(elem);
	});

	$("#login").on('blur', function(event) {
		let elem = event.target;
		checkLength(elem);
	});
	
	$.mask.definitions['s'] = '[A-Za-z0-9,.!?;:]';

	$("#pwd").mask("ssssssssss",{placeholder:"" }).on('blur', function(event) { 
		if(checkLength(event.target)) {
			password = this.value;
		} else {
			password = ' ';
		}		
	});

	$("#pwd").on('blur', function(event) { 
		if(checkLength(event.target)) {
			password = this.value;
		} else {
			password = ' ';
		}		
	});
	
});

$("#loginForm").on('submit', function(event){

	//alert('SUBMIT!');

	event.preventDefault();

	var valid = false;

	var login = $("#login");
	var pwd = $("#pwd");

	valid = checkLength(login) && checkLength(pwd);

		//alert(valid);

		var str = 'username=' + encodeURIComponent($("#login").val().replace(' ', '+') || 'guest') 
		+ '&password=' + encodeURIComponent($("#pwd").val().replace(' ', '+') || ' ');

		//alert(str);
		
	if(valid) {

		var http = new XMLHttpRequest();
		http.open('POST', '/login', false);

		var body = 'username=' + encodeURIComponent($("#login").val().replace(' ', '+') || 'guest') 
		+ '&password=' + encodeURIComponent($("#pwd").val().replace(' ', '+') || ' ');
		//alert(body);
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		//console.dir(body);
		http.send( body );

		if(http.status != 200){
			alert('Ошибка при вводе имени пользователя или пароля');
		} else {
			var response = JSON.parse(http.responseText);
			localStorage.token = response.token;
			localStorage.userId = response.userId;

			http.open('GET', '/', true);

			http.setRequestHeader('Authorization', localStorage.userId + ' ' + localStorage.token);
			http.send();

			http.onreadystatechange = ()=>{
				if(http.readyState != 4) return;
				if(http.status != 200){
					alert('Что-то пошло не так :-)');
				} else {
					let data = http.responseText;
					document.write(data);
				}
			}

			// if(http.status != 200){
			// 	alert('Что-то пошло не так :-)');
			// } else {
			// 	alert('SEND');
			// 	let data = http.responseXML;
			// 	alert(data || 'NULL');
			// 	// let _window = window.open();
			// 	// console.log(_window);
			// 	// if(_window) {
			// 	// 	console.log(_window.document);
			// 	// 	_window.document.write(data);
			// 	// }
			// 	// let ww = window.open('', '_self');
			// 	// ww.close();
			// 	//DoCPExit();
			// 	//window.open(document.loaction, '_self').close();
			// 	document.write(data);
			// }
		}
	}
});

function DoCPExit() {
	if(window != window.parent && window.parent && window.parent["DoCPExit"] !== undefined ) {
			window.parent.DoCPExit();
	} else {
		if(window.top == self) {
			var win = window.open("","_self");
			win.close();
		} else {
			var win = window.top.open("","_self");
			win.top.close();
		}
	}
};

function onBlur(event) {
	var elem = event.target;
	alert('Hello');
	//checkLength(elem);
}

function error(elem) {
	$(elem).val('');
	$(elem).toggleClass("error", true);
}

function checkLength(elem) {
	
	let minLength = $(elem).attr('min');
	let val = $(elem).val() || '';
		
	if(val.length < minLength) {
		error(elem);
		return false;
	}
	
	return true;
}


