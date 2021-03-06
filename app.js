//  DOM ELEMENTS
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//  CALL EVENT LISTENERS FUNCTION
loadEventListeners();

//  EVENT LISTENERS FUNCTION
function loadEventListeners() {
  // retreive tasks from local storage on DOM load
  document.addEventListener('DOMContentLoaded', getTasks)
  // add task
  form.addEventListener('submit', addTask);
  // remove individual task
  taskList.addEventListener('click', removeTask);
  // clear all tasks
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks
  filter.addEventListener('keyup', filterTasks);
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

  // store task in local storage
  storeTask(taskInput.value);

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
      // remove from DOM
      task.parentElement.remove();

      // remove from LS
      removeFromLS(task.parentElement);
    }
  }
}

// REMOVE FROM LS FUNCTION

function removeFromLS(taskItem) {
  // initialize tasks variable
  let tasks;
  // check to see if there are any tasks in LS
  if (localStorage.getItem('tasks') === null) {
    // if not, set tasks to an empty array
    tasks = [];
  } else {
    // if so, parse the tasks (stored as strings) and set tasks to whatever is in LS 
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // loop through tasks in LS
  tasks.forEach((task, index) => {
    // check to see if the taskItem selected for removal matches the current iteration
    if (taskItem.textContent === task) {
      // if so, remove that task from the tasks array
      tasks.splice(index, 1);
    }
  })

  // update tasks array in local storage (must convert into a string)
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// CLEAR TASKS FUNCTION

function clearTasks() {

  // *OPTION 1* - while loop (better performance)
  
  // confirm y/n
  if (confirm('Delete all tasks?')) {
    // loop through taskList as long as an item remains
    while (taskList.firstChild) {
      // remove items
      taskList.removeChild(taskList.firstChild);
      // Clear all tasks from LS
      clearFromLS()
    }
  }

  // *OPTION 2* - innerHTML (less code)
  // set innerHTML to empty string
  // taskList.innerHTML = '';
}

// CLEAR FROM LS FUNCTION

function clearFromLS() {
  localStorage.clear();
}

// FILTER TASKS FUNCTION

function filterTasks(e) {
  // input text
  const text = e.target.value.toLowerCase();
  
  // loop over each task in the list
  document.querySelectorAll('.collection-item').forEach((task) => {

    // text content of each task
    const item = task.textContent;
    // check for any match between input text and task text
    // show tasks that match
    if (item.toLowerCase().indexOf(text) !== -1) {
      task.style.display = 'block';
    // hide tasks that don't match
    } else {
      task.style.display = 'none';
    }
  })
}

// STORE TASK FUNCTION

function storeTask(task) {
  // initialize tasks variable
  let tasks;
  // check to see if there are any tasks in local storage
  if (localStorage.getItem('tasks') === null) {
    // if not, set tasks to an empty array
    tasks = [];
  } else {
    // if so, parse the tasks (stored as strings) and set tasks to whatever is in LS
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // push the new task onto the tasks array
  tasks.push(task);

  // update tasks array in local storage (must convert into a string)
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// GET TASKS FUNCTION

function getTasks(){
  // initialize tasks variable
  let tasks;
  // check to see if there are any tasks in LS
  if (localStorage.getItem('tasks') === null) {
    // if not, set tasks to an empty array
    tasks = [];
  } else {
    // if so, parse the tasks (stored as strings) and set tasks to whatever is in LS 
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // loop through tasks in LS and create DOM elements for each one
  tasks.forEach((task) => {
    // create li element for task
    const li = document.createElement('li');
    // cdd class to li
    li.className = 'collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(task));
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
  })
}
