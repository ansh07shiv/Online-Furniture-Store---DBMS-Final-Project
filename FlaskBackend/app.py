from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
from flask_cors import CORS, cross_origin
import json
from datetime import datetime

app = Flask(__name__)
cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

app.secret_key = 'desks-r-us'

# SQL Connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'adminroot'
app.config['MYSQL_DB'] = 'DESKS_R_US'

# Initialize MySQL
mysql = MySQL(app)


@app.route('/')
def hello_world():  # Test Service
    return 'Hello World!'


@app.route('/register', methods=['GET', 'POST'])
def register():
    json_object = json.loads(request.data)
    f_name = json_object['fName']
    l_name = json_object['lName']
    email = json_object['email']
    address = json_object['address']
    phone = json_object['phone']

    # MySQL Call
    # Insert Data into Two Tables
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('INSERT INTO CUSTOMER(FName, LName, Status, Email, Address, Phone) VALUES (%s, %s, %s, %s, %s, %s)',
                   (f_name, l_name, 'Gold', email, address, phone))
    cursor.execute('SELECT ID FROM CUSTOMER WHERE FName = %s and LName = %s and Status=%s and Email=%s and '
                   'Address = %s and Phone = %s', (f_name, l_name, 'Gold', email, address, phone))
    account = cursor.fetchone()
    cursor.execute('INSERT INTO CUSTOMER_LOGIN(ID, Email, Password) VALUES (%s, %s, %s)',
                   (account['ID'], email, '1234'))
    mysql.connection.commit()
    return 'Register Success'


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        json_object = json.loads(request.data)
        email = json_object['email']
        password = json_object['password']

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM CUSTOMER_LOGIN WHERE Email = %s AND Password = %s', (email, password))

        account = cursor.fetchone()
        print(account)
        if account:
            print("Saving Session Values")
            print("Account: ", account)
            session['Email'] = account['Email']
            session['ID'] = account['ID']
            print("Session: ", session)
            return {
                'customerID': account['ID'],
                'loginSuccess': 'true'
            }
        else:
            return {
                'loginSuccess': 'false'
            }
    return {
        'loginSuccess': 'false'
    }


@app.route('/getDesks', methods=['GET'])
def get_desks():
    if request.method == 'GET':
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('select * from PRODUCT P, Desks D where P.ProductID = D.ProductID;')
        account = cursor.fetchall()
        return {'result': account}


@app.route('/getChairs', methods=['GET'])
def get_chairs():
    if request.method == 'GET':
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('select * from PRODUCT P, CHAIRS C where P.ProductID = C.ProductID;')
        account = cursor.fetchall()
        return {'result': account}


@app.route('/getBookcases', methods=['GET'])
def get_bookcases():
    if request.method == 'GET':
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('select * from PRODUCT P, BOOKCASES B where P.ProductID = B.ProductID;')
        account = cursor.fetchall()
        return {'result': account}


@app.route('/getProducts', methods=['POST'])
def get_products():
    print("Session: ", session)
    print(session.get('ID'))
    if request.method == 'POST':
        json_object = json.loads(request.data)
        print("List of Product IDs")
        print(json_object)
        list_of_ids = json_object['listProductIDs']
        format_strings = ','.join(['%s'] * len(list_of_ids))
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('select * from PRODUCT P where P.ProductID IN (%s)' % format_strings, tuple(list_of_ids))
        account = cursor.fetchall()
        return {'result': account}


@app.route('/saveAddress', methods=['GET', 'POST'])
def save_address():
    print("Session: ", session)
    if request.method == 'POST':
        json_object = json.loads(request.data)
        sa_name = json_object['saName']
        f_name = json_object['fName']
        l_name = json_object['lName']
        street = json_object['street']
        zip_code = json_object['zip']
        city = json_object['city']
        state = json_object['state']
        county = json_object['county']
        customer_id = json_object['customerID']

        # MySQL Call
        # Insert Data into Shipping Address
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM SHIP_ADDRESS where SAName=%s AND ID=%s', (sa_name, customer_id))
        account = cursor.fetchone()
        if account:
            return 'Success'
        else:
            cursor.execute(
                'INSERT INTO SHIP_ADDRESS(SAName, ID, ReceipientName, SNumber, Street, Zip, City, State, County) '
                'VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)',
                (sa_name, customer_id, f_name + ' ' + l_name, 1, street, zip_code, city, state, county))
            mysql.connection.commit()
        return 'Success'


