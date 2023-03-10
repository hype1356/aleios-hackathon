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
    showMap()
    getData()
    dragElement(document.querySelector(".card"))
}

function changeLength(leng) {
    length = leng
    switch(leng) {
        case "day":
            document.getElementById("currLength").innerHTML = `24H ${type}`
            break
        case "week":
            document.getElementById("currLength").innerHTML = `7D ${type}`
            break
        case "month":
            document.getElementById("currLength").innerHTML = `1M ${type}`
            break
        case "year":
            document.getElementById("currLength").innerHTML = `1Y ${type}`
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
    changeLength(length)
    getData()
}

const getData = () => {
    url = "/data/" + type + "/" + length
    http.open("GET", url, true);
    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
            var total = 0;
            var values = JSON.parse(http.responseText);
            data = values
            table.innerHTML = '';
            for (let i of values) {
                total += parseInt(i[1])
                row = table.insertRow()
                celli = row.insertCell()
                cellj = row.insertCell()
                texti = document.createTextNode(i[0])
                textj = document.createTextNode(i[1])
                celli.appendChild(texti)
                cellj.appendChild(textj)
                var fractional = (i[1]-values[values.length-1][1]+1)/(values[0][1]-values[values.length-1][1]+1)
                var colourPatttern = parseInt(fractional * 510)
                if (colourPatttern < 256)
                {                  
                  var colour = `#${colourPatttern.toString(16).padStart(2,"0")}FF00`;
                }
                else{
                  var colour = `#FF${(255 - (colourPatttern - 255)).toString(16).padStart(2,"0")}00`;
                }
                row.innerHTML += "<div class='bar' style='height: 40px; width: "+fractional*660+`px; background-color: ${colour}'></div>`
                var current_circle = document.querySelector(".circle"+i[0]);
                current_circle.style.backgroundColor = `${colour}`;
                current_circle.style.height = (250 * fractional)+"px";
                current_circle.style.width = "20px";
                current_circle.style.transformOrigin = `50% 100%`
                current_circle.style.marginLeft = "-10px"
                current_circle.style.marginTop = (-(250 * fractional))+"px"
                console.log(current_circle.style.transform)
                if(current_circle.style.transform === "") current_circle.style.transform = "rotateZ(0deg)  scale(1.0,1.0)"
                current_circle.style.zIndex = zIndexCalc(current_circle)
            }
            var average = Math.round(total/values.length)
            document.getElementById("stats").innerHTML = `Average: ${average}     Total: ${total}`
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
            <img class="card--img" style="z-index: -1000" src=${map_link} \>
            <div class="circles">${circles}</div>
            </img>
        </div>
        <input type="button" value="Toggle Heatmap" onclick="toggleHeatmap()"/>
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
    return `<div class="circle${label} heatcircle" style="left:${x}px;top:${y}px;"></div>`
}

function toggleHeatmap () {
    const e = document.querySelector(".circles")
    if(e.style.display == "none"){
        e.style.display = "inline"
    }
    else{
        e.style.display = "none"
    }
}

/*Mouse Dragging*/

function dragElement(element) {
  var degZ = 0
  var degX = 0
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
    degZ += (pos3 > 0 ? 1 : -1) * pos1
    degX += (pos6 < 0 ? 1 : -1) * pos4
    // set the element's new position:
    var str = element.style.transform.split(" ")
    var xDeg = "rotateX("+degX+"deg)"
    var zDeg = "rotateZ("+degZ+"deg)"
    degZ %= 360
    degX = Math.max(degX, 10)
    degX = Math.min(degX, 80)
    str[0] = xDeg
    if(str.length >= 2){
        str[2] = zDeg
    }
    else{
        str.push(zDeg)
    }
    str = str.join(" ")
    element.style.transform = str
    var listOfCircles = document.querySelectorAll(".heatcircle")
    for(var e of listOfCircles) {
      e.style.zIndex = zIndexCalc(e)
      var oldTransform = e.style.transform.split("  ")
      var zDegCirc = "rotateZ("+(-degZ)+"deg)"
      var scale = "scale(1.0,"+(2 ** ((degX)/10)/80)+")"
      oldTransform[0] = zDegCirc
      oldTransform[1] = scale
      e.style.transform = oldTransform.join("  ")
    }
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function zIndexCalc (e) {
  return Math.round(-container.getBoundingClientRect().top + e.getBoundingClientRect().top + e.getBoundingClientRect().height)
}

document.addEventListener("DOMContentLoaded", writeWebsite);