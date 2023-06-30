import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  
  prepareHeaders: async (headers) => {

    const token = Cookies.get('user_session');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    return headers
  },

  credentials: 'same-origin',
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 })

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRetry,
  refetchOnReconnect: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({}),
  tagTypes: [
    'User',
    'Task'
  ]
})

export const {
} = baseApi

