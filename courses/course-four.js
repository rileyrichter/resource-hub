import getCourse from "./course.js";
import check from "../comp/check.js";
import uncheck from "../comp/uncheck.js";
import allPageLoad from "../main.js";
window.course = "four";

window.addEventListener("DOMContentLoaded", (event) => {
  allPageLoad();
  getCourse(course);
  document.querySelector("#check-complete").addEventListener("click", check);
  document
    .querySelector("#uncheck-complete")
    .addEventListener("click", uncheck);
});
