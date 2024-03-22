"use strict";
const nav = document.getElementById("sidebar");
//Bổ sung Animation cho Sidebar
nav.addEventListener("click", function () {
  nav.classList.toggle("active");
});

const petArr = getFromStorage("petArr") ?? [];
const breedArr = getFromStorage("breedArr") ?? [];
// hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// hàm lấy dữ liệu
function getFromStorage(key, defaultVal) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultVal;
}
