import getCourse from "../courses/course.js";
import check from "../comp/check.js";
import uncheck from "../comp/uncheck.js";
import allPageLoad from "../main.js";
window.course = "one";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sessionId = urlParams.get("");

window.addEventListener("DOMContentLoaded", (event) => {
  errorHandle();
  allPageLoad();
  getCourse(course);
  document.querySelector("#check-complete").addEventListener("click", check);
  document
    .querySelector("#uncheck-complete")
    .addEventListener("click", uncheck);
});

function errorHandle() {
  null === sessionId && (location.href = "/");
}
