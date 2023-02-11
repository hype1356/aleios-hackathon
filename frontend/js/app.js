const container = document.querySelector(".container")
const map_link = "images/campus_map.png"

const writeWebsite = () => {
    showMap()
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

document.addEventListener("DOMContentLoaded", writeWebsite)