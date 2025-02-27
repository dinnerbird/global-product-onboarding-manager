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

The bogus_data CSV and XLSX files are for **debugging purposes only**, and should **__not__** be used in a production environment. Mainly because the names are a bit *silly*...
