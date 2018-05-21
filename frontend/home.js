"use strict"

// import Defect from './classes/defect';
// import Tube from './classes/tube';
import Model from './model';
//import $ from "jquery";
import angular from 'angular';
import uirouter from '@uirouter/angularjs';
import DefectListController from './defect-list-controller';
import LoginController from './login/login-controller';
import LoginService from './login/login-service';
//import HttpInterceptor from './login/http-interceptor';

const ngApp = angular.module('ngApp', [uirouter]);

ngApp.factory('model', Model);//Creates service 'Model'
ngApp.factory('loginService', LoginService);
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
	.state('list', {
		reloadOnSearch: false,
		data: {
			title: 'Defect list'
		},
		// resolve: {
		// 	auth: ($q, $state, loginService) => {
		// 		let deferred = $q.defer();
		// 		if(!loginService.checkUser()) {
		// 			//deferred.reject();
		// 			alert('Необходимо авторизоваться!');
		// 			$state.go('login');
		// 			return deferred.promise;
		// 		}
		// 	},
		// defects: ($q, model)=> {
		// 	console.log('RESOLVE');
		// 	$q.resolve(model.getAllDefects());
		// },
		//},
		url: '/list',
		template: `<defect-list></defect-list>`
	})
	.state('login', {
		url: '/login',
		template: `<login-user></login-user>`,
	})
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
	$urlRouterProvider.when('list', () => {

	});
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
		console.dir(trans);
        if (!loginService.checkUser()) {
        	alert('Необходимо авторизоваться!');
            return trans.router.stateService.transitionTo('login');
        }
	});
});

ngApp.component('loadingIndicator', {
	bindings: {},
	template: `<h1>Plese wait</h1>`
});

ngApp.component('defectList', {
	bindings: {},
	templateUrl: 'public/templates/defects-list.html',
	// resolve: {
	// 	auth: ($q, $state, loginService) => {
	// 		if(!loginService.checkUser()) {
	// 			$q.reject();
	// 			alert('Необходимо авторизоваться!');
	// 			$state.go('login');
	// 		}
	// 	},
	// 	// defects: ($q, model)=> {
	// 	// 	console.log('RESOLVE');
	// 	// 	$q.resolve(model.getAllDefects());
	// 	// },
	// },
	controller: DefectListController,
	controllerAs: 'defectListController'
});

ngApp.component('defect', {
	bindings: {
		defect: '='
	},
	templateUrl: '/public/templates/defect.html',
	controller: function() {

	},
	controllerAs: 'defectController'
});

ngApp.component('loginUser', {
	bindings: {},
	templateUrl: 'public/templates/login-user.html',
	controller: LoginController,
	controllerAs: 'loginController'
})

let initializeComplete = false;

// $(document).ready(()=>{
	//console.log('JQUERY WORKS');



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


//});

export function start () {
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