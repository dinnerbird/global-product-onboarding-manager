// This script is just so I can test hashing, may not become a part of prod


// Simple and Accessible Hash (SAHash)

const bcrypt = require('bcrypt');

const password = process.argv[2]; // Get the password from the command line
const saltRounds = 10; // Number of salt rounds
function scatteredSmotheredCovered() {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
        }
        console.log("Hashed password:", hash);
    });
}
if (!password) {
    console.error("Please provide a password to hash.");
    process.exit(1);
}

scatteredSmotheredCovered(); // really wanting some waffle house, can you tell?