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

renderTableData(petArr);
////////////
// lọc dữ liệu theo giống
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
// bắt sự kiện Click vào nút Submit
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

  // Thêm thú cưng vào danh sách
  const validate = validateData(data);
  if (validate) {
    petArr.push(data);
    clearInput();
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
  }
});

//Validate dữ liệu hợp lệ
function validateData(data) {
  let isValidate = true;
  if (data.id.trim() === "") {
    alert("please input for id!");
    isValidate = false;
  }
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
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      isValidate = false;
    }
  }
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

//Hiển thị danh sách thú cưng
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
	<button class="btn btn-danger" onclick="deletePet('${
    petArr[i].id
  }')">Delete</button>
</td> `;
    tableBodyEl.appendChild(row);
  }
}

// Xoá các dữ liệu vừa nhập trên Form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//Xoá một thú cưng
const deletePet = (petId) => {
  // Confirm before deletePet
  if (confirm("Are you sure")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
        saveToStorage("petArr", petArr);
        renderTableData(petArr);
      }
    }
  }
};
// Hiển thị thú cưng khoẻ mạnh
let healthyCheck = false;
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === false) {
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (
        petArr[i].vaccinated === true &&
        petArr[i].dewormed === true &&
        petArr[i].sterilized === true
      ) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
  } else {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
  }
});
