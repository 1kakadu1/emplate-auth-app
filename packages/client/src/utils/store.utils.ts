import { createSelector, OutputSelector } from '@reduxjs/toolkit';

export function createFeatureSelector<TResult>(
	featureName: string,
): OutputSelector<any, TResult, (res: TResult) => TResult> {
	return createSelector(
		(state: any) => state[featureName],
		(feature) => feature,
	);
}
