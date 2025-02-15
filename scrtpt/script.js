//find the time
const getTime = (time) => {
  const hour = parseInt(time / 3600);
  let remainingSec = time % 3600;
  const minute = parseInt(time / 60);
  remainingSec = time % 60;
  return `${hour} hr ${minute} min ${remainingSec} sec ago`;
};
//remove active color from button
const removeActiveColor = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
//load categories
function loadData() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
      displayData(data.categories);
    })
    .catch((err) => console.log(err));
}

//load videos
const loadVideos = (searchText = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

//load video by id
const loadCategoryId = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      //remove active class whose id you wanna show
      removeActiveColor();
      //add active color which button will click
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
    })
    .then((err) => console.log(err));
};
//load details according id
const loadDetails = async (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (details) => {
  console.log(details);

  const modalContainer = document.getElementById("modal_container");
  modalContainer.innerHTML = `
  <div>
  <img src="${details.thumbnail}" />
  <p class="text-lg text-gray-500 py-2">${details.description}</p>
  </div>
  `;
  document.getElementById("custom_modal").showModal();
};

//display category
function displayData(categories) {
  const category = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
   <button id="btn-${item.category_id}" onclick="loadCategoryId(${item.category_id})" class="btn category-btn">${item.category}</button>
    `;
    category.append(buttonContainer);
  });
}

//display videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videosContainer.innerHTML = "";
  if (videos.length == 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="flex flex-col w-full justify-center items-center gap-5 min-h-[400px]">
    <img src="../asstes/Icon.png"/>
    <h2 class="text-xl font-fond text-center">HERE IS NO CONTENT CATEGORY</h2>
    </div>
    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card card-compact shadow-xl";
    card.innerHTML = `
    <figure class="h-[200px] relative">
    <img class="w-full h-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      ${
        video.others.posted_date?.length == 0
          ? ""
          : `(
          <span class="absolute text-sm bg-black text-white bottom-2 right-2 px-2 py-1 rounded">
            ${getTime(video?.others?.posted_date)}
          </span>
        )`
      }
  </figure>
  <div class="px-1 py-3 flex gap-3">
    <div>
      <img class="w-8 h-8 rounded-full" src="${
        video.authors[0].profile_picture
      }"/>
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>
   ${
     video.authors[0].verified == true
       ? ' <img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>'
       : ""
   }
    </div>
    <p class="text-sm text-gray-400">views :- ${video.others.views}</p>
   <div class="py-1">
    <button onclick="loadDetails('${
      video.video_id
    }')" class="text-sm bg-gray-900 text-white px-4 py-1 rounded">Details</button>
    </div></div>
  </div>
    `;
    videosContainer.append(card);
  });
};
//load data by input search
document.getElementById("search_input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});

loadData();
loadVideos();
