import { Todo } from './todo.class';

export class TodoList {
  constructor() {
    this.getTodoListFromLocalStorage();
  }

  getTodoListFromLocalStorage() {
    this.tasks = JSON.parse(localStorage.getItem('todo-list')) || [];
    this.tasks = this.tasks.map(Todo.fromJSON);
  }

  newTodo(todo) {
    this.tasks.push(todo);
    localStorage.setItem('todo-list', JSON.stringify(this.tasks));
  }

  deleteTodo(id) {
    this.tasks = this.tasks.filter((t) => t.id != id);
    localStorage.setItem('todo-list', JSON.stringify(this.tasks));
  }

  completeTodo(id) {
    let todo = this.tasks.find((task) => task.id == id);
    todo.completed = !todo.completed;
    localStorage.setItem('todo-list', JSON.stringify(this.tasks));
    return todo;
  }

  deleteAllCompleted() {
    let completed = this.tasks.filter((t) => t.completed === true);
    this.tasks = this.tasks.filter((t) => t.completed === false);
    localStorage.setItem('todo-list', JSON.stringify(this.tasks));
    return completed;
  }
}
