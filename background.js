const body = document.querySelector("body");

const images_amount = 3;



function showImage(number){
    const img = new Image();
    img.src = `images/${number+1}.jpg`;
    img.classList.add("bg_image");
    body.prepend(img);
};


function getRandom(){
    const number = Math.floor(Math.random() * images_amount);
    return number;
};



function init(){
    const randomNumber = getRandom();
    showImage(randomNumber);
};


init();