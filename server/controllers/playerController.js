const Player = require('./../models/playerModel');

exports.getAllPlayers = async (req, res) => {
	try {
		const players = await Player.find();
		res.status(200).json({
			status: 'success',
			results: players.length,
			data: {
				players,
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

exports.getPlayer = async (req, res) => {
	try {
		const player = await Player.findById(req.params.id);
		res.status(200).json({
			status: 'success',
			data: {
				player,
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

exports.updatePlayer = async (req, res) => {
	try {
		const player = await Player.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(201).json({
			status: 'success',
			data: {
				player,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err.errors.lastCall.properties.message,
		});
	}
};

exports.deletePlayer = async (req, res) => {
	try {
		await Player.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'There was an error saving',
			error: err,
		});
	}
};
