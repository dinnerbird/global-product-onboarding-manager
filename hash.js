// **NOTE THIS IS JUST FOR ME, DO NOT USE IN PROD!**


const bcrypt = require('bcrypt');

const password = process.argv[2]; // Get the password from the command line
const saltRounds = 10; // Number of salt rounds

if (!password) {
    console.error("Please provide a password to hash.");
    process.exit(1);
}

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
        console.error("Error hashing password:", err);
        process.exit(1);
    }
    console.log("Hashed password:", hash);
});
