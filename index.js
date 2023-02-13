const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//the main todo event adder
function addTodo(event) {

    event.preventDefault(); 
    if(todoInput.value === ""){
        alert("please type something");
    }else{
    //to create the todo el to hold name and the buttons
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //to create a new to list
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-Item");
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    saveLocalTodo(todoInput.value);

    //to create a button to click when completed
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class ="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //to create a button to delete/trash
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //to add this to the todolist in the html
    todoList.appendChild(todoDiv);
    todoInput.value = "";

    }
}
 
 function deleteCheck(e) {
    const item = e.target;
    
    if(item.classList[0] === "trash-btn"){
        todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend", () => {
            todo.remove();
        })
    }
    if(item.classList[0] === "complete-btn"){
        todo = item.parentElement;
        todo.classList.toggle('completed');
    }
 }
 function filterTodo(e) {
    let todos = todoList.childNodes;
    for(let i = 0; i < todos.length; i++){
        const todo = todos[i];

        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "Uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
           }
    }
}

function saveLocalTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else { 
         todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos));
}
