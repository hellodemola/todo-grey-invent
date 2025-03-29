import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ITodo } from '../../interfaces/todo.interface';

export const selectTodos = (state: RootState) =>
  state.todoApi.queries['getTodos(undefined)']?.data || [];

export const selectFilters = (state: RootState) => state.filter;

export const selectFilteredTodos = createSelector(
  [selectTodos, selectFilters],
  (todos, filters) => {
    return (todos as ITodo[]).filter((todo: ITodo) => {
        if (filters.status === 'completed') return todo.completed;
        if (filters.status === 'pending') return !todo.completed;
        return true; // Show all
      })
      .filter((todo: ITodo) =>
        todo.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
  }
);