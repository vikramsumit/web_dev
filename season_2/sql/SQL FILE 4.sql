DROP DATABASE college;

CREATE DATABASE college;
USE college;


DROP TABLE student;

CREATE TABLE student(
	rollno INT PRIMARY KEY,
    name VARCHAR(55),
    marks INT NOT NULL,
    grade VARCHAR(1),
    city VARCHAR(30)
);


INSERT INTO student
(rollno, name, marks, grade, city)
VALUES
(101, "motu", 90, "A", "furfurinagar"), (102, "patlu", 95, "A", "furfurinagar"), (103, "raju", 99, "A", "dholakpur"), (104, "bheem", 88, "B", "dholakpur"), (105, "gabbar", 55, "E", "lootnagar"),
(106, "amar", 91, "A", "amritsar"),
(107, "akbar", 84, "B", "allahabad"),
(108, "antony", 73, "C", "agartala"),
(109, "birbal", 92, "A", "bhopal"),
(110, "zara", 67, "D", "zunheboto"),
(111, "sanjay", 81, "B", "shillong"),
(112, "meena", 93, "A", "madurai"),
(113, "rajesh", 78, "C", "ranchi"),
(114, "kavita", 88, "B", "kochi"),
(115, "yuvraj", 90, "A", "yavatmal"),
(116, "divya", 69, "D", "durgapur"),
(117, "farhan", 95, "A", "faizabad"),
(118, "isha", 87, "B", "itanagar"),
(119, "gopal", 72, "C", "gangtok"),
(120, "rekha", 83, "B", "raipur"),
(121, "laxmi", 96, "A", "lucknow"),
(122, "chetan", 58, "E", "chandigarh"),
(123, "vijay", 76, "C", "vadodara"),
(124, "tina", 66, "D", "tirupati"),
(125, "dhruv", 85, "B", "dehradun"),
(126, "mira", 97, "A", "mumbai"),
(127, "suresh", 63, "D", "siliguri"),
(128, "pooja", 79, "C", "patna"),
(129, "zubin", 82, "B", "zerok"),
(130, "ali", 88, "B", "aligarh"),
(131, "neha", 74, "C", "nagpur"),
(132, "manish", 59, "E", "meerut"),
(133, "geeta", 91, "A", "guwahati"),
(134, "arjun", 77, "C", "ajmer"),
(135, "nisha", 87, "B", "nashik"),
(136, "dinesh", 62, "D", "darbhanga"),
(137, "swati", 83, "B", "sholapur"),
(138, "raju", 55, "E", "raebareli"),
(139, "bhavna", 94, "A", "bhubaneswar"),
(140, "sachin", 80, "B", "surat"),
(141, "kanika", 85, "B", "kanpur"),
(142, "rohit", 93, "A", "rajkot"),
(143, "preeti", 60, "E", "panipat"),
(144, "lalit", 86, "B", "ludhiana"),
(145, "rehan", 90, "A", "rewa"),
(146, "sonal", 75, "C", "shajapur"),
(147, "alok", 89, "B", "anand"),
(148, "vikas", 65, "D", "visakhapatnam"),
(149, "sweta", 97, "A", "shimla"),
(150, "dev", 83, "B", "darjeeling"),
(151, "simran", 78, "C", "satna"),
(152, "pankaj", 64, "D", "puri"),
(153, "naveen", 91, "A", "nainital"),
(154, "ria", 67, "D", "roorkee"),
(155, "anita", 92, "A", "ambala"),
(156, "jatin", 71, "C", "jalandhar"),
(157, "kiran", 86, "B", "kurnool"),
(158, "karan", 73, "C", "kota"),
(159, "varun", 82, "B", "vellore"),
(160, "mehul", 59, "E", "moradabad"),
(161, "shivani", 89, "B", "shimoga"),
(162, "yash", 88, "B", "yamunanagar"),
(163, "priya", 94, "A", "pune"),
(164, "rahul", 55, "E", "ratlam"),
(165, "anmol", 77, "C", "amritsar"),
(166, "shruti", 98, "A", "srinagar"),
(167, "harsh", 60, "E", "hoshiarpur"),
(168, "deepika", 85, "B", "davangere"),
(169, "tarun", 79, "C", "tezpur"),
(170, "kanishk", 90, "A", "kozhikode"),
(171, "jaya", 68, "D", "jalgaon"),
(172, "rishi", 96, "A", "rewa"),
(173, "shivam", 84, "B", "silchar"),
(174, "nandini", 72, "C", "nagaur"),
(175, "aryan", 65, "D", "anantnag"),
(176, "mohit", 88, "B", "morbi"),
(177, "isha", 76, "C", "itarsi"),
(178, "parth", 93, "A", "palakkad"),
(179, "nikita", 74, "C", "nalbari"),
(180, "aditya", 70, "C", "aurangabad"),
(181, "ritika", 79, "C", "rohtak"),
(182, "sana", 95, "A", "sambalpur"),
(183, "nilesh", 57, "E", "nellore"),
(184, "riya", 87, "B", "raichur"),
(185, "omkar", 81, "B", "ooty"),
(186, "trisha", 69, "D", "thoothukudi"),
(187, "girish", 90, "A", "ghaziabad"),
(188, "bhavna", 61, "D", "bilaspur"),
(189, "shreyas", 86, "B", "shillong"),
(190, "anshika", 98, "A", "alwar"),
(191, "surya", 63, "D", "surendranagar"),
(192, "madhu", 78, "C", "meerut"),
(193, "pranav", 91, "A", "porbandar"),
(194, "ashwin", 89, "B", "ajmer"),
(195, "sanya", 80, "B", "shimoga"),
(196, "aman", 94, "A", "ambikapur"),
(197, "rhea", 85, "B", "rourkela"),
(198, "chirag", 74, "C", "chhindwara"),
(199, "komal", 88, "B", "kanpur"),
(200, "tanmay", 61, "D", "tinsukia"),
(201, "aarti", 91, "A", "lucknow"),
(202, "karan", 76, "C", "mumbai"),
(203, "tina", 87, "B", "kolkata"),
(204, "nilesh", 68, "D", "lucknow"),
(205, "preeti", 84, "B", "delhi"),
(206, "manoj", 92, "A", "bengaluru"),
(207, "raj", 63, "D", "delhi"),
(208, "divya", 90, "A", "patna"),
(209, "reena", 79, "C", "mumbai"),
(210, "avinash", 71, "C", "kochi"),
(211, "ruchi", 88, "B", "patna"),
(212, "lokesh", 65, "D", "bengaluru"),
(213, "shruti", 93, "A", "indore"),
(214, "vijay", 81, "B", "chandigarh"),
(215, "sana", 74, "C", "mumbai"),
(216, "deepak", 89, "B", "indore"),
(217, "isha", 60, "E", "lucknow"),
(218, "mukesh", 86, "B", "kolkata"),
(219, "kanika", 66, "D", "kochi"),
(220, "farhan", 92, "A", "delhi"),
(221, "megha", 85, "B", "jaipur"),
(222, "omkar", 77, "C", "bengaluru"),
(223, "neeraj", 69, "D", "patna"),
(224, "rhea", 90, "A", "indore"),
(225, "pratiksha", 82, "B", "jaipur"),
(226, "yash", 64, "D", "mumbai"),
(227, "sweta", 95, "A", "kolkata"),
(228, "bhavesh", 59, "E", "lucknow"),
(229, "nidhi", 87, "B", "pune"),
(230, "mira", 70, "C", "delhi"),
(231, "pankaj", 89, "B", "jaipur"),
(232, "harshit", 75, "C", "pune"),
(233, "ravi", 83, "B", "patna"),
(234, "tanvi", 68, "D", "indore"),
(235, "dhruv", 96, "A", "delhi"),
(236, "sanya", 60, "E", "bengaluru"),
(237, "kanishk", 91, "A", "lucknow"),
(238, "jaya", 78, "C", "kolkata"),
(239, "vani", 86, "B", "kochi"),
(240, "naman", 62, "D", "jaipur"),
(241, "aditya", 88, "B", "patna"),
(242, "meera", 74, "C", "pune"),
(243, "amit", 93, "A", "mumbai"),
(244, "zoya", 65, "D", "kochi"),
(245, "rahul", 80, "B", "indore"),
(246, "trisha", 73, "C", "delhi"),
(247, "girish", 90, "A", "bengaluru"),
(248, "anita", 85, "B", "lucknow"),
(249, "suresh", 67, "D", "kolkata"),
(250, "payal", 92, "A", "pune"),
(251, "rohit", 76, "C", "patna"),
(252, "ishaan", 64, "D", "mumbai"),
(253, "deepa", 87, "B", "kochi"),
(254, "riya", 69, "D", "jaipur"),
(255, "shaurya", 94, "A", "indore"),
(256, "alka", 82, "B", "lucknow"),
(257, "manish", 66, "D", "pune"),
(258, "anmol", 89, "B", "bengaluru"),
(259, "rekha", 61, "D", "delhi"),
(260, "chetan", 91, "A", "kolkata"),
(261, "simran", 85, "B", "kochi"),
(262, "rajesh", 79, "C", "patna"),
(263, "kavya", 58, "E", "pune"),
(264, "lalit", 93, "A", "jaipur"),
(265, "madhu", 72, "C", "indore"),
(266, "pranav", 83, "B", "bengaluru"),
(267, "shravan", 65, "D", "lucknow"),
(268, "ananya", 90, "A", "kolkata"),
(269, "tanmay", 87, "B", "delhi"),
(270, "karishma", 73, "C", "kochi"),
(271, "surya", 62, "D", "jaipur"),
(272, "avani", 95, "A", "pune"),
(273, "piyush", 85, "B", "mumbai"),
(274, "rupal", 60, "E", "patna"),
(275, "vikas", 88, "B", "delhi"),
(276, "pooja", 69, "D", "lucknow"),
(277, "tushar", 92, "A", "bengaluru"),
(278, "neha", 84, "B", "indore"),
(279, "alok", 77, "C", "kochi"),
(280, "harsha", 63, "D", "kolkata"),
(281, "swara", 90, "A", "jaipur"),
(282, "mehul", 86, "B", "pune"),
(283, "parth", 74, "C", "delhi"),
(284, "komal", 68, "D", "mumbai"),
(285, "anshika", 96, "A", "patna"),
(286, "saket", 80, "B", "lucknow"),
(287, "ritu", 72, "C", "bengaluru"),
(288, "siddharth", 65, "D", "indore"),
(289, "disha", 89, "B", "kochi"),
(290, "gaurav", 64, "D", "kolkata"),
(291, "palak", 93, "A", "pune"),
(292, "varun", 78, "C", "jaipur"),
(293, "sapna", 60, "E", "delhi"),
(294, "utkarsh", 83, "B", "patna"),
(295, "nikita", 70, "C", "lucknow"),
(296, "ashwin", 91, "A", "mumbai"),
(297, "namrata", 87, "B", "pune"),
(298, "saurav", 69, "D", "bengaluru"),
(299, "jatin", 76, "C", "kochi"),
(300, "priya", 94, "A", "kolkata");

