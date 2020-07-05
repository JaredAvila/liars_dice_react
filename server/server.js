const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.then(() => console.log('db connection successful'));

const PORT = process.env.PORT || 3001;
const app = require('./index');
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	//welcome current user
	socket.emit('message', 'Welcome to Liars Dice');

	//Send out alert to everyone else when user joins
	socket.broadcast.emit('message', 'User has joined the room');

	//alert all when someone leaves
	socket.on('disconnect', () => {
		io.emit('message', 'User has left the room');
	});

	//add new user
	socket.on('newUser', (data) => {
		users.push(data);
		io.emit('playerList', users);
	});

	//remove user upon logout
	socket.on('logOutUser', (data) => {
		newUsers = users.filter((player) => player.id !== data.id);
		users = newUsers;
		io.emit('playerList', newUsers);
	});

	//update player list
	socket.on('updatePlayers', (data) => {
		console.log('updated player: ', data);
		users = data;
		io.emit('playerList', data);
	});

	//start game actions
	socket.on('gameStart', () => {
		let newUsers = playerActions.setFirstPlayer(users, false);
		let newerUsers = playerActions.setPlayerHands(newUsers);
		gameActive = true;
		users = [...newerUsers];

		io.emit('startGame', {
			gameActive,
			users,
		});
	});
});
