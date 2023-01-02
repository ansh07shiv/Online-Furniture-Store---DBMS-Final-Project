import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {useFormik} from "formik";
import axios from "axios";
import Button from "@mui/material/Button";
import {useEffect, useState} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddressListItem from "./AddressListItem";
import Divider from "@mui/material/Divider";

export default function AddressForm(props) {
    const [addressList, setAddressList] = useState([]);

    const selectAddressHandler = (SAName) => {
        console.log(SAName);
        const indexOfObject = addressList.findIndex(object => {
            return object.SAName == SAName;
        });
        let addressItem = addressList[indexOfObject];
        formik.setFieldValue('saName', addressItem.SAName);
        formik.setFieldValue('fName', addressItem.ReceipientName.split(" ")[0]);
        formik.setFieldValue('lName', addressItem.ReceipientName.split(" ")[0]);
        formik.setFieldValue('street', addressItem.Street);
        formik.setFieldValue('zip', addressItem.Zip);
        formik.setFieldValue('city', addressItem.City);
        formik.setFieldValue('state', addressItem.State);
        formik.setFieldValue('county', addressItem.County);
    }

    useEffect(() => {
    //    Get Addresses
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/getSavedAddress",
            data: {customerID: props.customerID}
        }).then((response) => {
            const res = response.data;
            setAddressList(res.address_list);
            props.showSuccess();
        }).catch((error) => {
            props.showFailure();
            if(error.response) {
                console.log(error);
            }
        })
    }, []);


    const formik = useFormik({
        initialValues: {
            saName: '',
            fName: '',
            lName: '',
            street: '',
            zip: '',
            city: '',
            state: '',
            county: '',
        },
        onSubmit: values => {
            console.log(values);
            props.setSaNameHandler(values.saName);
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/saveAddress",
                data: {...values, customerID: props.customerID}
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
                Shipping address
            </Typography>

            <Typography gutterBottom>
            (Please save address before proceeding to avoid any issues!)
            </Typography>
            <br/>
            {addressList.map(addressItem => {
                return(
                    <>
                        <Divider />
                        <AddressListItem selectAddressHandler={selectAddressHandler} SAName={addressItem.SAName} ReceipientName={addressItem.ReceipientName}/>
                    </>
                    )
            })}

            <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3} style={{marginTop: '5px'}}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="saName"
                        name="saName"
                        label="Shipping Address Name(Should be Unique for a Customer!)"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.saName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="fName"
                        name="fName"
                        label="First name"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.fName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lName"
                        name="lName"
                        label="Last name"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.lName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="street"
                        name="street"
                        label="Street"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.street}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        required
                        name="state"
                        label="State"
                        fullWidth
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.state}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.zip}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="county"
                        name="county"
                        label="County"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                        onChange={formik.handleChange}
                        value={formik.values.county}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" type='submit' color="success">
                        Save Address
                    </Button>
                </Grid>
            </Grid>
            </form>
        </React.Fragment>
    );
}