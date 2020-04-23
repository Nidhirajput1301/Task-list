// define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners(){
  //DOM load event
  document.addEventListener('DOMContentLoaded' , getTasks);
  // add task event
  form.addEventListener('submit' , addTask);
  // remove task event
  taskList.addEventListener('click' , removeTask);
  // clear task event
  clearBtn.addEventListener('click' , clearTasks);
  // fliter tasks event
  filter.addEventListener('keyup' , filterTasks);
}

// get tasks from LS
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // add class
    li.className ='collection-item';
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link element
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
     link.innerHTML= '<i class="fa fa-remove"></i>';
     // append the link to li
     li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);
  });
}

// add task
function addTask(e){
  if(taskInput.value === ''){
    alert('Add a Task');
  }

// Create li element
const li = document.createElement('li');
// add class
li.className ='collection-item';
// create text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
// create new link element
const link = document.createElement('a');
// add class
link.className = 'delete-item secondary-content';
// add icon html
link.innerHTML= '<i class="fa fa-remove"></i>';
// append the link to li
li.appendChild(link);

//append li to ul
taskList.appendChild(li);

// store in LS
storeTaskInLocalStorage(taskInput.value);

//clear input
taskInput.value = '';

e.preventDefault();
}

// store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks' , JSON.stringify(tasks));
}

// remove task
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')){
      e.target.parentElement.parentElement.remove();

      // remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
 }

 // remove from LS
 function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      task.splice(index, 1);
  }
 });

 localStorage.setItem('tasks' , JSON.stringify(tasks));
}

 //clear tasks
 function clearTasks() {
   //taskList.innerHTML = '';

   // faster
   while(taskList.firstChild){
     taskList.removeChild(taskList.firstChild);
   }

   // https://jspref.com/innerhtml-vs-removechild

   // clear from LS
    clearTasksFromLocalStorage();
}

// clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

 // filter tasks
 function filterTasks(e){
   const text = e.target.value.toLowerCase();

   document.querySelectorAll('.collection-item').forEach(function(task){
     const item = task.firstChild.textContent;
     if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
     }else {
        task.style.display = 'none';
     }
   });
 }