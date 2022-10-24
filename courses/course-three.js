import getCourse from "./course.js";
import check from "../comp/check.js";
import uncheck from "../comp/uncheck.js";
import allPageLoad from "../main.js";
window.course = "three";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
window.sessionId = urlParams.get("");
window.courseButton = document.querySelector("#coursebutton");

window.addEventListener("DOMContentLoaded", (event) => {
  errorHandle();
  allPageLoad();
  getCourse(course);
  courseButton.addEventListener("click", toggle);
  document.querySelector("#check-complete").addEventListener("click", check);
  document
    .querySelector("#uncheck-complete")
    .addEventListener("click", uncheck);
});

function errorHandle() {
  null === sessionId && (location.href = "/");
}

const { toggle } = window.tf.createPopup("Gt1ADdJu", {
  hidden: { email: `${localStorage.getItem("email")}`, course: "Animations" },
});
