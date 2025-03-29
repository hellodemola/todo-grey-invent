import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITodo } from '../../interfaces/todo.interface';

interface TodoState {
  todos: ITodo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<ITodo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.todos.unshift(action.payload);
    },
    updateTodo: (state, action: PayloadAction<{ id: number; updatedFields: Partial<ITodo> }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) Object.assign(todo, action.payload.updatedFields);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;