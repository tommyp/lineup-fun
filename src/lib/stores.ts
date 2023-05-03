import { writable } from 'svelte/store';

export const playlistNameStore = writable('');

export const searchResults = writable({});
export const notFoundSearchResults = writable([]);

searchResults.subscribe((value) => {
	console.log('searchResults', value);
});
