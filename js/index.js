const handleCategoryVideos = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categoryContainer = document.getElementById("category-container");
    data.data.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `<a onClick="handleLoadVideosBtn('${category.category_id}')" class="btn px-5 py-2 ">${category.category}</a> `;
        categoryContainer.appendChild(div);
    });
}

const handleLoadVideosBtn = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    data.data.forEach(loadVideos => {
        console.log(loadVideos);
        const div = document.createElement("div");
        div.innerHTML = ` 
        <div class="card  bg-base-100  ">
                <figure><img class="rounded-md w-full h-48" src="${loadVideos.thumbnail}" /></figure>
                <div class="card-body">
                  <h2 class="card-title">Shoes!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
        `;
        cardContainer.appendChild(div);
    })
}



handleCategoryVideos();

