// Robert'); DROP TABLE Students; --


// no shame in reused code if it saves time

var oopsSpot = document.getElementsByClassName('oops')

function pageInitThing() {
    console.log('Fetching the goods')
    fetch('/page-init')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                renderTable(data);
            } else {
                console.warn('Expected an array, got:', data)
            }
        }) // returning the goods
        .catch(err => console.error('pageInitThing ERROR!', err)); // you gotta be #$%& kidding me
    
};

function addNewEmployee() {
    console.log('Adding new employee')
    fetch('/new_employee')
    .then(response => response.text())
    .then(data => {
        //console.log(data);
        const newWindow = window.open('/new_employee', '_blank');
        newWindow.document.open();
        newWindow.document.write(data); // okay document.write is bad but I'm in a hurry
        newWindow.document.close();
        newWindow.history.pushState({}, '', '/new_employee'); // fancy!
    })
    .catch(err => console.error('addNewEmployee ERROR!', err));
}



function crunchatizeMeCaptain() {
// The FDA has required me to inform you that JSON 
// is not part of this balanced breakfast.

// An infinitely healthier alternative to JSON is immediate defenestration.

const firstName = document.getElementById('FNBOX').value;
const lastName = document.getElementById('LNBOX').value;
    console.log("Crunchatized: " + firstName + ' ' + lastName)
    fetch(`/submit?&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`)
    // stays encoded, even in milk
    .then(response => response.json())
    .then(data => { 
        console.log(data) 
    })
}

function debugatizeMeCaptain(debugFirst, debugLast) {
    fetch(`/submit?&firstName=${encodeURIComponent(debugFirst)}&lastName=${encodeURIComponent(debugLast)}`)
    .then(response => response.json())
    .then(data => { 
        console.log(data) 
    })

}


// may not be able to get some things done in time.
// This function is just a placeholder if Enterprise is actually insane enough 
// to warrant using my software

function Nothingburger(action) {
    // I mean, I guess you could do *something* here
    // but I'm not your dad
    if (action == 'pending') {
        console.log('Pending approvals function');
    }
    else if (action == 'reminder') {
        console.log('Send reminder function');
    }

}

// honestly I'm kinda proud of this
function filterTable() {
    const option = logChange();

    const firstName = document.getElementById('firstNameBox').value;
    const lastName = document.getElementById('lastNameBox').value;

    // I'll admit I had ChudGPT help me with this part. Yeesh
    console.log("NAME DEBUG:" + firstName + ' ' + lastName)
    fetch(`/filter?option=${option}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`)
    .then(response => response.json())
    .then(data => {
        renderTable(data);
    })

    .catch(err => {
        oopsSpot.innerHTML = 'there\'s nothing here'; // sunset corp
       
    });
};

function logChange() {
    var selectedValue = document.getElementById('entryTypeSelector').value;
    return selectedValue;
};

function sayhi() {
    alert('hello');
}

function renderTable(data) {
    oopsSpot.innerHTML = '';
    const table = document.getElementById('data-table');

    if (table === null) {
        console.log("Where's the table? I'm calling my lawyer!");
        oopsSpot.innerHTML = "Your target table in the HTML is missing.";
        return;
    }

    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Create table headers
    const headers = Object.keys(data[0]);
    const headerRow = thead.insertRow();

    // Add a header for the checkbox column
    const checkboxHeader = document.createElement('th');
    checkboxHeader.textContent = 'Select';
    headerRow.appendChild(checkboxHeader);

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    // Populate table rows
    data.forEach(item => {
        const row = tbody.insertRow();

        // Add a checkbox to each row
        const checkboxCell = row.insertCell();
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'employee';
        checkbox.value = item.id || JSON.stringify(item); // Use a unique identifier or the entire item
        checkboxCell.appendChild(checkbox);

        headers.forEach(header => {
            const cell = row.insertCell();
            cell.textContent = item[header];
        });
    });
};

function yeetEmployees() {
    const selectedEmployees = Array.from(document.querySelectorAll('input[name="employee"]:checked'))
        .map(input => input.value);

    if (selectedEmployees.length === 0) {
        console.log('No employees selected');
        alert('Please select at least one employee to delete.');
        return;
    }

    console.log('Selected employees:', selectedEmployees);

    // Send the selected employees to the server
    fetch('/delete_employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employees: selectedEmployees }) // Send as JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`FIDDLESTICKS! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Delete response:', data);
    })
    .catch(err => console.error('Error deleting employees:', err))
    .then(
        renderTable(data) // Re-render the table after deletion
    )
    

    
}