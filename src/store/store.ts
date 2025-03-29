import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { todoApi } from '../services/todo.api';
import filterReducer from './slices/filter.slice';
import todoReducer from './slices/todo.slice';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['filter', 'todo'],
}

const rootReducer = combineReducers({
  [todoApi.reducerPath]: todoApi.reducer,
  filter: filterReducer,
  todo: todoReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;