@app.route('/saveCardDetails', methods=['GET', 'POST'])
def save_card_details():
    if request.method == 'POST':
        json_object = json.loads(request.data)
        customer_id = json_object['customerID']
        card_number = json_object['cardNumber']
        card_owner_name = json_object['cardOwnerName']
        exp_date = json_object['expDate']
        billing_address = json_object['billingAddress']
        cvv = json_object['cvv']

        # MySQL Call
        # Insert Data into CREDIT_CARD
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        # Check if Card Exists
        cursor.execute('SELECT * FROM STORED_CARD where CardNumber=%s AND ID=%s', (card_number, customer_id))
        card_exist = cursor.fetchone()
        if card_exist:
            return 'Success'
        else:
            cursor.execute(
                'INSERT INTO CREDIT_CARD(CardNumber, SecNumber, CardOwnerName, CardType, BillingAddress, ExpDate) '
                'VALUES (%s, %s, %s, %s, %s, %s)',
                (card_number, 0, card_owner_name, 'Gold', billing_address, exp_date))

            cursor.execute(
                'INSERT INTO STORED_CARD(CardNumber, StoredCardFlag, ID) '
                'VALUES (%s, %s, %s)',
                (card_number, 'Y', customer_id))

            mysql.connection.commit()
        return 'Success'


@app.route('/addCart', methods=['GET', 'POST'])
def add_cart():
    if request.method == 'POST':
        json_object = json.loads(request.data)
        product_list = json_object['productListItems']
        sa_name = json_object['saName']
        card_number = json_object['cardNumber']
        cust_id = json_object['custId']
        print("Items")
        print(json_object)

        total_price = 0
        for var in product_list:
            total_price = total_price + int(var['PPrice']) * int(var['qtyTemp'])

        # Insert Data into CART
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO CART(TStatus, TDate, TotalAmount, CardNumber, SAName, ID) '
                       'VALUES (%s, %s, %s, %s, %s, %s)',
                       ('Completed', datetime.today().strftime('%Y-%m-%d'), str(total_price), card_number, sa_name,
                        cust_id))

        cursor.execute(
            'SELECT CartID FROM CART WHERE TStatus = %s and TDate = %s and TotalAmount = %s and CardNumber = %s and '
            'SAName = %s and ID = %s ',
            ('Completed', datetime.today().strftime('%Y-%m-%d'), str(total_price), card_number, sa_name, cust_id))
        account = cursor.fetchone()
        cart_id = account['CartID']
        # Enter Data in APPEARS_IN
        for var in product_list:
            cursor.execute('INSERT INTO APPEARS_IN(CartID, ProductID, Quantity, PriceSold) '
                           'VALUES (%s, %s, %s, %s)',
                           (cart_id, var['ProductID'], var['qtyTemp'], str(int(var['PPrice']) * int(var['qtyTemp']))))

        mysql.connection.commit()
        return 'Success'


@app.route('/getOrderDetailsCustomer', methods=['GET', 'POST'])
def get_order_details_customer():
    if request.method == 'POST':
        print("Object from Request: ", request.data)
        json_object = json.loads(request.data)
        customer_id = json_object['customerID']

        # MySQL Call
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            'select * from CART C, CUSTOMER CU where C.ID=CU.ID and C.ID = %s;',
            [str(customer_id)])
        order_list = cursor.fetchall()

        mysql.connection.commit()
        return {
            'order_list': order_list,
        }


@app.route('/getProductDetailsCustomer', methods=['GET', 'POST'])
def get_product_details_customer():
    if request.method == 'POST':
        print("Object from Request: ", request.data)
        json_object = json.loads(request.data)
        customer_id = json_object['customerID']
        cart_id = json_object['cartID']

        # MySQL Call
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            'select * from CART C, APPEARS_IN A, CUSTOMER CU, PRODUCT P where P.ProductID = A.ProductID '
            'and C.CartID = A.CartID AND C.ID = CU.ID AND C.ID = %s AND C.CartId = %s;',
            (str(customer_id), str(cart_id)))
        product_list = cursor.fetchall()

        mysql.connection.commit()
        return {
            'product_list': product_list,
        }


@app.route('/getSavedAddress', methods=['GET', 'POST'])
def get_saved_address():
    if request.method == 'POST':
        print("Object from Request: ", request.data)
        json_object = json.loads(request.data)
        customer_id = json_object['customerID']

        # MySQL Call
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            'select * from SHIP_ADDRESS where ID = %s;',
            [str(customer_id)])
        address_list = cursor.fetchall()

        mysql.connection.commit()
        return {
            'address_list': address_list,
        }


@app.route('/getSavedCreditDetails', methods=['GET', 'POST'])
def get_saved_credit_details():
    if request.method == 'POST':
        print("Object from Request: ", request.data)
        json_object = json.loads(request.data)
        customer_id = json_object['customerID']

        # MySQL Call
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

        cursor.execute(
            'select * from CREDIT_CARD C, STORED_CARD S where C.CardNumber = S.CardNumber and S.ID = %s;',
            [str(customer_id)])
        credit_list = cursor.fetchall()

        mysql.connection.commit()
        return {
            'credit_list': credit_list,
        }


