const form = document.querySelector(".js-form");

const input = form.querySelector("input");

const greetings = document.querySelector(".js-greetings");



function saveUsername(text) {
    localStorage.setItem("currentUsername", text);
};



function showGreetings(text) {
    greetings.innerText = `Привет, ${text}`;
    greetings.classList.remove("hidden");
};



function submitHandler(event) {
    form.classList.add("hidden");
    event.preventDefault();
    const name = input.value;
    showGreetings(name);
    saveUsername(name);
}



function askForUsername() {
    form.classList.remove("hidden");
    form.addEventListener('submit', submitHandler);
}



function loadUsername(){
   
    const currentUsername = localStorage.getItem("currentUsername");
    

    if (currentUsername === null) {
    askForUsername();
    }
    else {
        showGreetings(currentUsername);
    }
}




function init() {
    loadUsername();
};

init()