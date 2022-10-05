import {
    Action,
	combineReducers,
	configureStore,
	getDefaultMiddleware,
    ThunkAction,
} from '@reduxjs/toolkit';
import { slices } from './slice';
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
});

export type AppState = ReturnType<typeof store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	AppState,
	unknown,
	Action
>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
