-- Inserting Product Data
insert into PRODUCT VALUES(1, 'Gaming Desk', '10000', 'Desks', 100, 'Comfortable desks for Gaming');
insert into PRODUCT VALUES(2, 'Reading Desk', '10000', 'Desks', 100, 'Comfortable desks for Reading');
insert into PRODUCT VALUES(3, 'Eating Desk', '10000', 'Desks', 100, 'Comfortable desks for Eating');
insert into PRODUCT VALUES(4, 'Play Board Desk', '10000', 'Desks', 100, 'Desk for Playing');
insert into PRODUCT VALUES(5, 'Chess Designer Desk', '10000', 'Desks', 100, 'Designer Desk with Chess Design');

-- Inserting Desks
insert into DESKS VALUES(1, 6, 'Carbon Fiber');
insert into DESKS VALUES(2, 4, 'Leather');
insert into DESKS VALUES(3, 0, 'Glass');
insert into DESKS VALUES(4, 10, 'Plastic');
insert into DESKS VALUES(5, 0, 'Marble');

select * from PRODUCT P, Desks D where P.ProductID = D.ProductID;

ALTER TABLE PRODUCT MODIFY PDescription varchar(1000) not null;

INSERT INTO PRODUCT (productID, PName, PPrice, PType, PQuantity, PDescription) VALUES ('6', 'L Shaped Desks', '1328', 'DESKS', '19', 'An L shaped desk designed to last for decades which is built with thermofused laminate finish to withhold all kinds of pressures.'), 
('7', 'Mid Back Chair', '280', 'CHAIRS', '86', 'A 360 degree swivel chair built for office uses. A chair with tilt-lock and tilt-tension gives you the comfort that nothing does.'), 
('8', 'File Cabinet', '698', 'BOOKCASES', '29', 'A two drawer bookcase with a capactiy to hold more than two thousand files. This does not only offer great space but have an impactful look in the office due to the distressed brown finish.'),
('9', '2 Drawer Vertical File Heritage Oak', '549', 'BOOKCASES', '12', 'A two drawer bookcase designed with hertiage oak wood with brass handles for harsh usage'), 
('10', 'Single Tire Rolling File Cart', '89', 'BOOKCASES', '126', 'A movable letter size files holder with adjustable bottom shelf with metal casing offered with lifetime warranty.'),
('11', 'Double Lateral File Storage with Hutch by Office Source', '1789', 'BOOKCASES', '8', 'A lateral file storage with durable laminate finish which accomodates letter or legal size files. This item has lifetime warranty.'),
('12', 'High Back Leather Executive Chair', '288', 'CHAIRS', '56', 'A high back pillow top designed leather chair with prefirated center designed to provide exquisiste comfort to the customers.'),
('13', 'Viper Mesh Black Task Chair with Headset Viper', '595', 'CHAIRS', '21', 'A pneumatic seat height adjustable chair with headset with synchronized seat and backrest.'),
('14', 'Leather Armless Task Chair', '289', 'CHAIRS', '28', 'A pnematic gas lift seat height adjustment with adjustment tilt tension control with a lifetime warranty.'),
('15', 'Executive L Shaped Desk Potenza', '2139', 'DESKS', '2', 'A reversible thermofused laminate finished L shape desk designed by corp design for executive office rooms.'),
('16', 'Double Pedestal L-shaped desk PL Series', '1595', 'DESKS', '21', 'A 3mm edge banding L-Shaped desk with full suspension drawer slides with secure locks designed with durable laminate finish to last for decades.'),
('17', 'Bullet L-Shaped Desk PL Series', '995', 'DESKS', '16', 'A locking 3 drawer pedestal built with durable melamine finish which accomodates letter or legal size files.');


INSERT INTO DESKS (productID, Drawers, Material) VALUES ('6', '2', 'Engineered Wood');
INSERT INTO DESKS (productID, Drawers, Material) VALUES ('15', '2', 'Thermofused Laminated wood');
INSERT INTO DESKS (productID, Drawers, Material) VALUES ('16', '4', 'Wood with laminate finish');
INSERT INTO DESKS (productID, Drawers, Material) VALUES ('17', '6', 'Engineered wood with dual melamine coat');

INSERT INTO CHAIRS (productID, Fabric, Type) VALUES ('7', 'Polyster-Leather', 'Swivel Office Chair');
INSERT INTO CHAIRS (productID, Fabric, Type) VALUES ('12', 'Leather', 'High-back pillow top');
INSERT INTO CHAIRS (productID, Fabric, Type) VALUES ('13', 'Mesh and Fabric', 'Viper Mesh back');
INSERT INTO CHAIRS (productID, Fabric, Type) VALUES ('14', 'Mesh, Fabric, and Leather', 'Armless Task Chair');

