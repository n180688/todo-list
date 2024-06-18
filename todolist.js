const todoForm = document.querySelector(".js-todoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-todolist");

const TODOS_KEY = "todos";

let TodosArr = [];




function loadTodos() {
    
    const loaded_todos = localStorage.getItem(TODOS_KEY);

    if (loaded_todos !== null){
        const parsedTodos = JSON.parse(loaded_todos);
        parsedTodos.forEach(function(todo){
            showTodos(todo.name);
        });
    }
    
};



function SaveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(TodosArr));
};



function deleteTodo(event){
    
    todoList.removeChild(event.target.parentNode);
    
    const cleanTodos = TodosArr.filter(function(todo){
    return todo.id != event.target.parentNode.id;
});
    TodosArr = cleanTodos;
    SaveTodos();
};



function showTodos(text)
{
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement("span");
   delBtn.innerHTML = "❌" ;
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
   li.appendChild(delBtn);
   li.appendChild(span);
   li.id = TodosArr.length + 1;
   todoList.appendChild(li);
   
   const ToDoObject = {
       name: text,
       id: TodosArr.length +1
   }
   
   TodosArr.push(ToDoObject);
   SaveTodos();
}




function submitHandler(event){
    event.preventDefault();
    const currValue = todoInput.value;
    showTodos(currValue);
    todoInput.value="";
};




function init() {
    loadTodos();
    todoForm.addEventListener("submit", submitHandler);
};

init();