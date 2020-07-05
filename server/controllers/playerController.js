const fs = require('fs');

const players = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/players.json`)
);

exports.getAllPlayers = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: players.length,
		data: {
			players,
		},
	});
};

exports.getPlayer = (req, res) => {
	const id = req.params.id * 1;
	const player = players.find((el) => el.id === id);

	if (!player) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}

	res.status(200).json({
		status: 'success',
		data: {
			player,
		},
	});
};

exports.createNewPlayer = (req, res) => {
	const newId = players[players.length - 1].id + 1;
	const newPlayer = Object.assign({ id: newId }, req.body);

	players.push(newPlayer);
	fs.writeFile(
		`${__dirname}/dev-data/data/players.json`,
		JSON.stringify(players),
		(err) => {
			res.status(201).json({
				status: 'success',
				data: {
					player: newPlayer,
				},
			});
		}
	);
};

exports.updatePlayer = (req, res) => {
	const id = req.params.id * 1;
	const player = players.find((el) => el.id === id);

	if (!player) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}
	res.status(201).json({
		status: 'success',
		data: {
			player,
			id,
		},
	});
};

exports.deletePlayer = (req, res) => {
	const id = req.params.id * 1;
	const player = players.find((el) => el.id === id);

	if (!player) {
		return res.status(404).json({
			status: 'fail',
			message: 'Invalid ID',
		});
	}
	res.status(204).json({
		status: 'success',
		data: null,
	});
};
