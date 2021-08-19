console.log("INEFFABLE!")

const body = document.querySelector("body")
const form = document.querySelector("form")
const cats = []

adapter.fetchCats().then(renderCats)

function renderCats(cats){
  const catsList = document.createElement("div")
  body.appendChild(catsList)
  catsList.outerHTML = '<div class="cats-list">'
  cats.forEach(renderCat)
  addEventListeners()
}

function renderCat(cat){
  const catsList = document.querySelector(".cats-list")

  catsList.innerHTML += `
  <div class="cat-card" data-id=${cat.id}>
  ${generateInnerHTML(cat)}
  </div>`
  cats.push(cat)
}

function generateInnerHTML(cat){
  const {image, name, description, actor, teamName, tip} = cat
  return `<img src=${image} alt=${name}/>
  <p><strong>${name}</strong></p>
  <p>${description}</p>
  <p>Played by ${actor}</p>
  <p>Team: ${teamName}</p>
  <p class="tip-amount">${actor} has $${tip} in tips!</p>
  <div class="tip cat-button" data-tip=${tip}>Tip Himself $10.</div>
  <div class="update cat-button" data-tip=${tip}>Update Cat.</div>
  <div class="delete cat-button">Vanish Garfield to the barge in the Thames!</div>`
}

function addEventListeners(){
  document.querySelector("form").addEventListener("submit", handleSubmit)
  document.querySelector(".cats-list").addEventListener("click", handleClick)
}

function handleClick(e){
  const catCard = e.target.closest(".cat-card")
  const id = catCard.dataset.id
  if (e.target.classList.contains("tip")){
    const tip = parseInt(e.target.dataset.tip)
    adapter.tipCat(id, tip + 10).then(cat => {
      e.target.dataset.tip = cat.tip
      e.target.closest(".cat-card").querySelector(".tip-amount").innerText = `${cat.actor} has $${cat.tip} in tips!`
    })
  } else if (e.target.classList.contains("delete")){
    adapter.deleteCat(id).then(() => catCard.remove())
  } else if (e.target.classList.contains("update")){
    const cat = getCatById(id)
    populateEditForm(cat)

  }
}

function getCatById(id){
  return cats.find(cat => cat.id == id)
}

function getCatElementById(id){
  return document.querySelector(`[data-id='${id}']`)
}

function populateEditForm(cat){
  form.dataset.id = cat.id
  form.name.value = cat.name
  form.actor.value = cat.actor
  form.teamName.value = cat.teamName
  form.description.value = cat.description
  form.image.value = cat.image
  form.scrollIntoView()
  document.querySelector("h1").innerText = `Edit ${cat.name}!`
}


function handleSubmit(e){
  e.preventDefault()
  const cat = {
    name: form.name.value,
    actor: form.actor.value,
    team_name: form.teamName.value,
    description: form.description.value,
    image: form.image.value
  }
  if (form.dataset.id){
    adapter.updateCat(form.dataset.id, cat).then(cat => updateCat(cat))
  } else {
    adapter.addCat(cat).then(renderCat)
    form.reset()
  }
}

function updateCat(cat){
  getCatElementById(cat.id).innerHTML = generateInnerHTML(cat)
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
