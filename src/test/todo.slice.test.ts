import { describe, expect, it } from "vitest";
import todoReducer, { addTodo, deleteTodo, setTodos, updateTodo } from "../store/slices/todo.slice";


describe('Todo Slice Reducer', () => {
  it('should set todos from API', () => {
    const initialState = { todos: [] };
    const newTodos = [{ id: 1, title: 'Test Todo', completed: false }];

    const state = todoReducer(initialState, setTodos(newTodos));
    expect(state.todos).toEqual(newTodos);
  });

  it('should add a new todo', () => {
    const initialState = { todos: [] };
    const newTodo = { id: 2, title: 'New Task', completed: false };

    const state = todoReducer(initialState, addTodo(newTodo));
    expect(state.todos).toHaveLength(1);
    expect(state.todos[0]).toEqual(newTodo);
  });

  it('should update an existing todo', () => {
    const initialState = { todos: [{ id: 1, title: 'Old Task', completed: false }] };
    const updatedFields = { title: 'Updated Task', completed: true };

    const state = todoReducer(initialState, updateTodo({ id: 1, updatedFields }));
    expect(state.todos[0].title).toBe('Updated Task');
    expect(state.todos[0].completed).toBe(true);
  });

  it('should delete a todo', () => {
    const initialState = { todos: [{ id: 1, title: 'Task', completed: false }] };

    const state = todoReducer(initialState, deleteTodo(1));
    expect(state.todos).toHaveLength(0);
  });
});