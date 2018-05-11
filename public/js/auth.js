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
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./login/auth.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./login/auth.js":
/*!***********************!*\
  !*** ./login/auth.js ***!
  \***********************/
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
	$("#login").mask("lnnnnnnnnnnnnnnnnnnn", { placeholder: " " }).on('blur', onBlur);

	$.mask.definitions['s'] = '[A-Za-z0-9,.!?;:]';
	$("#pwd").mask("ssssssssss", { placeholder: "" }).on('blur', function (event) {
		if (checkLength(event.target)) {
			password = this.value;
		} else {
			password = ' ';
		}
	});
});

$("#form").submit(function (event) {

	event.preventDefault();

	var valid = false;

	var login = $("#login");
	var pwd = $("#pwd");

	valid = checkLength(login) && checkLength(pwd);

	if (valid) {

		var http = new XMLHttpRequest();
		http.open('POST', '/login', false);

		var body = 'username=' + encodeURIComponent($("#login").val() || 'guest') + '&password=' + encodeURIComponent($("#pwd").val() || ' ');
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
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
	var val = $(elem).val() || ' ';

	if (val.length < length) {
		error(elem);
		return false;
	}

	return true;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9bbmFtZV0vLi9sb2dpbi9hdXRoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9qcy9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9sb2dpbi9hdXRoLmpzXCIpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcGFzc3dvcmQgPSAnJztcblxuJChcIi5mb3JtLWNvbnRyb2xcIikuZm9jdXMoZnVuY3Rpb24gKCkge1xuXHQkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZXJyb3JcIik7XG59KTtcblxualF1ZXJ5KGZ1bmN0aW9uICgkKSB7XG5cblx0JC5tYXNrLmRlZmluaXRpb25zWydsJ10gPSAnW9CQLdCv0IHQsC3Rj9GRQS1aYS16XSc7XG5cdCQubWFzay5kZWZpbml0aW9uc1snbiddID0gJ1vQkC3Qr9CB0LAt0Y/RkUEtWmEtejAtOV0nO1xuXHQkKFwiI2xvZ2luXCIpLm1hc2soXCJsbm5ubm5ubm5ubm5ubm5ubm5ublwiLCB7IHBsYWNlaG9sZGVyOiBcIiBcIiB9KS5vbignYmx1cicsIG9uQmx1cik7XG5cblx0JC5tYXNrLmRlZmluaXRpb25zWydzJ10gPSAnW0EtWmEtejAtOSwuIT87Ol0nO1xuXHQkKFwiI3B3ZFwiKS5tYXNrKFwic3Nzc3Nzc3Nzc1wiLCB7IHBsYWNlaG9sZGVyOiBcIlwiIH0pLm9uKCdibHVyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0aWYgKGNoZWNrTGVuZ3RoKGV2ZW50LnRhcmdldCkpIHtcblx0XHRcdHBhc3N3b3JkID0gdGhpcy52YWx1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFzc3dvcmQgPSAnICc7XG5cdFx0fVxuXHR9KTtcbn0pO1xuXG4kKFwiI2Zvcm1cIikuc3VibWl0KGZ1bmN0aW9uIChldmVudCkge1xuXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0dmFyIHZhbGlkID0gZmFsc2U7XG5cblx0dmFyIGxvZ2luID0gJChcIiNsb2dpblwiKTtcblx0dmFyIHB3ZCA9ICQoXCIjcHdkXCIpO1xuXG5cdHZhbGlkID0gY2hlY2tMZW5ndGgobG9naW4pICYmIGNoZWNrTGVuZ3RoKHB3ZCk7XG5cblx0aWYgKHZhbGlkKSB7XG5cblx0XHR2YXIgaHR0cCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdGh0dHAub3BlbignUE9TVCcsICcvbG9naW4nLCBmYWxzZSk7XG5cblx0XHR2YXIgYm9keSA9ICd1c2VybmFtZT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KCQoXCIjbG9naW5cIikudmFsKCkgfHwgJ2d1ZXN0JykgKyAnJnBhc3N3b3JkPScgKyBlbmNvZGVVUklDb21wb25lbnQoJChcIiNwd2RcIikudmFsKCkgfHwgJyAnKTtcblx0XHRodHRwLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcblx0XHRodHRwLnNlbmQoYm9keSk7XG5cblx0XHRpZiAoaHR0cC5zdGF0dXMgIT0gMjAwKSB7XG5cdFx0XHRhbGVydCgn0J7RiNC40LHQutCwINC/0YDQuCDQstCy0L7QtNC1INC40LzQtdC90Lgg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPINC40LvQuCDQv9Cw0YDQvtC70Y8nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHJlc3BvbnNlID0gSlNPTi5wYXJzZShodHRwLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRsb2NhbFN0b3JhZ2UudG9rZW4gPSByZXNwb25zZS50b2tlbjtcblx0XHRcdGxvY2FsU3RvcmFnZS51c2VySWQgPSByZXNwb25zZS51c2VySWQ7XG5cblx0XHRcdGh0dHAub3BlbignR0VUJywgJy8nLCBmYWxzZSk7XG5cblx0XHRcdGh0dHAuc2V0UmVxdWVzdEhlYWRlcignQXV0aG9yaXphdGlvbicsIGxvY2FsU3RvcmFnZS51c2VySWQgKyAnICcgKyBsb2NhbFN0b3JhZ2UudG9rZW4pO1xuXHRcdFx0aHR0cC5zZW5kKCk7XG5cblx0XHRcdGlmIChodHRwLnN0YXR1cyAhPSAyMDApIHtcblx0XHRcdFx0YWxlcnQoJ9Cn0YLQvi3RgtC+INC/0L7RiNC70L4g0L3QtSDRgtCw0LogOi0pJyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2YXIgZGF0YSA9IGh0dHAucmVzcG9uc2VUZXh0O1xuXHRcdFx0XHRkb2N1bWVudC53cml0ZShkYXRhKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pO1xuXG5mdW5jdGlvbiBvbkJsdXIoZXZlbnQpIHtcblx0dmFyIGVsZW0gPSBldmVudC50YXJnZXQ7XG5cdGNoZWNrTGVuZ3RoKGVsZW0pO1xufVxuXG5mdW5jdGlvbiBlcnJvcihlbGVtKSB7XG5cdCQoZWxlbSkudmFsKCcnKTtcblx0JChlbGVtKS50b2dnbGVDbGFzcyhcImVycm9yXCIsIHRydWUpO1xufVxuXG5mdW5jdGlvbiBjaGVja0xlbmd0aChlbGVtKSB7XG5cblx0dmFyIGxlbmd0aCA9ICQoZWxlbSkuYXR0cignbWluJyk7XG5cdHZhciB2YWwgPSAkKGVsZW0pLnZhbCgpIHx8ICcgJztcblxuXHRpZiAodmFsLmxlbmd0aCA8IGxlbmd0aCkge1xuXHRcdGVycm9yKGVsZW0pO1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB