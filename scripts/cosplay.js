document.querySelector("button").addEventListener("click", () =>{
  addDog()
})
const dogsList = document.querySelector(".dogs")

let dog

function addDog(){
  fetch("https://www.google.com/")
  .then(resp => resp.json())
  .then(resp => {
    console.log(resp)
    renderDog(resp.message)})
}

function renderDog(dog){
  dogsList.innerHTML += `<div><img src=${dog} alt="DOG"/></div>`
}

function sleep(time) {
  const start = new Date()
  while (new Date() - start < time) { }
}
console.log("before timeout")
setTimeout(() => console.log("Speed Racer"), 0)
setTimeout(() => console.log("Racer X"), 0)
console.log("after timeout")
let i = 0
