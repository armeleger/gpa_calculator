const form = document.getElementById("assignment-form");
const nameInput = document.getElementById("assignment-name");
const gradeInput = document.getElementById("assignment-grade");
const gpaValue = document.getElementById("gpa-value");
const entriesList = document.getElementById("entries");

let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

function updateGPA() {
  const total = assignments.reduce((sum, a) => sum + parseFloat(a.grade), 0);
  const gpa = assignments.length > 0 ? (total / assignments.length).toFixed(2) : "0.00";
  gpaValue.textContent = gpa;
}

function renderAssignments() {
  entriesList.innerHTML = "";
  assignments.forEach((assignment) => {
    const li = document.createElement("li");
    li.textContent = `${assignment.name} - Grade: ${assignment.grade}`;
    entriesList.appendChild(li);
  });
}

function saveToLocalStorage() {
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const grade = parseFloat(gradeInput.value);
  if (name && !isNaN(grade) && grade >= 0 && grade <= 5) {
    assignments.push({ name, grade });
    nameInput.value = "";
    gradeInput.value = "";
    updateGPA();
    renderAssignments();
    saveToLocalStorage();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "s") {
    console.log("All Assignments:", assignments);
  }
});

// Initial load
renderAssignments();
updateGPA();

