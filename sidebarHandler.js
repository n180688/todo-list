const sidebar = document.querySelector(".sidebar");
const toggleSidebarButton = document.querySelector("#toggleSidebar");
const addCategoryButton = document.querySelector("#addCategoryButton");
const newCategoryInput = document.querySelector("#newCategoryInput");
const saveCategoryButton = document.querySelector("#saveCategoryButton");
const categoryList = document.querySelector("#categoryList");

// Функция для сворачивания/разворачивания меню
function toggleSidebar() {
  sidebar.classList.toggle("collapsed");
}

// Функция для отображения поля ввода названия категории
function showNewCategoryInput() {
  newCategoryInput.style.display = "block";
  saveCategoryButton.style.display = "block";
  addCategoryButton.style.display = "none";
  newCategoryInput.focus();
}

// Функция для сохранения новой категории
function saveNewCategory() {
  const categoryName = newCategoryInput.value.trim();
  if (categoryName !== "") {
    addCategoryToList(categoryName);
  }
  hideNewCategoryInput();
}

// Функция для добавления категории в список
function addCategoryToList(categoryName) {
  const li = document.createElement("li");
  li.textContent = categoryName;
  li.dataset.category = categoryName.toLowerCase();
  categoryList.appendChild(li);
}

// Функция для скрытия поля ввода названия категории
function hideNewCategoryInput() {
  newCategoryInput.value = "";
  newCategoryInput.style.display = "none";
  saveCategoryButton.style.display = "none";
  addCategoryButton.style.display = "block";
}

// Event Listeners
toggleSidebarButton.addEventListener("click", toggleSidebar);
addCategoryButton.addEventListener("click", showNewCategoryInput);
saveCategoryButton.addEventListener("click", saveNewCategory);
newCategoryInput.addEventListener("blur", hideNewCategoryInput);