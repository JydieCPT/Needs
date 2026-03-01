const nameInput = document.getElementById("nameInput");
const needInput = document.getElementById("needInput");
const addBtn = document.getElementById("addBtn");
const needsList = document.getElementById("needsList");

let needs = JSON.parse(localStorage.getItem("needs")) || [];

function saveToLocalStorage() {
  localStorage.setItem("needs", JSON.stringify(needs));
}

function renderNeeds() {
  needsList.innerHTML = "";

  needs.forEach((need, index) => {
    const card = document.createElement("div");
    card.classList.add("need-card");

    if (need.assisted) {
      card.classList.add("assisted");
    }

    card.innerHTML = `
      <h3>${need.name}</h3>
      <p>${need.text}</p>
      <p>Status: ${need.assisted ? "Assisted" : "Open"}</p>
      ${
        !need.assisted
          ? `<button onclick="assistNeed(${index})">Assist</button>`
          : ""
      }
    `;

    needsList.appendChild(card);
  });
}

function assistNeed(index) {
  needs[index].assisted = true;
  saveToLocalStorage();
  renderNeeds();
}

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
  };

  needs.push(newNeed);
  saveToLocalStorage();
  renderNeeds();

  nameInput.value = "";
  needInput.value = "";
});

renderNeeds();
