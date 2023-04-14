import { initialStateUser } from './user.const';
import { IUserData } from './user.model';
import { userSlice, fetchVerifyUser, fetchUserByID, fetchLogoutUser, toUserAction } from './user.reducer';
import MockAdapter from "axios-mock-adapter";
import api from '../../../services/api';
import { IUser } from '../../../types';
import { setupStore } from '../../state';

describe('userSlice unit', () => {
    it('should handle initial state', () => {
        expect(userSlice.reducer(undefined, {} as any)).toEqual(initialStateUser);
    });

    it('should handle setUser', () => {
        const previousState = { ...initialStateUser };
        const payload: { user: IUserData } = { user: { id: 1, name: 'John Doe', email: "test@mail.ru" } };
        const expectedState = { ...previousState, user: payload.user, isAuth: true, isLoading: false };
        expect(userSlice.reducer(previousState, toUserAction.setUser(payload))).toEqual(expectedState);
    });

    it('should handle setUserError', () => {
        const previousState = { ...initialStateUser };
        const payload = 'Invalid username or password';
        const action = { type: toUserAction.setUserError.type, payload };
        const expectedState = { ...previousState, error: payload };
        expect(userSlice.reducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchVerifyUser/pending', () => {
        const previousState = { ...initialStateUser };
        const action = { type: fetchVerifyUser.pending.type };
        const expectedState = { ...previousState, isLoading: true, error: '' };
        expect(userSlice.reducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchVerifyUser/fulfilled', () => {
        const previousState = { ...initialStateUser };
        const payload: IUserData = { id: 1, name: 'John Doe', email: "test@mail.ru" };
        const action = { type: fetchVerifyUser.fulfilled.type, payload };
        const expectedState = { ...previousState, user: payload, isAuth: true, isLoading: false };
        expect(userSlice.reducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchVerifyUser/rejected', () => {
        const previousState = { ...initialStateUser };
        const error = { message: 'Unauthorized' };
        const action = { type: fetchVerifyUser.rejected.type, error };
        const expectedState = { ...previousState, error: error.message, isLoading: false };
        expect(userSlice.reducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchLogoutUser/pending', () => {
        const previousState = { ...initialStateUser, isAuth: true };
        const action = { type: fetchLogoutUser.pending.type };
        const expectedState = { ...previousState, error: '' };
        expect(userSlice.reducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchLogoutUser/fulfilled', () => {
        const previousState = { ...initialStateUser, isAuth: true };
        const action = { type: fetchLogoutUser.fulfilled.type };
        const expectedState = { ...previousState, isAuth: false, user: undefined };
        expect(userSlice.reducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchLogoutUser/rejected', () => {
        const previousState = { ...initialStateUser, isAuth: true };
        const error = { message: 'Something went wrong' };
        const action = { type: fetchLogoutUser.rejected.type, error };
        const expectedState = { ...previousState, error: error.message };
        expect(userSlice.reducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchUserByID/pending', () => {
        const previousState = { ...initialStateUser, };
        const action = { type: fetchUserByID.pending.type };
        const expectedState = { ...previousState, error: '' };
        expect(userSlice.reducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchUserByID/fulfilled', () => {
        const previousState = { ...initialStateUser, isAuth: true, isLoading: false };
        const payload: IUserData = { id: 1, name: 'John Doe', email: "test@mail.ru" };
        const action = { type: fetchUserByID.fulfilled.type, payload };
        const expectedState = { ...previousState, user: payload };
        expect(userSlice.reducer(previousState, action)).toEqual(expectedState);
    });

    it('should handle fetchUserByID/rejected', () => {
        const previousState = { ...initialStateUser, isAuth: true };
        const error = { message: 'Something went wrong' };
        const action = { type: fetchUserByID.rejected.type, error };
        const expectedState = { ...previousState, error: error.message };
        expect(userSlice.reducer(previousState, action)).toEqual(expectedState);
    });
});

describe('fetchUserByID', () => {
    let mockApi: MockAdapter;
    const store = setupStore();
    beforeAll(() => {
        mockApi = new MockAdapter(api);
    });

    it('should return user data fetchUserByID', async () => {
        const id = 123;
        const user: IUserData = { id, name: 'John', email: 'john@example.com' };
        mockApi.onGet(`/users/${id}`).reply(200, { data: { user } });
        const result = await store.dispatch(fetchUserByID(id.toString()));
        expect(result.payload).toEqual(user);
    });

    it('should return error user data fetchUserByID', async () => {
        const id = 123;
        const error: string = "Not found";
        mockApi.onGet(`/users/${id}`).reply(404, { data: { error } });
        const result = await store.dispatch(fetchUserByID(id.toString()));
        expect(result.payload).toEqual(error);
    });

});
