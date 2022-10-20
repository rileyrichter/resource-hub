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
      document.querySelector("#crumb-title").innerText = item.name;
      document.querySelector("#title").innerText = item.name;
      document.querySelector("#video").src = item["loom-link"];
      document.querySelector(".session-resources").innerHTML =
        item["session-resources"];
      window.currentSession = item.slug;
    }
    moduleRoot.appendChild(module);
  });
  let percent = Math.round(percentage(courseCompletion, courseCount));
  progressBar.style.width = `${percent}%`;
  elPercent.innerText = percent;
  elComplete.innerText = courseCompletion;
  elTotal.innerText = courseCount;
  $("#comp-wrapper").fadeIn();

  moduleClone.remove();
  $("#module-wrapper").fadeIn();

  if (localStorage.getItem(currentSession) !== null) {
    $("#uncheck").fadeIn();
  } else {
    $("#check").fadeIn();
  }
  $("#loading").fadeOut();
  $("#content-wrapper").fadeIn();
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
