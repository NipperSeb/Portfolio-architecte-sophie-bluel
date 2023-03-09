/**
 * display and close modalContainer
 */
let containerModal = document.querySelector(".modal-container");
let modalGallery = document.getElementById("modalGallery");

/**
 * display gallery modal
 */
let iconAdd = document.getElementById("buttonAdd");
iconAdd.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  containerModal.style.display = "block";
  containerModal.style.visibility =
    containerModal.style.visibility == "visible" ? "hidden" : "visible";
  document.body.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
});

/**
 * close modal gallery
 */
let crossClose = document.getElementsByClassName("close")[0];
crossClose.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  containerModal.style.visibility =
    containerModal.style.visibility == "visible" ? "hidden" : "visible";
  document.body.style.backgroundColor = "";
  containerModal.style.display = "none";
});

document.addEventListener("click", function (event) {
  event.stopPropagation();
  if (event.target == containerModal) {
    dragModal.style.display = null;
    modalGallery.style.display = "flex";
    containerModal.style.visibility =
      containerModal.style.visibility == "visible" ? "hidden" : "visible";
    document.body.style.backgroundColor = "";
    containerModal.style.display = "none";
  }
});

let arrow = document.querySelector(".arrow-left");
arrow.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  dragModal.style.display = "none";
  modalGallery.style.display = "flex";
});

let crossCloseDrag = document.getElementsByClassName("close")[1];
crossCloseDrag.addEventListener("click", (e) => {
  e.preventDefault;
  e.stopPropagation();
  cleanForm();
});
/**
 *close modal drag and reset form
 */
function cleanForm() {
  const form = document.querySelector("#uploadImage");
  form.reset();
  const newImage = document.getElementById("newImage");
  let clear = document.querySelectorAll(".clear");
  for (let item of clear) {
    item.style.display = "block";
  }
  newImage.style.display = "none";
  colorSubmit = document.querySelector("#submit");
  colorSubmit.style.backgroundColor = "#a7a7a7";

  dragModal.style.display = null;
  modalGallery.style.display = "flex";
  containerModal.style.visibility =
    containerModal.style.visibility == "visible" ? "hidden" : "visible";
  document.body.style.backgroundColor = "";
}

/**
 * create add Modal
 */
let buttonAdd = document.querySelector("#addImage");
let dragModal = document.querySelector("#dragContainer");

buttonAdd.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  modalGallery.style.display = "none";
  dragModal.style.display = "flex";
});

/**
 * display gallery modal
 * @param {*} data
 */
function displayGalleryModale(data) {
  let mySet = new Set(data);

  for (let work of mySet) {
    let figure = document.createElement("figure");
    figure.className = "card-gallery";
    figure.dataset.id = work.id;

    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.crossOrigin = "anonymous";

    let figcaption = document.createElement("figcaption");
    figcaption.innerHTML += `<button class="edit-image">éditer</button>`;

    let trash = document.createElement("span");
    trash.classList.add("trash-button");

    trash.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      let idStr = work.id;
      deleteImage(idStr);
    });
    trash.innerHTML = '<i class="fa-regular fa-trash-can fa-2xs"></i>';

    figure.appendChild(trash);
    figure.appendChild(img);
    figure.appendChild(figcaption);
    let galleryModale = document.querySelector(".gallery-modale");
    galleryModale.appendChild(figure);

    let arrowMulti = document.createElement("span");
    arrowMulti.classList.add("arrow-multi");
    arrowMulti.innerHTML =
      '<i class="fa-solid fa-up-down-left-right fa-2xs"></i>';
    let firstImage = document.getElementsByClassName("card-gallery")[0];
    firstImage.appendChild(arrowMulti);
  }
}

/**
 * Delete image modal-container
 * @param {*} id
 */
async function deleteImage(id) {
  document.querySelector(`[data-id="${id}"]`).remove();

  try {
    await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    alert(err);
  }
}

/**
 * Delete all image
 */
let buttonDeleteAll = document.querySelector("#delete-gallery");
buttonDeleteAll.addEventListener("click", function () {
  deleteAllWorks();
});
const deleteAllWorks = () => {
  const works = document.querySelectorAll(".card-gallery");
  works.forEach((work) => {
    deleteImage(work.dataset.id);
  });
};

/**
 * check image format
 */
let validPicture = false;
let buttonAddImage = document.querySelector("#addImage");
buttonAddImage.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  let input = document.getElementById("addNewPicture");
  let preview = document.getElementById("image");
  let newImage = document.getElementById("newImage");

  const maxSize = 4194304; // 4mo
  let clear = document.querySelectorAll(".clear");
  input.value = "";

  input.addEventListener("change", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = input.files[0];

    if (
      (file.type.startsWith("image/png") ||
        file.type.startsWith("image/jpeg") ||
        file.type.startsWith("image/jpg")) &&
      file.size < maxSize
    ) {
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        e.preventDefault;
        e.stopPropagation();
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

/**
 * Change color button submit
 * @param {*} e
 */
const form = document.querySelector("#uploadImage");
const url = "http://localhost:5678/api/works";
form.addEventListener("change", checkItems);
function checkItems(e) {
  e.preventDefault();
  e.stopPropagation();
  const imageFile = document.getElementById("addNewPicture").files;
  const title = document.getElementById("title").value;
  const category = document.getElementById("modalCategory").value;
  colorSubmit = document.querySelector("#submit");
  if (imageFile.length != 0 && title != "" && category != "") {
    colorSubmit.style.backgroundColor = "#1D6154";
  } else {
    colorSubmit.style.backgroundColor = "#a7a7a7";
  }
}

form.addEventListener("submit", submitFormAjax);
/**
 * send formdata
 * @param {*} event
 */
async function submitFormAjax(event) {
  event.preventDefault();
  event.stopPropagation();
  if (validPicture) {
    const image = document.getElementById("image");
    image.setAttribute("src", "");
  } else {
    return;
  }

  const imageFile = document.getElementById("addNewPicture");
  const title = document.getElementById("title");
  const category = document.getElementById("modalCategory");

  let formData = new FormData();
  formData.append("image", imageFile.files[0]);
  formData.append("title", title.value);
  formData.append("category", category.value);

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });
    await response.json();
    confirm("Projet ajouté");
    form.reset();
    getGallery();
  } catch (error) {
    alert(error);
  }
}
