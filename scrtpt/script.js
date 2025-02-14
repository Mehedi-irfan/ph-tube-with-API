//find the time
const getTime = (time) => {
  const hour = parseInt(time / 3600);
  let remainingSec = time % 3600;
  const minute = parseInt(time / 60);
  remainingSec = time % 60;
  return `${hour} hr ${minute} min ${remainingSec} sec ago`;
};
//load categories
function loadData() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayData(data.categories))
    .catch((err) => console.log(err));
}

//load videos
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

//display category
function displayData(categories) {
  const category = document.getElementById("categories");
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    category.append(button);
  });
}

//display videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
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
    <p></p>
    </div>
  </div>
    `;
    videosContainer.append(card);
  });
};

loadData();
loadVideos();
