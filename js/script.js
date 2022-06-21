const addButton = document.querySelector("#add-btn");

// reading the notes from local storage
const storedNotes = JSON.parse(localStorage.getItem("notes"));

if (storedNotes) {
  storedNotes.forEach((note) => {
    addNewNote(note);
  });
}

addButton.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(storedNote = "") {
  const row = document.querySelector(".row");
  const note = document.createElement("div");
  note.className = "col-lg-4 col-md-6 col-sm-6";

  note.innerHTML = `
  <div class="note shadow">
    <div
      class="tools d-flex align-items-center justify-content-end p-3"
    >
      <i class="fas fa-pencil text-white mr-5 edit"></i>
      <i class="fas fa-trash text-white delete"></i>
    </div>
    <div class="main w-100 p-3 hidden"></div>
    <textarea
      class="w-100 p-3 border-0"
      id="text-area"
      placeholder="Take note"
    ></textarea>
  </div>`;

  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const mainArea = note.querySelector(".main");
  const textArea = note.querySelector("#text-area");

  textArea.value = storedNote;
  mainArea.value = storedNote;

  editButton.addEventListener("click", () => {
    mainArea.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteButton.addEventListener("click", () => {
    deleteNote(note);
    updateLocalStorage();
  });

  textArea.addEventListener("input", (e) => {
    const inputValue = e.target.value;
    mainArea.innerHTML = marked.parse(inputValue);
    updateLocalStorage();
  });

  row.append(note);
}

function deleteNote(note) {
  note.remove();
}

function updateLocalStorage() {
  const textAreas = document.querySelectorAll("#text-area");
  const notes = [];

  textAreas.forEach((textArea) => {
    notes.push(textArea.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
