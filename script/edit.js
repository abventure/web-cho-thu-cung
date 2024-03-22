"use strict";
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const formEdit = document.getElementById("container-form");

renderTableData(petArr);

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
              <td>
	<button class="btn btn-danger" onclick="starEditPet('${
    petArr[i].id
  }')">Edit</button>
</td> `;
    tableBodyEl.appendChild(row);
  }
}

// Bắt sự kiện vào Edit
function starEditPet(petId) {
  formEdit.classList.remove("hide");
  const editPet = petArr.find((petItem) => petItem.id === petId);
  idInput.value = petId;
  nameInput.value = editPet.name;
  ageInput.value = editPet.age;
  typeInput.value = editPet.type;
  weightInput.value = editPet.weight;
  lengthInput.value = editPet.lengthA;
  colorInput.value = editPet.color;
  vaccinatedInput.checked = editPet.vaccinated;
  dewormedInput.checked = editPet.dewormed;
  sterilizedInput.checked = editPet.sterilized;
  breedInput.value = editPet.breed;
  breedInput.value = `${editPet.breed}`;
  renderBreed();
  breedInput.value = `${editPet.breed}`;
}

//hiển thị thú cưng theo từng giống loài
typeInput.addEventListener("click", renderBreed);
function renderBreed() {
  breedInput.innerHTML = "<option> Select Breed</option>";
  const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
  const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");

  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}
// bắt sự kiện khi thay đổi dữ liệu
submitBtn.addEventListener("click", function (e) {
  var d = new Date();
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    lengthA: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear(),
  };
  const validate = validateData(data);
  if (validate) {
    const index = petArr.findIndex((editPet) => editPet.id === data.id);
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    formEdit.classList.add("hide");
    renderTableData(petArr);
  }
});
function validateData(data) {
  let isValidate = true;
  if (data.name.trim() === "") {
    alert("please input for name!");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert("please select age!");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("please select weight!");
    isValidate = false;
  }
  if (isNaN(data.lengthA)) {
    alert("please select length!");
    isValidate = false;
  }
  if (data.type === "Select Type") {
    alert("please select type!");
    isValidate = false;
  }
  if (data.breed === "Select Breed") {
    alert("please select breed!");
    isValidate = false;
  }
  for (let i = 0; i < petArr.length; i++) {
    if (data.age < 1 || data.age > 15) {
      alert("Age must be between 1 and 15!");
      isValidate = false;
    }
    if (data.weight < 1 || data.weight > 15) {
      alert("Weight must be between 1 and 15!");
      isValidate = false;
    }
    if (data.length1 < 1 || data.length1 > 100) {
      alert("Length must be between 1 and 100!");
      isValidate = false;
    }
    return isValidate;
  }
}
//////////////////////////////////////////////////////////////
