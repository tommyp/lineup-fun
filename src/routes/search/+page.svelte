<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { getCookie, setCookie } from '$lib/utils/cookies';
	import { searchResults, notFoundSearchResults, playlistNameStore } from '$lib/stores';
	import Button from '$lib/components/Button.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import randomActs from '$lib/utils/randomActs';
	import spotify, { saveSpotifyUser } from '$lib/utils/spotify';
	import TextInput from '$lib/components/TextInput.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import Label from '../../lib/components/Label.svelte';
	import { error } from '@sveltejs/kit';

	let playlistName = '';
	let searchQuery = '';

	$: slugifiedPlaylistName = playlistName.replace(/\W/, '-');

	$: playlistNameStore.set(playlistName);

	if (browser) {
		// results = JSON.parse(window.localStorage.getItem('results')) || [];
		const url = new URL(window.location.href);
		const token = url.searchParams.get('accessToken');
		console.log({ token });
		if (token) {
			setCookie('spotify-access-token', token, 1);

			url.searchParams.delete('accessToken');
			window.history.pushState({}, '', url);

			try {
				spotify.setAccessToken(token);
			} catch {
				window.location.pathname = '/';
			}
			saveSpotifyUser();
		} else {
			const accessToken = getCookie('spotify-access-token');
			console.log({ accessToken });
			if (accessToken) {
				try {
					spotify.setAccessToken(accessToken);
				} catch {
					window.location.pathname = '/';
				}
				saveSpotifyUser();
			}
		}
	}

	const handleSubmit = () => {
		window.localStorage.setItem('playlistName', playlistName);
		const queries = searchQuery
			.split('\n')
			.map((a) => a.split(','))
			.flat()
			.map((a) => a.split('b2b'))
			.flat()
			.map((a) => a.trim());

		try {
			queries.forEach((query) => {
				if (query.includes('-')) {
					const [artist, album] = query.split('-');

					spotify.searchAlbums(album).then((resp) => {
						if (resp.albums.total > 0) {
							searchResults.update((rs) => [...rs, resp.albums.items[0]]);
						} else {
							notFoundSearchResults.update((rs) => [...rs, query]);
						}
					});
				} else {
					spotify.searchArtists(query).then((resp) => {
						if (resp.artists.total > 0) {
							searchResults.update((rs) => [...rs, resp.artists.items[0]]);
						} else {
							notFoundSearchResults.update((rs) => [...rs, query]);
						}
					});
				}
			});

			goto(`/${slugifiedPlaylistName}`);
		} catch (error) {
			console.log(error);
		}
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="inputs">
		<Label htmlFor="playlistName">playlist name</Label>
		<TextInput
			name="playlistName"
			required
			placeholder="Fyre Festival 2022"
			bind:value={playlistName}
		/>

		<Label htmlFor="search-query">artists or artist - album</Label>
		<TextArea name="search-query" placeholder={randomActs()} bind:value={searchQuery} />
	</div>

	<div class="buttons">
		<Button big={true} disabled={!(searchQuery && playlistName)} type="submit">search</Button>

		<Footer />
	</div>
</form>

<style>
	form {
		height: 100vh;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.inputs {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.5rem;
		height: auto;
		padding-bottom: 2rem;
		flex-grow: 1;
	}

	.buttons {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		flex-direction: column;
		gap: 2rem;

		width: 100%;
		padding-bottom: 1rem;
	}

	@media (min-width: 1024px) {
		form {
			display: grid;
			grid-template-columns: 3fr 1fr;
			grid-template-rows: 1fr;
			gap: 6rem;
			max-height: 100vh;
			height: 100vh;
		}

		.inputs {
			height: 100vh;
		}

		.buttons {
			padding-top: 6rem;

			justify-content: space-between;
		}
	}

	label[for='artists'] {
		flex-grow: 1;
		display: flex;
	}
</style>
