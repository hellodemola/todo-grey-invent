import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addTodo, deleteTodo, setTodos, updateTodo } from '../store/slices/todo.slice';
import toast from 'react-hot-toast';
import { RootState } from '../store/store';


const baseUrl = 'https://jsonplaceholder.typicode.com/'

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos?_limit=50',
      async onQueryStarted(_, {dispatch, queryFulfilled, getState}){
        try {
          const todoStore = getState() as RootState;
          if (todoStore.todo.todos.length > 0) return ;

          const { data } = await queryFulfilled;
          dispatch(setTodos(data)); 
        } catch  {
          toast.error('Error fetching todos');
        }
      }
    }),
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),

       async onQueryStarted(newTodo, { dispatch, queryFulfilled }) {
        const temporaryId = Date.now();
        const optimisticTodo = { ...newTodo, id: temporaryId, completed: false };

        dispatch(addTodo(optimisticTodo))

        try {
          const { data } = await queryFulfilled;
          dispatch(updateTodo({ id: temporaryId, updatedFields: data })); 
        } catch {
          dispatch(deleteTodo(temporaryId)); 
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
        dispatch(updateTodo({ id, updatedFields: patch })); 

        try {
          await queryFulfilled; 
        } catch {
          toast.error('Failed to update todo');
        }
      },
    
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        dispatch(deleteTodo(id)); 

        try {
          await queryFulfilled;
        } catch {
          toast.error('Failed to delete todo');
        }
      },
      


    }),
  }),
});

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi;