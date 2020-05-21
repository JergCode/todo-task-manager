import { Todo } from '../';
import { todoList } from '../../index';

// HTML Refs
const todoListSelector = document.querySelector('.todo-list');
const todoInputSelector = document.querySelector('.new-todo');
const clearCompletedSelector = document.querySelector('.clear-completed');
const filterSelector = document.querySelector('.filters');
const todoCountSelector = document
  .querySelector('.todo-count')
  .querySelector('strong');
const filterButtonSelector = filterSelector.querySelectorAll('.filtro');

export const createTaskHTML = (todo) => {
  const taskHTML = `
  <li class="${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.completed ? 'checked' : ''
            }>
            <label>${todo.task}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
  const div = document.createElement('li');
  div.innerHTML = taskHTML;

  todoListSelector.append(div.firstElementChild);
  return div.firstElementChild;
};

export const initTodoList = (todoList) => {
  // todoList.forEach((todo) => createTaskHTML(todo));   // Cuando el forech usa solo 1 elemento y llama a una función
  // que consume este elemento como argumento, pordemos obviar y usar la siguiente sintaxis.
  todoList.forEach(createTaskHTML);
  modifyTodoCount();
};

const modifyTodoCount = (count) => {
  if (!count) {
    count = todoListSelector.childElementCount;
  }
  todoCountSelector.innerHTML = count;
};

//Event Listeners
todoInputSelector.addEventListener('keyup', (event) => {
  //   let value = event.target.value + '';
  if (event.keyCode === 13 && todoInputSelector.value.length > 3) {
    let newTask = new Todo(todoInputSelector.value);
    todoList.newTodo(newTask);
    createTaskHTML(newTask);
    todoInputSelector.value = '';
  }
});

todoListSelector.addEventListener('click', (event) => {
  const elName = event.target.localName;
  const el = event.target.parentElement.parentElement;
  const id = el.getAttribute('data-id');

  if (elName.includes('input')) {
    todoList.completeTodo(id);
    el.classList.toggle('completed');
  } else if (elName.includes('button')) {
    todoList.deleteTodo(id);
    el.remove();
  }
});

clearCompletedSelector.addEventListener('click', () => {
  let completedList = todoList.deleteAllCompleted();

  for (let i = todoListSelector.childElementCount - 1; i >= 0; i--) {
    let child = todoListSelector.children[i];
    for (let c of completedList) {
      if (child.getAttribute('data-id') == c.id) {
        child.remove();
      }
    }
  }
});

filterSelector.addEventListener('click', (event) => {
  const filter = event.target.text;
  if (!filter) return;

  filterButtonSelector.forEach((filterBtn) => {
    filterBtn.classList.remove('selected');
  });
  event.target.classList.add('selected');

  let count = 0;
  for (const e of todoListSelector.children) {
    e.classList.remove('hidden');

    switch (filter) {
      case 'All':
        count++;
        break;
      case 'Pendient':
        if (e.className.includes('completed')) {
          e.classList.add('hidden');
        } else {
          count++;
        }
        break;
      case 'Completed':
        if (!e.className.includes('completed')) {
          e.classList.add('hidden');
        } else {
          count++;
        }
    }
  }

  modifyTodoCount(count);
});
