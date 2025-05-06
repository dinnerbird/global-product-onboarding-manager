/*

▙▗▌▗   ▌  ▌▜    ▙▗▌      
▌▘▌▄ ▞▀▌▞▀▌▐ ▞▀▖▌▘▌▝▀▖▛▀▖
▌ ▌▐ ▌ ▌▌ ▌▐ ▛▀ ▌ ▌▞▀▌▌ ▌
▘ ▘▀▘▝▀▘▝▀▘ ▘▝▀▘▘ ▘▝▀▘▘ ▘
...Middle(ware) Management

"Just barely intelligent enough to get the job done."

*/

/* Please excuse the egregious use of document.write(). It was not my first choice either, but I'm on a very, VERY short schedule. */


/* Developers often have an ugly app but they don't know it's ugly, in the same way parents don't know they have an ugly baby. */
/* The baby's ugly, but it's still a baby. */

function startClientInterface() {
    getTheGreetz();
    gravyTrainer();
    changeAddress('/client_interface');
    callYouOutonYourBullhonkey();
}
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

                alert('Unauthorized. Invalid username or password.');
                console.error('Login failed');
                return response.text().then(err => { throw new Error(err); });

            }
        })
        .then(html => {
            const newWindow = window.open();
            newWindow.document.open();
            newWindow.document.write(html); // is document.write really that verboten?
            newWindow.document.close();

        })

}


// This is the function that started all the trouble.
// I *think* this only applies to the employee editor page. 
// I don't know, don't touch.
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

// More than likely deprecated due to killing off training material mgmt. What the hell was I thinking?
function trainingManagerTableRenderThing() {
    console.log('Fetching the goods')
    fetch('/training-page-init')
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


// Dashboard overview for HR.
// If you know the reference, more power to you.
function dashboardOverviewInit() {
    console.log('Glancing...')
    document.getElementById('snitchBox').innerHTML = '';
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
                errorMessage.innerHTML = 'There doesn\'t seem to be anything here...'))
}; // you gotta be #$%& kidding me


// Opens the employee manager in a new window.
function openEmployeeManager() {
    console.log('Opening employee manager');
    fetch('/employee_manager')
        .then(response => response.text())
        .then(html => {
            const newWindow = window.open();
            newWindow.document.open();
            newWindow.document.write(html); // Forgive me Father, for I have sinned.
            newWindow.location.href = 'employee_manager';

            newWindow.document.close();
        })
}

// That was easy...?
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
        fetch(`/submit?&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}&phoneNum=${encodeURIComponent(phoneNum)}&emailAddress=${encodeURIComponent(emailAddress)}`)
            // Stuffs it all in the endpoint POST
            // I think this is close to 200 characters total.

            // This is the equivalent of like...a 10 foot party sub or something.
            // ...and I think the mayonnaise is starting to turn.
            // Two more feet, and I can throw it in the fridge.

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
                // I would like to be alone with the sandwich for a moment.
            });
    } catch (error) {
        console.error("Unexpected error:", error);
    }

    return false;

}
// I'm worried that I may not be able to get some things done in time.
// This function is just a placeholder if Enterprise is actually insane enough to warrant using my software.

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
        alert('Not implemented.');
    }

}

// !!! Only works on HR dashboard !!!
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


