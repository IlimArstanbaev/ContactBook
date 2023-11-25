let contactForm = document.getElementById("contactForm");
let contactTable = document.getElementById("contactTable");

function addContact() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let image = document.getElementById("image").value;

  let newRow = contactTable.insertRow(-1);
  let cell1 = newRow.insertCell(0);
  let cell2 = newRow.insertCell(1);
  let cell3 = newRow.insertCell(2);
  let cell4 = newRow.insertCell(3);

  cell1.textContent = name;
  cell2.textContent = phone;
  cell3.innerHTML = `<img src="${image}" alt="${name}">`;
  cell4.innerHTML = `<button onclick="deleteContact(this)">Delete</button>
                       <button onclick="editContact(this)">Edit</button>`;

  contactForm.reset();
}

function deleteContact(button) {
  const row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function editContact(button) {
  let row = button.parentNode.parentNode;
  let cells = row.getElementsByTagName("td");

  let name = cells[0].textContent;
  let phone = cells[1].textContent;
  let image = cells[2].getElementsByTagName("img")[0].src;

  document.getElementById("name").value = name;
  document.getElementById("phone").value = phone;
  document.getElementById("image").value = image;

  row.parentNode.removeChild(row);
}
