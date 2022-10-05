import { userSlice } from './reducer/user/user.reducer';

export const slices = {
	[userSlice.name]: userSlice.reducer,
};
