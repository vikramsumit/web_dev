USE practical;

-- DROP TABLE department,Employee;

CREATE TABLE Department (
    Dept_ID   VARCHAR(5) PRIMARY KEY,
    Dept_Name VARCHAR(50),
    Location  VARCHAR(50)
);

CREATE TABLE Employee (
    Emp_ID    VARCHAR(5) PRIMARY KEY,
    Emp_Name  VARCHAR(50),
    Gender    CHAR(1),
    Salary    INT,
    Dept_ID   VARCHAR(5),
    Hire_Date DATE,
    FOREIGN KEY (Dept_ID) REFERENCES Department(Dept_ID)
);

INSERT INTO Department (Dept_ID, Dept_Name, Location) VALUES
('D01', 'Human Resources', 'New York'),
('D02', 'Finance', 'Chicago'),
('D03', 'IT', 'San Francisco'),
('D04', 'Marketing', 'Boston');

INSERT INTO Employee (Emp_ID, Emp_Name, Gender, Salary, Dept_ID, Hire_Date)VALUES
('E101', 'Alice Smith', 'F', 70000, 'D01', '2020-03-15'),
('E102', 'Bob Johnson', 'M', 85000, 'D02', '2019-07-10'),
('E103', 'Charlie Lee', 'M', 95000, 'D03', '2021-06-22'),
('E104', 'Diana Perez', 'F', 80000, 'D04', '2018-12-01'),
('E105', 'Ethan Brown', 'M', 60000, 'D01', '2022-04-05'),
('E106', 'Fiona White', 'F', 72000, 'D03', '2023-01-19');

SELECT * FROM Department;
SELECT * FROM Employee;

SELECT E.Emp_Name, D.Dept_Name
FROM Employee E
JOIN Department D
ON E.Dept_ID = D.Dept_ID;

SELECT E.Emp_Name, D.Dept_Name
FROM Employee E
JOIN Department D
ON E.Dept_ID = D.Dept_ID;

SELECT D.Dept_Name, AVG(E.Salary) AS Avg_Salary
FROM Employee E
JOIN Department D
ON E.Dept_ID = D.Dept_ID
GROUP BY D.Dept_Name;

SELECT Emp_Name, Salary
FROM Employee
ORDER BY Salary DESC;

SELECT E.Emp_Name, D.Dept_Name, D.Location
FROM Employee E
JOIN Department D
ON E.Dept_ID = D.Dept_ID;

SELECT Emp_Name, Hire_Date
FROM Employee
WHERE Hire_Date > '2021-01-01';

SELECT D.Dept_Name
FROM Employee E
JOIN Department D
ON E.Dept_ID = D.Dept_ID
GROUP BY D.Dept_Name
HAVING COUNT(E.Emp_ID) > 1;

SELECT Emp_Name, Salary
FROM Employee
WHERE Salary > (SELECT AVG(Salary) FROM Employee);

UPDATE Employee
SET Salary = Salary * 1.10
WHERE Dept_ID = (
    SELECT Dept_ID
    FROM Department
    WHERE Dept_Name = 'IT'
);

SELECT * FROM Employee
where Dept_ID ="D03";

DELETE FROM Employee
WHERE Salary < 65000;

SELECT Emp_Name,Salary
FROM Employee;
















