const todoForm = document.querySelector(".js-todoForm"); // Remove this line
const todoInput = document.querySelector("#todoInput"); // Remove this line
const deadlineInput = document.querySelector("#deadlineInput"); // Remove this line
const todoList = document.querySelector(".js-todolist");

const TODOS_KEY = "todos";

let TodosArr = [];

// Модальное окно
const addTaskButton = document.querySelector("#addTaskButton");
const taskModal = document.querySelector("#taskModal");
const modalTaskInput = document.querySelector("#modalTaskInput");
const modalDeadlineInput = document.querySelector("#modalDeadlineInput");
const modalAddButton = document.querySelector("#modalAddButton");
const closeBtn = document.querySelector(".close");

function loadTodos() {
  const loaded_todos = localStorage.getItem(TODOS_KEY);

  if (loaded_todos !== null) {
    const parsedTodos = JSON.parse(loaded_todos);
    TodosArr = parsedTodos;
    sortTodos(); // Сортируем задачи после загрузки
    parsedTodos.forEach(function (todo) {
      showTodos(todo.name, todo.id, todo.checked, todo.deadline);
    });
  }
}

function SaveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(TodosArr));
}

function deleteTodo(event) {
  const li = event.target.parentNode;
  todoList.removeChild(li);

  const cleanTodos = TodosArr.filter(function (todo) {
    return todo.id !== parseInt(li.id);
  });
  TodosArr = cleanTodos;
  SaveTodos();
}

function toggleTodo(event) {
    const li = event.target.parentNode;
    const todoId = parseInt(li.id);
  
    TodosArr.forEach(function (todo) {
      if (todo.id === todoId) {
        todo.checked = !todo.checked;
      }
    });
  
    SaveTodos();
    sortTodos(); // Сортируем после переключения чекбокса
    rerenderTodoList(); // Перерисовываем список
  }

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day}.${month} ${hours}:${minutes}`;
}

function showTodos(text, id, checked = false, deadline = null) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const checkBox = document.createElement("input");
  const deadlineSpan = document.createElement("span");

  checkBox.type = "checkbox";
  checkBox.checked = checked;
  checkBox.addEventListener("change", toggleTodo);

  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTodo);

  const span = document.createElement("span");
  span.innerText = text;

  if (deadline) {
    deadlineSpan.innerText = `Дедлайн: ${formatDate(deadline)}`; // Используем formatDate
  }
  deadlineSpan.classList.add("deadline");

  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(deadlineSpan);
  li.appendChild(delBtn);
  li.id = id;
  todoList.appendChild(li);
}

// Функция для добавления задачи из модального окна
function addTodoFromModal() {
    const currValue = modalTaskInput.value.trim();
    const deadlineValue = modalDeadlineInput.value;
  
    if (currValue === "") {
      return;
    }
  
    if (deadlineValue) {
      const deadlineDate = new Date(deadlineValue);
      const now = new Date();
      if (deadlineDate < now) {
        alert("Нельзя устанавливать дедлайн на прошедшую дату!");
        return; // Прерываем добавление задачи
      }
    }
  
    const newId = TodosArr.length > 0 ? TodosArr[TodosArr.length - 1].id + 1 : 1;
  
    const ToDoObject = {
      name: currValue,
      id: newId,
      checked: false,
      deadline: deadlineValue,
    };
  
    TodosArr.push(ToDoObject);
    sortTodos(); // Сортируем после добавления
    SaveTodos();
    rerenderTodoList();
    modalTaskInput.value = "";
    modalDeadlineInput.value = "";
    taskModal.style.display = "none";
    modalAddButton.disabled = true; // Disable the add button again
  };

// Функция для сортировки задач по дедлайну
function sortTodos() {
    TodosArr.sort((a, b) => {
      if (a.checked && !b.checked) return 1; // Выполненные вниз
      if (!a.checked && b.checked) return -1; // Не выполненные вверх
  
      if (!a.deadline && !b.deadline) return 0;
      if (!a.deadline) return 1;
      if (!b.deadline) return -1;
  
      const dateA = new Date(a.deadline);
      const dateB = new Date(b.deadline);
      return dateA - dateB;
    });
  }
  
// Функция для перерисовки списка задач
function rerenderTodoList() {
  todoList.innerHTML = ""; // Очищаем список
  TodosArr.forEach(function (todo) {
    showTodos(todo.name, todo.id, todo.checked, todo.deadline);
  });
}
// Event Listeners
addTaskButton.addEventListener("click", function () {
  taskModal.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  taskModal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == taskModal) {
    taskModal.style.display = "none";
  }
});

modalTaskInput.addEventListener("input", function () {
  modalAddButton.disabled = this.value.trim() === "";
});

modalAddButton.addEventListener("click", () => {
  addTodoFromModal();
  rerenderTodoList(); // Перерисовываем список после добавления
});

function init() {
  loadTodos();
}

init();