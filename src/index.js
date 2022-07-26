// write your code here
URL = "http://localhost:3000/ramens"
const ramenMenu = document.querySelector("#ramen-menu")
const ramenDetail = document.querySelector('#ramen-detail')
const newRamenForm = document.querySelector('#new-ramen')
const deleteRamen = document.querySelector('#delete-ramen')


document.addEventListener("DOMContentLoaded", (event => {
    fetch(URL)
    .then(res => res.json())
    .then(displayRamen)

  function displayRamen(ramenArray) {
    ramenArray.forEach(ramen => displaySingleRamen(ramen))

    function displaySingleRamen(ramen) {
      const ramenDiv = document.createElement('div')
    
      ramenDiv.innerHTML = `<image src=${ramen.image} id = ${ramen.id}>`
    
      ramenDiv.addEventListener("click", (event)=>{
        ramenTargetObject = ramenArray.find(ramen => ramen.id == event.target.id)
        showRamenInfo(ramenTargetObject)

        deleteRamen.addEventListener('click', (event =>{
          return fetch(`${URL}/${ramenTargetObject.id}`, {
            method: 'DELETE'})
          .then(data => alert("Deleted!"))
          // location.reload()
        }))
      })
    
      function showRamenInfo(ramenTargetObject) {
        ramenDetail.innerHTML = `<div id="ramen-detail">
                                  <img class="detail-image" src=${ramenTargetObject.image} alt=${ramenTargetObject.comment}>
                                  <h2 class="name">${ramenTargetObject.name}</h2>
                                  <h3 class="restaurant">${ramenTargetObject.restaurant}</h3>
                                </div>`
        const rating = document.querySelector('#rating-display')
        rating.innerText = ramenTargetObject.rating

        const comment = document.querySelector('#comment-display')
        comment.innerText = ramenTargetObject.comment
      }
      showRamenInfo(ramenArray[0])
      ramenMenu.appendChild(ramenDiv)
  }

  newRamenForm.addEventListener("submit", (event => {
    event.defaultPrevented
    console.log(event.target)
    const newRamenData = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target['new-comment'].value
    }
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify(newRamenData)
    })
  }))

  

}

}))

