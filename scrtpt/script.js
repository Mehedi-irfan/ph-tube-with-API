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

const videoObject = {
  category_id: "1003",
  video_id: "aaae",
  thumbnail: "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
  title: "Inside Amy Schumer",
  authors: [
    {
      profile_picture: "https://i.ibb.co/YD2mqH7/amy.jpg",
      profile_name: "Amy Schumer",
      verified: "",
    },
  ],
  others: {
    views: "3.6K",
    posted_date: "15147",
  },
  description:
    "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy.",
};

//display videos
const displayVideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  videos.forEach((video) => {
    console.log(video);

    const card = document.createElement("div");
    card.classList = "card card-compact shadow-xl";
    card.innerHTML = `
    <figure class="h-[200px]">
    <img class="w-full h-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="px-1 py-3 flex gap-3">
    <div>
      <img class="w-8 h-8 rounded-full" src="${video.authors[0].profile_picture}"/>
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>
    <img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>
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
