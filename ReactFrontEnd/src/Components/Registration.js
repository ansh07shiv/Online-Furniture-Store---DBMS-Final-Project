import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, {useState} from "react";
import axios from "axios";
import { useFormik } from 'formik';

const Registration = (props) => {

    const formik = useFormik({
        initialValues: {
            fName: '',
            lName: '',
            email: '',
            address: '',
            phone: '',
        },
        onSubmit: values => {
            console.log(values);
            axios({
                method: "POST",
                url: "http://127.0.0.1:5000/register",
                data: {...values}
            }).then((response) => {
                const res = response.data;
                props.registerSucess();
            }).catch((error) => {
                if(error.response) {
                    console.log(error);
                }
            })
        },
    });

    const hideRegistration = () => {
        props.hideRegistration();
    }

    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registration
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="fName"
                                    required
                                    fullWidth
                                    id="fName"
                                    label="First Name"
                                    onChange={formik.handleChange}
                                    value={formik.values.fName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lName"Sign upSign upSign up
                                    label="Last Name"
                                    name="lName"
                                    onChange={formik.handleChange}
                                    value={formik.values.lName}
                                    // onChange={setLNameHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    // onChange={setEmailHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    autoComplete="address"
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                    // onChange={setAddressHandler}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                    // onChange={setPhoneHandler}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // onClick = {handleRegistration}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-start">
                            <Grid item>
                                <Link onClick={hideRegistration} style={{cursor: 'pointer'}} variant="body2">
                                    Already have an account? Sign in!
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}

export default Registration;