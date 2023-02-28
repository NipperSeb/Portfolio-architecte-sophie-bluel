//display and close modalContainer
let containerModal = document.getElementById("containerModal");
let modalGallery = document.getElementById("modalGallery");

//display gallery modal
let iconAdd = document.getElementById("buttonAdd");
iconAdd.addEventListener("click", () => {
  containerModal.style.display = "block";
});

//close modal gallery
let crossClose = document.getElementsByClassName("close")[0];
crossClose.addEventListener("click", () => {
  containerModal.style.display = "none";
});

//close modal gallery
document.addEventListener("click", function (event) {
  if (event.target == containerModal) {
    console.log(event.currentTarget);
    dragModal.style.display = null;
    modalGallery.style.display = "flex";
    containerModal.style.display = "none";
  }
});

//Switch modal drag -> modal gallery
let arrow = document.querySelector(".arrow-left");
arrow.addEventListener("click", () => {
  switchModal(modalGallery, dragModal, false);
});

function switchModal(firstElement, secondElement, action) {
  if (action === true) {
    firstElement.style.display = "none";
    secondElement.style.display = "block";
  } else {
    firstElement.style.display = "flex";
    secondElement.styleDisplay = "none";
  }
}

//close modal drag, open modal gallery et close all
let crossCloseDrag = document.getElementsByClassName("close")[1];
crossCloseDrag.addEventListener("click", () => {
  dragModal.style.display = "none";
  modalGallery.style.display = "flex";
  containerModal.style.display = "none";
});

//create add Modal
let buttonAdd = document.querySelector("#addImage");
let dragModal = document.querySelector("#dragContainer");

buttonAdd.addEventListener("click", () => {
  modalGallery.style.display = "none";
  dragModal.style.display = "flex";
});

//Import images modal-container
const url = "http://localhost:5678/api/works";

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    displayGalleryModale(data);
  })
  .catch(function (error) {
    console.log(error);
  });

function displayGalleryModale(data) {
  let mySet = new Set(data);

  for (let work of mySet) {
    let figure = document.createElement("figure");
    figure.className = "filter-gallery";

    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.crossOrigin = "anonymous";

    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML += `<button class="edit-image">éditer</button>`;

    let trash = document.createElement("span");
    trash.classList.add("trash-button");
    trash.addEventListener("click", function (event) {
      let idStr = work.id;
      deleteImage(idStr);
      event.stopImmediatePropagation();
    });
    trash.innerHTML = '<i class="fa-regular fa-trash-can fa-2xs"></i>';

    figure.appendChild(trash);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    let galleryModale = document.querySelector(".gallery-modale");
    galleryModale.appendChild(figure);
  }
}

// Delete image modal-container
function deleteImage(id) {
  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

// check image format
let validPicture = false;
let buttonAddImage = document.querySelector("#addImage");
buttonAddImage.addEventListener("click", function (event) {
  const input = document.getElementById("addNewPicture");
  const preview = document.getElementById("image");
  const newImage = document.getElementById("newImage");
  const maxSize = 4194304; // 4mo
  let clear = document.querySelectorAll(".clear");
  input.addEventListener("change", () => {
    const file = input.files[0];

    if (
      (file.type.startsWith("image/png") ||
        file.type.startsWith("image/jpeg") ||
        file.type.startsWith("image/jpg")) &&
      file.size < maxSize
    ) {
      // binary format
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        preview.src = reader.result;
        for (let item of clear) {
          item.style.display = "none";
        }
        newImage.style.display = "block";
      });
      reader.readAsDataURL(file);
      validPicture = true;
    } else {
      const form = document.querySelector("#uploadImage");
      form.reset();
      alert("jpg, png : 4mo max");
    }
  });
});

// listen and submit the picture
let submit = document.querySelector("#submit");

submit.addEventListener("click", function (event) {
  if (validPicture) {
    sendWork();
    event.stopPropagation();
    event.preventDefault();
  }
});

async function sendWork() {
  const imageFile = document.getElementById("addNewPicture");
  const title = document.getElementById("title");
  const category = document.getElementById("modalCategory");

  let formData = new FormData();
  formData.append("image", imageFile.files[0]);
  formData.append("title", title.value);
  formData.append("category", category.value);

  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      // enctype: "multipart/form-data",
      Accept: "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: formData,
  }).then((response) => {
    let result = response.json;
    alert(result.message);
    //pas oublier message bien reçu
  });
}
