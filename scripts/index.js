let data  = 0;
var slideIndex = 0;

fetch("SampleData.json").then(x=>x.json()).then(x=>data = x)
.then(x=>SetupData());


function SetupData(){
    data.HighLightImageNames.forEach(element => {
    document.getElementById('HighlightedStoryArea').innerHTML +=
    '<img class="MainSlide" src="'+element+ '" alt="This is highlight image">';
    });

    let devlogs = data.Projects.map(x=>x.Devlogs).reduce((acc,val)=> acc.concat(val),[]).slice(0,2);
    console.log(devlogs);

    for(let i = 0;i < devlogs.length;i++){

        let text = '<div class="Description"><h4>'+devlogs[i].Title+'</h4><br><p>'+devlogs[i].ShortDescription+'</p></div>';
        let image = '<img class="ScaledImage" src="' + devlogs[i].HighlightImageName+'">'
        let table = '<tr><div class="DescriptionRow">';
        if(i%2 == 0){
            table += image+text;
        }
        else{
            table += text+image;
        }
        document.getElementById('DevlogTable').innerHTML += table+'</div></tr>';
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

