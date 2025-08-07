-- DROP DATABASE payment;
-- DROP TABLE customer_details;

CREATE DATABASE payment;
USE payment;

CREATE TABLE customer_details(
	customer_id INT PRIMARY KEY,
    customer VARCHAR(33),
    mode VARCHAR(22),
    city VARCHAR(22)
);

INSERT INTO customer_details
(customer_id, customer, mode, city)
VALUES
(101, "Olivia Barrett", "Netbanking", "Portland"),
(102, "Ethan Sinclair", "Credit Card", "Miami"),
(103, "Maya Hernandez", "Credit Card", "Seattle"),
(104, "Lucas Bennett", "Netbanking", "Denver"),
(105, "Ava Thompson", "UPI", "Dallas"),
(106, "Noah Mitchell", "Credit Card", "Boston"),
(107, "Sophia Carter", "UPI", "Chicago"),
(108, "Liam Foster", "Netbanking", "San Diego"),
(109, "Isabella Griffin", "UPI", "Atlanta"),
(110, "Jackson Hughes", "Credit Card", "Phoenix");

Select * FROM customer_details;

SELECT mode, count(mode) FROM customer_details
GROUP BY mode;
