window.baseURL = "https://webflow-success.api.stdlib.com/sgo@1.0.10/";
window.email = localStorage.getItem("email");
window.customerType = document.querySelector("#ctype").innerText;
window.resourceItem = document.querySelector(".resource-item");
window.resourceRoot = document.querySelector(".resources-sidebar-list");

export default function allPageLoad() {
  if (email === null) {
    localStorage.setItem("emailPrev", window.location.pathname);
    window.location.href = "/email";
  }
  document.querySelector(".logged-in-as").innerText = email;
  fadeIn(document.querySelector(".logged-in-as"));
  "Enterprise/Partner" === customerType
    ? (fadeIn(document.querySelector(".team-sidebar-wrapper")),
      fadeIn(document.querySelector("#recordings")))
    : "Growth" === customerType && populateGrowthSidebar();
}

function populateGrowthSidebar() {
  let d = localStorage.getItem(`resources`);
  let data = JSON.parse(d);
  data.sort((a, b) => a["order"] - b["order"]);
  data.forEach((item) => {
    let resource = resourceItem.cloneNode(true);
    resource.querySelector(".resource-link").innerText = item.name;
    resource.querySelector(".resource-link").href = item.link;
    resourceRoot.appendChild(resource);
  });
  resourceItem.remove();
  fadeIn(document.querySelector(".resources-side-bar-wrapper"));
}

function fadeIn(element) {
  element.style.display = "block";
  element.style.opacity = 0;
  element.style.transition = "opacity 0.5s";
  setTimeout(() => {
    element.style.opacity = 1;
  }, 500);
}

function fadeInFlex(element) {
  element.style.display = "flex";
  element.style.opacity = 0;
  element.style.transition = "opacity 0.5s";
  setTimeout(() => {
    element.style.opacity = 1;
  }, 500);
}
