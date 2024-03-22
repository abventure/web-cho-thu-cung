"use strict";
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// hiển thị danh sách
renderTableBreed(breedArr);

// bắt sự kiện Click vào nút submit
submitBtn.addEventListener("click", function (e) {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  // validate dữ liệu
  const isvalidate = validate(data);
  if (isvalidate) {
    breedArr.push(data);
    clearInput2();
    saveToStorage("breedArr", breedArr);
    renderTableBreed(breedArr);
  }
});

function validate(data) {
  let isvalidate = true;
  if (data.breed.trim() === "") {
    alert("Please input for breed");
    isvalidate = false;
  }
  if (data.type === "Select Type") {
    alert("please select breed!");
    isvalidateisvalidate = false;
  }
  return isvalidate;
}

function renderTableBreed() {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");

    row.innerHTML = `<th scope="col">
  ${i + 1}</th>
      <td scope="col">${breedArr[i].breed}</td>
      <td scope="col">${breedArr[i].type}</td>
      <td>
	<button class="btn btn-danger" onclick="deletePet2('${
    breedArr[i].breed
  }')">Delete</button>
</td> 
    `;
    tableBodyEl.appendChild(row);
  }
}

function clearInput2() {
  breedInput.value = "";
  typeInput.value = "Select type";
}
const deletePet2 = (petId2) => {
  // Confirm before deletePet
  if (confirm("Are you sure")) {
    for (let i = 0; i < breedArr.length; i++) {
      if (petId2 === breedArr[i].breed) {
        saveToStorage("breedArr", breedArr);
        renderTableBreed(breedArr);
      }
    }
  }
};
