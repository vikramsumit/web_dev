DROP DATABASE coaching;
CREATE DATABASE coaching;
USE COACHING;

-- CREATE TABLE student(
-- 	id INT PRIMARY KEY,
--     name VARCHAR(55)
-- );

DROP TABLE student;
CREATE TABLE student (
    rollno INT PRIMARY KEY,
    name VARCHAR(50),
    marks INT NOT NULL,
    grade VARCHAR(1),
    city VARCHAR(20)
);

INSERT INTO student
(rollno, name, marks, grade, city)
VALUES
(101, "anil", 78, "C", "Pune"),
(102, "bhumika", 93, "A", "Mumbai"),
(103, "chetan", 85, "B", "Mumbai"),
(104, "dhruv", 96, "A", "Delhi"),
(105, "emanuel", 92, "F", "Delhi"),
(106, "farah", 82, "B", "Delhi");

SELECT * FROM student;

SELECT AVG(marks)
FROM student;

SELECT name, marks
FROM student 
WHERE marks > 87.6667;

SELECT name, marks
FROM student 
WHERE marks > (SELECT AVG(marks) FROM student);

SELECT name, rollno
FROM student
WHERE rollno % 2 = 0; 

SELECT name, rollno
FROM student 
WHERE rollno IN (SELECT rollno
		FROM student
		WHERE rollno % 2 = 0);

SELECT * FROM student 
WHERE city = "delhi";

SELECT MAX(marks)
FROM (SELECT * FROM student WHERE city = "Delhi") AS ORDINARYSTUD;

SELECT (SELECT MAX(marks) FROM student), name
FROM student;

SELECT name
FROM student 
WHERE rollno IN (102,104,106);

CREATE VIEW view1 AS
SELECT rollno, name, marks FROM student;

SELECT * FROM view1
WHERE marks > 90;

DROP * FROM view1;

-- Insert data into the student table
-- INSERT INTO student (id, name)
-- VALUES
--     (101, "adam"),
--     (102, "bob"),
--     (103, "casey");

-- Create the course table
CREATE TABLE course(
    id INT PRIMARY KEY,
    course VARCHAR(50)
);

-- Insert data into the course table
INSERT INTO course (id, course)
VALUES
    (102, "english"),
    (105, "math"),
    (103, "science"),
    (107, "computer science");

CREATE TABLE employee(
    id INT PRIMARY KEY,
    name VARCHAR(50),
    manager_id INT
);

INSERT INTO employee (id, name, manager_id)
VALUES
(101, "Raju", 103),
(102, "Shyam", 104),
(103, "Hanuman", NULL),
(104, "Kalia", 103);  
  
SELECT * FROM employee;

SELECT a.name AS manager_name, b.name
FROM employee AS a
JOIN employee AS b
ON a.id = b.manager_id;

SELECT name FROM employee
UNION
SELECT name FROM employee;

SELECT name FROM employee
UNION ALL
SELECT name FROM employee;



SELECT * FROM student
INNER JOIN course
ON student.id = course.id;

SELECT * FROM student
LEFT JOIN course
ON student.id = course.id;

SELECT * FROM student
RIGHT JOIN course
ON student.id = course.id;

SELECT * FROM student
LEFT JOIN course
ON student.id = course.id
UNION
SELECT * FROM student
RIGHT JOIN course
ON student.id = course.id;

SELECT * FROM student
LEFT JOIN course
ON student.id = course.id
WHERE course.id is NULL;

SELECT * FROM student
RIGHT JOIN course
ON student.id = course.id
WHERE student.id is NULL;

SELECT *
FROM student
INNER JOIN course
ON student.id = course.id;

SELECT * FROM employee;