import allPageLoad from "../main.js";
const moduleClone = document.querySelector("#module-clone");

window.addEventListener("DOMContentLoaded", (event) => {
  allPageLoad();
  listCourses();
});

function listCourses() {
  let d = localStorage.getItem(`one-sessions`);
  null === d &&
    (localStorage.removeItem("lastCached"),
    setTimeout(() => {
      location.href = "/";
    }, 300));
  let data = JSON.parse(d);
  data.forEach((item) => {
    let module = moduleClone.cloneNode(true);
    module.id = item._id;
    module.querySelector(".module-title").innerText = item.name;
    module.querySelector(".module-number").innerText = item.order;
    module.querySelector(
      ".module-link"
    ).href = `/course-one/session?=${item._id}`;
    if (localStorage.getItem(item.slug) !== null) {
      module.querySelector(".module-link").classList.add("complete");
    }
    document.querySelector(`#module-one-root`).appendChild(module);
  });

  let e = localStorage.getItem(`two-sessions`);
  let dataTwo = JSON.parse(e);
  dataTwo.forEach((item) => {
    let module = moduleClone.cloneNode(true);
    module.id = item._id;
    module.querySelector(".module-title").innerText = item.name;
    module.querySelector(".module-number").innerText = item.order;
    module.querySelector(
      ".module-link"
    ).href = `/course-two/session?=${item._id}`;
    if (localStorage.getItem(item.slug) !== null) {
      module.querySelector(".module-link").classList.add("complete");
    }
    document.querySelector(`#module-two-root`).appendChild(module);
  });

  let f = localStorage.getItem(`three-sessions`);
  let dataThree = JSON.parse(f);
  dataThree.forEach((item) => {
    let module = moduleClone.cloneNode(true);
    module.id = item._id;
    module.querySelector(".module-title").innerText = item.name;
    module.querySelector(".module-number").innerText = item.order;
    module.querySelector(
      ".module-link"
    ).href = `/course-three/session?=${item._id}`;
    if (localStorage.getItem(item.slug) !== null) {
      module.querySelector(".module-link").classList.add("complete");
    }
    document.querySelector(`#module-three-root`).appendChild(module);
  });

  let g = localStorage.getItem(`four-sessions`);
  let dataFour = JSON.parse(g);
  dataFour.forEach((item) => {
    let module = moduleClone.cloneNode(true);
    module.id = item._id;
    module.querySelector(".module-title").innerText = item.name;
    module.querySelector(".module-number").innerText = item.order;
    module.querySelector(
      ".module-link"
    ).href = `/course-four/session?=${item._id}`;
    if (localStorage.getItem(item.slug) !== null) {
      module.querySelector(".module-link").classList.add("complete");
    }
    document.querySelector(`#module-four-root`).appendChild(module);
  });

  moduleClone.remove();
  fadeIn(document.querySelector(".module-wrapper"));
}

function fadeIn(element) {
  element.style.display = "block";
  element.style.opacity = 0;
  element.style.transition = "opacity 0.5s";
  setTimeout(() => {
    element.style.opacity = 1;
  }, 500);
}
