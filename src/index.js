import './styles.css';

import { Todo, TodoList } from './js';
import { initTodoList } from './js/components/components';

export const todoList = new TodoList();

initTodoList(todoList.tasks);
// const task = new Todo('Learn JS');

// todoList.newTodo(task);

// todoList.completeTodo(task.id);

// createTaskHTML(task);
