const state = localStorage.getItem('state')
  ? JSON.parse(localStorage.getItem('state')) : [];
const todoList = document.querySelector('#todoList');


function update() {
  localStorage.setItem('state', JSON.stringify(state));
  todoList.innerHTML = '';
  state.forEach((element) => {
    const newPost = `
    <div id=${element.id} class="${element.status}">
      <div class="title-container">
        <h2>${element.title}</h2>
      </div>
      <div class="description-container">
        <p> ${element.description}</p>
      </div>
      <div class="button-container">
        ${
  element.status === 'todo'
    ? `
        <button class="done-btn">Mark as done</button>`
    : ''
}
        <button class="remove-btn">Remove</button>
      </div>
</div>`;
    todoList.innerHTML += newPost;
  });
  setEventListeners();
}

function newTodo() {
  const date = new Date();
  const id = date.getTime();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;

  const newPost = {
    id,
    title,
    description,
    status: 'todo',
  };
  state.unshift(newPost);
  update();
}

function todoDone(id) {
  const index = state.findIndex(todo => todo.id == id);
  if (state[index].status === 'todo') {
    state[index].status = 'done';
  } else {
    state[index].status = 'todo';
  }
  state.push(state.splice(index, 1)[0]);
  update();
}

function removeTodo(id) {
  state.splice(state.findIndex(todo => todo.id == id), 1);
  update();
}


function setEventListeners() {
  const removeButtons = document.querySelectorAll('.remove-btn');
  const doneButtons = document.querySelectorAll('.done-btn');

  removeButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      removeTodo(event.target.parentNode.parentNode.id);
    });
  });
  doneButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      todoDone(event.target.parentNode.parentNode.id);
    });
  });
}

document.querySelector('#submit').addEventListener('click', (event) => {
  event.preventDefault(event);
  newTodo();
});


update();
