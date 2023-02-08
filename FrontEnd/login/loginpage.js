console.log("coucou");
console.log(location);
//redirection landepage
//message erreur si email! & password different
//prevenir utilisateur
//stocker le token pour envoi et suppression des travaux

try {
  const form = document.querySelector("#login");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailValue = document.querySelector("#email").value;
    const passwordValue = document.querySelector("#psw").value;
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.userId) {
          let error = document.querySelector(".error");
          error.innerText = "Erreur identifiant ou mot de passe";
        } else {
          loginOk(data);
        }
      })
      .catch((err) => {});
  });
} catch (error) {}

let loginOk = (datas) => {
  localStorage.setItem("token", datas.token);
  localStorage.setItem("userId", datas.userId);
  document.location.href = "../../index.html";
};
