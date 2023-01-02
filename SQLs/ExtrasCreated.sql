CREATE TABLE IF NOT EXISTS SOLD_PRODUCT(
	ProductID integer NOT NULL,
  	ID integer NOT NULL,
  	Quantity integer NOT NULL,
  	Price integer NOT NULL,
    PRIMARY KEY (ProductID, ID)
);

Alter table SOLD_PRODUCT ADD foreign key (ProductID) references PRODUCT(ProductID);
Alter table SOLD_PRODUCT ADD foreign key (ID) references CUSTOMER(ID);

select * from chairs;
select * from bookcases;










select * from product;
update product set PPrice = 300 where ProductID = 5;


select * from customer;
update customer set FName = 'Rahul' where ID = 8;
update customer set FName = 'Yeswanth' where ID = 9;
update customer set FName = 'Rithik' where ID = 17;
update customer set FName = 'Ranbir' where ID = 18;
update customer set LName = 'Roshan' where ID = 17;
update customer set LName = 'Kapoor' where ID = 18;



select * from ship_Address;
update ship_address set zip = 07021 where SAName = 'ABC' and ID = 7;
update ship_address set zip = 07021 where SAName = 'IIII' and ID = 9;
update ship_address set zip = 07021 where SAName = 'Jeswini' and ID = 8;
update ship_address set zip = 07021 where SAName = 'WASD' and ID = 7;
update ship_address set zip = 07021 where SAName = 'XYZ' and ID = 7;
