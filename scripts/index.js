let data  = 0;
var slideIndex = 0;

fetch("Data.json").then(x=>x.json()).then(x=>data = x)
.then(x=>SetupData());


function SetupData(){
    data.HighlightImageNames.forEach(element => {
    document.getElementById('HighlightedStoryArea').innerHTML +=
    '<img class="MainSlide" src="'+element+ '" alt="This is highlight image">';
    });

    let devlogs = data.Projects.map(x=>x.Devlogs).reduce((acc,val)=> acc.concat(val),[]);

    for(let i = 0;i < devlogs.length;i++){
        let table = '<div style="cursor: pointer;" onclick="window.location = \'Pages/devlog.html?devlogId='+devlogs[i].Id+ '\'" class="DescriptionRow"><h3>Devlog '+devlogs[i].Id+': '+devlogs[i].Title+'</h3>';
        table += '<div class="imgTd"><img src="' + devlogs[i].HighlightImageName+'"></img></div>'+
        '<div class="Description"><p>'+devlogs[i].ShortDescription+'</p></div>';
        document.getElementById('DevlogTable').innerHTML += table+'</div>';
    }

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