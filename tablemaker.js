
const oopsSpot = document.getElementById('oops')

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
        .catch(err => console.error('ERROR!', err)); // you gotta be #$%& kidding me
    
};

function filterTable() {
    const option = logChange();

    const firstName = document.getElementById('firstNameBox').value;
    const lastName = document.getElementById('lastNameBox').value;

    console.log("NAME DEBUG:" + firstName + ' ' + lastName)
    fetch(`/filter?option=${option}&firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`)
    .then(response => response.json())
    .then(data => {
        renderTable(data);
    })
    .catch(err => {
        oopsSpot.innerHTML = 'there\'s nothing here';
       
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
        /*
        <table id="data-table">
        <thead></thead>
        <tbody></tbody>
        </table>
        */
    }



    const thead = table.querySelector('thead');
    const tbody = table.querySelector('tbody');
    
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // make those headers
    const headers = Object.keys(data[0]);
    const headerRow = thead.insertRow();

    headers.forEach(header => {
        const th = document.createElement('th'); // mike tyson
        th.textContent = header; 
        headerRow.appendChild(th);
    });
    
    //make the magic happen
    data.forEach(item => {
        const row = tbody.insertRow();
        headers.forEach(header => { //ideally you want to use a forEach here. Like plugging surge protectors
            const cell = row.insertCell();
            cell.textContent = item[header];
        });
    });

}
