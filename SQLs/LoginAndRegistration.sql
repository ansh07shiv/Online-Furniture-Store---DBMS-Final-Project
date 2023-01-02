-- Login and Registration Tables
-- CUSTOMER_LOGIN ID, Email, Password

create database if not exists DESKS_R_US;
use DESKS_R_US;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'adminroot';


-- Login Table
drop table CUSTOMER_LOGIN;
CREATE TABLE IF NOT EXISTS CUSTOMER_LOGIN (
	ID integer NOT NULL AUTO_INCREMENT,
  	Email varchar(100) NOT NULL,
  	Password varchar(255) NOT NULL,
    PRIMARY KEY (ID)
);
ALTER TABLE CUSTOMER_LOGIN modify ID integer NOT NULL;
Alter table CUSTOMER_LOGIN ADD foreign key (ID) references CUSTOMER(ID);

-- Single Password (1234) Only one Customer for Demonstration
INSERT INTO CUSTOMER_LOGIN (Email, Password) VALUES ('abc@gmail.com', '1234');

-- Admin Data
SELECT * FROM CUSTOMER;
INSERT INTO CUSTOMER VALUES (10, 'ADMIN', 'ADMIN', 'ADMIN', 'ADMIN@gmail.com', 'ADMIN ADDRESS', '000000');
update CUSTOMER set Email = 'admin@gmail.com' where ID=10;
select * from customer_login;
INSERT INTO CUSTOMER_LOGIN VALUES (10, 'ADMIN@gmail.com', '1234');
update customer_login set Email = 'admin@gmail.com' where ID=10;

select * from customer_login;
select * from customer;

-- Customer Registration Table
CREATE TABLE IF NOT EXISTS CUSTOMER (
	ID integer NOT NULL AUTO_INCREMENT,
  	FName varchar(100) NOT NULL,
  	LName varchar(100) NOT NULL,
  	Status varchar(10) NOT NULL,
  	Email varchar(10) NOT NULL,
  	Address varchar(10) NOT NULL,
  	Phone integer NOT NULL,
    PRIMARY KEY (ID)
);

ALTER TABLE CUSTOMER MODIFY COLUMN Email VARCHAR(100);
ALTER TABLE CUSTOMER MODIFY COLUMN Address VARCHAR(100);
ALTER TABLE CUSTOMER MODIFY COLUMN Phone VARCHAR(10);

Select * from CUSTOMER;
delete from Customer where ID=2;


Select * from CUSTOMER_LOGIN;