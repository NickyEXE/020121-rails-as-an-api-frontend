const API = "http://localhost:3000"


const adapter = {
  getAllCats: function(){
    return fetch(`${API}/cats`)
    .then(res => res.json())
  },
  tipCat: function(id, newTip){
    return fetch(`${API}/cats/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({tip: newTip}),
    })
    .then(res => res.json())
  },
  deleteCat: function(id){
    return fetch(`${API}/cats/${id}`, {method: "DELETE"})
    .then(res => res.json())
  },
  createCat: function(cat){
    return fetch(`${API}/cats`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cat),
    })
    .then(response => response.json())
  },
  updateCat: function(id, cat){
    return fetch(`${API}/cats/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cat),
    })
    .then(res => res.json())
  }
}
