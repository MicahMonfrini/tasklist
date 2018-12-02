//  DOM ELEMENTS
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#input-field')
const taskInput = document.querySelector('#task')

//  CALL EVENT LISTENERS FUNCTION
loadEventListeners();

//  EVENT LISTENERS FUNCTION
function loadEventListeners() {
  //add task
  form.addEventListener('submit', addTask);
  // remove task
  taskList.addEventListener('click', removeTask);
}

//  ADD TASK FUNCTION

function addTask(e) {
  // conditional for empty input
  if(taskInput.value === '') {
    alert('Please add a task!');
  } else {

  // create li element for task
  const li = document.createElement('li');
  // cdd class to li
  li.className = 'collection-item';
  // create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  // add class to link element
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);

  // append li to ul
  taskList.appendChild(li);

  // clear input value
  taskInput.value = '';

  // prevent default form submission
  e.preventDefault();

  }
}

// REMOVE TASK FUNCTION

function removeTask(e) {
  // Variable for entire task item (a tag)
  const task = e.target.parentElement;
  // check task for delete item class and remove
  if (task.classList.contains('delete-item')) {
    // confirm y/n
    if (confirm('Are You Sure?')) {
      task.parentElement.remove();
    }
  }
}