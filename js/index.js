let allPersons = [];
let editId;

function display() {
  window.print();
}

function $(selector) {
  return document.querySelector(selector);
}

function confirmDelete() {
  const text = "Are you sure you want to delete this record";
  return confirm(text);
}

function getPersonHTML(person) {
  return `
  <tr>
  
  <td>
    <a href="#" data-id="${person.id}" class="btn-update hide-print" title="Update">&#9998;</a>
    <a href="#" data-id="${person.id}" class="btn-delete hide-print" title="Delete">&#10006;</a>
    </td>
    <td class="hide-print">
        <p align="center">
        <a href="index-print.html?id=${person.id}" target="_blank" data-id="${person.id}" class="btn-business-card hide-print" title="Print"><i class="fa-solid fa-print"></i> Business Card</a>
        </p>
    </td>
    <td class="hide-print"> <img class="images" src='${person.photo}'> </td>
    <td>${person.name}</td>
    <td class="hide-print">${person.company}</td>
    <td>${person.branches}</td>
    <td>${person.address}</td>
    <td>${person.department}</td>
    <td class="hide-print">${person.compartment}</td>
    <td>${person.position}</td>
    <td>${person.floorNumber}</td>
    <td>${person.phoneNumber}</td>
    <td>${person.email}</td>
    <td class="hide-print">${person.birthday}</td>
    <td class="hide-print">${person.iban}</td>
    
    
    
  </tr>`;
}

function displayPersons(persons) {
  const personsHTML = persons.map(getPersonHTML);

  // afisare
  $("table tbody").innerHTML = personsHTML.join("");
}

function loadPersons() {
  fetch("http://localhost:3000/persons-json")
    .then((r) => r.json())
    .then((persons) => {
      allPersons = persons;
      displayPersons(persons);
    });
}

function createPersonRequest(person) {
  return fetch("http://localhost:3000/persons-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  }).then((r) => r.json());
}

function removePersonRequest(id) {
  return fetch("http://localhost:3000/persons-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  }).then((r) => r.json());
}

function updatePersonRequest(person) {
  return fetch("http://localhost:3000/persons-json/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(person),
  }).then((r) => r.json());
}

function getFormValues() {
  const photo = $("input[name=photo]").value;
  const name = $("input[name=name]").value;
  const company = $("input[name=company]").value;
  const branches = $("input[name=branches]").value;
  const address = $("input[name=address]").value;
  const department = $("input[name=department]").value;
  const compartment = $("input[name=compartment]").value;
  const position = $("input[name=position]").value;
  const floorNumber = $("input[name=floorNumber]").value;
  const phoneNumber = $("input[name=phoneNumber]").value;
  const email = $("input[name=email]").value;
  const birthday = $("input[name=birthday]").value;
  const iban = $("input[name=iban]").value;

  const person = {
    photo: photo,
    name: name,
    company: company,
    branches: branches,
    address: address,
    department: department,
    compartment: compartment,
    position: position,
    floorNumber: floorNumber,
    phoneNumber: phoneNumber,
    email: email,
    birthday: birthday,
    iban: iban,
  };
  return person;
}

function setFormValues(person) {
  $("input[name=photo]").value = person.photo;
  $("input[name=name]").value = person.name;
  $("input[name=company]").value = person.company;
  $("input[name=branches]").value = person.branches;
  $("input[name=address]").value = person.address;
  $("input[name=department]").value = person.department;
  $("input[name=compartment]").value = person.compartment;
  $("input[name=position]").value = person.position;
  $("input[name=floorNumber]").value = person.floorNumber;
  $("input[name=phoneNumber]").value = person.phoneNumber;
  $("input[name=email]").value = person.email;
  $("input[name=birthday]").value = person.birthday;
  $("input[name=iban]").value = person.iban;
}

function submitForm(e) {
  e.preventDefault();

  const person = getFormValues();

  if (editId) {
    person.id = editId;
    updatePersonRequest(person).then((status) => {
      if (status.success) {
        $("#editForm").reset();
        loadPersons();
      }
    });
  } else {
    createPersonRequest(person).then((status) => {
      if (status.success) {
        $("#editForm").reset();
        loadPersons();
      }
    });
  }
}

function startEditPerson(id) {
  const person = allPersons.find((person) => person.id === id);
  setFormValues(person);
  editId = id;
}

function initEvents() {
  $("#search").addEventListener("input", (e) => {
    const search = e.target.value.toLowerCase();
    const persons = allPersons.filter((person) => {
      return person.name.toLowerCase().includes(search);
    });
    displayPersons(persons);
  });

  const form = $("#editForm");
  form.addEventListener("submit", submitForm);
  form.addEventListener("reset", () => {
    editId = undefined;
  });

  form.querySelector("tbody").addEventListener("click", (e) => {
    if (e.target.matches("a.btn-delete")) {
      if (confirmDelete()) {
        const id = e.target.getAttribute("data-id");
        removePersonRequest(id).then((status) => {
          if (status.success) {
            loadPersons();
          }
        });
      }
    } else if (e.target.matches("a.btn-update")) {
      const id = e.target.getAttribute("data-id");
      startEditPerson(id);
    }
  });
}

loadPersons();
initEvents();
