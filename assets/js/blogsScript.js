fetch("https://car-rental-test-cf67e-default-rtdb.firebaseio.com/blogs.json").then(
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
    items.map((item, i) => {
        displayItems += `
        <li>
        <div class="blog-card">
          <figure class="card-banner">
              <img src="${item.image}" alt="Opening of new offices of the company" loading="lazy"
                class="w-100">
            <a class="btn card-badge">${item.tag}</a>
          </figure>
          <p id="desc" style="display: none">${item.description}</p>
          <button type="button" data-toggle="modal" data-target="#exampleModal${i}">
          <div class="card-content">
            <h3 class="h3 card-title">
              <a>${item.title}</a>
            </h3>
            <div class="card-meta">
              <div class="publish-date">
                <ion-icon name="time-outline"></ion-icon>
                <time datetime="2022-01-14">${item.date}</time>
              </div>
            </div>
            </button>
          </div>
        </div>

        <div class="modal fade" id="exampleModal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${item.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ${item.description}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
        </li>`;
    })

    document.getElementById("blogs").innerHTML = displayItems;
})

