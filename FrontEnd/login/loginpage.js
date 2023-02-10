// Call API
async function userLogin(email, password) {
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  return response.json();
}

//fetch values
const form = {
  email: document.querySelector("#email"),
  password: document.querySelector("#psw"),
  submit: document.querySelector("#submit"),
};

let button = form.submit.addEventListener("click", (e) => {
  e.preventDefault();
  userLogin(form.email.value, form.password.value)
    .then((data) => {
      if (!data.userId) {
        let error = document.querySelector(".error");
        error.innerText = "Erreur dans l'identifiant ou le mot de passe";
      } else {
        loginOk(data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

// Store items
function loginOk(datas) {
  localStorage.setItem("token", datas.token);
  localStorage.setItem("userId", datas.userId);
  document.location.href = "../../index.html";
}
