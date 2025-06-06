# Pathway Employee Management and Onboarding System

## Requirements:
- NodeJS
- SQL database of some sort. (This implementation uses MySQL)
- A brain
- Patience

The purpose of this system is to streamline the Enterprise new employee onboarding process for HR. This will help facilitate better data integrity and reduce manual labor with automation.

## Components:
- Authentication Manager:
    - Username/password handling
    - Can identify the difference between HR "admins", new employees, and existing employees
    - Works fine half of the time, all of the time
- Training Material Manager:
    - Training progress database
    - HR can facilitate requests to track progress of new employees
    - Curates and hands out training deliverables to new employees
- Employee Manager:
    - Add/remove/modify employee data
    - Prepare requests for onboarding
- Login Manager:
    - Does exactly what it says on the tin.
    - Handles logins AND knows the difference between HR and employees.
    - May also be held together with nails and duct tape.
The bogus_data CSV and XLSX files are for **debugging purposes only**, and should **__not__** be used in a production environment. Mainly because the names are a bit *silly*. 

Likewise, the database login credentials should be changed from the default.

## Running the darn thing
Run `node components/enterprise_onboarding.js` to initialize the server. 

Inevitably swear like a sailor because some stupid unexplainable error prevented it from working right the first time.
