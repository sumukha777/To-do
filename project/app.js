//Define UI Variables

const form = document.querySelector("#task-form"); //task-form is an ID hence '#'
const taskList = document.querySelector(".collection"); //collection is a class, hence '.'
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Instead of using the event listeners in global scope, we'll use a function to load all the event listeners

//Load all event listeners
loadEventListeners();

//Function to load all event listeners

function loadEventListeners() {

//DOM load event(to load all DOM events in UI)
document.addEventListener('DOMContentLoaded', getTasks);

  //Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  //clear task events
  clearBtn.addEventListener("click", clearTasks);

  //Add event Listener
  filter.addEventListener("keyup", filterTasks);
}

//Get tasks from LS
function getTasks(){
  if(localStorage.getItem('tasks') === null) {
    tasks = [];

  } else {

    tasks = JSON.parse(localStorage.getItem('tasks'));
 
  }// checks for presence of tasks

  //checks for tasks in a loop
  tasks.forEach(function(task){
    //create li element
  const li = document.createElement("li");

  //Add className to li
  li.className = "collection-item";

  //Now, create a text node and append the text node to li
  li.appendChild(document.createTextNode(task)); //instead of taskInput.value, we use task since the value coming from this function is task
  //as one of the collection item(child node)

  //Now, create a link item to link the collection item
  const link = document.createElement("a");

  //add a class to link element
  link.className = "delete-item secondary-content";

  //Add HTML icon
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Finally, append the link element to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);
  });

}

//Add Task Function
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task!");
  }

  //create li element
  const li = document.createElement("li");

  //Add className to li
  li.className = "collection-item";

  //Now, create a text node and append the text node to li
  li.appendChild(document.createTextNode(taskInput.value)); //taskInput is an ID which accepts the tasks entered and this is appended to li
  //as one of the collection item(child node)

  //Now, create a link item to link the collection item
  const link = document.createElement("a");

  //add a class to link element
  link.className = "delete-item secondary-content";

  //Add HTML icon
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Finally, append the link element to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //After appending, store the text in local storage using a function given below

  storeTaskInLocalStorage(taskInput.value);//whatever is typed in task input, it will be stored in the storeTaskInLocalStorage() function



  //to clear the input, leave it empty
  taskInput.value = "";

  e.preventDefault();
}


//store task

function storeTaskInLocalStorage(task){
  let tasks;

  if(localStorage.getItem('tasks') === null) {
    tasks = [];

  } else {

    tasks = JSON.parse(localStorage.getItem('tasks'));
 
  }

  tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task list
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      e.preventDefault();

      //Remove task from LocalStorage 
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
      //A function to remove task from UI
    }
  }
}

//Remove from LocalStorage
function removeTaskFromLocalStorage(){
  if(localStorage.getItem('tasks') === null) {
    tasks = [];

  } else {

    tasks = JSON.parse(localStorage.getItem('tasks'));
 
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });//checks for task in local storage, if it is present, it will be spliced at index no 1

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks

function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild

  //clear Tasks from LocalStorage
  clearTasksFromLocalStorage();
}

//clear tasks from LS
function clearTasksFromLocalStorage(){
  localStorage.clear(); 
}

//Filter task

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } 
    
    else {
      task.style.display = "none";
    }
  });


  e.preventDefault();
}

// //Get filter
// let filterInput = document.getElementById("#filter");

// //A function for filterNames
// function filterNames() {
//   //Get input value
//   let filterValue = document.getElementById("filter").value.toUpperCase();

//   //Get ul names
//   let ul = document.getElementById("names");

//   //Get lis from ul
//   let li = ul.querySelectorAll("li.collection-item");

//   //Loop through collection-item lis

//   for (let i = 0; i < li; i++) {
//     let a = li[i].getElementsByTagName("a")[0];

//     //If it matches,
//     if (a.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
//       li[i].style.display = "";
//     } else {
//       li[i].style.display = "none";
//     }
//   }
// }

//To stop copying the text on the web page, use this
// document.oncontextmenu = new Function("return false;");
