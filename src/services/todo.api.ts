import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addTodo, deleteTodo, setTodos, updateTodo } from '../store/slices/todo.slice';

const baseUrl = 'https://jsonplaceholder.typicode.com/'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos?_limit=50',
      async onQueryStarted(_, {dispatch, queryFulfilled}){
        try {
          const { data } = await queryFulfilled;
          dispatch(setTodos(data)); 
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      }
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

        dispatch(addTodo(optimisticTodo))

        try {
          const { data } = await queryFulfilled;
          dispatch(updateTodo({ id: temporaryId, updatedFields: data })); // ✅ Update with real API data
        } catch {
          dispatch(deleteTodo(temporaryId)); // ❌ Remove if API fails
        }
      },
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: rest,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        dispatch(updateTodo({ id, updatedFields: patch })); // ✅ Optimistic UI update

        try {
          await queryFulfilled; // ✅ API request success
        } catch {
          console.error('Failed to update todo');
        }
      },
    
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(deleteTodo(id)); // ✅ Optimistically remove from UI

        try {
          await queryFulfilled; // ✅ API success
        } catch {
          console.error('Failed to delete todo');
        }
      },
      


    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi;