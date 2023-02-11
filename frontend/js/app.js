const container = document.querySelector(".container")
const test = document.querySelector(".test")
const map_link = "images/campus_map.png"
const http = new XMLHttpRequest()
var table = document.getElementById("dataTable").getElementsByTagName("tbody")[0]
var tableButtons = document.querySelectorAll("th button")
var data = []
var length = "day";
var type = "electricity"

const writeWebsite = () => {
    showMap()
    dragElement(document.querySelector(".card"))
}

function changeLength(leng) {
    length = leng
    switch(leng) {
        case "day":
            document.getElementById("currLength").innerHTML = "24H"
            break
        case "week":
            document.getElementById("currLength").innerHTML = "7D"
            break
        case "month":
            document.getElementById("currLength").innerHTML = "1M"
            break
        case "year":
            document.getElementById("currLength").innerHTML = "1Y"
            break
    }
    getData()
}

function changeType(typ) {
    type = typ
    getData()
}

function getData() {
    url = "/data/" + type + "/" + length
    http.open("GET", url, true);
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            var values = JSON.parse(http.responseText);
            data = values
            console.log(data);
            table.innerHTML = '';
            for (let i of values) {
                row = table.insertRow()
                celli = row.insertCell()
                cellj = row.insertCell()
                texti = document.createTextNode(i[0])
                textj = document.createTextNode(i[1])
                celli.appendChild(texti)
                cellj.appendChild(textj)
                row.innerHTML += "<div class='bar' style='height: 40px; width: "+(i[1]/values[0][1])*660+"px; background-color: blue'></div>"
            }
        }
    };
    http.send();
}
  
  const resetButtons = (event) => {
    [...tableButtons].map((button) => {
      if (button !== event.target) {
        button.removeAttribute("data-dir");
      }
    });
  };
  

const showMap = () => {
    let output = ""
    let square = `<div class="square"style=height:10px;width:10px;background-color:blue></div>`
    output += `
        <div class="card" style="transform: rotateX(60deg) perspective(300px)">
            <img class="card--img" src=${map_link} />
            <div class="bars">

            </div>
        </div>
        ` //change rot
    container.innerHTML = output
}

/*Mouse Dragging*/

function dragElement(element) {
  var deg = 0
  var pos1 = 0
  var pos2 = 0
  var pos3 = 0
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos2 = e.clientX;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos2 - e.clientX
    pos2 = e.clientX
    pos3 = e.clientY - (container.offsetTop + (container.offsetHeight / 2))
    deg += (pos3 > 0 ? 1 : -1) * pos1
    // set the element's new position:
    var str = element.style.transform.split(" ")
    var zDeg = "rotateZ("+deg+"deg)"
    deg %= 360
    if(str.length >= 2){
        str[2] = zDeg
    }
    else{
        str.push(zDeg)
    }
    str = str.join(" ")
    element.style.transform = str
    console.log(element.style.transform)
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.addEventListener("DOMContentLoaded", writeWebsite, getData());