const fictionalActs = [
	'Ali G',
	'Chemical Toilet',
	'Conner4Real',
	'Dethklok',
	'Electric Dream Machine',
	'PaRappa The Rappa',
	'Spinal Tap',
	'The Style Boyz'
];

const randomActs = () => {
	const day = new Date().getDay();

	let acts = [];
	if (day % 2 == 0) {
		acts = fictionalActs.filter((act, i) => i % 2 == 0);
	} else {
		acts = fictionalActs.filter((act, i) => i % 2 == 1);
	}

	return acts.join(', ');
};

export default randomActs;
