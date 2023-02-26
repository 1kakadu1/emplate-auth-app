import { useEffect } from 'react';
import { debounce } from '../utils/functions';

//https://dev.to/bwca/create-a-debounce-function-from-scratch-in-typescript-560m

export const useDebounce = <A = unknown, R = void>(fn: (args: A) => R, ms: number): ((args: A) => Promise<R>) => {
	const [debouncedFun, teardown] = debounce<A, R>(fn, ms);

	useEffect(() => () => teardown(), []);

	return debouncedFun;
};
