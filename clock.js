const clockContainer = document.querySelector(".js-clock");

const clock = clockContainer.querySelector("h1");


function getTime() {
    
    const date = new Date();
    
    const hours = date.getHours();
    
    const mins = date.getMinutes();
    
    clock.innerText = `${hours < 10 ? `0${hours}` : hours}:${mins < 10 ? `0${mins}` : mins}`;
    
    
};

function init() {
    getTime();
    setInterval(getTime, 10000);
};

init();

