const queryString = window.location.search;
// Parse the query string
const urlParams = new URLSearchParams(queryString);
const devlogId = urlParams.get("devlogId");

let devlogData = [];
let devlogMax = 0;
let devlogMin = 0;

LoadData();

async function LoadData(){
    var json = await fetch("../Data.json").then(x=>x.json());
    let ids = json.Projects.flatMap(x => x.Devlogs.map(y => y.Id));
    devlogMax = Math.max.apply(Math,ids);
    devlogMin = Math.min.apply(Math,ids);
    devlogData = json.Projects.map(x=>x.Devlogs).reduce((acc,val)=> acc.concat(val),[]).find(x => x.Id == devlogId);
    DisplayData();
}

function DisplayData(){
    document.getElementById("BannerImage").innerHTML += '<img src="../'+devlogData.BannerImageName+'"></img>';

    var textArea = document.getElementById("TextArea");
    var NavigationBar = document.getElementById("NavigationBar");

    textArea.innerHTML += '<h3>' + devlogData.Title + '</h3>';

    devlogData.Paragraphs.forEach(paragraph => {
        var html = '<'+paragraph.Type+'>';
        var text = paragraph.Text;
        if(paragraph.ImageSide == 0){
            html += text;
        }
        else{
            var image = '<img src="../'+paragraph.ImageName+'"';
            if(paragraph.ImageSide == 1){
                html += image+'style="float:left;"></img>'+text;
            }
            else if(paragraph.ImageSide == 2){
                html += image+'style="float:right;"></img>'+text;
            }
            else{
                html = image+' class = "fullWidthImage"></img>';
            }
        }
        textArea.innerHTML += html+'</'+paragraph.Type+'>';
    });
    console.log(devlogId);
    console.log(devlogMax);
    console.log(devlogMin);
    if(devlogId > parseInt(devlogMin)){
        NavigationBar.innerHTML += '<div style="cursor: pointer;" class="leftNav" onclick="window.location = \'devlog.html?devlogId='+(parseInt(devlogId)-1)+ '\'" class="DevlogLinkLeft">Previous devlog</div>';
    }
    else{
        NavigationBar.innerHTML += '<div class="sideNav"></div>';
        
    }
    NavigationBar.innerHTML += '<div style="cursor: pointer;" class="centerNav" onclick="window.location = \'../\'" class="DevlogLinkMainMenu">Home Page </div>';
    if(devlogId < parseInt(devlogMax)){
        NavigationBar.innerHTML += '<div style="cursor: pointer;" class="rightNav" onclick="window.location = \'devlog.html?devlogId='+(parseInt(devlogId)+1)+ '\'" class="DevlogLinkRight">Next devlog</div>';
    }
    else{
        NavigationBar.innerHTML += '<div class="sideNav"></div>';
        
    }
}