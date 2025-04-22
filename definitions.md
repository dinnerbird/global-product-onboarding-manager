## These are the tables and columns that Pathway expects on load.

**EMPLOYEE_DATA**

| EMPLOYEE_ID :key: | FIRST_NAME | LAST_NAME | DESIGNATION | EMAIL | PHONE |
| ----------- | ---------- | --------- | ----------- | ----- | ----- |
| `INT`         | `TEXT`       |`TEXT`      | `ENUM('NEW', 'CURRENT', HR')` | `VARCHAR(45)` | `VARCHAR(10)` |

**LOGIN_INFO**
| USER :key: | PASS | DESIGNATION (FK) |
| ---- | ---- | ----------- |
| `VARCHAR(45)` | `VARCHAR(256)` | `ENUM('NEW', 'CURRENT', HR')` |

:information_source: Do be careful with the designation; foreign key frustrations are inevitable.

**TRAINING_PROGRAM**
| TRAINING_ID :key: | TITLE | CATEGORY | DURATION |
| ----------------- | ----- | -------- | -------- |
| `INT`             | `VARCHAR(45)` | `ENUM('General', 'New Hire', 'Safety', 'Privacy')` | `VARCHAR(45)` |

**TRAINING_STATUS**
| STATUS_ID :key: | EMPLOYEE_ID | TRAINING_ID | COMPLETION_STATUS | COMPLETION_DATE |
| --------------- | ----------- | ----------- | ----------------- | --------------- |
| `INT`           | `INT`       | `INT`       | `BOOLEAN`         | `DATE`          |

:warning: MySQL doesn't *really* support Booleans but it will turn it into an INT. Need to make sure this stays sanitized.

:information_source: I have not tested the `EMPLOYEE_ID` and `TRAINING_ID` keys yet to see if they carry over. <sub>**Swearing will ensue.**</sub>