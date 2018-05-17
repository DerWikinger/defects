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

// const jQuery = require('jquery');
// const $ = jQuery;
//window.$ = jQuery;
// require("jsdom").env("", function(err, window) {
//     if (err) {
//         console.error(err);
//         return;
//     }

//     var $ = require("jquery")(window);
// });

// alert('AUTH');

var password = '';

$(".form-control").focus(function () {
	$(this).removeClass("error");
});

jQuery(function ($) {

	// alert('JQUERY');

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

			http.open('GET', '/', false);

			http.setRequestHeader('Authorization', localStorage.userId + ' ' + localStorage.token);
			http.send();

			if (http.status != 200) {
				alert('Что-то пошло не так :-)');
			} else {
				var data = http.responseText;
				// let _window = window.open();
				// console.log(_window);
				// if(_window) {
				// 	console.log(_window.document);
				// 	_window.document.write(data);
				// }
				// let ww = window.open('', '_self');
				// ww.close();
				//DoCPExit();
				//window.open(document.loaction, '_self').close();
				document.write(data);
			}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9bbmFtZV0vLi9mcm9udGVuZC9sb2dpbi9hdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9wdWJsaWMvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZnJvbnRlbmQvbG9naW4vYXV0aC5qc1wiKTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIGNvbnN0IGpRdWVyeSA9IHJlcXVpcmUoJ2pxdWVyeScpO1xuLy8gY29uc3QgJCA9IGpRdWVyeTtcbi8vd2luZG93LiQgPSBqUXVlcnk7XG4vLyByZXF1aXJlKFwianNkb21cIikuZW52KFwiXCIsIGZ1bmN0aW9uKGVyciwgd2luZG93KSB7XG4vLyAgICAgaWYgKGVycikge1xuLy8gICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4vLyAgICAgICAgIHJldHVybjtcbi8vICAgICB9XG5cbi8vICAgICB2YXIgJCA9IHJlcXVpcmUoXCJqcXVlcnlcIikod2luZG93KTtcbi8vIH0pO1xuXG4vLyBhbGVydCgnQVVUSCcpO1xuXG52YXIgcGFzc3dvcmQgPSAnJztcblxuJChcIi5mb3JtLWNvbnRyb2xcIikuZm9jdXMoZnVuY3Rpb24gKCkge1xuXHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG59KTtcblxualF1ZXJ5KGZ1bmN0aW9uICgkKSB7XG5cblx0Ly8gYWxlcnQoJ0pRVUVSWScpO1xuXG5cdCQubWFzay5kZWZpbml0aW9uc1snbCddID0gJ1vQkC3Qr9CB0LAt0Y/RkUEtWmEtel0nO1xuXHQkLm1hc2suZGVmaW5pdGlvbnNbJ24nXSA9ICdb0JAt0K/QgdCwLdGP0ZFBLVphLXowLTldJztcblx0JChcIiNsb2dpblwiKS5tYXNrKFwibG5ubm5ubm5ubm5ubm5ubm5ubm5cIiwgeyBwbGFjZWhvbGRlcjogXCIgXCIgfSkub24oJ2JsdXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHR2YXIgZWxlbSA9IGV2ZW50LnRhcmdldDtcblx0XHRjaGVja0xlbmd0aChlbGVtKTtcblx0fSk7XG5cblx0JChcIiNsb2dpblwiKS5vbignYmx1cicsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdHZhciBlbGVtID0gZXZlbnQudGFyZ2V0O1xuXHRcdGNoZWNrTGVuZ3RoKGVsZW0pO1xuXHR9KTtcblxuXHQkLm1hc2suZGVmaW5pdGlvbnNbJ3MnXSA9ICdbQS1aYS16MC05LC4hPzs6XSc7XG5cblx0JChcIiNwd2RcIikubWFzayhcInNzc3Nzc3Nzc3NcIiwgeyBwbGFjZWhvbGRlcjogXCJcIiB9KS5vbignYmx1cicsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdGlmIChjaGVja0xlbmd0aChldmVudC50YXJnZXQpKSB7XG5cdFx0XHRwYXNzd29yZCA9IHRoaXMudmFsdWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhc3N3b3JkID0gJyAnO1xuXHRcdH1cblx0fSk7XG5cblx0JChcIiNwd2RcIikub24oJ2JsdXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRpZiAoY2hlY2tMZW5ndGgoZXZlbnQudGFyZ2V0KSkge1xuXHRcdFx0cGFzc3dvcmQgPSB0aGlzLnZhbHVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXNzd29yZCA9ICcgJztcblx0XHR9XG5cdH0pO1xufSk7XG5cbiQoXCIjbG9naW5Gb3JtXCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblxuXHQvL2FsZXJ0KCdTVUJNSVQhJyk7XG5cblx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHR2YXIgdmFsaWQgPSBmYWxzZTtcblxuXHR2YXIgbG9naW4gPSAkKFwiI2xvZ2luXCIpO1xuXHR2YXIgcHdkID0gJChcIiNwd2RcIik7XG5cblx0dmFsaWQgPSBjaGVja0xlbmd0aChsb2dpbikgJiYgY2hlY2tMZW5ndGgocHdkKTtcblxuXHQvL2FsZXJ0KHZhbGlkKTtcblxuXHR2YXIgc3RyID0gJ3VzZXJuYW1lPScgKyBlbmNvZGVVUklDb21wb25lbnQoJChcIiNsb2dpblwiKS52YWwoKS5yZXBsYWNlKCcgJywgJysnKSB8fCAnZ3Vlc3QnKSArICcmcGFzc3dvcmQ9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkKFwiI3B3ZFwiKS52YWwoKS5yZXBsYWNlKCcgJywgJysnKSB8fCAnICcpO1xuXG5cdC8vYWxlcnQoc3RyKTtcblxuXHRpZiAodmFsaWQpIHtcblxuXHRcdHZhciBodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdFx0aHR0cC5vcGVuKCdQT1NUJywgJy9sb2dpbicsIGZhbHNlKTtcblxuXHRcdHZhciBib2R5ID0gJ3VzZXJuYW1lPScgKyBlbmNvZGVVUklDb21wb25lbnQoJChcIiNsb2dpblwiKS52YWwoKS5yZXBsYWNlKCcgJywgJysnKSB8fCAnZ3Vlc3QnKSArICcmcGFzc3dvcmQ9JyArIGVuY29kZVVSSUNvbXBvbmVudCgkKFwiI3B3ZFwiKS52YWwoKS5yZXBsYWNlKCcgJywgJysnKSB8fCAnICcpO1xuXHRcdC8vYWxlcnQoYm9keSk7XG5cdFx0aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG5cdFx0Ly9jb25zb2xlLmRpcihib2R5KTtcblx0XHRodHRwLnNlbmQoYm9keSk7XG5cblx0XHRpZiAoaHR0cC5zdGF0dXMgIT0gMjAwKSB7XG5cdFx0XHRhbGVydCgn0J7RiNC40LHQutCwINC/0YDQuCDQstCy0L7QtNC1INC40LzQtdC90Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPINC40LvQuCDQv9Cw0YDQvtC70Y8nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHJlc3BvbnNlID0gSlNPTi5wYXJzZShodHRwLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRsb2NhbFN0b3JhZ2UudG9rZW4gPSByZXNwb25zZS50b2tlbjtcblx0XHRcdGxvY2FsU3RvcmFnZS51c2VySWQgPSByZXNwb25zZS51c2VySWQ7XG5cblx0XHRcdGh0dHAub3BlbignR0VUJywgJy8nLCBmYWxzZSk7XG5cblx0XHRcdGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGxvY2FsU3RvcmFnZS51c2VySWQgKyAnICcgKyBsb2NhbFN0b3JhZ2UudG9rZW4pO1xuXHRcdFx0aHR0cC5zZW5kKCk7XG5cblx0XHRcdGlmIChodHRwLnN0YXR1cyAhPSAyMDApIHtcblx0XHRcdFx0YWxlcnQoJ9Cn0YLQvi3RgtC+INC/0L7RiNC70L4g0L3QtSDRgtCw0LogOi0pJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgZGF0YSA9IGh0dHAucmVzcG9uc2VUZXh0O1xuXHRcdFx0XHQvLyBsZXQgX3dpbmRvdyA9IHdpbmRvdy5vcGVuKCk7XG5cdFx0XHRcdC8vIGNvbnNvbGUubG9nKF93aW5kb3cpO1xuXHRcdFx0XHQvLyBpZihfd2luZG93KSB7XG5cdFx0XHRcdC8vIFx0Y29uc29sZS5sb2coX3dpbmRvdy5kb2N1bWVudCk7XG5cdFx0XHRcdC8vIFx0X3dpbmRvdy5kb2N1bWVudC53cml0ZShkYXRhKTtcblx0XHRcdFx0Ly8gfVxuXHRcdFx0XHQvLyBsZXQgd3cgPSB3aW5kb3cub3BlbignJywgJ19zZWxmJyk7XG5cdFx0XHRcdC8vIHd3LmNsb3NlKCk7XG5cdFx0XHRcdC8vRG9DUEV4aXQoKTtcblx0XHRcdFx0Ly93aW5kb3cub3Blbihkb2N1bWVudC5sb2FjdGlvbiwgJ19zZWxmJykuY2xvc2UoKTtcblx0XHRcdFx0ZG9jdW1lbnQud3JpdGUoZGF0YSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59KTtcblxuZnVuY3Rpb24gRG9DUEV4aXQoKSB7XG5cdGlmICh3aW5kb3cgIT0gd2luZG93LnBhcmVudCAmJiB3aW5kb3cucGFyZW50ICYmIHdpbmRvdy5wYXJlbnRbXCJEb0NQRXhpdFwiXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0d2luZG93LnBhcmVudC5Eb0NQRXhpdCgpO1xuXHR9IGVsc2Uge1xuXHRcdGlmICh3aW5kb3cudG9wID09IHNlbGYpIHtcblx0XHRcdHZhciB3aW4gPSB3aW5kb3cub3BlbihcIlwiLCBcIl9zZWxmXCIpO1xuXHRcdFx0d2luLmNsb3NlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciB3aW4gPSB3aW5kb3cudG9wLm9wZW4oXCJcIiwgXCJfc2VsZlwiKTtcblx0XHRcdHdpbi50b3AuY2xvc2UoKTtcblx0XHR9XG5cdH1cbn07XG5cbmZ1bmN0aW9uIG9uQmx1cihldmVudCkge1xuXHR2YXIgZWxlbSA9IGV2ZW50LnRhcmdldDtcblx0YWxlcnQoJ0hlbGxvJyk7XG5cdC8vY2hlY2tMZW5ndGgoZWxlbSk7XG59XG5cbmZ1bmN0aW9uIGVycm9yKGVsZW0pIHtcblx0JChlbGVtKS52YWwoJycpO1xuXHQkKGVsZW0pLnRvZ2dsZUNsYXNzKFwiZXJyb3JcIiwgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrTGVuZ3RoKGVsZW0pIHtcblxuXHR2YXIgbWluTGVuZ3RoID0gJChlbGVtKS5hdHRyKCdtaW4nKTtcblx0dmFyIHZhbCA9ICQoZWxlbSkudmFsKCkgfHwgJyc7XG5cblx0aWYgKHZhbC5sZW5ndGggPCBtaW5MZW5ndGgpIHtcblx0XHRlcnJvcihlbGVtKTtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn0iXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=