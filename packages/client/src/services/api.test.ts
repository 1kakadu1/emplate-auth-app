import { AxiosError, AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import api from "./api";

describe('axious api instance', () => {
    let instance: AxiosInstance;
    let mockApi: MockAdapter;


    beforeAll(() => {
        instance = api;
        mockApi = new MockAdapter(api);
    });

    it('request for a new token. Error on receipt', async () => {
        mockApi.onGet(`/users/1`).reply(401, {});
        const result = await instance.get('/users/1');
        expect(result).toBe('NOT AUTH USER');
    });

    it('request error status 500', async () => {
        mockApi.onGet(`/users/666`).reply(500, { error: "1234" });

        let error: string | undefined;
        let status;
        try {
            await instance.get('/users/666');
        } catch (e) {
            const err = e as AxiosError<{ data: { error?: string } }>;
            status = err.response?.status;
            error = err.message;
        } finally {
            expect(status).toBe(500);
            expect(error).toBe('Request failed with status code 500');
        }
    });

    it('request error status 404', async () => {
        mockApi.onGet(`/users/666`).reply(404, { data: { error: "Not found" } });
        let error: string | undefined;
        let status;
        try {
            await instance.get('/users/666');
        } catch (e) {
            const err = e as AxiosError<{ data: { error?: string } }>;
            status = err.response?.status;
            error = err.response?.data.data.error;
        } finally {
            expect(status).toBe(404);
            expect(error).toBe('Not found');
        }

    });
})