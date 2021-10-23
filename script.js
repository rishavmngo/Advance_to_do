//render the list
const list = document.querySelector("#list");
const form = document.querySelector("#new-todo-form");
const itemTemplate = document.querySelector("#list-item-template");
let itemList = pullData();
renderList();

list.addEventListener("click", (e) => {
  if (e.target.attributes[0].nodeName === "data-button-delete") {
    e.target.parentElement.remove();
    const name = e.target.parentElement.firstElementChild.children[1].innerText;
    const p = itemList.filter((word) => word !== name);
    itemList = p;
    SaveList();
  }
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const itemName = e.target.querySelector("#todo-input");
  createElement(itemName.value);
  itemList.push(itemName.value);
  itemName.value = "";
  SaveList();
});
//add element to the list
function createElement(name) {
  const item = itemTemplate.content.cloneNode(true);
  const itemName = item.querySelector("[data-list-item-text]");
  itemName.innerText = name;
  list.appendChild(item);
}
//save list to local Storage

function SaveList() {
  localStorage.setItem("todo", JSON.stringify(itemList));
}

function pullData() {
  const data = JSON.parse(localStorage.getItem("todo"));

  return data || [];
}

function renderList() {
  itemList.forEach((item) => {
    createElement(item);
  });
}
//delete element to the list