@app.route('/getQueryResultsOne', methods=['GET', 'POST'])
def get_query_results_one():
    if request.method == 'POST':
        print("Object from Request: ", request.data)
        json_object = json.loads(request.data)
        begin_date = json_object['beginDate']
        end_date = json_object['endDate']

        # MySQL Call
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        # Get Product IDs in Order for Completed Transactions Only
        cursor.execute(
            'select ProductID, SUM(Quantity) from appears_in a, cart c where a.CartID = c.CartID and '
            'TStatus = %s and TDate BETWEEN %s and %s group by ProductID order by SUM(Quantity) DESC;',
            ('Completed', str(begin_date), str(end_date)))

        product_id_list = cursor.fetchall()
        print("Query Executed")
        product_list = []
        for val in product_id_list:
            product_id = val['ProductID']
            cursor.execute(
                'select * from PRODUCT where ProductId = %s;',
                [str(product_id)])
            product_list_item = cursor.fetchone()
            product_list_item['QuantitySold'] = val['SUM(Quantity)']
            product_list.append(product_list_item)

        mysql.connection.commit()
        return {
            'product_list': product_list,
        }


@app.route('/getQueryResultsTwo', methods=['GET', 'POST'])
def get_query_results_two():
    if request.method == 'POST':
        print("Object from Request: ", request.data)
        json_object = json.loads(request.data)
        begin_date = json_object['beginDate']
        end_date = json_object['endDate']

        # MySQL Call
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        # Get Product IDs in Order for Completed Transactions Only
        cursor.execute(
            'select ProductID, COUNT(DISTINCT ID) from appears_in a, cart c where a.CartID = c.CartID and '
            'TStatus = %s and TDate BETWEEN %s and %s group by ProductID order by COUNT(DISTINCT ID) desc;',
            ('Completed', str(begin_date), str(end_date)))

        product_id_list = cursor.fetchall()
        print("Query Executed")
        product_list = []
        for val in product_id_list:
            product_id = val['ProductID']
            cursor.execute(
                'select * from PRODUCT where ProductId = %s;',
                [str(product_id)])
            product_list_item = cursor.fetchone()
            product_list_item['QuantitySold'] = val['COUNT(DISTINCT ID)']
            product_list.append(product_list_item)

        mysql.connection.commit()
        return {
            'product_list': product_list,
        }


@app.route('/getQueryResultsThree', methods=['GET', 'POST'])
def get_query_results_three():
    if request.method == 'POST':
        print("Object from Request: ", request.data)
        json_object = json.loads(request.data)
        begin_date = json_object['beginDate']
        end_date = json_object['endDate']

        # MySQL Call
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        # Get Product IDs in Order for Completed Transactions Only
        cursor.execute(
            'select ID, SUM(TotalAmount) from cart where TStatus = %s and '
            'TDate BETWEEN %s and %s group by ID order by SUM(TotalAmount) DESC LIMIT 10;',
            ('Completed', str(begin_date), str(end_date)))

        customer_id = cursor.fetchall()
        print("Query Executed")
        customer_list = []
        for val in customer_id:
            id = val['ID']
            cursor.execute(
                'select * from CUSTOMER where ID = %s;',
                [str(id)])
            customer_list_item = cursor.fetchone()
            customer_list_item['TotalAmount'] = val['SUM(TotalAmount)']
            customer_list.append(customer_list_item)

        mysql.connection.commit()
        return {
            'customer_list': customer_list,
        }


@app.route('/getQueryResultsFour', methods=['GET', 'POST'])
def get_query_results_four():
    if request.method == 'POST':
        print("Object from Request: ", request.data)
        json_object = json.loads(request.data)
        begin_date = json_object['beginDate']
        end_date = json_object['endDate']

        # MySQL Call
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        # Get Product IDs in Order for Completed Transactions Only
        cursor.execute(
            'select zip, count(CartID) from ship_address s, cart c where s.SAName = c.SAName and '
            'TDate BETWEEN %s and %s and TStatus = %s group by zip order by count(CartID) desc LIMIT 5;',
            (str(begin_date), str(end_date), 'Completed'))

        zips_list = cursor.fetchall()
        mysql.connection.commit()
        return {
            'zips_list': zips_list,
        }


@app.route('/getQueryResultsFive', methods=['GET', 'POST'])
def get_query_results_five():
    if request.method == 'GET':

        # MySQL Call
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        # Get Product IDs in Order for Completed Transactions Only
        cursor.execute(
            'select PType, AVG(PPrice) from PRODUCT group by PType;'
        )

        average_price_list = cursor.fetchall()
        mysql.connection.commit()
        return {
            'average_price_list': average_price_list,
        }


if __name__ == '__main__':
    app.run()
