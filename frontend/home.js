"use strict"

import Defect from './classes/defect';
import Tube from './classes/tube';
import Model from './model';
import $ from "jquery";
import angular from 'angular';

angular.module('myApp', []);

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

export function hello () {
	$("body").append('<div class="overlay" title="Please wait"></div><div class="container wrapper"></div>').css({"overflow-y":"hidden"});
	let overlay = $(".overlay");
	overlay.animate({"opacity":"0.6"}, 200, "linear");

	const model = new Model(() => {
		console.log('INITIALIZE IS COMPLETE');
		$(".container, .overlay")
		.animate({"opacity": "0"}, 200, "linear", function(){
			$(".container, .overlay").remove();
		});

		initializeComplete = true;
	});

	$('#btnGetAll').on('click', (event) => {

		let defects = model.getAllDefects();

		//alert(defects || "UNDEFINED");
		
		if(!initializeComplete) {
			console.log(initializeComplete);
			return;
		}

		$('#divMain').html(JSON.stringify(defects));
		//$('#divMain').html(defects);

	});
}