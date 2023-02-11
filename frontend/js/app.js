const container = document.querySelector(".container")
const test = document.querySelector(".test")
const map_link = "images/campus_map.png"
const http = new XMLHttpRequest()
var table = document.getElementById("dataTable")
var data = []


const writeWebsite = () => {
    showMap()
    dragElement(document.querySelector(".card"))
}

function getData(type, length) {
    url = "/data/" + type + "/" + length
    http.open("GET", url, true);
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            var values = JSON.parse(http.responseText);
            data = values
            console.log(data);
            table.innerHTML = `<thead>
            <th><h3>Buliding</h3></th>
            <th><h3>Energy Usage</h3></th>
        </thead>`;
            for (let i of values) {
                row = table.insertRow()
                celli = row.insertCell()
                cellj = row.insertCell()
                texti = document.createTextNode(i[0])
                textj = document.createTextNode(i[1])
                celli.appendChild(texti)
                cellj.appendChild(textj)
            }
        }
    };
    http.send();
}

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

const writeTest = (instring) => {
    let output = ""
    output += "<p>"+instring+"</p>"
    test.innerHTML = output
}
document.addEventListener("DOMContentLoaded", writeWebsite)

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