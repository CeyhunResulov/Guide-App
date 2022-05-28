const form = document.querySelector(".form");
const tbodyEl = document.querySelector("tbody");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const submit = document.getElementById("submit");
const tbody = document.querySelector("tbody");

// events
form.addEventListener("submit", upplodeInfo);
tbody.addEventListener("click", updateAndDelete);
document.addEventListener("DOMContentLoaded", personBringOfLS);

// upplode

function upplodeInfo(e) {
  e.preventDefault();
  const values = {
    fname: fname.value,
    lname: lname.value,
    email: email.value,
  };

  const result = valuesControls(values);
  if (result.value) {
    if (selectRow) {
      updateInfo(values, selectRow);
    } else {
      infoBoxShow(result.value, result.message);
      localStorageUplode(values);
    }
  } else {
    infoBoxShow(result.value, result.message);
  }
}

// values control

function valuesControls(values) {
  for (let value in values) {
    if (values[value]) {
    } else {
      const elseValue = { value: false, message: "formu tam doldurun!" };
      return elseValue;
    }
  }
  const value = { value: true, message: "melumatlar gonderildi" };
  resetValue();
  return value;
}

// true and wrong box show
const infoBox = document.querySelector(".info__box");
function infoBoxShow(value, message) {
  infoBox.firstElementChild.textContent = message;
  infoBox.style.visibility = "visible";
  if (value) {
    infoBox.style.border = "1px solid darkgreen";
  } else {
    infoBox.style.border = "1px solid red";
  }
  setTimeout(function infoBoxDelete() {
    infoBox.style.visibility = "hidden";
  }, 3000);
}

// input value reset

function resetValue() {
  fname.value = "";
  lname.value = "";
  email.value = "@gmail.com";
}

// personal list creat

function peresonListCreat(person) {
  const trEL = document.createElement("tr");
  trEL.innerHTML = `<td>${person.fname}</td>
  <td>${person.lname}</td>
  <td>${person.email}</td>
  <td>
  <div class="parent__button">
    <button class="button button__update"><i class="far fa-edit"></i></button>
    <button class="button button__delete">
      <i class="far fa-trash-alt"></i>
    </button>
  </div>
  </td>`;
  tbodyEl.appendChild(trEL);
}

// values submit at input for update

selectRow = undefined;
function updateAndDelete(e) {
  let persons = JSON.parse(localStorage.getItem("persons"));
  if (e.target.classList.contains("button__delete")) {
    e.target.parentElement.parentElement.parentElement.remove();
    persons.forEach((person, index) => {
      if (
        person.email ===
        e.target.parentElement.parentElement.previousElementSibling.textContent
      ) {
        persons.splice(index, 1);
      }
    });
    fname.value = "";
    lname.value = "";
    email.value = "@gamil.com";
    if (persons[0] === undefined) {
      localStorage.removeItem("persons");
    } else {
      localStorage.setItem("persons", JSON.stringify(persons));
    }
  } else if (e.target.classList.contains("button__update")) {
    const trElement = e.target.parentElement.parentElement.parentElement;
    const updateELEmail = trElement.cells[2];
    submit.textContent = "Update";
    fname.value = trElement.cells[0].textContent;
    lname.value = trElement.cells[1].textContent;
    email.value = trElement.cells[2].textContent;

    selectRow = updateELEmail;
  }
}

// update and delete code

function updateInfo(newPerson, updateELEmail) {
  let persons = JSON.parse(localStorage.getItem("persons"));
  const trElement = updateELEmail.parentElement;
  console.log(updateELEmail.textContent);
  persons.forEach((person) => {
    if (person.email === trElement.cells[2].textContent) {
      person.fname = newPerson.fname;
      person.lname = newPerson.lname;
      person.email = newPerson.email;
    }
  });

  trElement.cells[0].textContent = newPerson.fname;
  trElement.cells[1].textContent = newPerson.lname;
  trElement.cells[2].textContent = newPerson.email;

  localStorage.setItem("persons", JSON.stringify(persons));
  submit.textContent = "Submit";
  selectRow = undefined;
}

// local storage

function localStorageUplode(person) {
  let personalList;
  if (localStorage.getItem("persons") === null) {
    personalList = [];
    personalList.push(person);
    localStorage.setItem("persons", JSON.stringify(personalList));
    peresonListCreat(person);
  } else {
    personalList = JSON.parse(localStorage.getItem("persons"));
    let ifFunc = checkAgainGmail(person, personalList);
    if (ifFunc) {
      infoBoxShow(false, "again gmail!!!");
    } else {
      personalList.push(person);
      localStorage.setItem("persons", JSON.stringify(personalList));
      peresonListCreat(person);
    }
  }
}

// get person at local Storage

function personBringOfLS() {
  if (localStorage.getItem("persons") !== null) {
    let persons = JSON.parse(localStorage.getItem("persons"));
    persons.forEach((person) => {
      peresonListCreat(person);
    });
  }
}

// again gmail check

function checkAgainGmail(person, personalList) {
  for (let i = 0; i < personalList.length; i++) {
    if (personalList[i]["email"] === person["email"]) {
      return true;
    }
  }
  // return false;
}
