// Fetch category from API
const handleCategoryVideos = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();

  const categoryContainer = document.getElementById("category-container");

  data.data.map((category) => {
    const div = document.createElement("div");
    div.innerHTML = `<a id="btn-bg-id" onClick="handleLoadVideosBtn('${category.category_id}'); btnBgColor(this); handlesortBtn('${category.category_id}');"  class="btn  px-5   py-2 ">${category.category} </a> `;
    categoryContainer.appendChild(div);
    const categoryId = category.category_id;
    // default bg color
    if (category.category_id === "1000") {
      document.getElementById("btn-bg-id").classList.add("bg-red-600");
      document.getElementById("btn-bg-id").style.color = "white";
    }
  });
};

// Load Videos Card

const handleLoadVideosBtn = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  // No data Found Condition
  if (data.data.length == 0) {
    cardContainer.innerHTML = `
    <div class=" flex justify-center  mt-10">
    <img class="w-40" src="./images/icon.png" />
    </div>
    <h1 class="text-3xl text-center font-bold">Oops!! Sorry, There is no <br> content here</h1>
    `;
    cardContainer.classList.remove("grid");
  } else {
    cardContainer.classList.add("grid");
  }
  
  data.data.forEach((loadVideos) => {
  
    // verified Condition
    if (loadVideos.authors[0].verified === true) {
      loadVideos.authors[0].verified = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_11_245)">
              <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
              <path d="M12.7094 7.20637L9.14065 10.7751L7.29065 8.92668C6.88909 8.52512 6.23752 8.52512 5.83596 8.92668C5.4344 9.32824 5.4344 9.97981 5.83596 10.3814L8.43127 12.9767C8.8219 13.3673 9.45627 13.3673 9.8469 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.761 6.80481 13.111 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
            </g>
            <defs>
              <clipPath id="clip0_11_245">
                <rect width="20" height="20" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          `;
    } else {
      loadVideos.authors[0].verified = "";
    }
    // Sec to hrs and min convert
    const totalMinutes = Math.floor(loadVideos.others.posted_date / 60);
    const hours = Math.floor(totalMinutes / 60);
    const min = totalMinutes % 60;

    // appened Card
    const div = document.createElement("div");

    // posted date Blank Condition
    if (loadVideos.others.posted_date !== "") {
      div.innerHTML = ` 
        <div class="card  bg-base-100  ">
                <figure><img class="rounded-md w-full h-48 relative" src="${loadVideos.thumbnail}" /></figure>
                <span  class="bg-black p-2  text-white absolute left-[160px]  bottom-[180px] ">${hours} hrs   ${min} min ago </span>
                <div class="card-body">
                <div class="flex gap-2">
                  <img class="rounded-full w-10 h-10   " src="${loadVideos?.authors[0]?.profile_picture}" />
                  <h2 class="text-xl font-bold">${loadVideos.title}</h2>
                  </div>
                  <div class="flex gap-2">
                  <span class=" text-sm ml-10">${loadVideos?.authors[0]?.profile_name}</span>
                  <span>${loadVideos?.authors[0]?.verified}</span>
                  </div>
                <h2 class=" text-sm ml-10">${loadVideos?.others?.views} Views</h2>
                </div>
              </div>
        `;
    } else {
      div.innerHTML = ` 
        <div class="card  bg-base-100  ">
                <figure><img class="rounded-md w-full h-48 relative" src="${loadVideos.thumbnail}" /></figure>
                <div class="card-body">
                <div class="flex gap-2">
                  <img class="rounded-full w-10 h-10   " src="${loadVideos?.authors[0]?.profile_picture}" />
                  <h2 class="text-xl font-bold">${loadVideos.title}</h2>
                  </div>
                  <div class="flex gap-2">
                  <span class=" text-sm ml-10">${loadVideos?.authors[0]?.profile_name}</span>
                  <span>${loadVideos?.authors[0]?.verified}</span>
                  </div>
                <h2 class=" text-sm ml-10">${loadVideos?.others?.views} Views</h2>
                </div>
              </div>
        `;
    }
    cardContainer.appendChild(div);
  });
};
// Button bg Color
const btnBgColor = (btn) => {
  const allBtn = document.querySelectorAll("#btn-bg-id");
  allBtn.forEach((btnData) => {
    btnData.classList.remove("bg-red-600");
    btnData.style.color = "black";
  });

  if (btn.classList.contains("bg-red-600") === false) {
    btn.classList.add("bg-red-600");
    btn.style.color = "white";
  } else {
    btn.classList.remove("bg-red-600");
    btn.style.color = "black";
  }
};

// Sort Button

const sortBtnId = document.getElementById("sort-Btn-Id");
sortBtnId.addEventListener("click", function () {
  handlesortBtn();
});

const handlesortBtn = async (id) => {
  console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  let sortArr = [];
  data.data.forEach(sortData => {
    const views = parseFloat(sortData.others.views);
  const viewsCount = views * 1000;
  sortArr.push(viewsCount);
  sortArr.sort(
    (a, b) => b - a
  );
  console.log(sortArr);
  });
  
};

// Call Function
handleLoadVideosBtn("1000");
handleCategoryVideos();
