const container = document.querySelector(".container")
const test = document.querySelector(".test")
const map_link = "images/campus_map.png"
const http = new XMLHttpRequest()

const writeWebsite = () => {
    showMap()
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