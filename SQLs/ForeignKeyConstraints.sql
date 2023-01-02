-- CREDIT_CARD -> No Foreign Keys

-- CART
desc CART;
desc SHIP_ADDRESS;
Alter table CART ADD foreign key (CardNumber) references CREDIT_CARD(CardNumber);
Alter table CART ADD foreign key (SAName) references SHIP_ADDRESS(SAName);
Alter table CART ADD foreign key (ID) references SHIP_ADDRESS(ID);

-- PRODUCT -> No Foreign keys

-- CUSTOMER -> No Foreign Keys

-- SHIP_ADDRESS
Alter table SHIP_ADDRESS ADD foreign key (ID) references CUSTOMER(ID);

-- STORED_CARD
Alter table STORED_CARD ADD foreign key (ID) references CUSTOMER(ID);
Alter table STORED_CARD ADD foreign key (CardNumber) references CREDIT_CARD(CardNumber); -- This is a Fix in Mapping Diagram

-- APPEARS_IN
desc APPEARS_IN;
-- ALTER TABLE APPEARS_IN RENAME COLUMN CardID TO CartID;
desc CART;
-- ALTER TABLE CART RENAME COLUMN CardID TO CartID;

Alter table APPEARS_IN ADD foreign key (CartID) references CART(CartID);
Alter table APPEARS_IN ADD foreign key (ProductID) references PRODUCT(ProductID);

-- OFFER_PRODUCT
Alter table OFFER_PRODUCT ADD foreign key (ProductID) references PRODUCT(ProductID);

-- DESKS
Alter table DESKS ADD foreign key (ProductID) references PRODUCT(ProductID);

-- CHAIRS
Alter table CHAIRS ADD foreign key (ProductID) references PRODUCT(ProductID);

-- BOOKCASES
Alter table BOOKCASES ADD foreign key (ProductID) references PRODUCT(ProductID);
