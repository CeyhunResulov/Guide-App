const form = document.querySelector(".form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");

form.addEventListener("submit", upplodeInfo);

// upplode

function upplodeInfo(e) {
  e.preventDefault();
  const values = {
    fname: fname.value,
    lname: lname.value,
    email: email.value,
  };

  valuesControls(values);
}

// values control

function valuesControls(values) {
  for (let value in values) {
    if (values[value]) {
      console.log(values[value]);
    } else {
      console.log("errorrr");
      return;
    }
  }
}
