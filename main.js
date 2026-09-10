// Array to hold students
let students = [];

// Load from localStorage on page load
window.onload = function () {
  const stored = localStorage.getItem('students');
  if (stored) {
    students = JSON.parse(stored);
  }
  displayStudents();
};

// Handle form submit
document.getElementById('studentForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const studentId = document.getElementById('studentId').value.trim();
  const grade = document.getElementById('grade').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  // Simple validation
  if (!name || !studentId || !grade || !email || !phone) {
    alert('Please fill all fields');
    return;
  }

  const student = { name, studentId, grade, email, phone };
  students.push(student);

  saveToLocalStorage();
  displayStudents();

  // Reset form
  document.getElementById('studentForm').reset();
  alert('Student added successfully!');
});

// Display students in table
function displayStudents() {
  const tbody = document.getElementById('studentTableBody');
  const emptyMsg = document.getElementById('emptyMessage');
  tbody.innerHTML = '';

  if (students.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  } else {
    emptyMsg.style.display = 'none';
  }

  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.grade}</td>
      <td>${student.email}</td>
      <td>${student.phone}</td>
      <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

// Delete student
function deleteStudent(index) {
  if (confirm('Are you sure you want to delete this student?')) {
    students.splice(index, 1);
    saveToLocalStorage();
    displayStudents();
  }
}

// Save to localStorage
function saveToLocalStorage() {
  localStorage.setItem('students', JSON.stringify(students));
}