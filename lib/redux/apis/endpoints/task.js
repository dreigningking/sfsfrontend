import { baseApi } from "../baseApi";

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getTasks: builder.query({
      query: () => 'tasks',
      providesTags: ['Task'],
      transformResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.tasks;
      }
    }),

    storeTask: builder.mutation({
      query: (taskQuery) => ({
        url: 'task/store',
        method: 'POST',
        body: taskQuery
      }),
      invalidatesTags: ['Task']
    }),

    deleteTask: builder.mutation({
      query: (taskQuery) => ({
        url: 'task/delete',
        method: 'POST',
        body: taskQuery
      }),
      invalidatesTags: ['Task']
    })

  })
})

export const {
  useGetTasksQuery,
  useStoreTaskMutation,
  useDeleteTaskMutation,
} = taskApi;

export default taskApi;

