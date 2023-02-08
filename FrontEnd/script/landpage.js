//fetch API
console.log(location);
async function getWorks() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      displayWorks(data);
    });
}
getWorks();

async function getCategories() {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      displayCategories(data);
    });
}
getCategories();

// display all works
const displayWorks = (data) => {
  for (let work of data) {
    let figure = document.createElement("figure");
    figure.className = "filterButton";
    let words = work.category.name.split(" ");
    let wordFigure = words[0].toLowerCase();
    figure.classList.add(wordFigure);

    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.crossOrigin = "anonymous";

    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    document.querySelector(".gallery").appendChild(figure);
  }
};

//display filters items
const displayCategories = (data) => {
  document.querySelector(".filter-item").innerHTML += `
    <button class="btn active" id="all">
			Tous
		</button>
    `;
  for (let category of data) {
    let words = category.name.split(" ");
    let wordButton = words[0].toLowerCase();

    document.querySelector(".filter-item").innerHTML += `
      <button class="btn" id=${wordButton}>
        ${category.name}
      </button>
  `;
  }

  // add event listener filter
  const btn = document.querySelectorAll(".btn");
  btn.forEach((button) => {
    button.addEventListener("click", function (e) {
      var idStr = this.id;
      filterSelection(idStr);
    });
  });
  // Add active class to the current control button (highlight it)
  for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }

  filterSelection("all");
};

//display with listener
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filterButton");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}
// Show filtered elements
function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
