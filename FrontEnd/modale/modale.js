let modal = document.getElementById("container-modal");
let btn = document.getElementById("button-works");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// fetch gallery in the modale
buttonWorks = document.getElementById("button-works");

// display all works
const displayGalleryModale = (data) => {
  for (let work of data) {
    let figure = document.createElement("figure");
    figure.className = "filter-gallery";

    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.crossOrigin = "anonymous";

    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML += `<button class="edit-image">éditer</button>`;

    let trash = document.createElement("span");
    trash.classList.add("trash-button");
    trash.addEventListener("click", deleteImage);
    trash.innerHTML = '<i class="fa-regular fa-trash-can fa-2xs"></i>';

    figure.appendChild(trash);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    document.querySelector(".gallery-modale").appendChild(figure);
  }
};
buttonWorks.addEventListener("click", displayGalleryModale(data));

function deleteImage() {
  console.log("supprimer");
}
