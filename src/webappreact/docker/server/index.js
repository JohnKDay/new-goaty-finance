const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
require('dotenv').config();
const Sequelize = require('sequelize');

const stockModel = require('./dbModel');

server.listen(process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//----DATABASE
var connectionStr = 'postgres://postgres:gRAHBwPjR8@postgresql-demo:5432/stocksdb';
var sequelize = new Sequelize(connectionStr);
sequelize.sync().then(() => console.log('Db Connection OK, Stocks Table Ready')).catch(err => console.log("DB Err: ", err));

//----Routes
app.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/api/stocks', (req, res) => {
	stockModel.find({}, (err, polls, next) => {
		if (err) return next(err);
		return res.status(200).json(polls);
	});
});

//--------SOCKET
io.on('connection', function(socket) {
	console.log('New client connected with id:' + socket.id);
	socket.on('addStock', function(data) {
		var stockItem = new stockModel({
			stockName: data.toUpperCase()
		});
		stockItem.save((err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`Added new stock ${data.toUpperCase()}!`);
			}
		});
		socket.broadcast.emit('update', 'stockItem');
	});
	socket.on('removeStock', function(data) {
		stockModel.remove({ stockName: data }, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				console.log(`Removed stock ${data}`);
			}
		});
		socket.broadcast.emit('removed', 'stockItem');
	});
	socket.on('disconnect', function() {
		console.log('Client disconnected');
	});
});

module.exports = server;
