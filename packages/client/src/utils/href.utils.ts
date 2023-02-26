import { NavigateFunction } from 'react-router-dom';

export function updateURL(
	history: NavigateFunction,
	pathname: string,
	queryKey: string | number,
	queryValue: string | number,
	location: Location
) {
	const currentSearch = queryParse(location);

	if (queryKey in currentSearch && queryValue === '') {
		delete currentSearch[queryKey];
	} else {
		currentSearch[queryKey] = queryValue;
	}

	const q = Object.keys(currentSearch || {})
		.map(function (key) {
			return key + '=' + currentSearch[key].toString();
		})
		.join('&');

	history({
		pathname: pathname,
		search: '?' + q,
	});
}

export function queryParse(url: Location) {
	let qd: { [key: string]: any } = {};
	if (url.search)
		url.search
			.substr(1)
			.split('&')
			.forEach(function (item) {
				let s = item.split('='),
					k = s[0],
					v = s[1] && decodeURIComponent(s[1]);
				(qd[k] = qd[k] || []).push(v);
			});

	return qd;
}
