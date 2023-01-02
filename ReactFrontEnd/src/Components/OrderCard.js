import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from "@mui/material/Grid";
import axios from "axios";
import {useState} from "react";

const OrderCard = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [productList, setProductList] = useState([]);

    const handleExpandClick = () => {
        getProductDetails();
        setExpanded(!expanded);
    };

    const getProductDetails = () => {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/getProductDetailsCustomer",
            data: {
                customerID:props.customerID,
                cartID: props.cartID,
            }
        }).then((response) => {
            props.showSuccess();
            console.log(response)
            const res = response.data;
            const productListRes = res.product_list;
            setProductList(productListRes);
        }).catch((error) => {
            props.showFailure();
            if(error.response) {
                console.log(error);
            }
        })
    }

    return (
        <Grid item xs={6}>
        <Card sx={{ minWidth: '50%'}}>
            <CardContent>
                <CardContent>
                    <Typography component="div" variant="h5">
                        <strong>Customer Name: {props.customerName}</strong>
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        Order Date: {props.orderDate}
                    </Typography>
                    <Typography variant="body2">
                        <strong>Order Status: </strong> {props.orderStatus}
                    </Typography>
                    <Typography variant="body2" style={{color: '#990D35', fontSize: '20px'}}>
                        <strong>Order Price: </strong>{props.orderPrice}$
                    </Typography>
                </CardContent>
            </CardContent>
            <CardActions disableSpacing>
                    <IconButton
                        aria-expanded={expanded} style={{display:'grid'}} onClick={handleExpandClick}><ExpandMoreIcon /></IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Typography component="div" variant="h5">
                    <strong>Order Content</strong>
                </Typography>
                {productList.map(productItem => {
                    return(
                        <CardContent>
                            <Typography component="div" variant="h6">
                                <strong>Product Name: {productItem.PName}</strong>
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                Product Description: {productItem.PDescription}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Quantity: </strong>{productItem.Quantity}
                            </Typography>
                            <Typography variant="body2" style={{color: '#990D35', fontSize: '20px'}}>
                                <strong>Total Price: </strong>{productItem.PriceSold}$
                            </Typography>
                        </CardContent>
                    )
                })}
            </Collapse>
        </Card>
        </Grid>
    );
}

export default OrderCard;