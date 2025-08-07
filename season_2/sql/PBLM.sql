CREATE TABLE dept (
	id INT PRIMARY KEY,
    name VARCHAR(50)
);

INSERT INTO dept 
VALUES
(101, "english"),
(102, "IT");

SELECT * FROM dept;

CREATE TABLE teacher (
	id INT PRIMARY KEY,
    name VARCHAR(50),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES dept(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO teacher
VALUES
(101, "RAM", 101),
(102, "KRISHNA", 102);

SELECT * FROM teacher;

UPDATE dept 
SET id = 103
WHERE id = 102;

SELECT * FROM dept;