INSERT INTO BOOKCASES (productID, shelves, Material) VALUES ('8', '2', 'Oak Wood with High Textured Laminate Finish');
INSERT INTO BOOKCASES (productID, shelves, Material) VALUES ('9', '2', 'Engineered wood');
INSERT INTO BOOKCASES (productID, shelves, Material) VALUES ('10', '1', 'Metal');
INSERT INTO BOOKCASES (productID, shelves, Material) VALUES ('11', '2', 'Oak Wood');

INSERT INTO CREDIT_CARD(CardNumber, SecNumber, CardOwnerName, CardType, BillingAddress, ExpDate) VALUES ('782936462', '1', 'Tony Buchowski', 'Gold', 'North Ave, Kearny, New Jersey, United States, 07069', '09/26');
INSERT INTO CREDIT_CARD(CardNumber, SecNumber, CardOwnerName, CardType, BillingAddress, ExpDate) VALUES ('542369875', '1', 'James Cooper', 'Gold','86th street, New York, New York, United States, 10001', '05/25');

INSERT INTO STORED_CARD (CardNumber, StoredCardFlag, ID) VALUES ('782936462', 'Y', 13);
INSERT INTO STORED_CARD (CardNumber, StoredCardFlag, ID) VALUES ('542369875', 'Y', 13);

SELECT * FROM CUSTOMER;
INSERT INTO CUSTOMER( FName, LName, Status, Email, Address, Phone) VALUES ('Rihanna', 'Nomavi', 'Gold', 'Rihanna@gmail.com', 'Cleveland Ave, Harrison, New Jersey, United States, 07049', '9298672717');
INSERT INTO CUSTOMER( FName, LName, Status, Email, Address, Phone) VALUES ('Kay', 'Jonas II', 'Gold', 'kayjonas@gmail.com', 'Washingston Street, Harrison, New Jersey, United States, 07049', '9365673472');
INSERT INTO CUSTOMER( FName, LName, Status, Email, Address, Phone) VALUES ('Tony', 'Buchowski', 'Gold', 'tony976@gmail.com', 'North Ave, Kearny, New Jersey, United States, 07069', '9015234561');
INSERT INTO CUSTOMER( FName, LName, Status, Email, Address, Phone) VALUES ('Alex', 'Dimithri', 'Gold', 'alexdimithri@gmail.com', 'Pacific Ave, Newark, New Jersey, United States, 08029', '8976329876');
INSERT INTO CUSTOMER( FName, LName, Status, Email, Address, Phone) VALUES ('James', 'Cooper', 'Gold', 'Jamescooper@gmail.com', '86th street, New York, New York, United States, 10001', '6367163702');

INSERT INTO CUSTOMER_LOGIN (ID, Email, Password) VALUES (11, 'Rihanna@gmail.com', '1234');
INSERT INTO CUSTOMER_LOGIN (ID, Email, Password) VALUES (15, 'Jamescooper@gmail.com', '1234');
INSERT INTO CUSTOMER_LOGIN (ID, Email, Password) VALUES (12, 'kayjonas@gmail.com', '1234');
INSERT INTO CUSTOMER_LOGIN (ID, Email, Password) VALUES (13, 'tony976@gmail.com', '1234');
INSERT INTO CUSTOMER_LOGIN (ID, Email, Password) VALUES (14, 'alexdimithri@gmail.com', '1234');

INSERT INTO SHIP_ADDRESS(SAName, ID, ReceipientName, SNumber, Street, Zip, City, State, County) VALUES ('Rihanna Nomavi', 13, 'Rihanna Ji', '121', 'Cleveland Ave', '07049', 'Harrison', 'New Jersey', 'Hudson');
INSERT INTO SHIP_ADDRESS(SAName, ID, ReceipientName, SNumber, Street, Zip, City, State, County) VALUES ('Kay Jonas II', 13, 'Kay Jonas', '122', 'Washingston Street', '07049', 'Harrison', 'New Jersey', 'Hudson');
INSERT INTO SHIP_ADDRESS(SAName, ID, ReceipientName, SNumber, Street, Zip, City, State, County) VALUES ('Tony Buchowski', 13, 'Tony Ji', '123', 'North Ave', '07069', 'Kearny', 'New Jersey', 'Hudson');
INSERT INTO SHIP_ADDRESS(SAName, ID, ReceipientName, SNumber, Street, Zip, City, State, County) VALUES ('Alex Dimithri', 14, 'Alex Ji', '124', 'Pacific Ave', '08029', 'Newark', 'New Jersey', 'Hudson');
INSERT INTO SHIP_ADDRESS(SAName, ID, ReceipientName, SNumber, Street, Zip, City, State, County) VALUES ('James Cooper', 14, 'James Ji', '125', '86th street', '10001', 'New York', 'New York', 'Hudson');

select * from product;
UPDATE PRODUCT set PQuantity = 1000 where ProductID in (1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17); 