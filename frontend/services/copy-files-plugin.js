'use strict';

var path = require('path');
var fs = require('fs');
var copyFileSync = require('fs-copy-file-sync');

var defaultTest = /.*/;

function isDirectory(source) {
	return fs.statSync(source).isDirectory();
}

function getFiles(source, test) {
	var result = [];
	fs.readdirSync(source).map((name) => {
		var fName = path.join(source, name);
		if(isDirectory(fName)) {
			var arr = getFiles(fName, test);
			result = result.concat(arr);
		} else {
			if(fName.match(test)) result.push(fName);
		}
	});
	return result;
}

function copyFiles(from, to, test) {
	test = arguments.length<3 ? defaultTest : arguments[2];
	var files = getFiles(from, test);
	for(var i = 0; i < files.length; i++) {
		var file = files[i];
		var arr = file.split('\\');
		var fileName = arr.length>0 ? arr[arr.length-1] : '';
		if(!fileName) continue;
		console.log(file);
		copyFileSync(file, to + '\\' + fileName, copyFileSync.constants.COPYFILE_FICLONE);
	}/**/
}

class CopyFilesPlugin {

	constructor(from, to, test) {
		this.from = from;
		this.to = to;
		this.test = (typeof test !== 'undefined' ? test : defaultTest);
	}

	apply(compiler) {
		copyFiles(this.from, this.to, this.test);
	}
}

module.exports = CopyFilesPlugin;

//copyFiles(path.resolve(__dirname, 'frontend'), path.resolve(__dirname, 'public/views'), /\.html$/);