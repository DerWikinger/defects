var auth =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/login/auth.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/login/auth.js":
/*!********************************!*\
  !*** ./frontend/login/auth.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var password = '';

$(".form-control").focus(function () {
	$(this).removeClass("error");
});

jQuery(function ($) {

	$.mask.definitions['l'] = '[А-ЯЁа-яёA-Za-z]';
	$.mask.definitions['n'] = '[А-ЯЁа-яёA-Za-z0-9]';
	$("#login").mask("lnnnnnnnnnnnnnnnnnnn", { placeholder: " " }).on('blur', function (event) {
		var elem = event.target;
		checkLength(elem);
	});

	$("#login").on('blur', function (event) {
		var elem = event.target;
		checkLength(elem);
	});

	$.mask.definitions['s'] = '[A-Za-z0-9,.!?;:]';

	$("#pwd").mask("ssssssssss", { placeholder: "" }).on('blur', function (event) {
		if (checkLength(event.target)) {
			password = this.value;
		} else {
			password = ' ';
		}
	});

	$("#pwd").on('blur', function (event) {
		if (checkLength(event.target)) {
			password = this.value;
		} else {
			password = ' ';
		}
	});
});

$("#loginForm").on('submit', function (event) {

	//alert('SUBMIT!');

	event.preventDefault();

	var valid = false;

	var login = $("#login");
	var pwd = $("#pwd");

	valid = checkLength(login) && checkLength(pwd);

	//alert(valid);

	var str = 'username=' + encodeURIComponent($("#login").val().replace(' ', '+') || 'guest') + '&password=' + encodeURIComponent($("#pwd").val().replace(' ', '+') || ' ');

	//alert(str);

	if (valid) {

		var http = new XMLHttpRequest();
		http.open('POST', '/login', false);

		var body = 'username=' + encodeURIComponent($("#login").val().replace(' ', '+') || 'guest') + '&password=' + encodeURIComponent($("#pwd").val().replace(' ', '+') || ' ');
		//alert(body);
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		//console.dir(body);
		http.send(body);

		if (http.status != 200) {
			alert('Ошибка при вводе имени пользователя или пароля');
		} else {
			var response = JSON.parse(http.responseText);
			localStorage.token = response.token;
			localStorage.userId = response.userId;

			http.open('GET', '/', true);

			http.setRequestHeader('Authorization', localStorage.userId + ' ' + localStorage.token);
			http.send();

			http.onreadystatechange = function () {
				if (http.readyState != 4) return;
				if (http.status != 200) {
					alert('Что-то пошло не так :-)');
				} else {
					var data = http.responseText;
					document.write(data);
				}
			};

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
	if (window != window.parent && window.parent && window.parent["DoCPExit"] !== undefined) {
		window.parent.DoCPExit();
	} else {
		if (window.top == self) {
			var win = window.open("", "_self");
			win.close();
		} else {
			var win = window.top.open("", "_self");
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

	var minLength = $(elem).attr('min');
	var val = $(elem).val() || '';

	if (val.length < minLength) {
		error(elem);
		return false;
	}

	return true;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9bbmFtZV0vLi9mcm9udGVuZC9sb2dpbi9hdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9wdWJsaWMvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZnJvbnRlbmQvbG9naW4vYXV0aC5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHBhc3N3b3JkID0gJyc7XG5cbiQoXCIuZm9ybS1jb250cm9sXCIpLmZvY3VzKGZ1bmN0aW9uICgpIHtcblx0JCh0aGlzKS5yZW1vdmVDbGFzcyhcImVycm9yXCIpO1xufSk7XG5cbmpRdWVyeShmdW5jdGlvbiAoJCkge1xuXG5cdCQubWFzay5kZWZpbml0aW9uc1snbCddID0gJ1vQkC3Qr9CB0LAt0Y/RkUEtWmEtel0nO1xuXHQkLm1hc2suZGVmaW5pdGlvbnNbJ24nXSA9ICdb0JAt0K/QgdCwLdGP0ZFBLVphLXowLTldJztcblx0JChcIiNsb2dpblwiKS5tYXNrKFwibG5ubm5ubm5ubm5ubm5ubm5ubm5cIiwgeyBwbGFjZWhvbGRlcjogXCIgXCIgfSkub24oJ2JsdXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHR2YXIgZWxlbSA9IGV2ZW50LnRhcmdldDtcblx0XHRjaGVja0xlbmd0aChlbGVtKTtcblx0fSk7XG5cblx0JChcIiNsb2dpblwiKS5vbignYmx1cicsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdHZhciBlbGVtID0gZXZlbnQudGFyZ2V0O1xuXHRcdGNoZWNrTGVuZ3RoKGVsZW0pO1xuXHR9KTtcblxuXHQkLm1hc2suZGVmaW5pdGlvbnNbJ3MnXSA9ICdbQS1aYS16MC05LC4hPzs6XSc7XG5cblx0JChcIiNwd2RcIikubWFzayhcInNzc3Nzc3Nzc3NcIiwgeyBwbGFjZWhvbGRlcjogXCJcIiB9KS5vbignYmx1cicsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGlmIChjaGVja0xlbmd0aChldmVudC50YXJnZXQpKSB7XG5cdFx0XHRwYXNzd29yZCA9IHRoaXMudmFsdWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhc3N3b3JkID0gJyAnO1xuXHRcdH1cblx0fSk7XG5cblx0JChcIiNwd2RcIikub24oJ2JsdXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAoY2hlY2tMZW5ndGgoZXZlbnQudGFyZ2V0KSkge1xuXHRcdFx0cGFzc3dvcmQgPSB0aGlzLnZhbHVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXNzd29yZCA9ICcgJztcblx0XHR9XG5cdH0pO1xufSk7XG5cbiQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHQvL2FsZXJ0KCdTVUJNSVQhJyk7XG5cblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHR2YXIgdmFsaWQgPSBmYWxzZTtcblxuXHR2YXIgbG9naW4gPSAkKFwiI2xvZ2luXCIpO1xuXHR2YXIgcHdkID0gJChcIiNwd2RcIik7XG5cblx0dmFsaWQgPSBjaGVja0xlbmd0aChsb2dpbikgJiYgY2hlY2tMZW5ndGgocHdkKTtcblxuXHQvL2FsZXJ0KHZhbGlkKTtcblxuXHR2YXIgc3RyID0gJ3VzZXJuYW1lPScgKyBlbmNvZGVVUklDb21wb25lbnQoJChcIiNsb2dpblwiKS52YWwoKS5yZXBsYWNlKCcgJywgJysnKSB8fCAnZ3Vlc3QnKSArICcmcGFzc3dvcmQ9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkKFwiI3B3ZFwiKS52YWwoKS5yZXBsYWNlKCcgJywgJysnKSB8fCAnICcpO1xuXG5cdC8vYWxlcnQoc3RyKTtcblxuXHRpZiAodmFsaWQpIHtcblxuXHRcdHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0aHR0cC5vcGVuKCdQT1NUJywgJy9sb2dpbicsIGZhbHNlKTtcblxuXHRcdHZhciBib2R5ID0gJ3VzZXJuYW1lPScgKyBlbmNvZGVVUklDb21wb25lbnQoJChcIiNsb2dpblwiKS52YWwoKS5yZXBsYWNlKCcgJywgJysnKSB8fCAnZ3Vlc3QnKSArICcmcGFzc3dvcmQ9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkKFwiI3B3ZFwiKS52YWwoKS5yZXBsYWNlKCcgJywgJysnKSB8fCAnICcpO1xuXHRcdC8vYWxlcnQoYm9keSk7XG5cdFx0aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG5cdFx0Ly9jb25zb2xlLmRpcihib2R5KTtcblx0XHRodHRwLnNlbmQoYm9keSk7XG5cblx0XHRpZiAoaHR0cC5zdGF0dXMgIT0gMjAwKSB7XG5cdFx0XHRhbGVydCgn0J7RiNC40LHQutCwINC/0YDQuCDQstCy0L7QtNC1INC40LzQtdC90Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPINC40LvQuCDQv9Cw0YDQvtC70Y8nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHJlc3BvbnNlID0gSlNPTi5wYXJzZShodHRwLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRsb2NhbFN0b3JhZ2UudG9rZW4gPSByZXNwb25zZS50b2tlbjtcblx0XHRcdGxvY2FsU3RvcmFnZS51c2VySWQgPSByZXNwb25zZS51c2VySWQ7XG5cblx0XHRcdGh0dHAub3BlbignR0VUJywgJy8nLCB0cnVlKTtcblxuXHRcdFx0aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdBdXRob3JpemF0aW9uJywgbG9jYWxTdG9yYWdlLnVzZXJJZCArICcgJyArIGxvY2FsU3RvcmFnZS50b2tlbik7XG5cdFx0XHRodHRwLnNlbmQoKTtcblxuXHRcdFx0aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGlmIChodHRwLnJlYWR5U3RhdGUgIT0gNCkgcmV0dXJuO1xuXHRcdFx0XHRpZiAoaHR0cC5zdGF0dXMgIT0gMjAwKSB7XG5cdFx0XHRcdFx0YWxlcnQoJ9Cn0YLQvi3RgtC+INC/0L7RiNC70L4g0L3QtSDRgtCw0LogOi0pJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFyIGRhdGEgPSBodHRwLnJlc3BvbnNlVGV4dDtcblx0XHRcdFx0XHRkb2N1bWVudC53cml0ZShkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gaWYoaHR0cC5zdGF0dXMgIT0gMjAwKXtcblx0XHRcdC8vIFx0YWxlcnQoJ9Cn0YLQvi3RgtC+INC/0L7RiNC70L4g0L3QtSDRgtCw0LogOi0pJyk7XG5cdFx0XHQvLyB9IGVsc2Uge1xuXHRcdFx0Ly8gXHRhbGVydCgnU0VORCcpO1xuXHRcdFx0Ly8gXHRsZXQgZGF0YSA9IGh0dHAucmVzcG9uc2VYTUw7XG5cdFx0XHQvLyBcdGFsZXJ0KGRhdGEgfHwgJ05VTEwnKTtcblx0XHRcdC8vIFx0Ly8gbGV0IF93aW5kb3cgPSB3aW5kb3cub3BlbigpO1xuXHRcdFx0Ly8gXHQvLyBjb25zb2xlLmxvZyhfd2luZG93KTtcblx0XHRcdC8vIFx0Ly8gaWYoX3dpbmRvdykge1xuXHRcdFx0Ly8gXHQvLyBcdGNvbnNvbGUubG9nKF93aW5kb3cuZG9jdW1lbnQpO1xuXHRcdFx0Ly8gXHQvLyBcdF93aW5kb3cuZG9jdW1lbnQud3JpdGUoZGF0YSk7XG5cdFx0XHQvLyBcdC8vIH1cblx0XHRcdC8vIFx0Ly8gbGV0IHd3ID0gd2luZG93Lm9wZW4oJycsICdfc2VsZicpO1xuXHRcdFx0Ly8gXHQvLyB3dy5jbG9zZSgpO1xuXHRcdFx0Ly8gXHQvL0RvQ1BFeGl0KCk7XG5cdFx0XHQvLyBcdC8vd2luZG93Lm9wZW4oZG9jdW1lbnQubG9hY3Rpb24sICdfc2VsZicpLmNsb3NlKCk7XG5cdFx0XHQvLyBcdGRvY3VtZW50LndyaXRlKGRhdGEpO1xuXHRcdFx0Ly8gfVxuXHRcdH1cblx0fVxufSk7XG5cbmZ1bmN0aW9uIERvQ1BFeGl0KCkge1xuXHRpZiAod2luZG93ICE9IHdpbmRvdy5wYXJlbnQgJiYgd2luZG93LnBhcmVudCAmJiB3aW5kb3cucGFyZW50W1wiRG9DUEV4aXRcIl0gIT09IHVuZGVmaW5lZCkge1xuXHRcdHdpbmRvdy5wYXJlbnQuRG9DUEV4aXQoKTtcblx0fSBlbHNlIHtcblx0XHRpZiAod2luZG93LnRvcCA9PSBzZWxmKSB7XG5cdFx0XHR2YXIgd2luID0gd2luZG93Lm9wZW4oXCJcIiwgXCJfc2VsZlwiKTtcblx0XHRcdHdpbi5jbG9zZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgd2luID0gd2luZG93LnRvcC5vcGVuKFwiXCIsIFwiX3NlbGZcIik7XG5cdFx0XHR3aW4udG9wLmNsb3NlKCk7XG5cdFx0fVxuXHR9XG59O1xuXG5mdW5jdGlvbiBvbkJsdXIoZXZlbnQpIHtcblx0dmFyIGVsZW0gPSBldmVudC50YXJnZXQ7XG5cdGFsZXJ0KCdIZWxsbycpO1xuXHQvL2NoZWNrTGVuZ3RoKGVsZW0pO1xufVxuXG5mdW5jdGlvbiBlcnJvcihlbGVtKSB7XG5cdCQoZWxlbSkudmFsKCcnKTtcblx0JChlbGVtKS50b2dnbGVDbGFzcyhcImVycm9yXCIsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBjaGVja0xlbmd0aChlbGVtKSB7XG5cblx0dmFyIG1pbkxlbmd0aCA9ICQoZWxlbSkuYXR0cignbWluJyk7XG5cdHZhciB2YWwgPSAkKGVsZW0pLnZhbCgpIHx8ICcnO1xuXG5cdGlmICh2YWwubGVuZ3RoIDwgbWluTGVuZ3RoKSB7XG5cdFx0ZXJyb3IoZWxlbSk7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBIiwic291cmNlUm9vdCI6IiJ9