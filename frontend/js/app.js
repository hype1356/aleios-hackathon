const container = document.querySelector(".container")
const test = document.querySelector(".test")
const map_link = "images/campus_map.png"
const http = new XMLHttpRequest()
var table = document.getElementById("dataTable")


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
            console.log(values);
            for (i in values) {
                row = table.insertRow()
                celli = row.insertCell()
                cellj = row.insertCell()
                celli.innerHTML("<h3>"+values[i][0]+"</h3>")
                cellj.innerHTML("<h3>"+values[i][1]+"</h3>")
            }
        }
    };
    http.send();
}

const showMap = () => {
    let output = ""
    output += `
        <div class="card" style="transform: rotateX(60deg) perspective(300px)">
            <img class="card--img" src=${map_link} />
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
    pos3 = e.clientY - (element.offsetTop + element.offsetHeight - (element.offsetTop + element.offsetHeight) / 2)
    deg += (pos3 > 0 ? 1 : -1) * pos1
    // set the element's new position:
    var str = element.style.transform.split(" ")
    var zDeg = "rotateZ("+deg+"deg)"
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