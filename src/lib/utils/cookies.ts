export const setCookie = (cname: string, cvalue: string, expiry: number) => {
	const d = new Date();
	d.setDate(d.getDate() + expiry);
	const expires = 'expires=' + d.toUTCString();
	const c = cname + '=' + cvalue + ';' + expires + ';path=/';
	document.cookie = c;
};

export const getCookie = (cname: string) => {
	let name = cname + '=';
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
};
