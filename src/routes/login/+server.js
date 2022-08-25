import QueryString from 'qs';
import { hex } from 'securerandom';

export async function GET() {
	const state = hex(16);
	const scopes = [
		'playlist-modify-private',
		'playlist-modify-public',
		'user-read-private',
		'user-read-email'
	].join(' ');

	return new Response(undefined, {
		status: 302,
		headers: {
			location:
				'https://accounts.spotify.com/authorize?' +
				QueryString.stringify({
					response_type: 'code',
					client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
					scope: scopes,
					redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
					state: state
				})
		}
	});
}
