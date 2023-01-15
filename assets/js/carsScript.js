fetch("https://car-rental-test-cf67e-default-rtdb.firebaseio.com/cars.json").then(
    (res) => {
        return res.json();
    }
).then((data) => {
    console.log(data)
    const items = [];
    for (let key in data){
        let item = {
            ...data[key]
        }
     items.push(item); 
    }
    let displayItems = "";
    items.map((item) => {
        displayItems += `<li>
        <div class="featured-car-card">
          <figure class="card-banner">
            <img src="${item.image}" alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
              class="w-100">
          </figure>
          <div class="card-content">
            <div class="card-title-wrapper">
              <h3 class="h3 card-title">
                <a href="#">${item.name}</a>
              </h3>
              <data class="year" value="${item.model}">${item.model}</data>
            </div>
            <ul class="card-list">
              <li class="card-list-item">
                <span class="card-item-text">${item.seat} </span>
              </li>
              <li class="card-list-item">
                <span class="card-item-text">${item.type}</span>
              </li>
            </ul>
            <div class="card-price-wrapper">
              <p class="card-price">
                <strong>${item.cost} </strong>SAR / Day
              </p>
              <button class="btn">Rent now</button>
            </div>
          </div>
        </div>
      </li>`;
    })
    document.getElementById("cars").innerHTML = displayItems;
})

async function search() {
  // e.preventDefault()
  let price = document.getElementById("priceId").value;
  let car = document.getElementById("nameId").value;
  let model = document.getElementById("modelId").value;

  if(price === "" || car === "" || model === ""){
    alert("Please fill all the search fields !")
    return
  }

  if(isNaN(price) || isNaN(model)){
    alert("Please put a number for the model and price input fields !")
    return
  }

  let found = false;

 await fetch("https://car-rental-test-cf67e-default-rtdb.firebaseio.com/cars.json").then(
    (res) => {
        return res.json();
    }
).then((data) => {
    console.log(data)
    const items = [];
    for (let key in data){
        let item = {
            ...data[key]
        }
     items.push(item); 
    }
    let displayItems = "";
    items.map((item) => {
      if(item.model === model && item.cost <= price && item.name.includes(car)){
        found = true;
        displayItems += `<li>
        <div class="featured-car-card">
          <figure class="card-banner">
            <img src="${item.image}" alt="Toyota RAV4 2021" loading="lazy" width="440" height="300"
              class="w-100">
          </figure>
          <div class="card-content">
            <div class="card-title-wrapper">
              <h3 class="h3 card-title">
                <a href="#">${item.name}</a>
              </h3>
              <data class="year" value="${item.model}">${item.model}</data>
            </div>
            <ul class="card-list">
              <li class="card-list-item">
                <span class="card-item-text">${item.seat} </span>
              </li>
              <li class="card-list-item">
                <span class="card-item-text">${item.type}</span>
              </li>
            </ul>
            <div class="card-price-wrapper">
              <p class="card-price">
                <strong>${item.cost} </strong>SAR / Day
              </p>
              <button class="btn">Rent now</button>
            </div>
          </div>
        </div>
      </li>`
      }
    })

    if(!found) {
      displayItems = `<p style="color: red; font-weight: bold"> There is no car found with this search inputs</p>
      <a href="/"> Refreash Now !</a>`
    }

    document.getElementById("cars").innerHTML = displayItems;
})

}