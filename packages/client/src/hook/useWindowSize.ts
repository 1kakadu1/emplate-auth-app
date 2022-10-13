import { useState, useEffect } from 'react';

interface IWindowSize {
	width: number;
	height: number;
	breakpoint: WindowBreakpoints;
}

export enum WindowBreakpoints {
	xs = 0,
	sm = 576,
	md = 768,
	lg = 992,
	xl = 1200,
	xxl = 1400,
	custom = 1580,
}

export enum WindowBreakpointsKeys {
	xs = 'xs',
	sm = 'sm',
	md = 'md',
	lg = 'lg',
	xl = 'xl',
	xxl = 'xxl',
	custom = 'custom',
}

export type KeyofWindowBreakpoints = keyof WindowBreakpoints;

export function useWindowSize(): IWindowSize {
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});

	const [breakpointMin, setBreakpointMin] = useState<WindowBreakpoints>(WindowBreakpoints.xs);

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const width = windowSize.width;
		if (width >= WindowBreakpoints.custom) {
			setBreakpointMin(WindowBreakpoints.custom);
		} else if (width >= WindowBreakpoints.xxl) {
			setBreakpointMin(WindowBreakpoints.xxl);
		} else if (width >= WindowBreakpoints.xl) {
			setBreakpointMin(WindowBreakpoints.xl);
		} else if (width >= WindowBreakpoints.lg) {
			setBreakpointMin(WindowBreakpoints.lg);
		} else if (width >= WindowBreakpoints.md) {
			setBreakpointMin(WindowBreakpoints.md);
		} else if (width >= WindowBreakpoints.sm) {
			setBreakpointMin(WindowBreakpoints.sm);
		} else {
			setBreakpointMin(WindowBreakpoints.xs);
		}
	}, [windowSize]);

	return {
		width: windowSize.width,
		height: windowSize.height,
		breakpoint: breakpointMin,
	};
}
