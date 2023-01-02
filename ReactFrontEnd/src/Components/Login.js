import React, {useState} from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Login = (props) => {
    const [profileData, setProfileData] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const setEmailHandler = (event) => {
        setEmail(event.target.value);
    }
    const setPasswordHandler = (event) => {
        setPassword(event.target.value);
    }


    const getData = () => {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/login",
            data: {
                email,
                password,
            }
        }).then((response) => {
            const res = response.data;
            console.log(res);
            if(res.loginSuccess === 'false') {
                props.loginFail();
            } else {
                props.updateCustomerID(res.customerID)
                props.loginSuccess();
            }
        }).catch((error) => {
            props.loginFail();
            if(error.response) {
                console.log(error);
            }
        })
    }

    const showRegistration = () => {
        props.showRegistration();
    }
    return (
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
                    Sign in
                    <br />
                    Desks-R-Us
                </Typography>
                <Box sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={setEmailHandler}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={setPasswordHandler}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={getData}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link variant="body2" onClick={showRegistration} style={{cursor: 'pointer'}}>
                                {"Don't have an account? Register!"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;