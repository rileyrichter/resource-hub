const user = localStorage.getItem("email");

export default function check() {
  if (localStorage.getItem("sessionData") === null) {
    console.log("creating user");
    createUser();
  } else {
    console.log("updating user");
    updateUser();
  }
}

function createUser() {
  console.log(`${baseURL}tracking/create-user`);
  console.log(airtableSession);
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };
  fetch(`${baseURL}tracking/create-user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: user,
      session: [airtableSession],
    }),
  })
    .then(handleError)
    .then((data) => {
      localStorage.setItem("sessionData", JSON.stringify(data.rows[0]));
    })
    .catch(function writeError(err) {
      console.log(err);
    })
    .finally(() => {
      localStorage.setItem(currentSession, "true");
      if (
        !document.querySelector(".module-link.current").parentElement
          .nextSibling
      ) {
        location.reload();
      } else {
        const sessionChecked = document.querySelector(".module-link.current")
          .parentElement.nextSibling.id;
        localStorage.setItem(`${course}-last`, sessionChecked);
        location.href = `/course-${course}/session?=${sessionChecked}`;
      }
    });
}

function updateUser() {
  let e = localStorage.getItem("sessionData");
  let currentData = JSON.parse(e);
  console.log(currentData);
  let f = currentData.fields.session;
  if (f.includes(airtableSession)) {
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
  } else {
    let g = f.concat(airtableSession);
    let h = currentData.id;
    console.log(g);
    console.log(h);

    const handleError = (response) => {
      if (!response.ok) {
        throw Error(` ${response.status} ${response.statusText}`);
      } else {
        return response.json();
      }
    };
    fetch(`${baseURL}tracking/update-user`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: h,
        session: g,
      }),
    })
      .then(handleError)
      .then((data) => {
        localStorage.setItem("sessionData", JSON.stringify(data));
      })
      .catch(function writeError(err) {
        console.log(err);
      })
      .finally(() => {
        localStorage.setItem(currentSession, "true");
        if (
          !document.querySelector(".module-link.current").parentElement
            .nextSibling
        ) {
          location.reload();
        } else {
          const sessionChecked = document.querySelector(".module-link.current")
            .parentElement.nextSibling.id;
          localStorage.setItem(`${course}-last`, sessionChecked);
          location.href = `/course-${course}/session?=${sessionChecked}`;
        }
      });
  }
}
