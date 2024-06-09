let data  = 0;
var slideIndex = 0;

fetch("Data.json").then(x=>x.json()).then(x=>data = x)
.then(x=>SetupData());


function SetupData(){
    showSlides();
}

function showSlides(){
    var slides = document.getElementsByClassName("MainSlide");
    for(var i = 0;i < slides.length;i++){
        slides[i].style.display = "none";
    }

    slides[slideIndex].style.display = "block";

    slideIndex++;
    if(slideIndex >= slides.length){
        slideIndex = 0;
    }

    setTimeout(showSlides,2000);
}