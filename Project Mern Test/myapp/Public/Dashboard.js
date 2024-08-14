function employeeList() {
    const employeeSection = document.getElementById("employee-section");
    employeeSection.style.display = "block";
}


document.getElementById('employeeForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        f_Id: document.getElementById('f_Id').value,
        f_Image: document.getElementById('f_Image').value,
        f_Name: document.getElementById('f_Name').value,
        f_Email: document.getElementById('f_Email').value,
        f_Mobile: document.getElementById('f_Mobile').value,
        f_Designation: document.getElementById('f_Designation').value,
        f_gender: document.querySelector('input[name="gender"]:checked').value,
        f_Course: document.getElementById('f_Course').value,
        f_Createdate: document.getElementById('f_Createdate').value
    };

    const response = await fetch('/employees/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    });

    if (response.ok) {
        alert('Employee added successfully');
        employeeList();
    } else {
        alert('Failed to add employee');
    }
});


async function editEmployee(id) {
    // Fetch the employee data
    const response = await fetch(`/employees/${id}`);
    const employee = await response.json();

    // Populate form fields with existing data
    document.getElementById('f_Id').value = employee.f_Id;
    document.getElementById('f_Image').value = employee.f_Image;
    document.getElementById('f_Name').value = employee.f_Name;
    document.getElementById('f_Email').value = employee.f_Email;
    document.getElementById('f_Mobile').value = employee.f_Mobile;
    document.getElementById('f_Designation').value = employee.f_Designation;
    document.querySelector(`input[name="gender"][value="${employee.f_gender}"]`).checked = true;
    document.getElementById('f_Course').value = employee.f_Course;
    document.getElementById('f_Createdate').value = employee.f_Createdate;

    // Show update button
    document.getElementById('updateButton').style.display = 'block';
}

document.getElementById('updateButton').addEventListener('click', async () => {
    const updatedData = {
        f_Id: document.getElementById('f_Id').value,
        f_Image: document.getElementById('f_Image').value,
        f_Name: document.getElementById('f_Name').value,
        f_Email: document.getElementById('f_Email').value,
        f_Mobile: document.getElementById('f_Mobile').value,
        f_Designation: document.getElementById('f_Designation').value,
        f_gender: document.querySelector('input[name="gender"]:checked').value,
        f_Course: document.getElementById('f_Course').value,
        f_Createdate: document.getElementById('f_Createdate').value
    };

    const id = document.getElementById('f_Id').value;

    const response = await fetch(`/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    });

    if (response.ok) {
        alert('Employee updated successfully');
        employeeList(); 
    } else {
        alert('Failed to update employee');
    }
});


document.querySelector('.logout-button').addEventListener('click', () => {
    sessionStorage.clear();
    window.location.href = '/login.html';
});
