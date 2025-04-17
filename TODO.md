# Stupidly important
[x] So instead of using a CSV file, I've implemented a MySQL backend to handle the data
[x] Assign HR and "new" employee metadata. Some sort of labeling system involved there
[x] Write the darn HTML
[ ] Write README

# Components
- Training Material Manager:
    [ ] Training progress tracking
    [ ] HR can facilitate requests to track progress of new employees
    [ ] Curates and hands out training deliverables to new employees
- Employee Manager:
    [x] Add/remove/modify employee data
    [ ] Prepare requests for onboarding
    [x] Promotion and ensuring HR can't be promoted by accident
- Logon Manager:
    [x] Username/password handling
    [?] Password handouts. Currently handled by hash+salted phone number
    [ ] Can identify the difference between HR "admins", new employees, and existing employees

## Less important
[ ] Pretty up the web page itself

Client <-> MiddleMan <-> (Node/SQL)


# Data Models
## Trainer**
    - Partially hardcoded list of "training people" tasked with handling information
    - One person for every "expertise"
    *- Might not be a lasting feature and may have to cut last minute*

## Training Program
    - Serialized training IDs for every video.
    - Title, description, and duration
    - Look into category types for different use cases
        - "General"
        - "Brand New"
        - (Whatever specific departments? Consult with @adamarbini)
## Training Status
    - I'm thinking multiple employees will have several training videos queued up.
    - Status ID, serialized similar to Training ID, all are unique. Probably could get away with a gobbledy tag of some sort
    - Completion status TRUE/FALSE
    - Completion date YYYY-MM-DD
    