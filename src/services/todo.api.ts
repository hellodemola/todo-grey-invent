import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITodo } from '../interfaces/todo.interface';

const baseUrl = 'https://jsonplaceholder.typicode.com/'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos?_limit=50',
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
       // 🚀 Optimistic UI: Add the new task before the API response
       async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        const temporaryId = Date.now(); // Generate a temp ID for the optimistic update
        const optimisticTodo = { ...newTodo, id: temporaryId, completed: false };

        // Update local store optimistically
        const updateResult = dispatch(
          todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
            draft.unshift(optimisticTodo); // Add new task to the top of the list
          })
        );

        try {
          const { data } = await queryFulfilled; // Wait for the API response
          dispatch(
            todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
              const index = draft.findIndex((task: ITodo) => task.id === temporaryId);
              if (index !== -1) {
                draft[index] = data; // Replace temporary task with actual API response
              }
            })
          );
        } catch {
          updateResult.undo(); // If API fails, remove the optimistic task
        }
      },
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      // 🚀 Manually update the store instead of waiting for API response
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
            const todo = draft.find((t: ITodo) => t.id === id);
            if (todo) {
              Object.assign(todo, patch); // Update only the modified fields
            }
          })
        );

        try {
          await queryFulfilled; // Try API request
        } catch {
          patchResult.undo(); // Revert changes if API fails
        }
      },
    
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      
         // 🚀 Optimistically remove the task before API response
         async onQueryStarted(id, { dispatch, queryFulfilled }) {
          const deleteResult = dispatch(
            todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
              return draft.filter((task: ITodo) => task.id !== id); // Remove the task from state
            })
          );
  
          try {
            await queryFulfilled; // Ensure API request succeeds
          } catch {
            deleteResult.undo(); // If API fails, restore the deleted task
          }
        },
      


    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi;