const addButton = document.querySelector("#add-btn");
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
    <div class="main w-100 p-3 ${storedNote ? "" : "hidden"}"></div>
    <textarea
      class="w-100 p-3 border-0 ${storedNote ? "hidden" : ""}"
      id="text-area"
      placeholder="Take note"
    ></textarea>
  </div>
  `;

  // selecting the target element
  const editButton = note.querySelector(".edit");
  const deleteButton = note.querySelector(".delete");
  const textArea = note.querySelector("#text-area");
  const mainArea = note.querySelector(".main");

  // items got from local storage
  textArea.value = storedNote;
  mainArea.innerHTML = marked.parse(storedNote);

  textArea.addEventListener("input", (e) => {
    const value = e.target.value;
    mainArea.innerHTML = marked.parse(value);
    updateLocalStorage();
  });

  editButton.addEventListener("click", () => {
    textArea.classList.toggle("hidden");
    mainArea.classList.toggle("hidden");
  });

  deleteButton.addEventListener("click", () => {
    note.remove();
    updateLocalStorage();
  });

  row.append(note);
}

function updateLocalStorage() {
  const textArea = document.querySelectorAll("#text-area");
  const notes = [];
  textArea.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
