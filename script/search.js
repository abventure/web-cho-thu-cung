"use strict";

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const searchForm = document.getElementById("container-form");

renderTableData(petArr);
// bắt sự kiện Find
findBtn.addEventListener("click", function () {
  let petArrFind = petArr;

  if (idInput.value !== "") {
    petArrFind = petArrFind.filter((pet) => {
      return pet.id.toUpperCase().includes(idInput.value.toUpperCase());
    });
  }
  if (nameInput.value !== "") {
    petArrFind = petArrFind.filter((pet) => {
      return pet.name.toUpperCase().includes(nameInput.value.toUpperCase());
    });
  }

  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => {
      return pet.type.includes(typeInput.value);
    });
  }
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => {
      return pet.breed.includes(breedInput.value);
    });
  }
  if (vaccinatedInput.checked) {
    petArrFind = petArrFind.filter((pet) => {
      return pet.vaccinated === true;
    });
  }

  if (dewormedInput.checked) {
    petArrFind = petArrFind.filter((pet) => {
      return pet.dewormed === true;
    });
  }
  if (sterilizedInput.checked) {
    petArrFind = petArrFind.filter((pet) => {
      return pet.sterilized === true;
    });
  }
  renderTableData(petArrFind);
  clearSearch();
});

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
                <td>${petArr[i].name}</td>
                <td>${petArr[i].age}</td>
                <td>${petArr[i].type}</td>
                <td>${petArr[i].weight}</td>
                <td>${petArr[i].lengthA}</td>
                <td>${petArr[i].breed}</td>
                <td>
                  <i class="bi bi-square-fill" style="color: ${
                    petArr[i].color
                  }"></i>
                </td>
               <td><i  class="bi    ${
                 petArr[i].vaccinated
                   ? "bi-check-circle-fill"
                   : "bi-x-circle-fill"
               }" style = "padding:0px 10px" ></i></td>
                <td><i  class="bi    ${
                  petArr[i].dewormed
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }" style = "padding:0px 10px" ></i></td>
                <td><i  class="bi ${
                  petArr[i].sterilized
                    ? "bi-check-circle-fill"
                    : "bi-x-circle-fill"
                }" style = "padding:0px 10px" ></i></td>
              <td>${petArr[i].date}</td>
               `;
    tableBodyEl.appendChild(row);
  }
}
// renderBreed();

function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
function clearSearch() {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}
