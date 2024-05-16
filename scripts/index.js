let data  = 0;
var slideIndex = 0;

fetch("SampleData.json").then(x=>x.json()).then(x=>data = x)
.then(x=>SetupData());


function SetupData(){
    data.HighLightImageNames.forEach(element => {
    document.getElementById('HighlightedStoryArea').innerHTML +=
    '<img class="MainSlide" src="'+element+'.png'+ '" alt="This is highlight image">';
    });

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