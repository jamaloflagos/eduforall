CREATE TABLE NewStudent ( 
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    middle_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    gender VARCHAR(8) NOT NULL,
    date_of_birth DATE NOT NULL,
    email VARCHAR(200) NOT NULL
);

CREATE TABLE Class (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    section VARCHAR(100)
);

CREATE TABLE Subject (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE Class_Subjects (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    class_id INT NOT NULL REFERENCES Class(id),
    subject_id INT NOT NULL REFERENCES Subject(id)
);

CREATE TABLE Teacher (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    first_name VARCHAR(150) NOT NULL,
    middle_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    role VARCHAR(150) NOT NULL
);

CREATE TABLE Teacher_Subjects (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    teacher_id INT NOT NULL REFERENCES Teacher(id),
    subject_id INT NOT NULL REFERENCES Subject(id)
);

CREATE TABLE FormTeacher (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    teacher_id INT NOT NULL REFERENCES Teacher(id),
    class_id INT NOT NULL REFERENCES Class(id)
);

CREATE TABLE SubjectTeacher (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    teacher_id INT NOT NULL REFERENCES Teacher(id),
    class_id INT NOT NULL REFERENCES Class(id),
    subject_id INT NOT NULL REFERENCES Class(id)
);

INSERT INTO Class (name) VALUES ('JSS1');
INSERT INTO Class (name) VALUES ('JSS 2');
INSERT INTO Class (name) VALUES ('JSS 3');
INSERT INTO Subject (name) VALUES ('Maths');
INSERT INTO Subject (name) VALUES ('Computer Studies');
INSERT INTO Subject (name) VALUES ('Social Studies');
INSERT INTO Subject (name) VALUES ('Into Tech');
INSERT INTO Subject (name) VALUES ('Fine Arts');
INSERT INTO Subject (name) VALUES ('Agricultural Science');
INSERT INTO Subject (name) VALUES ('Civic Education');
INSERT INTO Subject (name) VALUES ('Home Economics');
INSERT INTO Subject (name) VALUES ('Chemisty');
INSERT INTO Subject (name) VALUES ('Physics');
INSERT INTO Subject (name) VALUES ('Data Processing');
INSERT INTO Subject (name) VALUES ('Further Mathematics');
INSERT INTO Subject (name) VALUES ('Biology');
INSERT INTO Subject (name) VALUES ('Economics');
INSERT INTO Subject (name) VALUES ('Commerce');
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (1,10, 2); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (1,11, 2); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (1,12, 2); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (1, 7, 13); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (1, 6, 13); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (2, 10, 3); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (2, 11, 3); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (2, 12, 3); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (2, 8, 12); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (2, 9, 12); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (3, 10, 7); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (3, 11, 7); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (3, 12, 7); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (3, 3, 14); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (4, 10, 4); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (4, 11, 4); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (4, 12, 4); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (4, 10, 9); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (4, 11, 9); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (4, 12, 9); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (5, 10, 8); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (5, 11, 8); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (5, 12, 8); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (5, 2, 15); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (6, 1, 10); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (6, 8, 11); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (6, 9, 11); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (7, 10, 5); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (7, 11, 5); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (7, 12, 5); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (7, 10, 6); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (7, 11, 6); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (7, 12, 6); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (8, 4, 16); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (8, 5, 16); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (8, 6, 16); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (8, 2, 17); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (8, 3, 17); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (8, 4, 17); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (8, 5, 17); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (9, 1, 1); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (9, 2, 1); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (9, 3, 1); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (9, 4, 1); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (10, 10, 1); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (10, 11, 1); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (10, 12, 1); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (11, 4, 2); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (11, 5, 2); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (11, 6, 2); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (11, 7, 13); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (12, 8, 2); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (13, 9, 13); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (14, 9, 3); 
INSERT INTO SubjectTeacher (teacher_id, class_id, subject_id) VALUES (15, 8, 12); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (4, 10); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (4, 11); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (4, 12); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (4, 13); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (4, 14); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (4, 15); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (4, 16); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (4, 17); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (5, 10); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (5, 11); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (5, 12); 
INSERT INTO SubjectTeacher (teacher_id, class_id subject_id) VALUES (5, 13); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (5, 14); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (5, 15); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (5, 16); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (5, 17); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (6, 10); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (6, 11); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (6, 12); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (6, 13); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (6, 14); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (6, 15); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (6, 16); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (6, 17); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (7, 10); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (7, 11); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (7, 12); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (7, 13); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (7, 14); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (7, 15); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (7, 16); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (7, 17); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (8, 10); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (8, 11); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (8, 12); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (8, 13); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (8, 14); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (8, 15); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (8, 16); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (8, 17); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (9, 10); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (9, 11); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (9, 12); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (9, 13); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (9, 14); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (9, 15); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (9, 16); 
INSERT INTO teacher_Subjects (teacher_id, subject_id) VALUES (9, 17); 
