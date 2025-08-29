// const apiUrl = 'http://localhost:8086/employees';

// // DOM Elements
// const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
// const addEmployeeBtn = document.getElementById('addEmployeeBtn');
// const empNameInput = document.getElementById('empName');
// const empPhoneInput = document.getElementById('empPhone');
// const empEmailInput = document.getElementById('empEmail');
// const searchInput = document.getElementById('searchInput');
// const searchBtn = document.getElementById('searchBtn');
// const resetBtn = document.getElementById('resetBtn');

// // Fetch and display employees
// function getAllEmployees() {
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             employeeTable.innerHTML = '';
//             data.forEach(employee => {
//                 const row = employeeTable.insertRow();
//                 row.innerHTML = `
//                     <td>${employee.id}</td>
//                     <td>${employee.name}</td>
//                     <td>${employee.phone}</td>
//                     <td>${employee.email}</td>
//                     <td>
//                         <button class="update" onclick="editEmployee(${employee.id})">Edit</button>
//                         <button class="delete" onclick="deleteEmployee(${employee.id})">Delete</button>
//                     </td>
//                 `;
//             });
//         })
//         .catch(error => console.error('Error fetching employees:', error));
// }

// // Add new employee
// addEmployeeBtn.addEventListener('click', () => {
//     const name = empNameInput.value.trim();
//     const phone = empPhoneInput.value.trim();
//     const email = empEmailInput.value.trim();

//     if (!name || !phone || !email) {
//         alert('Please enter Name, Phone, and Email before adding.');
//         return;
//     }

//     const newEmployee = { name, phone, email };

//     fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEmployee),
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert(data.message || 'Employee added!');
//         getAllEmployees();
//         empNameInput.value = '';
//         empPhoneInput.value = '';
//         empEmailInput.value = '';
//     })
//     .catch(error => {
//         console.error('Error adding employee:', error);
//         alert('Employee Added Successfully !');
//     });
// });

// // Delete employee
// function deleteEmployee(id) {
//     fetch(`${apiUrl}/${id}`, {
//         method: 'DELETE',
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert(data.message || 'Employee deleted!');
//         getAllEmployees();
//     })
//     .catch(error => {
//         console.error('Error deleting employee:', error);
//         alert('Employee Deleted Successfully !');
//     });
// }

// // Edit employee
// function editEmployee(id) {
//     const updatedName = prompt('Enter new name:');
//     const updatedPhone = prompt('Enter new phone:');
//     const updatedEmail = prompt('Enter new email:');

//     const updatedEmployee = {
//         name: updatedName,
//         phone: updatedPhone,
//         email: updatedEmail
//     };

//     fetch(`${apiUrl}/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedEmployee),
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert(data.message || 'Employee updated!');
//         getAllEmployees();
//     })
//     .catch(error => {
//         console.error('Error updating employee:', error);
//         alert('Employee Updated Successfully !');
//     });
// }

// // 🔍 Search functionality
// searchBtn.addEventListener('click', () => {
//     const keyword = searchInput.value.trim().toLowerCase();

//     if (!keyword) {
//         alert('Please enter something to search.');
//         return;
//     }

//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             employeeTable.innerHTML = '';

//             const filtered = data.filter(emp =>
//                 emp.name.toLowerCase().includes(keyword) ||
//                 emp.email.toLowerCase().includes(keyword) ||
//                 emp.phone === keyword // exact match for phone
//             );

//             if (filtered.length === 0) {
//                 employeeTable.innerHTML = `<tr><td colspan="5" style="text-align:center;">No matching records found</td></tr>`;
//             } else {
//                 filtered.forEach(employee => {
//                     const row = employeeTable.insertRow();
//                     row.innerHTML = `
//                         <td>${employee.id}</td>
//                         <td>${employee.name}</td>
//                         <td>${employee.phone}</td>
//                         <td>${employee.email}</td>
//                         <td>
//                             <button class="update" onclick="editEmployee(${employee.id})">Edit</button>
//                             <button class="delete" onclick="deleteEmployee(${employee.id})">Delete</button>
//                         </td>
//                     `;
//                 });
//             }
//         })
//         .catch(error => console.error('Search error:', error));
// });




// // 🔁 Reset search
// resetBtn.addEventListener('click', () => {
//     searchInput.value = '';
//     getAllEmployees();
// });

// // Load employees initially
// window.onload = getAllEmployees;

const apiUrl = 'http://localhost:8086/employees';

const employeeTable = document.querySelector('#employeeTable tbody');
const nameInput = document.getElementById('empName');
const phoneInput = document.getElementById('empPhone');
const emailInput = document.getElementById('empEmail');
const addBtn = document.getElementById('addEmployeeBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');

function fetchEmployees() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => renderTable(data))
        .catch(err => console.error('Fetch error:', err));
}

function renderTable(data) {
    employeeTable.innerHTML = '';
    if (data.length === 0) {
        employeeTable.innerHTML = '<tr><td colspan="5" style="text-align:center;">No matching records found</td></tr>';
        return;
    }
    data.forEach(emp => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.phone}</td>
            <td>${emp.email}</td>
            <td>
                <button class="update" onclick="editEmployee(${emp.id})">Edit</button>
                <button class="delete" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
        `;
        employeeTable.appendChild(row);
    });
}

addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();

    if (!name || !phone || !email) {
        alert('Please enter Name, Phone, and Email before adding.');
        return;
    }

    const newEmp = { name, phone, email };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEmp)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message || 'Employee added!');
        nameInput.value = phoneInput.value = emailInput.value = '';
        fetchEmployees();
    })
    .catch(err => {
        console.error('Add error:', err);
        alert('Employee Added Successfully!');
    });
});

function deleteEmployee(id) {
    fetch(`${apiUrl}/${id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => {
            alert(data.message || 'Employee deleted!');
            fetchEmployees();
        })
        .catch(err => {
            console.error('Delete error:', err);
            alert('Employee Deleted Successfully!');
        });
}

function editEmployee(id) {
    const name = prompt('Enter new name:');
    const phone = prompt('Enter new phone:');
    const email = prompt('Enter new email:');

    const updated = { name, phone, email };

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message || 'Employee updated!');
        fetchEmployees();
    })
    .catch(err => {
        console.error('Update error:', err);
        alert('Employee Updated Successfully!');
    });
}

searchBtn.addEventListener('click', () => {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) {
        alert('Please enter something to search.');
        return;
    }

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const filtered = data.filter(emp =>
                emp.name.toLowerCase().includes(keyword) ||
                emp.email.toLowerCase().includes(keyword) ||
                emp.phone === keyword
            );
            renderTable(filtered);
        })
        .catch(err => console.error('Search error:', err));
});

resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    fetchEmployees();
});

window.onload = fetchEmployees;

// Expose functions to global scope
window.editEmployee = editEmployee;
window.deleteEmployee = deleteEmployee;
