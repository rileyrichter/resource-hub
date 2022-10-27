import allPageLoad from "./main.js";
const one = "one";
const two = "two";
const three = "three";
const four = "four";
const instructorClone = document.querySelector("#instructor-clone");
const instructorContainer = document.querySelector("#instructor-container");
const onBoardButton = document.querySelector("#onboardbutton");
let courseCount;
let courseCompletion = 0;
let lastPublished;

window.addEventListener("DOMContentLoaded", (event) => {
  fadeIn(document.querySelector("#loading"));
  onBoardButton.addEventListener("click", toggle);
  document.querySelector("#survey-buton").addEventListener("click", toggle);
  checkLastPublish();
});

const { toggle } = window.tf.createPopup("H7zVRV0x", {
  hidden: { email: `${localStorage.getItem("email")}` },
});

function checkCache() {
  if (localStorage.getItem("lastCached") === null) {
    localStorage.setItem("lastCached", Date.now());
    updateCache();
    onBoardButton.click();
  } else if (Number(localStorage.getItem("lastCached")) < lastPublished) {
    localStorage.setItem("lastCached", Date.now());
    updateCache();
  } else {
    updateDashboard(one);
    updateDashboard(two);
    updateDashboard(three);
    updateDashboard(four);
    addInstructors();
    allPageLoad();
    fadeOut(document.querySelector("#loading"));
  }
}

function checkLastPublish() {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };

  return fetch(`${baseURL}cache/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(handleError)
    .then((data) => {
      lastPublished = new Date(data.lastPublished).getTime();
    })
    .catch(function writeError(err) {
      console.log(err);
    })
    .finally(() => {
      checkCache();
    });
}

async function updateCache() {
  await Promise.all([
    stashCourseInfo(one, baseURL),
    stashCourseInfo(two, baseURL),
    stashCourseInfo(three, baseURL),
    stashCourseInfo(four, baseURL),
    stashInstructorInfo(baseURL),
    stashSidebarInfo(baseURL),
  ]);
  fadeOut(document.querySelector("#loading"));
}

function stashCourseInfo(number, baseURL) {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };

  return fetch(`${baseURL}/courses/${number}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(handleError)
    .then((data) => {
      localStorage.setItem(`${number}-sessions`, JSON.stringify(data.items));
    })
    .catch(function writeError(err) {
      console.log(err);
    })
    .finally(() => {
      updateDashboard(number);
    });
}

function stashInstructorInfo(baseURL) {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };

  return fetch(`${baseURL}/instructors`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(handleError)
    .then((data) => {
      localStorage.setItem(`instructors`, JSON.stringify(data.items));
    })
    .catch(function writeError(err) {
      console.log(err);
    })
    .finally(() => {
      addInstructors();
    });
}

function stashSidebarInfo(baseURL) {
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
      localStorage.setItem(`resources`, JSON.stringify(data.items));
    })
    .catch(function writeError(err) {
      console.log(err);
    })
    .then(() => {
      resourceItem.remove();
    })
    .finally(() => {
      allPageLoad();
    });
}

function updateDashboard(number) {
  let d = localStorage.getItem(`${number}-sessions`);
  let data = JSON.parse(d);
  let courseLink;
  if (localStorage.getItem(`${number}-last`) === null) {
    courseLink = data[0]._id;
  } else {
    courseLink = localStorage.getItem(`${number}-last`);
  }
  document.querySelector(
    `#${number}-link`
  ).href = `/course-${number}/session?=${courseLink}`;
  courseCount = data.length;
  data.forEach((item) => {
    if (localStorage.getItem(item.slug) !== null) {
      courseCompletion++;
    }
  });
  let percent = Math.round(percentage(courseCompletion, courseCount));
  document.querySelector(`#${number}-progress-bar`).style.width = `${percent}%`;
  document.querySelector(`#${number}-percent`).innerText = percent;
  document.querySelector(`#${number}-complete`).innerText = courseCompletion;
  document.querySelector(`#${number}-total`).innerText = courseCount;
  fadeIn(document.querySelector(`#${number}-comp-wrapper`));
  courseCompletion = 0;
  courseCount = 0;
}

function addInstructors() {
  let d = localStorage.getItem(`instructors`);
  let data = JSON.parse(d);
  data.sort((a, b) => a["order"] - b["order"]);
  data.forEach((item) => {
    let clone = instructorClone.cloneNode(true);
    clone.id = item._id;
    clone.querySelector(".instructor-name").innerText = item.name;
    clone.querySelector(".instructor-title").innerText = item.title;
    clone.querySelector(".instructor-image").src = item.image.url;
    clone.querySelector(".instructor-bio").innerHTML = item["bio-2"];
    instructorContainer.appendChild(clone);
  });
  instructorClone.remove();
  fadeIn(document.querySelector("#instructors"));
}

function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

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
