-- CREATE DATABASE temp1;
-- DROP DATABASE temp1;
-- create database temp2;
-- DROP DATABASE temp2;

CREATE DATABASE college;

CREATE DATABASE COMPANY;
DROP DATABASE COMPANY;

-- CREATE DATABASE IF NOT EXISTS college; 
-- DROP DATABASE company;
-- DROP DATABASE IF EXISTS company;

USE college;

CREATE TABLE student (
	id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT NOT NULL
    );
    
INSERT INTO student VALUES(2, "RAJU", 32);
INSERT INTO student VALUES(3, "BHEEM", 22);
INSERT INTO student VALUES(3, "BHEEM", 22);

SELECT * FROM student;
DROP TABLE student;

-- SHOW DATABASES;
-- SHOW TABLES;

CREATE DATABASE XYZ_company;
use XYZ_company;

CREATE TABLE employee(
	id INT PRIMARY KEY,
    name VARCHAR(55),
    salary INT
);

INSERT INTO employee
(id, name, salary)
VALUES
(1,"raju", 250000),
(2, "babu", 15000),
(3, "bahubali", 300000);

SELECT * FROM employee;

-- CREATE TABLE temp1(
-- 	id INT UNIQUE
-- );

CREATE TABLE temp1(
	id INT,
    name VARCHAR(50),
    age INT,
    city VARCHAR(55),
    PRIMARY KEY (id, name)
);

INSERT INTO temp1 VALUES (101);
INSERT INTO temp1 VALUES (101);

SELECT * FROM temp1;

CREATE TABLE emp (
	id INT,
    salary INT DEFAULT 25000);
    
INSERT INTO emp (id) VALUES (101);

SELECT * FROM emp;

	

