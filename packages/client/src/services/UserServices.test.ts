import { AxiosError } from "axios";
import MockAdapter from "axios-mock-adapter";
import { USER_MOCK } from "../tests/mocks/user.mock";
import api from "./api";
import UserServices from "./UserServices";

describe('user services', () => {
    let mockApi: MockAdapter;
    beforeAll(() => {
        mockApi = new MockAdapter(api);
    });

    it('request error', async () => {
        mockApi.onGet(`/users/null`).reply(404, { data: { error: "Not found" } });
        let error: string | undefined;
        try {
            await UserServices.getUserByID("null");
        } catch (e) {
            error = (e as any)?.toString() || undefined;
        } finally {
            expect(error).toBe('Not found');
        }
    });

    it('request error: "Request failed with status code 500"', async () => {
        mockApi.onGet(`/users/null`).reply(500, undefined);
        let error: string | undefined;
        try {
            await UserServices.getUserByID("null");
        } catch (e) {
            error = (e as any)?.toString() || "Data error undenfined";
        } finally {
            expect(error).toBe('Request failed with status code 500');
        }
    });

    it('request success', async () => {
        mockApi.onGet(`/users/-1`).reply(200, { data: { user: USER_MOCK } });
        const result = await UserServices.getUserByID("-1");
        expect(result).toEqual(USER_MOCK);
    });
})