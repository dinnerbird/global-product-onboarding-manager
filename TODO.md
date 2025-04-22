# Alex's Big-Ass Todo List...
-   [ ] Write README
## "Finished" things:
-   [x] Database Manager
-   [ ] Training Manager
-   [x] `express_init`
-   [x] Putting all config in one file
-   [x] MiddleMan...mostly done

## Data Models

`Client <-> Browser <-> (MiddleMan) => (Node, MySQL on 3306, Express on 3030)`


### Training Program
- Serialized training IDs for every video.
- Title, description, and duration
- Look into category types for different use cases
  - "General"
  - "Brand New"
  - "Safety/Compliance"
### Training Status:
- I'm thinking multiple employees will have several training videos queued up.
- Status ID, serialized similar to Training ID, all are unique. Probably could get away with a unique tag of some sort
- Completion status TRUE/FALSE
- Completion date YYYY-MM-DD
    
## Components:
### Training Material Manager:
  - Training progress tracking
  - HR can facilitate requests to track progress of new employees
  - Curates and hands out training deliverables to new employees
### Employee Manager:
  - Add/remove/modify employee data
  - Promotion and ensuring HR can't be promoted by accident
### Logon Manager:
  - Username/password handling
  - Password handouts. Currently handled by hash+salted phone number
    - **This is wildly insecure,** but good enough for demonstration purposes
  - Can identify the difference between HR "admins", new employees, and existing employees
### Database Manager:
  - Users will never directly interact with the underlying database backend — in other words, no direct SQL input
  - Several tables are laid out for storing data in different spots. Consult with [the definitions file](./definitions.md) for more information.

