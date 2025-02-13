function loadData() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayData(data.categories))
    .catch((err) => console.log(err));
}

//display category
function displayData(categories) {
  const category = document.getElementById("categories");
  categories.forEach((item) => {
    console.log(item);
    const button = document.createElement("button");
    button.classList = "btn";
    button.innerText = item.category;
    category.append(button);
  });
}

loadData();
