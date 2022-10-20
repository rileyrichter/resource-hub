window.baseURL = "https://webflow-success.api.stdlib.com/sgo@1.0.5/";
window.email = localStorage.getItem("email");
window.customerType = document.querySelector("#ctype").innerText;
window.resourceItem = document.querySelector(".resource-item");
window.resourceRoot = document.querySelector(".resources-sidebar-list");

export default function allPageLoad() {
  document.querySelector(".logged-in-as").innerText = email;
  $(".logged-in-as").fadeIn();
  "Enterprise/Partner" === customerType
    ? ($(".team-sidebar-wrapper").fadeIn(), $("#recordings").fadeIn())
    : "Growth" === customerType && populateGrowthSidebar();
}

function populateGrowthSidebar() {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };

  fetch(`${baseURL}/resources`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(handleError)
    .then((data) => {
      data.items.sort((a, b) => a["order"] - b["order"]);
      data.items.forEach((item) => {
        let resource = resourceItem.cloneNode(true);
        resource.querySelector(".resource-link").innerText = item.name;
        resource.querySelector(".resource-link").href = item.link;
        resourceRoot.appendChild(resource);
      });
    })
    .catch(function writeError(err) {
      console.log(err);
    })
    .then(() => {
      resourceItem.remove();
    })
    .finally(() => {
      $(".resources-side-bar-wrapper").fadeIn();
    });
}
