import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useFormik} from "formik";
import axios from "axios";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";
import AddressListItem from "./AddressListItem";
import CreditListItem from "./CreditListItem";

export default function PaymentForm(props) {

    const [storedCardList, setStoredCardList] = useState([]);

    useEffect(() => {
        // Get Stored Card
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/getSavedCreditDetails",
            data: {customerID:props.customerID}
        }).then((response) => {
            const res = response.data;
            setStoredCardList(res.credit_list);
            props.showSuccess();
        }).catch((error) => {
            props.showFailure();
            if(error.response) {
                console.log(error);
            }
        })
    }, []);

    const selectCardHandler = (CardNumber) => {
        console.log("Card Number: ", CardNumber);
        const indexOfObject = storedCardList.findIndex(object => {
            return object.CardNumber == CardNumber;
        });
        let cardItem = storedCardList[indexOfObject];
        formik.setFieldValue('cardNumber', cardItem.CardNumber);
        formik.setFieldValue('cardOwnerName', cardItem.CardOwnerName);
        formik.setFieldValue('expDate', cardItem.ExpDate);
        formik.setFieldValue('billingAddress', cardItem.BillingAddress);
    }

    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            cardOwnerName: '',
            expDate: '',
            billingAddress: '',
            cvv:'',
        },
        onSubmit: values => {
            console.log(values);
            props.setCardNumberHandler(values.cardNumber);
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/saveCardDetails",
                data: {...values, customerID:props.customerID}
            }).then((response) => {
                const res = response.data;
                props.showSuccess();
            }).catch((error) => {
                props.showFailure();
                if(error.response) {
                    console.log(error);
                }
            })
        },
    });


    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>

            <Typography variant="h8" gutterBottom>
                (Please save payment details before proceeding to avoid any issues!)
            </Typography>
            <br/>
            {storedCardList.map(storedCardItem => {
                return(
                    <>
                        <Divider />
                        <CreditListItem selectCardHandler={selectCardHandler} CardNumber={storedCardItem.CardNumber}
                                         CardOwnerName={storedCardItem.CardOwnerName}
                        />
                    </>
                )
            })}
            <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardOwnerName"
                        name="cardOwnerName"
                        label="Name on card"
                        fullWidth
                        autoComplete="cc-name"
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.cardOwnerName}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.cardNumber}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="expDate"
                        label="Expiry date"
                        fullWidth
                        autoComplete="cc-exp"
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.expDate}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        name="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.cvv}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="billingAddress"
                        name="billingAddress"
                        label="Billing Address"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.billingAddress}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type='submit' color="success">
                        Save Card Details
                    </Button>
                </Grid>
            </Grid>
            </form>
        </React.Fragment>
    );
}