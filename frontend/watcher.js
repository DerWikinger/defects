'use strict';

const CopyFilesPlugin = require('./services/copy-files-plugin');
var path = require('path');

var from = path.resolve(__dirname, '');
var to = path.resolve(__dirname.replace('frontend', ''),  'public/views');
var test = /\.html$/

let cfp = new CopyFilesPlugin(from , to , test);
	//console.log(cfp);
cfp.apply(null);

// var timerId = setInterval(()=> {
// 	let cfp = new CopyFilesPlugin(from , to , test);
// 	//console.log(cfp);
// 	cfp.apply(null);
// }, 5000); 