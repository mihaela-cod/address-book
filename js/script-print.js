let printCardPage = 10;
let person = {};

function displayPerson() {
  let personsHTML = "";
  personsHTML += `
<div id="print">
      <div class="header">
        <div class="left">
        <span class="name">${person.name}</span>
        <br />
        <span class="position">${person.position}</span>
        </div>
        <div class="right">
        <img class="image" src='${person.photo}'>
        </div>
      </div>
      <div class="main-business-card">
        ${person.phoneNumber}
        <br />
        ${person.email}
        <br />
        ${person.address}, ${person.branches}
        </div> 
        <br />
        <div class="footer">
        ${person.company}
      </div>
</div>`;

  let result = personsHTML.repeat(printCardPage);

  // afisare
  document.getElementById("print").innerHTML = result;
}

function loadPerson() {
  let index = window.location.href.search("=");
  let id = window.location.href.substring(
    index + 1,
    window.location.href.length
  );
  fetch("http://localhost:3000/persons-json")
    .then(function (r) {
      return r.json();
    })
    .then(function (personsArray) {
      person = personsArray.find((p) => {
        return p.id == id;
      });
      displayPerson();
    });
}
loadPerson();
