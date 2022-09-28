const emailField = document.querySelector("#email");
const submitButton = document.querySelector("#submit");

window.onload = (event) => {
  submitButton.addEventListener("click", setEmail);
  if (localStorage.getItem("email") !== null) {
    emailField.value = localStorage.getItem("email");
  }
};

function setEmail() {
  localStorage.setItem("email", emailField.value);
}
