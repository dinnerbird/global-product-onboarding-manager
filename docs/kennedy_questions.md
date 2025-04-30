## Hosting & Platform
- What web server are we hosting on? (AWS, Azure, school server, local test server?)
    > Local test server. I would preferably use my own server farm, but trying to communicate with it on university grounds is borderline impossible.
- Is the system browser-based only or will it have a mobile-friendly version too?
    > It's currently browser-based only, but the way I've designed it should be friendly to mobile devices too.
### Database
- Are we using MySQL 100% or something else mixed in?
    > I'm using 100% MySQL for the database backend.
- What tables are in the database?  (Example: Users Table, Trainings Table, Completion Status Table)
    > Employee data, Training materials, training status tracking, and several sub-tables to organize data (such as `CLIENT_VIEW`, `USERPASS`, and `NICERLOOKINGTABLE`) (yes, it's really called that)
### Authentication
- How is login authentication handled? (Is it secure? Are passwords hashed? Is department code verified first?)
    > Passwords are hashed and salted. (`bcrypt` with 10 salt rounds)
    > I wouldn't consider it "secure" for production use, but for the purpose of the demonstration, it's fine.
- Are accounts manually created only by Admins?
    > Right now, I only have myself as a harcoded admin with the "`HR`" role. Going into the database directly and adding another admin is the only way currently.

### Data Management
- Where is uploaded proof (like certificates or screenshots) stored?
    > According to Adam, Enterprise uses SharePoint servers (owned by Microsoft) to store their company resources. 
    > I'm thinking about using local storage for the purpose of this demonstration, but cloud storage would be best for storing larger files such as videos.

- Is there any limit on file upload sizes?
    > Maybe at most 1 GB. I don't have an idea right now how big these files should be.

### Notifications
- How are notifications handled inside the system?
  > I don't have notification support right now, and I may not have time to implement anything of the sort.
- (Only in-app alerts? Any email notifications planned or no?)

### Reports & Exports
- How are reports generated? (Direct database query? Some reporting tool?)
  > Direct database queries are the way to do things in Pathway. However, I can always cook something up if needed.
- Can reports be downloaded easily as PDF or CSV?
  > Reports can be printed by using the browser's "print to PDF" function. It's not hard to implement a "print" button on a page; I can certainly add them in.

### Admin Controls
- What functions can Admins perform? (Assign trainings, deactivate users, reset passwords, upload events, etc.)
    >Adding and removing employees, promoting/demoting them to `CURRENT` status, and uploading training materials (or other files) is the extent of what functions admins can perform.

### Other Tech Info
- Is the system responsive for different screen sizes (desktop/tablet/phone)?
    >Flex boxes should provide some ability to have it look nice on different screen sizes. I haven't tested it on my phone or tablet, but again, I've written the site in such a way where that shouldn't be an issue.

- Are there any backup procedures or is backup manual for now?
    >Backup is manual for now. It's not hard to implement backup for a database.

- What browsers are fully compatible and tested? (Chrome? Edge?)
    >I've been using Firefox as my dev environment browser (which is the odd duck out of all the others). I believe it works well enough in Chrome-based browsers including Edge.