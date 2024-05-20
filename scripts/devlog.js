const queryString = window.location.search;
// Parse the query string
const urlParams = new URLSearchParams(queryString);
const devlogId = urlParams.get("devlogId");

let devlogData = [];

LoadData();

async function LoadData(){
    var json = await fetch("../SampleData.json").then(x=>x.json());
    devlogData = json.Projects.map(x=>x.Devlogs).reduce((acc,val)=> acc.concat(val),[]).find(x => x.ID == devlogId);
    DisplayData();
}

function DisplayData(){
    document.getElementById("BannerImage").innerHTML += '<img src="../'+devlogData.BannerImageName+'"></img>';

    var textArea = document.getElementById("TextArea");
    
    devlogData.Paragraphs.forEach(paragraph => {
        var html = '<'+paragraph.Type+'>';
        var text = paragraph.Text;
        if(paragraph.ImageSide == 0){
            html += text;
        }
        else{
            var image = '<img src="../'+paragraph.ImageName+'" style="';
            if(paragraph.ImageSide == 1){
                html += image+'float : left;"></img>'+text;
            }
            else if(paragraph.ImageSide == 2){
                html += image+'float : right;"></img>'+text;
            }
            else{

            }
        }
        textArea.innerHTML += html+'</'+paragraph.Type+'>';
    });
}