import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (loginProps) => ({
        url: 'login',
        method: 'POST',
        body: loginProps,
      }),
      invalidatesTags: ['User', 'Task']
    }),

    register: builder.mutation({
      query: (registerProps) => ({
        url: 'register',
        method: 'POST',
        body: registerProps
      }),
      invalidatesTags: ['User', 'Task']
    }),

    getUser: builder.query({
      query: () => 'user',
      providesTags: ['User']
    }),

    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST'
      }),
      invalidatesTags: ['User', 'Task']
    }),
  })
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLogoutMutation
} = authApi;

export default authApi;

