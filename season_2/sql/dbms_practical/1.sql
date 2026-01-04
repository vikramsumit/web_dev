CREATE database PRACTICAL;
USE practical;

CREATE TABLE Customer (
    Cust_id VARCHAR(5),
    Fname VARCHAR(50),
    Lname VARCHAR(50),
    Area VARCHAR(5),
    Phone VARCHAR(10)
);


INSERT INTO Customer (Cust_id, Fname, Lname, Area, Phone) VALUES
('A01', 'Ivan', 'Ross', 'SA', '6125467'),
('A02', 'Vandana', 'Ray', 'MU', '5560379'),
('A03', 'Pramada', 'Jauguste', 'DA', '4560389'),
('A04', 'Basu', 'Navindi', 'BA', '6125401'),
('A05', 'Ravi', 'Shridhar', 'NA', NULL),
('A06', 'Rukmini', 'Aiyer', 'GH', '5125274');

select * from customer;

SELECT 
    CONCAT(Fname, ' ', Lname, ' stays in ', Area, ' and his phone number is ', COALESCE(Phone, 'not available')) AS Customer_Info
FROM Customer;

SELECT Cust_id
FROM Customer
WHERE Area IN ('SA', 'BA', 'GH');

SELECT * FROM Customer
WHERE Area LIKE "%A";
 

