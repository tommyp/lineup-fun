const fictionalActs = [
	'Ali G - Me Julie',
	'Chemical Toilet',
	'Conner4Real - Thriller',
	'Dethklok - The Deathalbum',
	'Electric Dream Machine',
	'PaRappa The Rappa',
	'Spın̈al Tap - This Is Spın̈al Tap',
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
