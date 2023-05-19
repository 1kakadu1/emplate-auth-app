import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { USER_MOCK } from "../tests/mocks/user.mock";
import api, { API_URL } from "./api";
import AuthServices from "./AuthServices";

describe('auth services', () => {
    let mockApi: MockAdapter;
    let mockApiPublic: MockAdapter;
    const user = {
        id: 1,
        email: "test@mail.ru",
        name: "Test",
    };
    beforeAll(() => {
        mockApi = new MockAdapter(api);
        mockApiPublic = new MockAdapter(axios);
    });

    it('login succsess', async () => {
        const data = {
            accessToken: "accessToken",
            refreshToken: "refreshToken",
            user: user
        }
        mockApi.onPost(`/login`).reply(200, {
            data: data
        });

        const result = await AuthServices.login(user.email, "12345");
        expect(result.data).toEqual(data);
    });

    it('loogin error', async () => {
        mockApi.onPost(`/login`).reply(500, undefined);
        let error: string | undefined;
        try {
            await AuthServices.login(user.email, "12345");
        } catch (e) {
            error = (e as any)?.toString() || "Data error undenfined";
        } finally {
            expect(error).toBe('Request failed with status code 500');
        }
    });

    it('registation succsess', async () => {
        const data = {
            accessToken: "accessToken",
            refreshToken: "refreshToken",
            user: user
        }
        mockApi.onPost(`/registration`).reply(200, {
            data: data
        });

        const result = await AuthServices.registation(user.email, "12345");
        expect(result.data).toEqual(data);
    });

    it('registation error', async () => {
        mockApi.onPost(`/registration`).reply(500, undefined);
        let error: string | undefined;
        try {
            await AuthServices.registation(user.email, "12345");
        } catch (e) {
            error = (e as any)?.toString() || "Data error undenfined";
        } finally {
            expect(error).toBe('Request failed with status code 500');
        }
    });

    it('logout succsess', async () => {
        mockApi.onPost(`/logout`).reply(200, {
            data: 'succsess'
        });

        const result = await AuthServices.logout();
        expect(result.data.data).toEqual('succsess');
    });

    it('logout error', async () => {
        mockApi.onPost(`/logout`).reply(500, undefined);
        let error: string | undefined;
        try {
            await AuthServices.logout();
        } catch (e) {
            error = (e as any)?.toString() || "Data error undenfined";
        } finally {
            expect(error).toBe('Request failed with status code 500');
        }
    });

    it('verifyUser succsess', async () => {
        const data = {
            accessToken: "accessToken",
            refreshToken: "refreshToken",
            user: user
        }
        mockApiPublic.onPost(`${API_URL}/refresh`).reply(200, {
            data: data
        });

        const result = await AuthServices.verifyUser();
        expect(result.data).toEqual(data);
    });

    it('verifyUser error', async () => {
        mockApiPublic.onPost(`${API_URL}/refresh`).reply(500, undefined);
        let error: string | undefined;
        try {
            await AuthServices.verifyUser();
        } catch (e) {
            error = (e as any)?.toString() || "Data error undenfined";
        } finally {
            expect(error).toBe('Request failed with status code 500');
        }
    });

})