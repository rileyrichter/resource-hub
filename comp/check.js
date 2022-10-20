const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const sessionId = urlParams.get("");

export default function check() {
  localStorage.setItem(currentSession, "true");
  if (
    !document.querySelector(".module-link.current").parentElement.nextSibling
  ) {
    location.reload();
  } else {
    const sessionChecked = document.querySelector(".module-link.current")
      .parentElement.nextSibling.id;
    localStorage.setItem(`${course}-last`, sessionChecked);
    location.href = `/course-${course}/session?=${sessionChecked}`;
  }
}
