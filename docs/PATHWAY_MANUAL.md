PATHWAY Training Tracking System

User Manual – Global Product Department
Enterprise Mobility
Spring 2025

Adam Arbini | Kennedy Moore | Alex Helton | Cat Munyaka | Daniel Abbas | Smit Kansara


Spring 2025 – INFSYS 4850 Capstone Project

User Manual – Global Product Department

[- I. System Overview](#i-system-overview)
[- II. Application Overview](#ii-application-overview)
- [I. System Overview](#i-system-overview)
- [II. Application Overview](#ii-application-overview)
- [2.1 Login Page](#21-login-page)
- [2.2 Dashboard Interface](#22-dashboard-interface)
    - [2.2.1 Manager Dashboard:](#221-manager-dashboard)
    - [2.2.2 New Employee Dashboard](#222-new-employee-dashboard)
  - [2.3 Add/Edit Employees](#23-addedit-employees)
  - [2.4 Generate Reports](#24-generate-reports)
  - [2.5 Known Limitations](#25-known-limitations)
- [III. System Navigation \& User instructions](#iii-system-navigation--user-instructions)
  - [3.1. Login Screen](#31-login-screen)
  - [3.2. Main Menu Navigation](#32-main-menu-navigation)
    - [3.2.1 Manager Dashboard](#321-manager-dashboard)
    - [3.2.2 Employee Dashboard](#322-employee-dashboard)
  - [3.3 Edit Employee](#33-edit-employee)
    - [Key Features:](#key-features)
  - [3.4 Add New Employee](#34-add-new-employee)
- [IV. Support and Troubleshooting](#iv-support-and-troubleshooting)
  - [General Help](#general-help)
  - [Login Help](#login-help)


## I. System Overview

PATHWAY is a standalone employee training tracing system designed to improve the
training preparation process for the Global Products Team at Enterprise Mobility.

The system provides a centralized platform where managers can assign training tasks, track employee progress, and generate complete reports, while employees can easily view and complete and report their required training. PATHWAY was created to replace the Global Products department’s previous manual process. 
By using PATHWAY, Enterprise Mobility aims to improve training accountability, reduce administrative workload, and ensure that employees are properly prepared for their roles.

PATHWAY is a secure, web-based application that does not require integration with Enterprise’s internal infrastructure. 

Access is limited to **authorized Enterprise Mobility employees**, with managers responsible for creating employee accounts. The system supports distinct user roles — including "HR" and "New" employees of the Global products Department — ensuring each user only sees the tools and data relevant to their role.

## II. Application Overview
This section outlines the primary features and functionality available within the PATHWAY system.

The PATHWAY system is a browser-based application with a user-friendly interface that supports two main user roles: Management and Employee. Managers can add employees, assign training tasks, track progress, and generate reports, while employees log in to view and log their completed assigned training. All system functionality is accessed via secure login, and navigation is designed to be easy to use for non-technical users.

The following sections provide visual guidance for logging in, managing training records, and using PATHWAY’s core features.

## 2.1 Login Page
Access to the PATHWAY system is restricted to administrative users. Each admin must enter a valid username and password to log in. All passwords are securely hashed and salted using bcrypt encryption standards to protect user credentials. Once authenticated, users are redirected to the dashboard where core features can be accessed.

## 2.2 Dashboard Interface
The dashboard serves as the central workspace for all user actions. From this interface, administrators can manage employee records, view training progress, and interact with uploaded training materials. The layout is designed to be user-friendly and intuitive, allowing quick access to all primary functions. 

There are two main user login types: Managers and Employees.

#### 2.2.1 Manager Dashboard:

Within the PATHWAY management dashboard, managers have the ability to add and edit employee profiles, monitor individual training progress, and generate PDF reports summarizing completion status and assigned tasks.

#### 2.2.2 New Employee Dashboard

The PATHWAY Employee Dashboard provides new hires with a personalized view of their assigned training tasks. Employees are greeted with a personalized interface that lists their outstanding training modules, categorized by training type. Users can select training categories to filter module types, mark items as completed, and track their own progress

### 2.3 Add/Edit Employees

The add and edit employees interface allows managers to easily create, update, or deactivate employee profiles within the PATHWAY system. When onboarding a new hire, managers can enter essential information such as name, job title, email address, etc. to create a new employee profile for the system. 

For existing employees, the edit employee interface provides a quick way to update roles, correct information, and adjust access as needed. The layout minimizes errors and ensures that all employee records remain accurate and up to date.

### 2.4 Generate Reports

The PATHWHAY system includes a built-in reporting feature that allows managers to generate professional, print-ready PDF reports summarizing employee training progress. These reports display key details such as complete tasks, outstanding assignments, and training categories. This functionality is useful for internal documentation, performance reviews, and client-facing updates that require proof of training completion. Managers can export accurate, up-to-date information without manually compiling spreadsheets or emails, saving time and minimizing admin overhead.

### 2.5 Known Limitations

`TBA – waiting on development`


## III. System Navigation & User instructions

The PATHWAY Training Tracking System has been designed with ease of use in mind, offering a straightforward navigation structure and intuitive user actions. All functions are accessible via the main dashboard once an admin user logs in.

### 3.1. Login Screen

The login screen is the entry point for all authorized suers of the PATHWAY Training Tracking system, including both Managers and New Employees

**_How to Log In:_**

- **1. Navigate to the Login Page**
    a. Open a secure browser and go to the PATHWAY system URL provided by your
       team lead or manager.


- **2. Enter Your Credentials**
    a. Type your **username** and **password** into the designated fields.
       i. For new employees, credentials are provided by your manager.
    b. Each user has a unique login—passwords are system-generated and securely
       encrypted.

- **3. Click the Green “Login” Button**
- **4. This will authenticate your account and direct you to the dashboard *specific to your role*.**

### 3.2. Main Menu Navigation

#### 3.2.1 Manager Dashboard
After logging in, managers are directed to the **Manager Dashboard**, the central hub for overseeing employee training progress and managing system functions.

**Manager Dashboard map:**

1. **Greeting Message**
   - Displays a personalized welcome (e.g., _"Hello, Alex Helton!"_ ) to confirm login identity and user role.
2. **Reset Table Button**
    - Clears all filters and returns the dashboard table to its default view
    - Helpful when switching between employee Views or after using search/filter features

3. **Edit Employees**
    - Opens the employee management interface.
    - Allows the manager to:
      - Add new employees
      - Edit existing employee records
      - Promote/demote user roles
      - Remove inactive users

4. **Print Report**
    - Generates a PDF report of the current dashboard table view
       - If employee FIRST and LAST name is entered into the name filter box, it will generate a report that that single employee's training status only
    - Useful for saving or sharing records of training completion across department and for audit reports
5. **Filter by status**
    - Dropdown menu to filter completion status of employee trainings
       - “Incomplete”
       - “Complete”
    - Allows manager to focus on specific employee training stages
6. **Filter fields & button**
    - Input requirement fields (e.g: First name / Last name) to filter one employee
       training completing status; indicated on training overview table (7)
    - The "Filter!" Button applies all selected filters (status + name)
7. **Employee Summary Table**
    - Displays employee names alongside their training progress
       - Default table shows all employees' training status
    - Once employee FIRST and LAST NAMES are entered, press FILTER to update the table and share specified employee training completion status
    - "NOT STARTED" and "COMPLETED" columns reflect real-time training item
       counts of the employee self-reported training material

#### 3.2.2 Employee Dashboard

After logging in with new employee credentials, employees are directed to the **New Employee Onboarding Portal**. This dashboard is where employees can view, organize, and report their assigned training tasks.

1. **Personalized Greeting**
    - Personalized Greeting welcomes the user (e.g., _"Hello, Joe Rottman!"_ )
2. **Unfinished Training Counter**
    - Represents the number of training assignments the employee has not yet completed
    - **_“Unfinished Training: [X] Items”_** – X represents number
3. **Training Category Buttons**
    - Training Buttons allows employees to sort and view training items by category:
      - Cohort Training
      - Skills Workshop
      - General Training

These employees prioritize and organize their training session based on type.

4. **Training Table**
    - Displays each assigned training item with keys details:
       - **Training Title** – The name of the module
       - **Category** – The training type
       - **Checkbox (under Actions)** - Lets the employee mark when the training has
          been completed
**5. Save Changes Button**
    - Once items are checked off, Clicking **Save Changes** updates the employee’s training
       record
    - The action ensures that managers can view the most up-to-date training status on their
       dashboard

### 3.3 Edit Employee


The **Edit Employees** interface allows managers to view and manage existing employee records
and adding a new employee.


#### Key Features:

1. Reset Table: Refreshes the employee list and clears any filters taht may be applied
2. Remove Selected: Deletes the selected employee(s) from the system
    _2.1.This action_ **_CANNOT_** _be undone!_
3. Promote Selected: Changes a users' designation from “NEW EMPLOYEE” to
    “CURRENT EMPLOYEE” or another admin-level role (HR)
4. Demote Selected: Reverts an employee designation
    (_Accidentally promoted an employee from new to current? Selected Demote to correct that error._)
5. Add employee: Launches a form to enter a new employee’s first name, last name, email address, and phone number
6. Sort by Dropdown: Sorts the employee list by their role (New, Current, HR) for quicker filtering
7. Search Fields & Filter Button: Narrow the list of employees by entering a first or last name and clicking “Filter!” to return specific results

### 3.4 Add New Employee

The **Add Employee** screen allows managers to quickly input new employees' information into
the PATHWAY system. This feature enables account creation and ensures new hires can access
their assigned trainings list.

**_Add Employee Instructions:_**

- **First Name / Last Name Fields:** Enter the employee’s legal first and last name.
- **Email Address:** Input the employee’s work email address.
- **Phone Number:** Enter a contact number for record-keeping or communication purposes.
- **Cancel Button:** Discards the current form and returns the manager to the previous screen
    without saving any entered data.
- **Submit Button:** Saves the entered information and automatically generates login
    credentials (username and password) for the employee. The username is the employee’s
    name in this format: `FirstnameLastname` (e.g. `JohnSmith`). The password is the employee’s phone number.

## IV. Support and Troubleshooting

### General Help

- If issues arise while using Pathway, start by referring to the relevant sections of this user guide for step-by-step help. We also recommend checking your internet connection and refreshing your browser to reload the system.

- Each page within Pathway includes a “Help” button that links directly to guidance for that specific interface. 
- These guides include clear descriptions of all expected features and functions to help you resolve issues quickly.

### Login Help

- If an employee is unable to log in to Pathway, start by verifying whether they have access to the system. 
  - *You can do this by searching for their name on the Manager Dashboard or in the “Edit Employees” interface.*

- If the employee is not in the system, add them as a user through the “Edit Employees” interface. Once their profile is created, login credentials are automatically generated.

- The username is the **employee’s first and last name** (no spaces or special characters).


- The password is the **employee’s phone number** (numbers only).

Once the account is created, the manager can share these credentials with the employee. If login problems continue, ensure the credentials are entered correctly and that there are no typos in the employee’s profile.


