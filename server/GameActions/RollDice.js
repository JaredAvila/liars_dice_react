module.exports = RollDice = () => {
	let num;
	let numarray = [];
	for (let i = 0; i < 5; i++) {
		num = Math.floor(Math.random() * 6) + 1;
		numarray.push(num);
	}
	return numarray;
};
