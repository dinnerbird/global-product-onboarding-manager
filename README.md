# Enterprise Global Product Onboarding Manager
## Development Codename: "Picard"

Team 3

## Requirements:
- NodeJS
- SQL database of some sort. (This implementation uses MySQL)
- A brain

The purpose of this system is to streamline the Enterprise new employee onboarding process for HR. This will help facilitate better data integrity and reduce manual labor with automation.

## Components:
- Authentication Manager:
    - Username/password handling
    - Can identify the difference between HR "admins", new employees, and existing employees
- Training Material Manager:
    - Training progress database
    - HR can facilitate requests to track progress of new employees
    - Curates and hands out training deliverables to new employees
- Employee Manager:
    - Add/remove/modify employee data
    - Prepare requests for onboarding

The bogus_data CSV and XLSX files are for **debugging purposes only**, and should **__not__** be used in a production environment. Mainly because the names are a bit *silly*. 

Likewise, the database login credentials should be changed from the default.

## Demo Installation:

- NPM requirements: `mysql2, path, express`

1. Import the `bogus_data.csv` file into your MySQL client of choice (we're using Workbench)
2. Modify the `EMPLOYEE_ID` column to be the primary key, and enable "Auto Increment" (AI) (not THAT kind of AI)

```ALTER TABLE bogus_data
MODIFY COLUMN EMPLOYEE_ID INT AUTO_INCREMENT PRIMARY KEY;
```
3. Next, run `node components/enterprise_onboarding.js` to initialize the server. 
4. Inevitably swear like a sailor because some stupid unexplainable error prevented it from working right the first time