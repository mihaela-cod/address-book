var pageSize = 5;
var crtPage = 1;
var persons = [];
var filteredPersons = [];

function openForm() {
  document.getElementById("addForm").style.display = "block";
}

function closeForm() {
  document.getElementById("addForm").style.display = "none";
}

function display() {
  window.print();
}

function changePageSize(e) {
  pageSize = e.target.value;
  displayPersons(crtPage);
}

function displayPersons(page) {
  var personsHTML = "";
  var totalItems = filteredPersons.length;
  if (page * pageSize < totalItems) {
    totalItems = page * pageSize;
  }

  for (var i = (page - 1) * pageSize; i < totalItems; i++) {
    var person = filteredPersons[i];
    personsHTML += `
    <tr>
    <td class="hide-print">
    <button class="btn-update" >Update</button>
    <button class="btn-devare" >Devare</button>
    </td>
    <td class="hide-print">
        <p align="center">
              <strong>PRINT</strong><br />Carte de vizită
        </p>
    </td>
    <td class="hide-print"> <img class="image" src='${person.photo}'> </td>
    <td>${person.firstName} ${person.lastName}</td>
    <td class="hide-print">${person.company}</td>
    <td>${person.branches}</td>
    <td>${person.address}</td>
    <td>${person.department}</td>
    <td>${person.compartment}</td>
    <td>${person.position}</td>
    <td>${person.floorNumber}</td>
    <td>${person.phoneNumber}</td>
    <td>${person.email}</td>
    <td class="hide-print">${person.birthday}</td>
    <td class="hide-print">${person.iban}</td>
  </tr>`;
  }
  // afisare
  document.querySelector("table tbody").innerHTML = personsHTML;
}

function loadPersons() {
  fetch("data/contact-data.json")
    .then(function (r) {
      return r.json();
    })
    .then(function (personsArray) {
      persons = personsArray;
      filteredPersons = personsArray;
      displayPersons(crtPage);
    });
}
loadPersons();

function next() {
  if (crtPage * pageSize < filteredPersons.length) {
    crtPage += 1;
    displayPersons(crtPage);
  }
}

function prev() {
  if (crtPage > 1) {
    crtPage -= 1;
    displayPersons(crtPage);
  }
}

function search() {
  var term = document.getElementById("search").value;
  if (term) {
    filteredPersons = persons.filter(function (p) {
      return (
        p.firstName.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.lastName.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.company.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.branches.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.address.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.department.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.compartment.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.position.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.floorNumber.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.phoneNumber.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.email.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.birthday.toUpperCase().search(term.toUpperCase()) != -1 ||
        p.iban.toUpperCase().search(term.toUpperCase()) != -1
      );
    });
  } else {
    filteredPersons = persons;
  }
  crtPage = 1;
  displayPersons(1);
}
