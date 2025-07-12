let employees = [
  { id: 1, firstName: "Alice", lastName: "Smith", email: "alice@example.com", department: "HR", role: "Manager" },
  { id: 2, firstName: "Bob", lastName: "Johnson", email: "bob@example.com", department: "IT", role: "Developer" },
  { id: 3, firstName: "Charlie", lastName: "Lee", email: "charlie@example.com", department: "Finance", role: "Analyst" },
];


const employeeList = document.getElementById("employee-list");
const formModal = document.getElementById("employeeFormModal");
const form = document.getElementById("employeeForm");
const formTitle = document.getElementById("formTitle");
const empIdInput = document.getElementById("empId");

document.getElementById("addEmployeeBtn").onclick = () => showForm();
document.getElementById("cancelBtn").onclick = () => hideForm();
document.getElementById("search").oninput = renderEmployees;
document.getElementById("sortSelect").onchange = renderEmployees;

form.onsubmit = function (e) {
  e.preventDefault();
  const id = empIdInput.value ? parseInt(empIdInput.value) : Date.now();
  const newEmp = {
    id,
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    department: form.department.value,
    role: form.role.value,
  };

  if (empIdInput.value) {
    employees = employees.map(emp => emp.id === id ? newEmp : emp);
  } else {
    employees.push(newEmp);
  }

  form.reset();
  hideForm();
  renderEmployees();
};

function showForm(emp = null) {
  formModal.classList.remove("hidden");
  if (emp) {
    formTitle.textContent = "Edit Employee";
    empIdInput.value = emp.id;
    form.firstName.value = emp.firstName;
    form.lastName.value = emp.lastName;
    form.email.value = emp.email;
    form.department.value = emp.department;
    form.role.value = emp.role;
  } else {
    formTitle.textContent = "Add Employee";
    form.reset();
  }
}

function hideForm() {
  formModal.classList.add("hidden");
}

function renderEmployees() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const sortBy = document.getElementById("sortSelect").value;

  let filtered = employees.filter(emp =>
    (emp.firstName + " " + emp.lastName).toLowerCase().includes(searchTerm) ||
    emp.email.toLowerCase().includes(searchTerm)
  );

  if (sortBy === "name") {
    filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
  } else if (sortBy === "department") {
    filtered.sort((a, b) => a.department.localeCompare(b.department));
  }


  employeeList.innerHTML = "";
  filtered.forEach(emp => {
    const div = document.createElement("div");
    div.className = "employee-card";
    div.innerHTML = `
      <h3>${emp.firstName} ${emp.lastName}</h3>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button class="edit" onclick='editEmp(${emp.id})'>Edit</button>
      <button onclick='deleteEmp(${emp.id})'>Delete</button>
    `;
    employeeList.appendChild(div);
  });
}

function editEmp(id) {
  const emp = employees.find(e => e.id === id);
  showForm(emp);
}

function deleteEmp(id) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees = employees.filter(e => e.id !== id);
    renderEmployees();
  }
}

renderEmployees();
