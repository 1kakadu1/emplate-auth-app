import { debounce, newArray } from './functions';

describe('Function', () => {
	test('Equal newArray', () => {
		const arrMock = [0, 1, 2, 3, 4];
		const arr = newArray(5);
		expect(arr).toEqual(arrMock);
		expect(arr.length).toBe(5);
	});

	test('Debounce success', async () => {
		const [debouncedFunc] = debounce(() => 1 + 1, 500);
		const result = await debouncedFunc(undefined);
		expect(result).toBe(2);
	});

	test('Debounce stop time', async () => {
		const [debouncedFunc, teardown] = debounce((n: number) => 1 + n, 500);
		let result: number | Promise<number> = debouncedFunc(1);
		teardown();
		result = await debouncedFunc(2);
		expect(result).toBe(3);
	});
});
