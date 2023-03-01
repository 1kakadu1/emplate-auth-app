import { Action, AnyAction, combineReducers, configureStore, getDefaultMiddleware, PreloadedState, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { initState, slices } from './slice';
import logger from 'redux-logger';
import { useDispatch } from 'react-redux';

const middlewareArr: any = [];

if (process.env.NODE_ENV === `development`) {
	//middlewareArr.push(logger);
}

const createRootReducer = () =>
	combineReducers({
		...slices,
	});

export const store = configureStore({
	reducer: createRootReducer(),
	middleware: [...middlewareArr, ...getDefaultMiddleware()],
	preloadedState: initState
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: createRootReducer(),
		preloadedState
	})
}

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export type AppState = ReturnType<(typeof store)['getState']>;
export type SetupStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof createRootReducer>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
