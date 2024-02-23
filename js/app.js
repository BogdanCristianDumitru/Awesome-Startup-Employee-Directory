// Global Variables 
let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalClose = document.querySelector('.modal-close');
const modalContainer = document.querySelector('.modal-content');
const employeeSearch = document.getElementById('employee_search');


// Fetch data from API
fetch(urlAPI)
  .then(res => res.json())
  .then(res => res.results)
  //.then(data => console.log(data))
  .then(displayEmployees)
  .catch(err => console.log(err))

  // Display employees function
  function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = "";

    // Loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}">
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        `
    });

    gridContainer.innerHTML = employeeHTML;
  }

  // Display filtered employess function
  function displayFilteredEmployees(filteredEmployess) {

    let filteredEmployeeHTML = '';

    filteredEmployess.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        filteredEmployeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}">
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        `;
    });
    gridContainer.innerHTML = filteredEmployeeHTML;
  }

  // Function display modal
  function displayModal(index) {
    let employee = employees[index];
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;
    let street = employee.location.street;
    let postcode = employee.location.coordinates.postcode;
    let dob = employee.dob.date;
    let phone = employee.phone; 

    let date = new Date(dob);

    const modalHTML = `
        <img class="avatar" src="${picture.large}">
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr/>
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name} ${postcode}</p>
            <p>Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        <div class="modal-nav">
            <button class="prev-btn" onclick="showPrevEmployee(${index})">Previous</button>
            <button class="next-btn" onclick="showNextEmployee(${index})">Next</button>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

// Calculate the index of the previous employee function
function showPrevEmployee(currentIndex) {
    let prevIndex = (currentIndex - 1 + employees.length) % employees.length;
    displayModal(prevIndex); // Display modal for the previous employee
}

// Calculate the index of the next employee function 
function showNextEmployee(currentIndex) {
    let nextIndex = (currentIndex + 1) % employees.length;
    displayModal(nextIndex); // Display modal for the next employee
}

  

  /*
  function displayModal(index) {
    let { name, dob, phone, email, location: { city, street, postcode}, picture } = employees[index];

    let date = new Date(dob.date);
   
    const modalHTML = `
        <img class="avatar" src="${picture.large}">
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr/>
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name} ${postcode}</p>
            <p>Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        <div class="modal-nav">
            <button class="prev-btn" onclick="showPrevEmployee(${index})">Previous</button>
            <button class="next-btn" onclick="showNextEmployee(${index})">Next</button>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    }

    // Calculate the index of the previous employee function
    function showPrevEmployee(currentIndex) {
        let prevIndex = (currentIndex - 1 + employees.length) % employees.length;
        displayModal(prevIndex); // Display modal for the previous employee
    }
    
    // Calculate the index of the next employee function 
    function showNextEmployee(currentIndex) {
        let nextIndex = (currentIndex + 1) % employees.length;
        displayModal(nextIndex); // Display modal for the next employee
    }
*/

   // Modal eventListener
    gridContainer.addEventListener('click', e => {
        if (e.target !== gridContainer) {
            const card = e.target.closest(".card");
            const index = card.getAttribute('data-index');
            displayModal(index);
            }
        });
   
    modalClose.addEventListener('click', () => {
        overlay.classList.add("hidden");
    });

    // Filtered employees eventListener 

  employeeSearch.addEventListener('keyup', e => {
    let currentValue = e.target.value.toLowerCase();

    // filter employees based on the search value
    let filteredEmployess = employees.filter(employee => {
        let fullName = `${employee.name.first} ${employee.name.last}`.toLowerCase();
        return fullName.includes(currentValue);
    })

    displayFilteredEmployees(filteredEmployess);
  });

 

  