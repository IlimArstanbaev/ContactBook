let btn = document.querySelector("#btn");
let name = document.querySelector("#name");
let phone = document.querySelector("#phone");
let img = document.querySelector("#image");
let contactList = document.querySelector("#contactList");

let contacts = JSON.parse(localStorage.getItem("contacts-data")) || [];

btn.addEventListener("click", () => {
  let nameValue = name.value.trim();
  let phoneValue = phone.value.trim();
  let imgValue = img.value.trim();

  // if (!nameValue  !phoneValue) {
  //   alert("Заполните все поля");
  //   return;
  // }

  let contact = { name: nameValue, phone: phoneValue };

  // if (imgValue) {
  //   contact.image = imgValue;
  // }

  contact.image = imgValue
    ? imgValue
    : "https://avatars.mds.yandex.net/i?id=61cbab5f39c2ec39445472a274734088f1e6ab4b-9151370-images-thumbs&n=13"; //"https://instalook.ru/uploads/dakimakura/mr-freeman-2912.jpg";

  contacts.push(contact);
  displayContacts();
  setItemToStorage(contacts);

  name.value = "";
  phone.value = "";
  img.value = "";
});

//  ==================================================================

function setItemToStorage(contacts) {
  localStorage.setItem("contacts-data", JSON.stringify(contacts));
}

function displayContacts() {
  contactList.innerHTML = "";

  contacts.forEach(function (contact) {
    let li = document.createElement("li");
    li.className = "contact";

    let imgElement = document.createElement("img");
    imgElement.src = contact.image;
    imgElement.alt = contact.name;

    let div = document.createElement("div");
    div.textContent = contact.name;
    let p = document.createElement("p");
    p.textContent = contact.phone;
    div.appendChild(p);

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deleteContact(contact);
    };
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = function () {
      editContact(contact);
    };

    li.appendChild(imgElement);
    li.appendChild(div);
    li.appendChild(deleteButton);
    li.appendChild(editButton);

    contactList.appendChild(li);
  });
}

function deleteContact(contact) {
  let index = contacts.indexOf(contact);
  if (index !== -1) {
    contacts.splice(index, 1);
    displayContacts();
    setItemToStorage(contacts);
  }
}

let editContainer = document.getElementById("editContainer");
let editNameInput = document.getElementById("editName");
let editPhoneInput = document.getElementById("editPhone");
let editImageInput = document.getElementById("editImage");

// !=============================================================

function editContact(contact) {
  editNameInput.value = contact.name;
  editPhoneInput.value = contact.phone;
  editImageInput.value = contact.image;

  editContainer.style.display = "block";

  selectedContactIndex = contacts.indexOf(contact);
}

function saveEditedContact() {
  let editedName = editNameInput.value.trim();
  let editedPhone = editPhoneInput.value.trim();
  let editedImage = editImageInput.value.trim();

  // if (!editedName  !editedPhone) {
  //   alert("Внесите изменения!");
  //   return;
  // }

  contacts[selectedContactIndex].name = editedName;
  contacts[selectedContactIndex].phone = editedPhone;
  contacts[selectedContactIndex].image = editedImage;

  editContainer.style.display = "none";

  displayContacts();
  setItemToStorage(contacts);
}
// !============================================================================
// function editContact(contact) {
//   let index = contacts.indexOf(contact);
//   if (index !== -1) {
//     contacts.splice(index, 1);
//     displayContacts(setItemToStorage);
//     setItemToStorage(contacts);
//   }
// }

displayContacts();
