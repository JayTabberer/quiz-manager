### Starting the Application / How it works

In the terminal of your IDE, CD into the quiz-manager directory and checking the files you will see quiz manager and quiz-manager-frontend files.
open 2 terminals and run the backend first using “npm start” to build the backend
In the second, cd into quiz-manager-front end and run “npm run serve” to start the frontend
The IDE will give the local link in the terminal for the application, click this and you will see the login/create user screen to begin exploring the application.


### How role works in permission

After login, the user object (including role) is stored

Example
    { "id": 1, "username": "john_doe", "role": "editor" }

Checked in Vue Components:
Role is retrieved from when mounting a component.
Permissions are enforced using v-if or :disabled.
Backend Validation:
API endpoints also validate the user’s role before performing actions (to prevent unauthorised access even if UI restrictions are bypassed).


### Table Relationships
+----------------+          +----------------+          +----------------+
|     Quizzes    |          |    Questions   |          |     Answers    |
+----------------+          +----------------+          +----------------+
| id (PK)        |<---------| id (PK)        |<---------| id (PK)        |
| title          |          | text           |          | text           |
| createdAt      |          | quizId (FK)    |          | is_correct     |
| updatedAt      |          | createdAt      |          | questionId (FK)|
+----------------+          | updatedAt      |          | createdAt      |
                            +----------------+          | updatedAt      |
                                                        +----------------+


### Summary of Tables and Relationships

| Table      | Column      | Type        | Description                                      |
|------------|-------------|-------------|--------------------------------------------------|
| Quizzes    | id (PK)     | INTEGER     | Primary key                                      |
|            | title       | STRING      | Title of the quiz                                |
|            | createdAt   | TIMESTAMP   | Timestamp of when the quiz was created           |
|            | updatedAt   | TIMESTAMP   | Timestamp of when the quiz was last updated      |
|------------|-------------|-------------|--------------------------------------------------|
| Questions  | id (PK)     | INTEGER     | Primary key                                      |
|            | text        | STRING      | Text of the question                             |
|            | quizId (FK) | INTEGER     | Foreign key referencing the Quizzes table        |
|            | createdAt   | TIMESTAMP   | Timestamp of when the question was created       |
|            | updatedAt   | TIMESTAMP   | Timestamp of when the question was last updated  |
|------------|-------------|-------------|--------------------------------------------------|
| Answers    | id (PK)     | INTEGER     | Primary key                                      |
|            | text        | STRING      | Text of the answer                               |
|            | is_correct  | BOOLEAN     | Boolean indicating if the answer is correct      |
|            | questionId (FK) | INTEGER | Foreign key referencing the Questions table      |
|            | createdAt   | TIMESTAMP   | Timestamp of when the answer was created         |
|            | updatedAt   | TIMESTAMP   | Timestamp of when the answer was last updated    |



### Summary of Role Permissions / Use case diagram for roles and permissions

| Action          | Admin | Editor | User | Viewer |
|-----------------|-------|--------|------|--------|
| Create Quizzes  | Yes   | Yes    | No   | No     |
| Update Quizzes  | Yes   | Yes    | No   | No     |
| Delete Quizzes  | Yes   | Yes    | No   | No     |
| View Quizzes    | Yes   | Yes    | Yes  | Yes    |

