console.log("INEFFABLE!")

const body = document.querySelector("body")
const form = document.querySelector("form")
const cats = []

adapter.getAllCats().then(renderCats)

function renderCats(cats){
  const catsList = document.createElement("div")
  body.appendChild(catsList)
  catsList.outerHTML = '<div class="cats-list">'
  cats.forEach(renderCat)
  document.querySelector(".cats-list").addEventListener("click", handleClick)
}

function renderCat(cat){
  document.querySelector(".cats-list").innerHTML += `
  <div class="cat-card" data-id=${cat.id}>
    ${generateCatHTML(cat)}
  </div>`
  cats.push(cat)
}

function generateCatHTML(cat){
  const { image, name, description, actor, teamName, tip } = cat
  return `
  <img src=${image} alt=${name}>
  <p><strong>${name}</strong></p>
  <p>${description}</p>
  <p>Played by ${actor}</p>
  <p>Team: ${teamName}</p>
  <p>${actor} has $${tip} in tips!</p>
  <div class="tip cat-button" data-tip=${tip}>Tip ${actor} $10.</div>
  <div class="update cat-button" data-tip=${tip}>Edit ${name}.</div>
  <div class="delete cat-button">Vanish ${name} to the barge in the Thames!</div>
  `
}

const findCat = (id) => cats.find(cat => cat.id === parseInt(id))

const findCatDiv = (id) => document.querySelector(`[data-id='${id}']`)

function handleClick(e){
  if (e.target.classList.contains("cat-button")){
    const catCard = e.target.closest(".cat-card")
    const id = catCard.dataset.id
    if (e.target.classList.contains("tip")){
      const tip = parseInt(e.target.dataset.tip)
      adapter.tipCat(id, tip + 10).then(cat => catCard.innerHTML = generateCatHTML(cat))
    } else if (e.target.classList.contains("delete")){
      adapter.deleteCat(id).then(() => catCard.remove())
    } else if (e.target.classList.contains("update")){
      form.dataset.catId = id
      const cat = findCat(id)
      form.name.value = cat.name
      form.actor.value = cat.actor
      form.teamName.value = cat.teamName
      form.description.value = cat.description
      form.image.value = cat.image
      form.submit.value = `Edit ${cat.name}`
      form.scrollIntoView()
      document.querySelector("h1").innerText = `Edit ${cat.name}`
    }
  }
}

document.querySelector("form").addEventListener("submit", handleSubmit)

function handleSubmit(e){
  e.preventDefault()
  const form = e.target
  const cat = {
    name: form.name.value,
    actor: form.actor.value,
    team_name: form.teamName.value,
    description: form.description.value,
    image: form.image.value
  }
  if (form.dataset.catId){
    adapter.updateCat(form.dataset.catId, cat).then(cat => {
      findCatDiv(cat.id).innerHTML = generateCatHTML(cat)
      cats.splice(cats.findIndex(oldCat => cat.id == oldCat.id), 1, cat)
      resetForm()
    })
  }
  else {
    adapter.createCat(cat).then(renderCat)
    form.reset()
  }
}

function resetForm(){
  form.reset()
  form.removeAttribute("data-cat-id")
  form.submit.value = "Add your Cat!"
  document.querySelector("h1").innerText = "Add a New Cat!"
}

// renderCats(cats)

// function renderCat(cat){
//   const catsList = document.querySelector(".cats-list")

//   const catCard = document.createElement("div")
//   catCard.classList.add("cat-card")

//   const img = document.createElement("img")
//   img.src = cat.image
//   img.alt = cat.name

//   const name = document.createElement("p")
//   name.innerText = cat.name
//   name.style.fontWeight = "bold"

//   const description = document.createElement("p")
//   description.innerText = cat.description

//   const actor = document.createElement("p")
//   actor.innerText = "Played by " + cat.actor

//   catsList.appendChild(catCard)
//   catCard.append(img, name, description, actor)
//   catElements.push(catCard)
// }
