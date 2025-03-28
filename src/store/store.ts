import { configureStore } from '@reduxjs/toolkit';
import { todoApi } from '../services/todo.api';
import filterReducer from './slices/filter.slice';


export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;