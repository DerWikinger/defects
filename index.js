const login = require('./frontend/login/login');
const express = require('express');

var app = express();
app.use('/public', express.static('public'));

login(app);

app.listen(8080, () => {
	console.log('Server works on port 8080');
})