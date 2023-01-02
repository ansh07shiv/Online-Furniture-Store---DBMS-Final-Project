use DESKS_R_US;

CREATE TABLE IF NOT EXISTS PRODUCT (
	ProductID integer NOT NULL,
    PName varchar(100) NOT NULL,
    PPrice integer NOT NULL,
    PType varchar(100) NOT NULL,
    PQuantity integer NOT NULL,
    PDescription integer NOT NULL,
    primary key (ProductID)
);
ALTER TABLE PRODUCT MODIFY COLUMN PDescription VARCHAR(100);

CREATE TABLE IF NOT EXISTS OFFER_PRODUCT (
	ProductID integer NOT NULL,
    OfferPrice integer NOT NULL,
    primary key (ProductID)
);

CREATE TABLE IF NOT EXISTS DESKS (
	ProductID integer NOT NULL,
    Drawers integer NOT NULL,
    Material varchar(100) NOT NULL,
    primary key (ProductID)
);

CREATE TABLE IF NOT EXISTS CHAIRS (
	ProductID integer NOT NULL,
    Fabric varchar(100) NOT NULL,
    Type varchar(100) NOT NULL,
    primary key (ProductID)
);

CREATE TABLE IF NOT EXISTS BOOKCASES (
	ProductID integer NOT NULL,
    Shelves integer NOT NULL,
    Material varchar(100) NOT NULL,
    primary key (ProductID)
);

CREATE TABLE IF NOT EXISTS SILVER_AND_ABOVE (
	ID integer NOT NULL,
    CreditLine varchar(100) NOT NULL,
    primary key (ID)
);

CREATE TABLE IF NOT EXISTS CREDIT_CARD (
	CardNumber integer NOT NULL,
    SecNumber integer, 
    CardOwnerName varchar(100) NOT NULL,
    CardType varchar(100) NOT NULL,
    BillingAddress varchar(100) NOT NULL,
    ExpDate varchar(20) NOT NULL,
    primary key (CardNumber)
);

ALTER TABLE CREDIT_CARD MODIFY CardNumber varchar(20);

CREATE TABLE IF NOT EXISTS CART (
	CartID integer NOT NULL,
    TStatus varchar(10) NOT NULL,
    TDate varchar(20) NOT NULL,
    TotalAmount integer NOT NULL,
    CardNumber integer NOT NULL,
    SAName varchar(100) NOT NULL,
    ID integer NOT NULL,
    primary key (CardID)
);

update CART set TotalAmount = 90000 where CartID = 3;
select * from customer;
select * from CART C, CUSTOMER CU where C.ID=CU.ID and C.ID = 7;
select * from CART C, APPEARS_IN A, CUSTOMER CU, PRODUCT P where P.ProductID = A.ProductID and C.CartID = A.CartID AND C.ID = CU.ID AND C.ID = 7 AND C.CartId = 3;
select * from APPEARS_IN;
select * from product;
insert into APPEARS_IN values(3, 1, 3, 30000);
insert into APPEARS_IN values(3, 3, 5, 50000);
select * from cart;
select * from appears_in;

ALTER TABLE CART ADD COLUMN OrderStatus varchar(20) DEFAULT 'In Transit';
ALTER TABLE APPEARS_IN DROP FOREIGN KEY appears_in_ibfk_1;
ALTER TABLE CART MODIFY CartID integer not null auto_increment;
desc CART;
ALTER TABLE CART MODIFY CardNumber varchar(20);
ALTER TABLE CART MODIFY CardNumber varchar(20);
ALTER TABLE CART DROP FOREIGN KEY cart_ibfk_1;


select ProductID, COUNT(DISTINCT ID) from appears_in a, cart c where a.CartID = c.CartID and TStatus = 'Completed' and TDate BETWEEN '2022-04-06' and '2022-12-22' group by ProductID order by COUNT(DISTINCT ID) desc;
select * from PRODUCT where ProductId = 1;
select * from cart;
alter table cart modify TDate date;
update cart set TDate = '2022-12-06' where CartID in (3,4,5,6,8,9,10);
select ProductID, SUM(Quantity) from appears_in a, cart c where a.CartID = c.CartID and TStatus = 'Completed' and TDate BETWEEN '2022-04-06' and '2022-12-22' group by ProductID order by SUM(Quantity) DESC;


select ID, SUM(TotalAmount) from cart where TStatus = 'Completed' and TDate BETWEEN '2022-04-06' and '2022-12-22' group by ID order by SUM(TotalAmount) DESC LIMIT 10;

select * from SHIP_ADDRESS;
select * from cart;

select zip, count(CartID) from ship_address s, cart c where s.SAName = c.SAName and TDate BETWEEN '2022-04-06' and '2022-12-22' and TStatus = 'Completed' group by zip order by count(CartID) desc LIMIT 5;


select * from customer where ID;

select PType, AVG(PPrice) from PRODUCT group by PType;

select * from appears_in;