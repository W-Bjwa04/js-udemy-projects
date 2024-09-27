document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#add-btn");
  const inputField = document.querySelector("#todo-input");
  const taskList = document.querySelector("#todo-list");

  // to do task array getting from the local storage 

  let todoTasks = JSON.parse(localStorage.getItem('tasks')) || [];


  

  // load all the task to the dom 
  refresh()


  // refresh the list 

  function refresh(){
    taskList.innerHTML = todoTasks.map((task)=>{
       return  `   
        <li id="${task.id}" data-status="${task.completed}"><p>${task.title}</p><button class="remove-btn"> Delete </button>  
        <button class="complete-btn"> Done </button>
        </li>
        `
    }).join('')
  }




  //function for inserting task to the local storage 
  function addToStorage(){
    localStorage.setItem('tasks',JSON.stringify(todoTasks))
  }

  addBtn.addEventListener("click", (event) => {
    // get the input text from input field
    const inputText = inputField.value.trim();

    // check if the input is empty

    if (inputText === "") {
      return; // do nothing
    }

    // if the input is not empty

    todoTasks.push({
      id: Date.now(),
      title: `${inputText}`,
      completed: false,
    });

    inputField.value = "";
    addToStorage()
    refresh()
  });

  // event bubling or event delegation for deleting and updating 

  taskList.addEventListener('click',(event)=>{

     // get the task id which is clicked 
     const id = Number(event.target.parentNode.id)

    // check if the delete button is clicked

    if(event.target.classList.contains('remove-btn')){
       
        // filter the task array which does not contain this task 

        todoTasks = todoTasks.filter(task => task.id!==id)

        // refresh  the local storage 

        addToStorage()

        // refresh 

        refresh()
        
    }


    // if the mark button is clicked 
    if(event.target.classList.contains("complete-btn")){

        // get that task from task array and set it completed status to true 
        const task = todoTasks.find(task=>task.id===id)
        task.completed=true
        
        // refresh local storagw 

        addToStorage()

        // refresh page 
        refresh()
    }
  })




});
