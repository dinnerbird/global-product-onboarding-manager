const fs = require('fs');
const { parse } = require('csv');
const http = require('http');

const filePath = 'bogus_data.csv';

http.createServer((req, res) => {
    if (req.url === '/table') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        let html = `
            <table>
                <thead>
        `;

        fs.createReadStream(filePath)
            .pipe(parse({ columns: true }))
            .on('data', (row) => {
                if (!html.includes('</thead>')) {
                    html += '<tr>' + Object.keys(row).map(col => `<th>${col}</th>`).join('') + '</tr></thead><tbody>';
                }
                html += '<tr>' + Object.values(row).map(val => `<td>${val}</td>`).join('') + '</tr>';
            })
            .on('end', () => {
                html += '</tbody></table>';
                res.end(html);
            })
            .on('error', (error) => {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading CSV file: ' + error.message);
            });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404: Nah');
    }
}).listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
