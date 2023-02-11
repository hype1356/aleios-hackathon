const container = document.querySelector(".container")
const test = document.querySelector(".test")
const map_link = "images/campus_map.png"

const writeWebsite = () => {
    showMap()
    writeTest()
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

const writeTest = () => {
    let output = ""
    output += "<p>FETCH TEXT IN HERE</p>"
    test.innerHTML = output

}
document.addEventListener("DOMContentLoaded", writeWebsite)