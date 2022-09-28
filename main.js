const baseURL = "https://webflow-success.api.stdlib.com/sgo@1.0.3/";
const currentUser = localStorage.getItem("email");
const displayUser = document.querySelector("#user");
const customerType = document.querySelector("#type").innerText;
const entSidebar = document.querySelector("#ent");
const growthSidebar = document.querySelector("#growth");
const listItem = document.querySelector("#clone-list-item");
const resourceList = document.querySelector("#resource-list");

export default function allPageLoad() {
  displayUser.innerText = currentUser;

  "Enterprise" === customerType
    ? fadeIn(entSidebar)
    : "Growth" === customerType && populateResources();
}

function fadeIn(e) {
  setTimeout(() => {
    e.parentElement.style.display = "block";
  }, "500");
  e.classList.remove("fade");
}

function populateResources() {
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
      data.items.forEach((item) => {
        const newItem = listItem.cloneNode(true);
        newItem.querySelector(".resource-link").innerText = item.name;
        newItem.querySelector(".resource-link").setAttribute("href", item.link);
        resourceList.appendChild(newItem);
      });
    })
    .catch(function writeError(err) {
      console.log(err);
    })
    .then(() => {
      //loadingDiv.classList.add("fade");
    })
    .finally(() => {
      listItem.remove();
      fadeIn(growthSidebar);
    });
}

export {
  baseURL,
  currentUser,
  displayUser,
  customerType,
  entSidebar,
  growthSidebar,
  listItem,
  resourceList,
  allPageLoad,
};
