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

