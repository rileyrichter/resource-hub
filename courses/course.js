let courseCount = 0;
let courseCompletion = 0;
const progressBar = document.querySelector(".progress-bar");
const elPercent = document.querySelector("#percent");
const elComplete = document.querySelector("#complete");
const elTotal = document.querySelector("#total");
const moduleRoot = document.querySelector("#module-root");
const moduleClone = document.querySelector("#module-clone");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sessionId = urlParams.get("");
window.currentSession = "";

export default function getCourse(course) {
  let d = localStorage.getItem(`${course}-sessions`);
  null === d &&
    (localStorage.removeItem("lastCached"),
    setTimeout(() => {
      location.href = "/";
    }, 300));
  let data = JSON.parse(d);
  courseCount = data.length;
  data.forEach((item) => {
    let module = moduleClone.cloneNode(true);
    module.id = item._id;
    module.querySelector(".module-title").innerText = item.name;
    module.querySelector(".module-number").innerText = item.order;
    module.querySelector(
      ".module-link"
    ).href = `/course-${course}/session?=${item._id}`;
    if (localStorage.getItem(item.slug) !== null) {
      courseCompletion++;
      module.querySelector(".module-link").classList.add("complete");
    }
    if (item._id === sessionId) {
      module.querySelector(".module-link").classList.add("current");
      module.querySelector(".module-link").href = "javascript: void(0)";
      document.querySelector("#crumb-title").innerText = item.name;
      document.querySelector("#title").innerText = item.name;
      document.querySelector("#video").src = item["loom-link"];
      document.querySelector(".session-resources").innerHTML =
        item["session-resources"];
      const resourceContent = document.querySelector(".session-resources");
      const resourceLinks = resourceContent.querySelectorAll("a");
      resourceLinks.forEach((link) => {
        link.target = "_blank";
      });
      window.currentSession = item.slug;
      window.airtableSession = item.aid;
    }
    moduleRoot.appendChild(module);
  });
  let percent = Math.round(percentage(courseCompletion, courseCount));
  if (percent === 100 && localStorage.getItem(`${course}-complete`) === null) {
    setTimeout(() => {
      courseButton.click();
    }, 1000);
    localStorage.setItem(`${course}-complete`, true);
  } else if (
    percent === 100 &&
    localStorage.getItem(`${course}-complete`) !== null
  ) {
    fadeIn(document.querySelector(".notice-panel"));
    fadeIn(document.querySelector(".next-course"));
  }
  progressBar.style.width = `${percent}%`;
  elPercent.innerText = percent;
  elComplete.innerText = courseCompletion;
  elTotal.innerText = courseCount;
  fadeIn(document.querySelector("#comp-wrapper"));
  moduleClone.remove();
  fadeIn(document.querySelector("#module-wrapper"));
  if (localStorage.getItem(currentSession) !== null) {
    fadeIn(document.querySelector("#uncheck"));
  } else {
    fadeIn(document.querySelector("#check"));
  }
  fadeOut(document.querySelector("#loading"));
  fadeIn(document.querySelector("#content-wrapper"));
}

function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

export {
  progressBar,
  elPercent,
  elComplete,
  elTotal,
  moduleRoot,
  moduleClone,
  queryString,
  urlParams,
  sessionId,
  courseCount,
  courseCompletion,
};

function fadeOut(element) {
  element.style.transition = "opacity 0.5s";
  element.style.opacity = 0;
  setTimeout(() => {
    element.style.display = "none";
  }, 500);
}

function fadeIn(element) {
  element.style.display = "block";
  element.style.opacity = 0;
  element.style.transition = "opacity 0.5s";
  setTimeout(() => {
    element.style.opacity = 1;
  }, 500);
}
