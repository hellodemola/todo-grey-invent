import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { configureStore } from '@reduxjs/toolkit';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { todoApi } from '../services/todo.api';

const baseUrl = 'https://jsonplaceholder.typicode.com/todos';

const mockTodos = [
  { id: 1, title: 'Mock Task 1', completed: false },
  { id: 2, title: 'Mock Task 2', completed: true },
];

const server = setupServer(
  http.get(baseUrl, () => HttpResponse.json(mockTodos)),

  http.post(baseUrl, async ({ request }) => {
    const newTodo = await request.json();
    return HttpResponse.json(Object.assign({}, newTodo, { id: 3 }), { status: 201 });
  }),

  http.patch(`${baseUrl}/:id`, async ({ params, request }) => {
    const updatedFields = await request.json();
    return HttpResponse.json({ id: Number(params.id), ...(updatedFields as object) });
  }),

  http.delete(`${baseUrl}/:id`, ({ params }) => {
    return HttpResponse.json({ success: true, id: Number(params.id) });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('todoApi Service', () => {
  const store = configureStore({
    reducer: { [todoApi.reducerPath]: todoApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(todoApi.middleware),
  });

  it('fetches todos successfully', async () => {
    const result = await store.dispatch(todoApi.endpoints.getTodos.initiate({}));
    expect(result.data).toEqual(mockTodos);
  });

  it('adds a new todo successfully', async () => {
    const newTodo = { title: 'New Task', completed: false };
    const result = await store.dispatch(todoApi.endpoints.addTodo.initiate(newTodo));
    
    expect(result.data).toEqual({ id: 3, ...newTodo });
  });

  it('updates a todo successfully', async () => {
    const updatedTodo = { id: 1, title: 'Updated Task 1', completed: true };
    const result = await store.dispatch(todoApi.endpoints.updateTodo.initiate(updatedTodo));
    
    expect(result.data).toEqual(updatedTodo);
  });

  it('deletes a todo successfully', async () => {
    const result = await store.dispatch(todoApi.endpoints.deleteTodo.initiate(1));
    
    expect(result.data).toEqual({ success: true, id: 1 });
  });
});