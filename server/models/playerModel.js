const mongoose = require('mongoose');

const playerScheuma = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		unique: [true, 'Name is already in use'],
	},
	turn: {
		type: Boolean,
		default: false,
	},
	lastCall: Number,
	hand: Array,
});

const Player = mongoose.model('Player', playerScheuma);

module.exports = Player;
