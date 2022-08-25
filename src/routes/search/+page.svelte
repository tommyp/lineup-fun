<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { getCookie, setCookie } from '$lib/utils/cookies';
	import { searchResults, notFoundSearchResults, playlistNameStore } from '$lib/stores';
	import Button from '$lib/components/Button.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import randomActs from '$lib/utils/randomActs';
	import spotify, { saveSpotifyUser } from '$lib/utils/spotify';

	let playlistName = '';
	let artists;

	$: slugifiedPlaylistName = playlistName.replace(/\W/, '-');

	$: playlistNameStore.set(playlistName);

	if (browser) {
		// results = JSON.parse(window.localStorage.getItem('results')) || [];
		const url = new URL(window.location.href);
		const token = url.searchParams.get('accessToken');
		if (token) {
			setCookie('spotify-access-token', token, 3600);

			url.searchParams.delete('accessToken');
			window.history.pushState({}, '', url);
		}

		const accessToken = getCookie('spotify-access-token');
		if (accessToken) {
			try {
				spotify.setAccessToken(accessToken);
			} catch {
				window.location.pathname = '/';
			}
			saveSpotifyUser();
		}
	}

	const handleSubmit = () => {
		window.localStorage.setItem('playlistName', playlistName);
		const requests = artists
			.split('\n')
			.map((a) => a.split(','))
			.flat()
			.map((a) => a.split('b2b'))
			.flat()
			.map((a) => a.trim());
		Promise.allSettled(
			requests.map((artist) => {
				try {
					return spotify.searchArtists(artist);
				} catch {
					window.location.pathname = '/';
				}
			})
		)
			.then((promises) => {
				promises.forEach((promise, index) => {
					if (promise.status === 'fulfilled') {
						const { value } = promise;

						if (value.artists.total > 0) {
							searchResults.update((rs) => [...rs, value.artists.items[0]]);
						} else {
							notFoundSearchResults.update((rs) => [...rs, requests[index]]);
						}
						return promise.value.artists.items[0];
					}
				});

				goto(`/${slugifiedPlaylistName}`);
			})
			.catch((error) => console.log(error));
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="inputs">
		<label for="playlistName"
			>playlist name
			<input
				type="text"
				name="playlistName"
				id="playlistName"
				autoComplete="off"
				required
				placeholder="Fyre Festival 2022"
				bind:value={playlistName}
			/>
		</label>

		<label for="artists">
			artists
			<textarea id="artists" name="artists" placeholder={randomActs()} bind:value={artists} />
		</label>
	</div>

	<div class="buttons">
		<Button big={true} disabled={!(artists && playlistName)} type="submit">search</Button>

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

	label {
		font-size: 4em;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	label[for='artists'] {
		flex-grow: 1;
		display: flex;
	}

	input,
	textarea {
		font-family: 'Commune_Nuit_Debout';
		font-size: 4rem;
		background: none;
		border: 2px solid var(--highlight);
		transition: border-color 0.2s ease-in-out;
		padding: 0.25rem;
	}

	input:focus,
	textarea:focus {
		border-color: var(--active);
	}

	textarea {
		flex-grow: 1;
		display: flex;
	}

	@media screen and (min-width: 576px) {
		label,
		input,
		textarea {
			font-size: 5rem;
		}
	}
</style>
