# These are the tables and columns that Pathway expects on load.
These `CREATE` statements work specifically with MySQL, so you may need to adjust them accordingly to better fit your favorite DBMS. Honestly, I haven't tested anything else since those programs are Expensive™.

**EMPLOYEE_DATA**
```
CREATE TABLE `EMPLOYEE_DATA` (
  `EMPLOYEE_ID` int NOT NULL AUTO_INCREMENT,
  `FIRST_NAME` text,
  `LAST_NAME` text,
  `DESIGNATION` enum('NEW','CURRENT','HR') NOT NULL DEFAULT 'NEW'
  `EMAIL` varchar(45) DEFAULT NULL,
  `PHONE` varchar(10) DEFAULT NULL,
  `USERNAME` varchar(45) NOT NULL,
  `PASS` varchar(256) NOT NULL,
  PRIMARY KEY (`EMPLOYEE_ID`),
  KEY `fk_designation` (`DESIGNATION`),
  KEY `fk_USERNAME_idx` (`USERNAME`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```
:information_source: Do be careful with the designation; foreign key frustrations are inevitable.

**TRAINING_PROGRAM**
```
CREATE TABLE `TRAINING_PROGRAM` (
  `TRAINING_ID` int NOT NULL AUTO_INCREMENT COMMENT 'Unique id for that particular video or quiz or whatever',
  `TITLE` varchar(128) NOT NULL COMMENT 'Title of video',
  `CATEGORY` enum('General','New Hire','Safety','Privacy') NOT NULL DEFAULT 'General' COMMENT 'Reasonably self explanatory',
  PRIMARY KEY (`TRAINING_ID`),
  UNIQUE KEY `TRAINING_ID_UNIQUE` (`TRAINING_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```
**TRAINING_STATUS**
```
CREATE TABLE `TRAINING_STATUS` (
  `STATUS_ID` int NOT NULL AUTO_INCREMENT,
  `TRAINING_ID` int NOT NULL,
  `COMPLETION_STATUS` int DEFAULT NULL COMMENT '0 -> Not completed, 1 -> incomplete, 2 -> complete',
  `EMPLOYEE_ID` int NOT NULL,
  `COMPLETION_DATE` date DEFAULT NULL,
  PRIMARY KEY (`STATUS_ID`),
  UNIQUE KEY `EMPLOYEE_ID` (`EMPLOYEE_ID`,`TRAINING_ID`),
  KEY `TRAINING_ID_idx` (`TRAINING_ID`),
  CONSTRAINT `EMPLOYEE_ID` FOREIGN KEY (`EMPLOYEE_ID`) REFERENCES `EMPLOYEE_DATA` (`EMPLOYEE_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `TRAINING_ID` FOREIGN KEY (`TRAINING_ID`) REFERENCES `TRAINING_PROGRAM` (`TRAINING_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
```
:warning: **MySQL doesn't *really* support Booleans but it will turn it into an INT. Need to make sure this stays sanitized.**

# FOR YOUR SANITY:
Several views have been implemented in this demonstration version of Pathway. Use them to query "nicer-looking" data instead.

``` 
CLIENT_VIEW, NICERLOOKINGTABLE, no_passes_for_you, USERPASS
```

- **`CLIENT_VIEW`** may be deprecated soon; don't depend on it too hard.
- **`NICERLOOKINGTABLE`** is for the HR and Client dashboards. Column names are "prettied up" to look nice in HTML pages. 
- **`no_passes_for_you`** (temporary name) is for the "edit employees" popup. It leaves out the hashed passwords so the page looks *slightly* cleaner.
- **`USERPASS`** shows usernames and hashed passwords together. Do not use on pages.