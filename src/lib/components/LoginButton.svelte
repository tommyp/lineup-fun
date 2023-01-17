<script>
	import QueryString from 'qs';

	export let uuid;

	const scopes = [
		'playlist-modify-private',
		'playlist-modify-public',
		'user-read-private',
		'user-read-email'
	].join(' ');

	const redirect_uri =
		'https://accounts.spotify.com/authorize?' +
		QueryString.stringify({
			response_type: 'code',
			client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
			scope: scopes,
			redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI,
			state: uuid
		});
</script>

<a class="btn" href={redirect_uri}>login with Spotify</a>

<style>
	.btn {
		background: #10aa37;
		padding: 1rem 4rem;
		color: #fff;
		font-size: 4rem;
		margin-top: 2rem;
		display: block;
		text-decoration: none;
		width: 100%;
		text-align: center;
		transition: background 0.2s ease-in-out, color 0.2s ease-in-out;
	}

	.btn:hover {
		background: var(--highlight);
	}

	@media (min-width: 576px) {
		.btn {
			width: auto;
			display: inline-block;
		}
	}
</style>
