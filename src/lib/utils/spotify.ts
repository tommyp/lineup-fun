import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

export default spotify;

export const saveSpotifyUser = async () => {
	spotify
		.getMe()
		.then((resp) => localStorage.setItem('spotify_user', JSON.stringify(resp)))
		.catch((err) => {
			console.log(err);
		});
};

export const spotifyUser = () => {
	return JSON.parse(localStorage.getItem('spotify_user'));
};

export const addTracks = () => {};
