/*

▙▗▌▗   ▌  ▌▜    ▙▗▌      
▌▘▌▄ ▞▀▌▞▀▌▐ ▞▀▖▌▘▌▝▀▖▛▀▖
▌ ▌▐ ▌ ▌▌ ▌▐ ▛▀ ▌ ▌▞▀▌▌ ▌
▘ ▘▀▘▝▀▘▝▀▘ ▘▝▀▘▘ ▘▝▀▘▘ ▘
...Middle(ware) Management

"Just barely intelligent enough to get the job done."

*/

function yeet(error) {
    throw error;
  }
  


// This is the login function. I'll be honest I'm kinda proud of how it turned out
// It's 8am on a cloudy thursday, not even on my second cup of coffee
function showMeTheMoney() {
    console.log('sending out creds');
    const password = document.getElementById('password-input').value;
    const loginName = document.getElementById('user-input').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginName, password }),
    })
        .then(response => {
            if (response.ok) {
                console.log('Login successful');
                return response.text(); // Parse the response as plain text (HTML)
            } else {
                console.error('Login failed');
                return response.text().then(err => { throw new Error(err); });
            }
        })
        .then(html => {
            console.log('Server response received, opening in a new tab...');
            const newWindow = window.open();
            newWindow.document.open();
            newWindow.document.write(html); // is document.write really that verboten?
            newWindow.document.close();
        })
        .catch(err => {
            console.error('Error:', err);
            alert(`Error: ${err.message}`);
        });
}

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

function dashboardOverviewInit() {
    console.log('Glancing...')
    fetch('/overview-init')
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                renderTable(data);
            } else {
                console.warn('Expected an array, got:', data)
            }
        }) // returning the goods
        .catch(
            err => (
                errorMessage.innerHTML = 'There doesn\'t seem to be anything here...'))}; // you gotta be #$%& kidding me

function openEmployeeManager() {
    console.log('Opening employee manager')
    fetch('/employee_manager')
        .then(response => response.text())
        .then(data => {
            //console.log(data);
            const newWindow = window.open('/employee_manager', '_blank');
            newWindow.document.open();
            newWindow.document.write(data); // okay document.write is bad but I'm in a hurry
            newWindow.document.close();
            newWindow.history.pushState({}, '', '/employee_manager'); // fancy!
        })
        .catch(err => console.error('addNewEmployee ERROR!', err));
}

function addNewPopupBox() {
    fetch('/add_employee')
        .then(response => response.text())
        .then(data => {
            const newERWindow = window.open('/add_employee', '_blank');
        })
}

function crunchatizeMeCaptain() {

    // The FDA has required me to inform you that JSON 
    // is not part of this balanced breakfast.

    // An infinitely healthier alternative to JSON is immediate defenestration.

    const firstName = document.getElementById('FNBOX').value;
    const lastName = document.getElementById('LNBOX').value;
    const emailAddress = document.getElementById('EMAILBOX').value;
    const phoneNum = document.getElementById('TELBOX').value;

    if (!firstName || !lastName || !emailAddress || !phoneNum) {
        alert("All fields are required!");
        return false;
    }

    try {
        console.log("Crunchatized: " + firstName + ' ' + lastName + ' ' + emailAddress + ' ' + phoneNum);
        fetch(`/submit?&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&phoneNum=${encodeURIComponent(phoneNum)}&emailAddress=${encodeURIComponent(emailAddress)}`) // Stuffs it all in the endpoint POST
            .then(async response => {
                if (!response.ok) {
                    // If the response is not OK, throw an error with the response JSON
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to add employee...');
                }
                return response.json(); // Parse the JSON if the response is OK
            })
            .then(data => {
                console.log(data);
                alert(`Employee ${firstName} ${lastName} added successfully!`);
                window.close();
            })
            .catch(error => {
                console.error("Error:", error);
                alert(`Error: ${error.message}`);
            });
    } catch (error) {
        console.error("Unexpected error:", error);
    }
        
    return false;

    }


    
// may not be able to get some things done in time.
// This function is just a placeholder if Enterprise is actually insane enough 
// to warrant using my software

function Nothingburger(action) {
    // I mean, I guess you could do *something* here
    // but I'm not your dad
    if (action == 'pending') {
        alert('Pending approvals function');
    }
    else if (action == 'reminder') {
        alert('Send reminder function');
    }
    else if (action == 'register-link') {
        alert('AIN\'T YET IMPLEMENTED CHIEF');
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
            errorMessage.innerHTML = 'there\'s nothing here'; // sunset corp

        });
};

function filterHRTable() {

    const options = logChange();
    /* 
                    <option value="opt_INCOMPLETE">Incomplete</option>
                <option value="opt_NOTSTARTED">New Employee</option>
                <option value="opt_COMPLETED">Completed</option>
    */
   console.log("Selected option: " + options);

   fetch(`/filter?option=${options}`)
       .then(response => response.json())
       .then(data => {
           renderTable(data);
       })
       .catch(err => {
        errorMessage.innerHTML = 'There\'s nothing to show here.'
       });
}

function logChange() {
    var selectedValue = document.getElementById('entryTypeSelector').value;
    return selectedValue;
};

function sayhi() {
    alert('hello');
}

