const clockContainer = document.querySelector(".js-clock");

const clock = clockContainer.querySelector("h1");


function getTime() {
    
    const date = new Date();
    
    const hours = date.getHours();
    
    const mins = date.getMinutes();
    
    const seconds = date.getSeconds();
    
    
    if (mins < 10) {
    clock.innerText = `${hours}:0${mins}`;}
    else {
        clock.innerText = `${hours}:${mins}`;
    }
    
};

function init() {
    getTime();
    setInterval(getTime, 10000);
};

init();

