import * as React from 'react';
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Divider from '@mui/material/Divider';
import ItemDesks from "./ItemDesks";
import {useEffect, useState} from "react";
import Badge from "@mui/material/Badge";
import Cart from "./Cart";
import Checkout from "./Checkout";
import ManageOrder from "./ManageOrder";
import SalesStas from "./SalesStats";
import CustomerStats from "./CustomerStats";
import ZipStats from "./ZipStats";
import AvgPriceListStats from "./AvgPriceListStats";
import ItemChairs from "./ItemChairs";
import ItemBookCases from "./ItemBookCases";

const Home = (props) => {
    const [desksList, setDesksList] = useState([]);
    const [chairsList, setChairsList] = useState([]);
    const [bookcasesList, setBookCasesList] = useState([]);
    const [cartItemsList, setCartItemsList] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showCheckOut, setShowCheckOut] = useState(false);
    const [productList, setProductList] = useState([]);
    const [manageOrders, setManageOrders] = useState(false);
    const [isAdminLogin, setIsAdminLogin] = useState(false);
    useEffect(() => {
        if(props.customerID == '10') {
            setIsAdminLogin(true);
        }
    }, []);
    const showManageOrdersHandler = () => {
        setShowCart(false);
        setShowCheckOut(false);
        setManageOrders(true);
    }

    const logoutHandler = () => {
        props.logoutHandler();
    }

    const [saName, setSaName] = useState('');
    const [cardNumber, setCardNumber] = useState('');

    const setSaNameHandler = (saName) => {
        setSaName(saName);
    }
    const setCardNumberHandler = (cardNumber) => {
        setCardNumber(cardNumber);
    }

    const showCheckOutHandler = (productList) => {
        setProductList(productList);
        setShowCart(false);
        setManageOrders(false);
        setShowCheckOut(true);
    }
    const showCartHandler = () => {
        setManageOrders(false);
        setShowCheckOut(false);
        setShowCart(true);
    }
    const showHome = () => {
        setManageOrders(false);
        setShowCart(false);
        setShowCheckOut(false);
    }

    const addCartItemsResetCartShowHome = () => {
        let productListItems = productList;
        let custId = props.customerID;
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/addCart",
            data: {
                productListItems,
                saName,
                cardNumber,
                custId,
            }
        }).then((response) => {
            const res = response.data;
            props.showSuccess();
        }).catch((error) => {
            props.showFailure();
            if(error.response) {
                console.log(error);
            }
        })
        setManageOrders(false);
        setShowCart(false);
        setShowCheckOut(false);
        setCartItemsList([]);
        setProductList([]);
    }

    const handleCheck = (val) => {
        return cartItemsList.some(item => val === item.pID);
    }

    const deleteCartItem = (pID) => {
        const indexOfObject = cartItemsList.findIndex(object => {
            return object.pID == pID;
        });
        console.log(indexOfObject);
        cartItemsList.splice(indexOfObject, 1);
    }

    const addCartItem = (pID, quantiy) => {
        if(handleCheck(pID)) {
            props.showFailure();
        } else {
            props.showSuccess();
            let temp = {
                pID,
                quantiy,
            }
            setCartItemsList([...cartItemsList, temp]);
        }
    }
    useEffect(() => {
    //    Call APIs for Product Information
        axios({
            method: "GET",
            url: "http://127.0.0.1:5000/getDesks",
        }).then((response) => {
            props.showSuccess();
            const res = response.data.result;
            console.log(res);
            setDesksList(res);
        }).catch((error) => {
            props.showFailure()
            setDesksList([]);
            if(error.response) {
                console.log(error);
            }
        })

        axios({
            method: "GET",
            url: "http://127.0.0.1:5000/getChairs",
        }).then((response) => {
            props.showSuccess();
            const res = response.data.result;
            console.log(res);
            setChairsList(res);
        }).catch((error) => {
            props.showFailure()
            if(error.response) {
                console.log(error);
            }
        })

        axios({
            method: "GET",
            url: "http://127.0.0.1:5000/getBookcases",
        }).then((response) => {
            props.showSuccess();
            const res = response.data.result;
            console.log(res);
            setBookCasesList(res);
        }).catch((error) => {
            props.showFailure()
            if(error.response) {
                console.log(error);
            }
        })
    }, [])

    return (
        <>
            <CssBaseline />

            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ bgcolor: 'secondary.main' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ display: 'flex', flexGrow: 1 }}>
                            Desks-R-Us
                        </Typography>
                        {!isAdminLogin && (
                                <>
                                    <Button color="inherit" onClick={showHome}>Online Sale</Button>
                                    <Button color="inherit" onClick={showCartHandler}>Cart
                                    <Badge badgeContent={cartItemsList.length} color="success">
                                    <ShoppingCartIcon sx={{marginLeft: '5px'}}/>
                                    </Badge>
                                    </Button>
                                    <Button color="inherit" onClick={showManageOrdersHandler}>Manage Orders</Button>
                                </>
                            )
                        }
                        <Button color="inherit" onClick={logoutHandler}>Logout</Button>
                    </Toolbar>

                </AppBar>
            </Box>
            {isAdminLogin && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>Sales Statistics</strong>
                                </Typography>
                            </Container>
                        </Box>
                        <Divider />
                        <div style={{padding: '60px', backgroundColor: '#E7EBEF'}}>
                            <Grid container spacing={3}>
                                <SalesStas uniqueValueString={'Quantity Sold'} url={'http://127.0.0.1:5000/getQueryResultsOne'} showSuccess={props.showSuccess} showFailure={props.showFailure} question={'For a given time period (begin date and end date) compute the most frequently sold products.'}/>
                                <SalesStas uniqueValueString={'Unique Customer Count'} url={'http://127.0.0.1:5000/getQueryResultsTwo'} showSuccess={props.showSuccess} showFailure={props.showFailure} question={'For a given time period (begin date and end date) compute the products which are sold to the highest number of distinct customers.'}/>
                                <CustomerStats uniqueValueString={'Money Spent'} url={'http://127.0.0.1:5000/getQueryResultsThree'} showSuccess={props.showSuccess} showFailure={props.showFailure} question={'For a given time period (begin date and end date) compute the 10 best customers (in terms of money spent) in descending order.'}/>
                                <ZipStats uniqueValueString={'Total Shipments'} url={'http://127.0.0.1:5000/getQueryResultsFour'} showSuccess={props.showSuccess} showFailure={props.showFailure} question={'For a given time period (begin date and end date) compute the 5 best zip codes (in terms of shipments made).'}/>
                                <AvgPriceListStats uniqueValueString={'Average Price'} url={'http://127.0.0.1:5000/getQueryResultsFive'} showSuccess={props.showSuccess} showFailure={props.showFailure} question={'For a given time period (begin date and end date) compute the average selling product price per product type for desks, chairs and bookcases.'}/>
                            </Grid>
                        </div>
                    </main>
                </>
            )}
            {!isAdminLogin && !showCart && !showCheckOut && !manageOrders && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>Online Sale</strong>
                                </Typography>
                                <Typography
                                    component="h8"
                                    variant="h8"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Note: System will not allow Adding an Item already in Cart!
                                </Typography>
                            </Container>
                        </Box>
                        <Divider />
                        <div style={{padding: '60px', backgroundColor: '#E7EBEF'}}>
                            <Grid container spacing={3}>
                                {desksList.map(deskItem => {
                                    return (
                                        <Grid item xs={4}>
                                            <ItemDesks success={props.showSuccess} failure={props.showFailure} addCartItem={addCartItem} pID={deskItem.ProductID} pType={deskItem.PType} pName={deskItem.PName} pDesc={deskItem.PDescription}
                                                       pPrice={deskItem.PPrice} pQty={deskItem.PQuantity} drawers={deskItem.Drawers}
                                                       material={deskItem.Material}
                                            />
                                        </Grid>
                                    )
                                })}
                                {chairsList.map(chairsItem => {
                                    return (
                                        <Grid item xs={4}>
                                            <ItemChairs success={props.showSuccess} failure={props.showFailure} addCartItem={addCartItem}
                                                        pID={chairsItem.ProductID} pType={chairsItem.PType} pName={chairsItem.PName}
                                                        pDesc={chairsItem.PDescription}
                                                       pPrice={chairsItem.PPrice} pQty={chairsItem.PQuantity} Fabric={chairsItem.Fabric}
                                                       Type={chairsItem.Type}
                                            />
                                        </Grid>
                                    )
                                })}
                                {bookcasesList.map(bookcasesItem => {
                                    return (
                                        <Grid item xs={4}>
                                            <ItemBookCases success={props.showSuccess} failure={props.showFailure} addCartItem={addCartItem}
                                                           pID={bookcasesItem.ProductID} pType={bookcasesItem.PType} pName={bookcasesItem.PName}
                                                           pDesc={bookcasesItem.PDescription}
                                                       pPrice={bookcasesItem.PPrice} pQty={bookcasesItem.PQuantity} Shelves={bookcasesItem.Shelves}
                                                       Material={bookcasesItem.Material}
                                            />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </div>
                    </main>
                </>
            )}

            {showCart && !showCheckOut && !manageOrders && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>Cart</strong>
                                </Typography>
                            </Container>
                        </Box>
                        <Divider />
                        <div style={{padding: '60px', backgroundColor: '#E7EBEF'}}>
                                <Cart customerID={props.customerID} showCheckOutHandler={showCheckOutHandler} deleteCartItem={deleteCartItem} success={props.showSuccess} failure={props.showFailure} cartItems={cartItemsList}/>
                        </div>
                    </main>
                </>
            )}


            {showCheckOut && !showCart && !manageOrders && (
                <>
                    <main>
                        <Divider />
                        <div style={{padding: '50px', backgroundColor: '#E7EBEF'}}>
                            <Checkout setCardNumberHandler={setCardNumberHandler} setSaNameHandler={setSaNameHandler} addCartItemsResetCartShowHome={addCartItemsResetCartShowHome} customerID={props.customerID} showSuccess={props.showSuccess} showFailure={props.showFailure} />
                        </div>
                    </main>
                </>
            )}

            {manageOrders &&  !showCheckOut && !showCart && (
                <>
                    <main>
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h4"
                                    variant="h4"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    <strong>Manage Order</strong>
                                </Typography>
                            </Container>
                        </Box>
                        <Divider />
                        <div style={{padding: '60px', backgroundColor: '#E7EBEF'}}>
                            <ManageOrder showSuccess={props.showSuccess} showFailure={props.showFailure} customerID={props.customerID}/>
                        </div>
                    </main>
                </>
            )}


        </>
    );
}

export default Home;