// USE THIS INSTEAD it's much nicer written AND can account for other dropdowns
function filterTableFancy() {

    const firstName = document.getElementById('firstNameBox').value;
    const lastName = document.getElementById('lastNameBox').value;

    const options = logChange();

    console.log("Selected option: " + options);
    console.log("NAME DEBUG:" + firstName + ' ' + lastName)
    fetch(`/filter?option=${options}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`)
        .then(response => response.json())
        .then(data => {
            renderTable(data);
        })
        .catch(err => {
            const errorMessage = document.getElementById('errorSpot');

            errorMessage.innerHTML = 'There\'s nothing to show here.'
        });


    if (window.location.pathname === '/hr_interface') {
        // "Snitch" component
        console.log('yes on hr interface');
        fetch(`/filter-reporter?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const snitchBox = document.getElementById('snitchBox');
                snitchBox.innerHTML = prettyUpJsonData(data);
                // this is going to break horribly
            })
    }
// functionality changed, keeping for posterity though
}

function logChange() {
    var selectedValue = document.getElementById('entryTypeSelector').value;
    return selectedValue;
};

function davidPhantom() {
    alert('Hello! How are you today?');
}

// Fifty-something cases of Bull Honkey!

// For the client to track their own progress. Janky as hell, can't figure out how to do it "nicely"
function callYouOutonYourBullhonkey() {
    fetch('/client-reporter')
        .then(response => response.json())
        .then(data => {
            const reporterSpot = document.getElementById('progress_report');
            reporterSpot.innerHTML = prettyUpJsonData(data);
        })
        .catch(err => {
            console.error('Error fetching client report:', err);
            const reporterSpot = document.getElementById('progress_report');
            reporterSpot.innerHTML = 'Failed to load client report.';
        });
}

// This is the big function that's responsible for rendering tables that you see all over Pathway.
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
        const clientCboxHeader = document.createElement('th');
        clientCboxHeader.textContent = 'Actions';
        headerRow.appendChild(clientCboxHeader);

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
            const clientCboxCell = row.insertCell();
            const clientCbox = document.createElement('input');
            clientCbox.type = 'checkbox';
            clientCbox.name = 'clientTrainerButton';
            clientCbox.value = item.id || JSON.stringify(item); // id and ID are NOT THE SAME just so you know
            clientCboxCell.appendChild(clientCbox);
        }

        headers.forEach(header => {
            const cell = row.insertCell();
            cell.textContent = item[header];
        });
    });
}

// For client interface. 
function accessTraining(itemCategory) {
    console.log('Selected Training Material ID:', itemCategory);

    fetch(`/training-materials-request/?&itemCategory=${encodeURIComponent(itemCategory)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch training material details.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Training Material Details:', data);
            renderTable(data);
        })
        .catch(err => {
            console.error('Error fetching training material details:', err);
        });
}

// Delete employees from selected checkboxes.
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

// Submit training function. 
// This took me an ungodly amount of time to figure out.
function checkOffsGun() {
    // If in the first act you have hung a pistol on the wall...
    const selectedMaterials = Array.from(document.querySelectorAll('input[name="clientTrainerButton"]:checked'));

    // Fill your cravings
    const circusOfValues = selectedMaterials.map(material => material.value);

    fetch('/complete-training', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ materials: circusOfValues }) // Convert the array to JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Response:', data);
            alert('Training materials marked as complete successfully!');
            renderTable(data);
        })
}

// Requests training materials and slaps them into the desired page
function gravyTrainer() {
    const errorMessage = document.getElementById('errorSpot');
    if (!errorMessage) {
        console.error('Error spot element not found in the DOM.');
        return;
    }

    fetch('/training-materials-request')
        .then(response => {
            if (!response.ok) {
                errorMessage.innerHTML = "Was not able to grab training materials";
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            renderTable(data);
            // Hi, if you're having an error here, this isn't the place to look
        })
}


// DEmote Employees

// (...it's "congrats" backwards)
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


// This is a friendly way to greet the user. Right now the regex is totally bonkers and I can't be bothered right now.
// If you goof up the capitalization, it'll just have a really bad day

// >demosceners when they trigger seizures at a party just to say hello to their friends:
function getTheGreetz() {

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
            let formattedLoginName = loginName.replace(/([A-Z][^A-Z]*)([A-Z])/, '$1 $2');
            // I could type a 10 volume compendium of pure gibberish and it would still make more sense than regex
            greetzH2.innerHTML = 'Hello, ' + formattedLoginName + '!';
            console.log(formattedLoginName);

            // Throw formatted login name back to the database, see what matches???
        })
        .catch(err => {
            console.error('Error caught for login name:', err);
        });


}

function changeAddress(newPath) {
    history.pushState(null, '', newPath);
}


function prettyUpJsonData(data) {
    return JSON.stringify(data, null, 2)
        .replace(/[\{\}\[\]"]/g, '') // Remove braces, brackets, and quotes
        .replace(/, /g, '\n')         // Replace commas with newlines
        .replace(/:/g, ': ')      // Add space after colons
        .replace(/,\s*$/gm, ''); 
        // You know, I put an infinite number of monkeys at an infinite number of computers and they just kept making more JS frameworks!
}
