import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import * as React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import Divider from "@mui/material/Divider";
import {useEffect, useState} from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import ItemDesks from "./ItemDesks";
import CartItem from "./CartItem";
import Button from "@mui/material/Button";

const Cart = (props) => {
    const [productItems, setProductItems] = useState([]);
    const deleteItem = (pID) => {
        console.log("Element to be Deleted");
        console.log(pID);
        console.log(productItems);
        const indexOfObject = productItems.findIndex(object => {
            return object.ProductID == pID;
        });
        console.log(indexOfObject);
        productItems.splice(indexOfObject, 1);

    //    Delete from Cart List too
        props.deleteCartItem(pID);
    }
    useEffect(() => {
        //    Call APIs for Product Information
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/getProducts",
            data: {
                listProductIDs: props.cartItems.map(function (el) { return el.pID; }),
            }
        }).then((response) => {
            props.success();
            const res = response.data.result;
            let resultList = []
            res.forEach((var1, index) => {
                const var2 = props.cartItems[index];
                resultList.push({...var1, qtyTemp: var2.quantiy});
            });
            console.log(resultList);
            setProductItems(resultList);
        }).catch((error) => {
            props.failure();
            setProductItems([]);
            if(error.response) {
                console.log(error);
            }
        })
    }, [])

    const showCheckOut = () => {
        let products = productItems;
        if(products.length !== 0) {
            props.showCheckOutHandler(products);
        } else {
            props.failure();
        }
    }

    return (
        <>
            <Grid container justifyContent="center" spacing={2}>
                {productItems.map(productItem => {
                        return (
                            <CartItem PName={productItem.PName} PDescription={productItem.PDescription}
                                      PPrice={productItem.PPrice} qtyTemp={productItem.qtyTemp}
                                      ProductID={productItem.ProductID}
                                      deleteItem={deleteItem}
                            />
                        )
                    })}
            </Grid>
            <div style={{padding: '40px'}}>
                <Button variant="contained" fullWidth color="success" onClick={showCheckOut}>Buy</Button>
            </div>
        </>
    )
}

export default Cart;