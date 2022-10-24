const emailField = document.querySelector("#email");
const emailWrapper = document.querySelector(".email-form-wrapper");
const emailSubmit = document.querySelector("#submit");

window.onload = (event) => {
  emailSubmit.addEventListener("click", setEmail);
  emailWrapper.setAttribute("tabindex", "-1");
  emailWrapper.focus();
};

function setEmail() {
  localStorage.setItem("email", emailField.value);
  window.location.href = localStorage.getItem("emailPrev");
}
