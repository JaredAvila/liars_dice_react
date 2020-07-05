const express = require('express');
const app = express();

const playerActions = require('./Players/Players');
const playerRouter = require('./routes/playerRoutes');

//to be replaced by db queires
let users = [];

let gameActive = false;

// Add body object
app.use(express.json());

// Headers
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use('/api/v1/players', playerRouter);

module.exports = app;
