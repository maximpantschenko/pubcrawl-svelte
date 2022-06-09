import { writable } from 'svelte/store';

const email = 'm@m.com'
const password = 'test'

export const store = writable(null);

let sessions = []

export const getUserDetails = async ( getEmail, getPassword ) => {
	if ( getEmail === email && getPassword === password )
		return 1
}