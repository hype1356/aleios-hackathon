const container = document.querySelector(".container")
const test = document.querySelector(".test")
const map_link = "images/campus_map.png"
const http = new XMLHttpRequest()

const writeWebsite = () => {
    showMap()
    dragElement(document.querySelector(".card"))
}

function electricity() {
    
}

const showMap = () => {
    let output = ""
    output += `
        <div class ="card">
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
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
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
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    element.style.transform = 'rotate(${element.offsetTop - pos2}deg)';
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}