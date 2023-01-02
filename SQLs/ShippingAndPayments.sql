use DESKS_R_US;

drop table SHIP_ADDRESS;
CREATE TABLE IF NOT EXISTS SHIP_ADDRESS (
	SAName varchar(100) NOT NULL,
	ID integer NOT NULL,
    ReceipientName varchar(100) NOT NULL,
    SNumber integer NOT NULL,
    Street varchar(100) NOT NULL,
    Zip integer NOT NULL,
  	City varchar(100) NOT NULL,
  	State varchar(100) NOT NULL,
  	County varchar(100) NOT NULL,
    PRIMARY KEY (SAName, ID)
);
select * from SHIP_ADDRESS;
select * from CREDIT_CARD;
select * from STORED_CARD;
select * from CREDIT_CARD C, STORED_CARD S where C.CardNumber = S.CardNumber and S.ID = 7;

SELECT * FROM STORED_CARD S, CREDIT_CARD C where S.CardNumber = C.CardNumber AND S.CardNumber='0001000100010001' AND S.ID=7;


insert into stored_Card values ('0001000100010001', 'Y', 7);
insert into stored_Card values ('0011001100110011', 'Y', 7);
insert into stored_Card values ('0111011101110111', 'Y', 7);
insert into stored_Card values ('1111111111111111', 'Y', 7);
insert into stored_Card values ('9999999999999999', 'Y', 7);

CREATE TABLE IF NOT EXISTS STORED_CARD (
	CardNumber integer NOT NULL,
    StoredCardFlag varchar(10) NOT NULL,
    ID integer NOT NULL,
    primary key (CardNumber)
);
desc STORED_CARD;

ALTER TABLE STORED_CARD MODIFY CardNumber varchar(20);
ALTER TABLE STORED_CARD DROP FOREIGN KEY stored_card_ibfk_2;


CREATE TABLE IF NOT EXISTS APPEARS_IN (
	CartID integer not null,
    ProductID integer not null,
    Quantity integer not null,
    PriceSold integer not null,
    primary key (CartID)
);

ALTER TABLE APPEARS_IN Drop primary key, add primary key (CartID, ProductID);
