import axios, { AxiosError, AxiosInstance } from "axios";
import MockAdapter from "axios-mock-adapter";
import api, { API_URL, axiosBaseQuery } from "./api";

describe('axious api instance', () => {
  let instance: AxiosInstance;
  let mockApi: MockAdapter;
  let mockApiPublic: MockAdapter;
  const user = {
    id: 1,
    email: "test@mail.ru",
    name: "Test",
  };

  beforeAll(() => {
    instance = api;
    mockApiPublic = new MockAdapter(axios);
    mockApi = new MockAdapter(api);
  });

  afterEach(() => {
    mockApiPublic.reset();
    mockApi.reset();
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

  it('should make a successful request', async () => {
    const baseQuery = axiosBaseQuery();

    const url = '/users';
    const method = 'get';
    const data = { id: 1 };
    const params = { limit: 10 };

    const responseData = { id: 1, name: 'John Doe' };
    const expectedResponse = { data: responseData };

    mockApi.onGet(API_URL + url, { params }).reply(200, responseData);

    const result = await baseQuery({ url, method, data, params }, {
      signal: new AbortController().signal,
      dispatch: () => void 0,
      getState: function (): unknown {
        throw new Error("Function not implemented.");
      },
      extra: undefined,
      endpoint: "",
      type: "query"
    }, {});

    expect(result).toEqual(expectedResponse);
  });

  it('should handle an error response', async () => {
    const baseQuery = axiosBaseQuery();

    const url = '/users';
    const method = 'get';
    const data = { id: 1 };
    const params = { limit: 10 };

    const errorMessage = 'Request failed';
    const expectedResponse = {
      error: {
        status: 500,
        data: errorMessage,
      },
    };

    mockApi.onGet(API_URL + url, { params }).reply(500, errorMessage);

    const result = await baseQuery({ url, method, data, params }, {
      signal: new AbortController().signal,
      dispatch: () => void 0,
      getState: function (): unknown {
        throw new Error("Function not implemented.");
      },
      extra: undefined,
      endpoint: "",
      type: "query"
    }, {});

    expect(result).toEqual(expectedResponse);
  });

  it('should handle success when refreshing token', async () => {
    let result;
    const refreshToken = 'myRefreshToken';
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(refreshToken),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    const originalRequest = {
      url: '/users',
      method: 'get',
    };

    const expectedConfig = {
      url: `${API_URL}/refresh`,
      method: 'post',
    };

    mockApiPublic.onPost(expectedConfig.url, {}).reply(200, {
      data: {
        accessToken: "newAccessToken",
        refreshToken: refreshToken,
        user: user,
      }
    });
    mockApi.onGet(originalRequest.url).reply(401, {});
    try {
      await api.get(API_URL + originalRequest.url);
    } catch (error) {
      mockApi.onGet(originalRequest.url).reply(200, {
        data: user,
      }, {
        Authorization: 'Bearer TOKEN_JWT'
      });
      result = await api.get(API_URL + originalRequest.url);
      console.log("result", result);
    } finally {
      expect(localStorageMock.setItem).toHaveBeenCalled();
      expect(result?.headers).toEqual({
        Authorization: 'Bearer TOKEN_JWT'
      });
    }

  });

})