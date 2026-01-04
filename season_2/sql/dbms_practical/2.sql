USE practical;

CREATE TABLE Movie (
    Mv_no INT,
    Cust_id VARCHAR(5),
    Title VARCHAR(50),
    Star VARCHAR(5),
    Price INT
);

INSERT INTO Movie (Mv_no, Cust_id, Title, Star, Price) VALUES
(1, 'A02', 'Bloody', 'JC', 181),
(2, 'A04', 'The Firm', 'TC', 200),
(3, 'A01', 'Pretty Woman', 'RG', 151),
(4, 'A06', 'Home Alone', 'MC', 150),
(5, 'A01', 'The Fugitive', 'MF', 200),
(6, 'A02', 'Pathaan', 'MD', 100);

select * from Movie;

SELECT Title FROM Movie
WHERE Price > 100 AND Price < 200;

SELECT 
    Title,
    Price AS Original_Price,
    Price * 1.10 AS Incremented_Price
FROM Movie;

SELECT Title
FROM Movie
WHERE Price = 100 AND LENGTH(Title) = 7;