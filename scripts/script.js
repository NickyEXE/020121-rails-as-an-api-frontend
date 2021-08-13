const button = document.querySelector("button")
const mainImg = document.querySelector("#main-image")

console.log("button: ", button)
console.log("main image: ", mainImg)

function macavitoggle() {
  mainImg.src = "./assets/macavity.gif"
}

button.addEventListener("click", macavitoggle)
