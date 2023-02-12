const container = document.querySelector(".container")
const test = document.querySelector(".test")
const map_link = "images/campus_map.png"
const http = new XMLHttpRequest()
var table = document.getElementById("dataTable").getElementsByTagName("tbody")[0]
var tableButtons = document.querySelectorAll("th button")
var data = []
var length = "day";
var type = "electricity"
var coordDict = {}

const writeWebsite = () => {
    getCoord()
    getData()
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

const getCoord = () => {
  http.open("GET", "images/coordinate_mappings", false);
  http.onreadystatechange = function() {
    if (http.readyState === XMLHttpRequest.DONE && http.status===200) {
      lines = http.responseText.split("\n")
      for (x of lines) {
        temp = x.split(", ")
        coordDict[temp[0]] = [temp[1], temp[2].split("\r")[0]]
      }
    }
  }
  http.send()
}

function changeType(typ) {
    type = typ
    switch (typ) {
      case "electricity":
      case "gas":
        document.getElementById("Usage").innerHTML = "Energy Usage (kWh)"
        break
      case "water":
        document.getElementById("Usage").innerHTML = "Water Usage (L)"
        break
    }
    getData()
}

const getData = () => {
    url = "/data/" + type + "/" + length
    http.open("GET", url, true);
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            var values = JSON.parse(http.responseText);
            data = values
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
    let circles = getCircles()
    output += `
        <div class="card" style="transform: rotateX(60deg) perspective(300px)">
            <img class="card--img" src=${map_link} \>
            <div class="circles">${circles}</div>
            </img>
        </div>
        ` //change rot
    container.innerHTML = output
}

const getCircles = () => {
    var output = ""
    for(var key in coordDict){
        var data = coordDict[key]
        output += getCircle(key, data[0], data[1]) + "\n"
    }
    return output
}

const getCircle = (label, x, y) => {
    return `<div class="${label}circle heatcircle" style="left:${x}px;top:${y}px"></div>`
}

/*Mouse Dragging*/

function dragElement(element) {
  var deg = 0
  var pos1 = 0
  var pos2 = 0
  var pos3 = 0
  var pos4 = 0
  var pos5 = 0
  var pos6 = 0
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos2 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos2 - e.clientX
    pos2 = e.clientX
    pos4 = pos5 - e.clientY
    pos5 = e.clientY
    pos3 = pos5 - (container.offsetTop + (container.offsetHeight / 2))
    pos6 = pos2 - (container.offsetLeft + (container.offsetWidth / 2))
    deg += (pos3 > 0 ? 1 : -1) * pos1
    deg += (pos6 < 0 ? 1 : -1) * pos4
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
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.addEventListener("DOMContentLoaded", writeWebsite);