SELECT * FROM student;
SELECT name, marks, city FROM student; 
SELECT DISTINCT city FROM student;
SELECT * FROM student WHERE marks >=90;
SELECT * FROM student WHERE city = "furfurinagar";
Select * from student WHERE marks BETWEEN 80 and 95;
SELECT * FROM student WHERE city IN ("patna", "furfurinagar", "lootnagar");
SELECT * FROM student WHERE marks>92 LIMIT 10;
SELECT * FROM student ORDER BY city ASC;
SELECT * FROM student ORDER BY city DESC;
SELECT * FROM student ORDER BY marks DESC LIMIT 10;
SELECT MAX(marks) FROM student;
SELECT MIN(marks) FROM student;
SELECT AVG(marks) FROM student;
SELECT COUNT(rollno) FROM student;
SELECT city, avg(marks) AS avg_marks,count(rollno)
FROM student 
GROUP BY city
ORDER BY avg_marks DESC;

SELECT city, count(CASE WHEN marks > 90 THEN 1 END) AS marks_above_90
FROM student
GROUP BY city
HAVING MAX(marks) > 90;

SELECT city,
  COUNT(CASE WHEN marks > 90 THEN 1 END) AS count_above_90
FROM student
GROUP BY city
HAVING MAX(marks) > 90;

SELECT city
FROM student
WHERE grade = "A"
GROUP BY city
HAVING MAX(marks) > 89
ORDER BY city ASC;

UPDATE student
SET grade = "O"
WHERE grade = "A";

-- SET SQL_SAFE_UPDATES = 0;

SELECT * FROM student;

UPDATE student
SET marks = marks + 1;
SELECT COUNT(rollno) FROM student;

DELETE FROM student
WHERE marks < 75;

SELECT COUNT(rollno) FROM student;
Select * FROM student;

ALTER TABLE student
ADD COLUMN age INT;

ALTER TABLE student
DROP COLUMN age;

TRUNCATE TABLE student;
Select * FROM student;

ALTER TABLE student
CHANGE name full_name VARCHAR(50);

ALTER TABLE student 
DROP COLUMN grade;

-- SELECT city,name, count(rollno)
-- FROM student 
-- GROUP BY city,name;
-- TRUNCATE TABLE student;
-- USE student;
-- DELETE FROM student;






