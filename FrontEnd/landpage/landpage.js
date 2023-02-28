//fetch API
// localStorage.clear();
// localStorage.removeItem("token");

window.addEventListener("load", () => {
  getGallery();
  getFilter();
});

async function getGallery() {
  await fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
      displayGallery(data);
    });
}
// getGallery();
async function getFilter() {
  await fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
      displayFilter(data);
    });
}
// getFilter();

// display all works
const displayGallery = (data) => {
  data.map((work) => {
    let figure = document.createElement("figure");
    figure.className = "filter-gallery";
    let words = work.category.name.split(" ");

    let wordFigure = words[0].toLowerCase();
    figure.classList.add(wordFigure);

    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.crossOrigin = "anonymous";
    img.setAttribute("alt", work.title);

    let figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    document.querySelector(".gallery").appendChild(figure);
  });
};

//display filters items
const displayFilter = (data) => {
  document.querySelector(".filter-button").innerHTML += `
    <button class="btn active" id="all">
			Tous
		</button>
    `;
  for (let category of data) {
    let words = category.name.split(" ");
    let wordButton = words[0].toLowerCase();

    document.querySelector(".filter-button").innerHTML += `
      <button class="btn" id=${wordButton}>
        ${category.name}
      </button>
  `;
  }

  // add event listener filter
  const btn = document.querySelectorAll(".btn");
  btn.forEach((button) => {
    button.addEventListener("click", function (e) {
      let idStr = this.id;
      filterSelection(idStr);
    });
  });

  // Add active class to the current control button (highlight it)
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function (e) {
      let current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
      e.stopImmediatePropagation();
    });
  }

  filterSelection("");
};

//display with listener
function filterSelection(c) {
  let x, i;
  x = document.getElementsByClassName("filter-gallery");
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}
// Show filtered elements
function AddClass(element, name) {
  let i, arr1, arr2;
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
  let i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
//localstorage
let userId = localStorage.getItem("userId");
if (userId == 1) {
  const hide = document.querySelectorAll(".hide");

  for (let i = 0; i < hide.length; i++) {
    hide[i].style.display = "flex";
  }
}
