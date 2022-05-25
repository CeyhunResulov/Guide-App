const form = document.querySelector(".form");
const tbodyEl = document.querySelector("tbody");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const submit = document.getElementById("submit");
const tbody = document.querySelector("tbody");
const personalList = [];

// events
form.addEventListener("submit", upplodeInfo);
tbody.addEventListener("click", updateAndDelete);

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
      peresonListCreat(values);
      console.log(listPushPersonal(values));
    }
  } else {
    console.log(result.value);
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

function infoBoxShow(value, message) {
  const elDIv = document.createElement("div");
  const elP = document.createElement("p");
  elDIv.appendChild(elP);
  elP.textContent = elDIv.classList.add(`${value}`);
  elP.textContent = message;
  document.querySelector("body").insertBefore(elDIv, form);

  setTimeout(function infoBoxDelete() {
    if (form.previousElementSibling.classList.contains("false")) {
      document.querySelector(".false").remove();
    } else if (form.previousElementSibling.classList.contains("true")) {
      document.querySelector(".true").remove();
    }
  }, 3000);
}

// input value reset

function resetValue() {
  fname.value = "";
  lname.value = "";
  email.value = "";
}

// personal list creat

function peresonListCreat(persons) {
  const trEL = document.createElement("tr");
  trEL.innerHTML = `<td>${persons.fname}</td>
  <td>${persons.lname}</td>
  <td>${persons.email}</td>
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

// list for personal

function listPushPersonal(persons) {
  personalList.push(persons);
  return personalList;
}

// values submit at input for update

selectRow = undefined;
function updateAndDelete(e) {
  if (e.target.classList.contains("button__delete")) {
    e.target.parentElement.parentElement.parentElement.remove();
    personalList.forEach((person, index) => {
      if (
        person.email ===
        e.target.parentElement.parentElement.previousElementSibling.textContent
      ) {
        personalList.splice(index, 1);
        console.log(personalList);
      }
    });
    fname.value = "";
    lname.value = "";
    email.value = "";
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
  const trElement = updateELEmail.parentElement;
  console.log(updateELEmail.textContent);
  personalList.forEach((person) => {
    if (person.email === trElement.cells[2].textContent) {
      person.fname = newPerson.fname;
      person.lname = newPerson.lname;
      person.email = newPerson.email;
      console.log(person);
    }
  });

  trElement.cells[0].textContent = newPerson.fname;
  trElement.cells[1].textContent = newPerson.lname;
  trElement.cells[2].textContent = newPerson.email;

  submit.textContent = "Submit";
  console.log(personalList);
  selectRow = undefined;
}
