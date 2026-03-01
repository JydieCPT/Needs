const nameInput = document.getElementById("nameInput");
const needInput = document.getElementById("needInput");
const addBtn = document.getElementById("addBtn");
const needsList = document.getElementById("needsList");

let needs = JSON.parse(localStorage.getItem("needs")) || [];

function saveToLocalStorage() {
  localStorage.setItem("needs", JSON.stringify(needs));
}

// ASSIST FUNCTION WITH DETAILS
function assistNeed(index) {
  const helperName = prompt("Enter your name:");
  if (!helperName) return;

  const helperContact = prompt("Enter your contact details:");
  if (!helperContact) return;

  needs[index].assisted = true;
  needs[index].helper = {
    name: helperName,
    contact: helperContact
  };

  saveToLocalStorage();
  renderNeeds();
}

// DELETE FUNCTION
function deleteNeed(index) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this need?"
  );

  if (confirmDelete) {
    needs.splice(index, 1);
    saveToLocalStorage();
    renderNeeds();
  }
}

// RENDER FUNCTION
function renderNeeds() {
  needsList.innerHTML = "";

  needs.forEach((need, index) => {
    const card = document.createElement("div");
    card.classList.add("need-card");

    if (need.assisted) {
      card.classList.add("assisted");
    }

    const title = document.createElement("h3");
    title.textContent = need.name;

    const text = document.createElement("p");
    text.textContent = need.text;

    const status = document.createElement("p");
    status.textContent = `Status: ${need.assisted ? "Assisted" : "Open"}`;

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    // If NOT assisted → show Assist button
    if (!need.assisted) {
      const assistBtn = document.createElement("button");
      assistBtn.textContent = "Assist";

      assistBtn.addEventListener("click", () => {
        assistNeed(index);
      });

      buttonGroup.appendChild(assistBtn);
    }

    // If assisted → show helper info
    if (need.assisted && need.helper) {
      const helperInfo = document.createElement("p");
      helperInfo.innerHTML = `
        <strong>Helper:</strong> ${need.helper.name}<br>
        <strong>Contact:</strong> ${need.helper.contact}
      `;
      card.appendChild(helperInfo);
    }

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      deleteNeed(index);
    });

    buttonGroup.appendChild(deleteBtn);

    card.appendChild(title);
    card.appendChild(text);
    card.appendChild(status);
    card.appendChild(buttonGroup);

    needsList.appendChild(card);
  });
}

// ADD NEED
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const text = needInput.value.trim();

  if (!name || !text) {
    alert("Please fill in all fields");
    return;
  }

  const newNeed = {
    name,
    text,
    assisted: false,
    helper: null
  };

  needs.push(newNeed);
  saveToLocalStorage();
  renderNeeds();

  nameInput.value = "";
  needInput.value = "";
});

// INITIAL LOAD
renderNeeds();