function renderTable(data) {

    // Locates the error message handler and cleans it out
    var errorMessage = document.getElementById('errorSpot');
    errorMessage.innerHTML = '';

    // HAS to be named data-table
    const table = document.getElementById('data-table');

    // Could have it create an element if not found but I don't feel like doing that
    if (table === null) {
        console.log("Where's the table? I'm calling my lawyer!");
        errorMessage.innerHTML = "Your target table in the HTML is missing.";
        return;
    }

    // Finds a thead and tbody
    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');

    // Cleans them out too
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Create table headers
    const headers = Object.keys(data[0]);
    const headerRow = thead.insertRow();

    // Check if it's actually the employee manager page
    // There's probably a million better ways I coul do it, but it's not like I'm being paid for my efforts...
    const isNewEmployeePage = window.location.pathname === '/employee_manager';

    if (isNewEmployeePage) {
        const checkboxHeader = document.createElement('th');
        checkboxHeader.textContent = 'Select';
        headerRow.appendChild(checkboxHeader);
        
    }

    const isClientPage = window.location.pathname === '/client_interface';
    if (isClientPage) {
        const buttonHeader = document.createElement('th');
        buttonHeader.textContent = 'Actions';
        headerRow.appendChild(buttonHeader);
        
    }

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    // Populate table rows
    data.forEach(item => {
        const row = tbody.insertRow();

        if (isNewEmployeePage) {
            const checkboxCell = row.insertCell();
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'employee';
            checkbox.value = item.id || JSON.stringify(item); // Use a unique identifier or the entire item
            checkboxCell.appendChild(checkbox);
        }

        if (isClientPage) {
            const openButtonCell = row.insertCell();
            const openButton = document.createElement('button');
            openButton.type = 'button';
            openButton.name = 'clientTrainerButton';
            openButton.value = item.id || JSON.stringify(item.ID); // id and ID are NOT THE SAME just so you know
            openButton.innerHTML = 'Start';
            openButtonCell.appendChild(openButton);
            openButton.onclick = () => selectTrainingMaterial(item.ID);
        }

        headers.forEach(header => {
            const cell = row.insertCell();
            cell.textContent = item[header];
        });
    });
};

function selectTrainingMaterial(itemID) {
    console.log('Selected Training Material ID:', itemID);

   fetch(`/training-materials/${itemID}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch training material details.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Training Material Details:', data);
        })
        .catch(err => {
            console.error('Error fetching training material details:', err);
        });
}

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
            pageInitThing()
        )

}

function gravyTrainer() {
    var errorMessage = document.getElementById('errorSpot');

    fetch('/training-materials-request')
    .then(response => {
        if (!response.ok) {
            yeet(new Error('Was not able to grab training materials.'))
            errorMessage.innerHTML = "Was not able to grab training materials"
        }
        return response.json();
        
    })
        .then(data => {
            renderTable(data);
            console.log(data);

            // Need to figure out a way to tack buttons onto the end of this table. I have a general idea of what needs to be done

        })
}


// DEmote Employees
function stragnoc() {
    const selectedEmployees = Array.from(document.querySelectorAll('input[name="employee"]:checked'))
    .map(input => input.value);

if (selectedEmployees.length === 0) {
    console.log('No employees selected');
    alert('Please select at least one employee to demote.');
    return;
}

console.log('Selected employees:', selectedEmployees);

fetch('/DEMOTE_employees', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ employees: selectedEmployees }) // Send as JSON
})
    .then(response => {
        if (!response.ok) {
            alert("An error occurred while promoting. Please check the console.");

        }
        if (response.ok) {
            alert('Employees *demoted* successfully!');
        }
        return response.json();
    })
    .then(data => {
        console.log('Response:', data);

        pageInitThing();
    });
}

// PROmote Employees
function congrats() {
    const selectedEmployees = Array.from(document.querySelectorAll('input[name="employee"]:checked'))
        .map(input => input.value);

    if (selectedEmployees.length === 0) {
        console.log('No employees selected');
        alert('Please select at least one employee to promote.');
        return;
    }

    console.log('Selected employees:', selectedEmployees);



    // Send the selected employees and designation to the server
    fetch('/promote_employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employees: selectedEmployees }) // Send as JSON
    })
        .then(response => {
            if (!response.ok) {
                alert("An error occurred while promoting. Please check the console.");

            }
            if (response.ok) {
                alert('Employees promoted successfully!');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data);

            pageInitThing();
        });
}


// This is a friendly way to greet the user.
// Demosceners triggering seizures at a party just to say hello to their friends:
function getTheGreetz() {
    window.history.pushState({}, '', '/client_interface');
    fetch('/get-login-name')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to get login name.')
        }
        return response.json();
    })
    .then(data => {
        const loginName = data.loginName
        console.log('Login name: ', loginName);

        const greetzH2 = document.getElementById('GREETZ');
        let formattedLoginName = loginName.replace(/([A-Z][^A-Z]*)([A-Z])/, '$1 $2'); // I feel like I could type complete gibberish and it would still make less sense than regex.
        greetzH2.innerHTML = 'Hello, ' + formattedLoginName + '!';
        console.log(formattedLoginName);

        // Throw formatted login name back to the database, see what matches?
    })
    .catch(err => {
        console.error('Error caught for login name:', err);
    });


}