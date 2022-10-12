import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../../services/api'
import { IUser } from '../../../types'

export const api = createApi({
  baseQuery: axiosBaseQuery({baseUrl: "/"}),
  tagTypes: ['IUser'],
  endpoints: (build) => ({
    getPosts: build.query<IUser[], void>({
      query: () => '/users',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'IUser' as const, id })),
              { type: 'IUser', id: 'LIST' },
            ]
          : [{ type: 'IUser', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetPostsQuery,
} = api