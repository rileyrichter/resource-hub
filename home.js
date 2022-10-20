import allPageLoad from "./main.js";
const one = "one";
const two = "two";
const three = "three";
const four = "four";
let courseCount;
let courseCompletion = 0;
let lastPublished;

window.addEventListener("DOMContentLoaded", (event) => {
  fadeIn(document.querySelector("#loading"));
  allPageLoad();
  checkLastPublish();
});

function checkCache() {
  if (localStorage.getItem("lastCached") === null) {
    localStorage.setItem("lastCached", Date.now());
    updateCache();
  } else if (Number(localStorage.getItem("lastCached")) < lastPublished) {
    localStorage.setItem("lastCached", Date.now());
    updateCache();
  } else {
    updateDashboard(one);
    updateDashboard(two);
    updateDashboard(three);
    updateDashboard(four);
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
