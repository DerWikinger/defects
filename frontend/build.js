"use strict"

import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import vsrepeat from 'front-angular-vs-repeat';

import LoginComponent from './login/login-component';
import DefectListComponent from './defect-list/defect-list-component';
import DefectItemComponent from './defect-item/defect-item-component';
import DetailInfoComponent from './detail-info/detail-info-component';
import DefectFormComponent from './shared/defect-form/defect-form-component';

import LoginService from './login/login-service';
import DefectService from './services/defect-service';

import loginState from './login/login-state';
import defectListState from './defect-list/defect-list-state';
import detailInfoState from './detail-info/detail-info-state';

const ngApp = angular.module('ngApp', [uirouter, vsrepeat]);

ngApp.factory('loginService', LoginService);
ngApp.factory('defectService', DefectService);//Creates service 'DefectService'
ngApp.factory('httpInterceptor', ($q)=> {
	return {
		// request: (request)=> {
		// 	request.headers.Authorization = localStorage.userId + ' ' + localStorage.token;
		// 	return $q.resolve(request);
		// }

		responseError: (rejection)=> {
			if (rejection.status === 403) {
				alert('У вас не достаточно прав для выполнения данного запроса!');
			}
			return $q.reject(rejection);
		}
	}
});

ngApp.config(($httpProvider, $stateProvider, $urlRouterProvider)=> {

	$httpProvider.interceptors.push('httpInterceptor');

	$stateProvider
	.state('defects', {
		abstract: true,
		// template: `<loading-indicator></loading-indicator>`,
		template: `<ui-view>
				       <loading-indicator></loading-indicator>
				   </ui-view>`,
	})
	.state('defect-list', defectListState())
	.state('detail-info', detailInfoState())
	.state('login', loginState())
	.state('happy', {
		url: '/happy',
		template: `<h1>HAPPY</h1>`,
		controller: ($state)=> {
			setTimeout(function() {
				$state.go('login');
			}, 3000);
		},
	});
	
	$urlRouterProvider.otherwise('/login');
	// $urlRouterProvider.when('/defect-list', ($stateParams) => {

	// 	alert('HELLO');

	// 	// console.log('THIS IS MAIN PAGE');

	// });
});

ngApp.run(($transitions, loginService) => {
	$transitions.onStart({
		to: (state) => {
			console.log(`STATE: ${state.name}`);

			if(state.name === 'login') {
				return false;			
			} else {
				return true;
			}
		} 
	}, (trans) => {
		console.dir(trans.router);
		// console.dir(state);
		if (!loginService.checkUser()) {
			alert('Необходимо авторизоваться!');
			return trans.router.stateService.transitionTo('login');
		}
	});
});

ngApp.component('loadingIndicator', {
	bindings: {},
	template: `<div class="loader"></div>`
});

ngApp.component('loginUser', new LoginComponent());

ngApp.component('defectList', new DefectListComponent());

ngApp.component('defectItem', new DefectItemComponent());

ngApp.component('defectForm', new DefectFormComponent());

ngApp.component('detailInfo', new DetailInfoComponent());

let initializeComplete = false;

$(document).ready(()=>{

		// $('body').on('load', function() {
		// 	//var url = $(this).attr('src');
		// 	startOverlay();
		// });
		
		// function startOverlay() {
		// 	$("body").append('<div class="overlay" title="Click to return"></div><div class="container wrapper"></div>').css({"overflow-y":"hidden"});

		// 	var overlay = $(".overlay");
		// 	var container = $(".container");			

		// 	overlay.animate({"opacity":"0.6"}, 200, "linear");
		// 	container.html('<img src="' + overlayLink + '" alt="" />');

		// 	var container_img = $(".container img");

		// 	container_img.on('load', function() {
		// 		var imgHeight = container_img.height();
		// 		var imgWidth = container_img.width();

		// 		container.css({
		// 			"left": "50%",
		// 			"top":	"50%",
		// 			"margin-top": -(imgHeight/2) + 'px', // середина
		// 			"margin-left": -(imgWidth/2) + 'px'
		// 		})
		// 		.animate({"opacity":"1"}, 200, "linear");
		// 	});			

		// 	container_img.after('<div class="description">' + (function() {
		// 			return $('#galary img[src="' + overlayLink + '"]').attr('data-desc');
		// 		})() + '</div>'
		// 	);

		// 	overlay.on('click', function(event){
		// 		$(".container, .overlay")
		// 		.animate({"opacity": "0"}, 200, "linear", function(){
		// 			$(".container, .overlay").remove();
		// 		})			
		// 		return false;
		// 	});
		// }


});

export function start () {

	//

	//console.dir(jQueryScrollbar);

	//$('.scrollbar-dynamic').scrollbar();

	// var el = document.querySelector('.ss-container');
	
	// var div = document.createElement('div');
	// div.insertAdjacentHTML('afterbegin', `
	// 	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quasi tempore distinctio velit expedita repellat. Saepe dolorum, amet molestiae sint cupiditate suscipit repellendus doloremque, eligendi tempore beatae odio accusantium accusamus!
	// 		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quasi tempore distinctio velit expedita repellat. Saepe dolorum, amet molestiae sint cupiditate suscipit repellendus doloremque, eligendi tempore beatae odio accusantium accusamus!
	// 		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quasi tempore distinctio velit expedita repellat. Saepe dolorum, amet molestiae sint cupiditate suscipit repellendus doloremque, eligendi tempore beatae odio accusantium accusamus!
	// 		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quasi tempore distinctio velit expedita repellat. Saepe dolorum, amet molestiae sint cupiditate suscipit repellendus doloremque, eligendi tempore beatae odio accusantium accusamus!
	// 		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quasi tempore distinctio velit expedita repellat. Saepe dolorum, amet molestiae sint cupiditate suscipit repellendus doloremque, eligendi tempore beatae odio accusantium accusamus!
	// 		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quasi tempore distinctio velit expedita repellat. Saepe dolorum, amet molestiae sint cupiditate suscipit repellendus doloremque, eligendi tempore beatae odio accusantium accusamus!
	// 		Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam quasi tempore distinctio velit expedita repellat. Saepe dolorum, amet molestiae sint cupiditate suscipit repellendus doloremque, eligendi tempore beatae odio accusantium accusamus!
	// 	`);
	// div.setAttribute('ss-container', true);
	// document.body.appendChild(div);

	// console.log(div);

	// simpleScrollbar.initAll();

	$('.main-menu-button').on('click', (event)=> {

		let elem = $('.main-menu ul');
		console.log(elem);
		if(elem) {
			elem.slideToggle();
		}
	});


	// $("body").append('<div class="overlay" title="Please wait"></div><div class="container wrapper"></div>').css({"overflow-y":"hidden"});
	// let overlay = $(".overlay");
	// overlay.animate({"opacity":"0.6"}, 200, "linear");

	// const model = new Model(() => {
	// 	console.log('INITIALIZE IS COMPLETE');
	// 	$(".container, .overlay")
	// 	.animate({"opacity": "0"}, 200, "linear", function(){
	// 		$(".container, .overlay").remove();
	// 	});

	// 	initializeComplete = true;
	// });

	initializeComplete = true;

	$('#btnGetAll').on('click', (event) => {

		// let defects = model.getAllDefects();

		// //alert(defects || "UNDEFINED");
		
		// if(!initializeComplete) {
		// 	console.log(initializeComplete);
		// 	return;
		// }

		// $('#divMain').html(JSON.stringify(defects));
		// //$('#divMain').html(defects);

	});
}