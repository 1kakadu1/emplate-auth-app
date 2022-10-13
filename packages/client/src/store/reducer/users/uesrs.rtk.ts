import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../../services/api';
import { IUser } from '../../../types';

export const apiUsers = createApi({
	baseQuery: axiosBaseQuery(),
	tagTypes: ['IUser'],
	endpoints: (build) => ({
		getUsers: build.query<{ data: { users: IUser[]; count: number } }, void>({
			query: () => ({ url: '/users', method: 'get' }),
			//transformResponse: (response: { data: Post }, meta, arg) => response.data,
			providesTags: ['IUser'],
			// (result) =>
			//   result
			//     ? [
			//         ...result.map(({ id }) => ({ type: 'IUser' as const, id })),
			//         { type: 'IUser', id: 'LIST' },
			//       ]
			//     : [{ type: 'IUser', id: 'LIST' }],
		}),
		getUser: build.query<{ user: IUser }, { id: string }>({
			query: ({ id }) => ({ url: '/users/' + id, method: 'get' }),
			providesTags: [{ type: 'IUser' }],
			transformResponse: (response: { data: { user: IUser } }) => response.data,
		}),
	}),
});

export const { useGetUsersQuery, useGetUserQuery } = apiUsers;
