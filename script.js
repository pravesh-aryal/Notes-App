const editorWindow = document.querySelector(".editor");
console.log("hellssso worly");
let btnAddNote = document.querySelector(".btn-add-note");
const allNotes = new Map();
const sideControlsEl = document.querySelector(".note-operations");
let noteTitle;
let noteId;
let sidebarNoteEl;
let noteText;
let newNoteEl;
let newSidebarEl;
let currentlyDisplayedNoteID;
let clickedNoteElementClass;
let noteCount = 0;
// const idStorage = new Map(); // where first element is the id of note container and second is the id of side note element
function noteIdCreator() {
  return ++noteCount;
}

btnAddNote.addEventListener("click", function () {
  showEditor();
  updateSidebar();

  sidebarNoteEl = document.querySelectorAll(".note");
  console.log(sidebarNoteEl);
  console.log(currentlyDisplayedNoteID);
  eventAdder(sidebarNoteEl);
  afterAddNote();
  markingSelection();
  // removingProcess();
});

function showEditor() {
  if (
    typeof document.querySelector(".default-msg") != undefined &&
    document.querySelector(".default-msg") != null
  ) {
    document.querySelector(".default-msg").remove();
  }
  currentlyDisplayedNoteID = `note-${noteIdCreator()}`;
  console.log(currentlyDisplayedNoteID);
  // document.querySelector(".container-editor").insertAdjacentHTML(
  //   "afterbegin",
  //   `<div class='current-note' id='${currentlyDisplayedNoteID}'>
  //     <div>
  //       <div
  //     id="editor-text-title"
  //     class="editor-text-title"
  //     contenteditable="true"
  //     data-text="Untitled"
  //       ></div>
  //     </div>
  //     <div>
  //       <div
  //     name=""
  //     id="editor-text"
  //     class="editor-text"
  //     contenteditable="true"
  //     data-text="Text here..."
  //       ></div>
  //       </div>
  //   </div>`
  document.querySelector(
    ".container-editor"
  ).innerHTML = `<div class='current-note' id='${currentlyDisplayedNoteID}'>
      <div>
        <div
      id="editor-text-title"
      class="editor-text-title"
      contenteditable="true"
      data-text="Untitled"
        ></div>
      </div>
      <div>
        <div
      name=""
      id="editor-text"
      class="editor-text"
      contenteditable="true"
      data-text="Text here..."
        ></div>
        </div>
    </div>`;
  //   );
}
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
function updateSidebar() {
  console.log(currentlyDisplayedNoteID);
  sideControlsEl.insertAdjacentHTML(
    "beforeend",
    `<div class="${currentlyDisplayedNoteID} note" >
<div class="${currentlyDisplayedNoteID}" >
 Untitled
 </div>
 <img src="trash.svg" alt="" id="trash-icon" class="${currentlyDisplayedNoteID} trash-icon" >
</div>`
  );
  // document.querySelector(".note").addEventListener("mouseover", function () {
  //   document.querySelector(".trash-icon").style.display = "block";
  // });
}
function eventAdder(sidebarNoteEl) {
  for (each of sidebarNoteEl.values()) {
    if (each.getAttribute("listener") !== "true") {
      each.setAttribute("listener", "true");
      each.addEventListener("click", function (e) {
        clickedNoteElementClass = e.target.getAttribute("class").split(" ")[0];
        currentlyDisplayedNoteID = clickedNoteElementClass;
        console.log(clickedNoteElementClass);
        [title, text] = allNotes.get(clickedNoteElementClass) || ["", ""];
        console.log(title, text);
        editorWindow.querySelector(".editor-text-title").textContent = title;
        editorWindow.querySelector(".editor-text").textContent = text;
        each = undefined;
      });
    }
  }
}

function afterAddNote() {
  document
    .getElementById("editor-text-title")
    .addEventListener("keyup", function () {
      console.log("editor title box clicked");
      console.log(currentlyDisplayedNoteID);

      document.querySelector(
        `.${currentlyDisplayedNoteID}`
      ).firstElementChild.textContent =
        document.querySelector(".editor-text-title").textContent || "Untitled";
      noteTitle = document.querySelector(".editor-text-title").textContent;
      // console.log(noteTitle);
      allNotes.set(currentlyDisplayedNoteID, [noteTitle, noteText]);
      console.log([...allNotes]);
    });
  noteTitle = "";

  document.getElementById("editor-text").addEventListener("keyup", function () {
    noteText = document.querySelector(".editor-text").textContent;
    console.log("keyup vayo hai");
    console.log(document.getElementById("editor-text").textContent);

    console.log(currentlyDisplayedNoteID);

    allNotes.set(currentlyDisplayedNoteID, [noteTitle, noteText]);
    console.log([...allNotes]);
  });
  noteText = "";
}
function saveChanges() {
  // console.log("changes saved");
  document.getElementById(currentlyDisplayedNoteID);
  newTitle = document.querySelector(".editor-text-title").value;
  newText = document.querySelector(".editor-text").value;
  // console.log(newTitle, newText);
  allNotes.set(currentlyDisplayedNoteID, [newTitle, newText]);
}

function noteTitleMaker(noteTitleEl, noteText) {
  if (noteTitleEl.textContent.length != 0) {
    return noteTitleEl.textContent;
  } else {
    return noteText.split(" ")[0];
  }
}
let fontFace;
let currentFont = document.getElementById("fonts");
currentFont.addEventListener("click", function () {
  console.log("c1");
  fontFace = currentFont.value;
  document.querySelector(".editor").style.fontFamily = fontFace;
});
let x = 0;
