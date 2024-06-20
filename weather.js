
const API_KEY = 'dfd9afd99abd403b3e9c19812dfa0f57';

const weatherContainer = document.querySelector(".js-weather");

function getWeather(lat, lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weatherContainer.innerText = `${temperature} @ ${place}`;
    })
};


function saveCoords(positionObject){
    localStorage.setItem("coords", JSON.stringify(positionObject));
}



function geoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    const positionObject = {
        latitude,
        longitude
    };
    saveCoords(positionObject);
    getWeather(latitude,longitude);
}



function geoError(){
    console.log("Ошибка определения геопозиции");
}



function askForCoords(){
navigator.geolocation.getCurrentPosition( geoSuccess, geoError);
}



function getCoords() {
    const coords = localStorage.getItem("coords");
    
    if (coords === null) {
        askForCoords();
    }
    else {
        const loadedCoords = JSON.parse(coords);
        getWeather(loadedCoords.latitude, loadedCoords.longitude)
    }
}


function init() {
    getCoords();
};

init();
