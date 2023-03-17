import { queryParse, updateURL } from "./href.utils";
const history = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom') as any,
	useNavigate: () => jest.fn(),
}));
// const spyHistory = jest.spyOn(history, "history");
//https://codesandbox.io/s/react-testing-library-with-material-ui-838zc?file=/src/Test.test.tsx:1255-1260
describe('Href utils', () => {
	test('updateURL', () => {
		const location = JSON.parse(JSON.stringify(window.location)) as Location;
		location.href = "http://localhost:3000/post?limit=10&offset=1";
		location.search = "?limit=10&offset=1";
		expect(updateURL(
			history,
			'/post',
			"limit",
			10,
			location
		)).toBeUndefined();
		expect(history).toBeCalledTimes(1);

	});

	test('updateURL empty', () => {
		const location = JSON.parse(JSON.stringify(window.location)) as Location;
		location.href = "http://localhost:3000/post?limit=10&offset=1";
		location.search = "?limit=10&offset=1";
		expect(updateURL(
			history,
			'/post?limit=10&offset=1',
			"limit",
			"",
			location
		)).toBeUndefined();
		expect(history).toBeCalledTimes(1);
	});

	test('queryParse', async () => {
		const keys = {
			"limit": ['10'],
			"offset": ['1']
		}
		const location = JSON.parse(JSON.stringify(window.location)) as Location;
		location.href = "http://localhost:3000/post?limit=10&offset=1";
		location.search = "?limit=10&offset=1";

		expect(queryParse(location)).toEqual(keys)
	});

	test('queryParse serch empty', async () => {
		const keys = {};
		const location = JSON.parse(JSON.stringify(window.location)) as Location;
		location.href = "http://localhost:3000/post";
		location.search = "";

		expect(queryParse(location)).toEqual(keys)
	});

});
