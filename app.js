// UI variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#input-field')
const taskInput = document.querySelector('#task')

//Load all event listeners
loadEventListeners()

//Event listeners function
function loadEventListeners() {
  //Add task
  form.addEventListener('submit', addTask)
}

//Add task

function addTask() {
  
}