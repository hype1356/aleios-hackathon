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
    output += `
        <div class="card" style="transform: rotateX(60deg) perspective(30cm)">
            <img class="card--img" src=${map_link} />
        </div>
        `
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
    var pos1 = 0, pos2 = 0;
    element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos2 - e.clientX;
    pos2 = e.clientX;
    // set the element's new position:
    var str = element.style.transform.split(" ")
    var zDeg = "rotateZ("+pos2+"deg)"
    if(str.length >= 2){
        str[2] = zDeg
    }
    else{
        str.push(zDeg)
    }
    str = str.join(" ")
    console.log(str)
    element.style.transform = str
    console.log(element.style.transform)
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}