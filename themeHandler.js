const themeToggle = document.querySelector("#theme-toggle");
const body = document.body;

// Проверяем, есть ли сохраненная тема в localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.checked = savedTheme === 'dark-theme';
}

themeToggle.addEventListener("change", function() {
  if (this.checked) {
    body.classList.add("dark-theme");
    localStorage.setItem('theme', 'dark-theme'); // Сохраняем тему
  } else {
    body.classList.remove("dark-theme");
    localStorage.setItem('theme', ''); // Удаляем тему
  }
});