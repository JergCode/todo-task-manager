export class Todo {
  static fromJSON({ task, id, completed, createdAt }) {
    let newTask = new Todo(task);

    newTask.id = id;
    newTask.completed = completed;
    newTask.createdAt = new Date().setTime(Date.parse(createdAt));

    return newTask;
  }

  constructor(tarea) {
    this.task = tarea;
    this.id = new Date().getTime();
    this.completed = false;
    this.createdAt = new Date();
  }
}
