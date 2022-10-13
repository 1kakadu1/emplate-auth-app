import { userSlice } from './reducer/user/user.reducer';
import { apiUsers } from './reducer/users/uesrs.rtk';

export const slices = {
	[apiUsers.reducerPath]: apiUsers.reducer,
	[userSlice.name]: userSlice.reducer,
};
