const Player = require('./../models/playerModel');

exports.getAllPlayers = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: players.length,
		data: {
			players: 'Players go here',
		},
	});
};

exports.getPlayer = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			player: 'Player goes here',
		},
	});
};

exports.createNewPlayer = async (req, res) => {
	try {
		const newPlayer = await Player.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				player: newPlayer,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'There was an error saving',
			error: err,
		});
	}
};

exports.updatePlayer = (req, res) => {
	res.status(201).json({
		status: 'success',
		data: {
			player: 'Player goes here',
		},
	});
};

exports.deletePlayer = (req, res) => {
	res.status(204).json({
		status: 'success',
		data: null,
	});
};
