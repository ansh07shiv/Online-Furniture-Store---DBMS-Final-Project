import './App.css';
import Login from "./Components/Login";
import React, {useState} from "react";
import Registration from "./Components/Registration";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Home from "./Components/Home";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [registerUser, setRegisterUser] = useState(false);
    const [customerID, setCustomerID] = useState(0);
    const updateCustomerID = (cID) => {
        setCustomerID(cID);
    }

    const logoutHandler = () => {
        setIsLoggedIn(false);
        setRegisterUser(false);
        setCustomerID(0);
    }

    //Snackbar
    const [openSnack, setOpenSnack] = useState(false);
    const handleOpen = () => {
        setOpenSnack(true);
    };

    const handleClose = () => {
        setOpenSnack(false);
    };

    const [openSnackError, setOpenSnackError] = useState(false);
    const handleOpenError = () => {
        setOpenSnackError(true);
    };

    const handleCloseError = () => {
        setOpenSnackError(false);
    };

    //Success

    const loginSuccess = () => {
        console.log("Login Success");
        setIsLoggedIn(true);
        setOpenSnack(true);
    }

    const showSuccess = () => {
        setOpenSnack(true);
    }


    const registerSuccess = () => {
        console.log("Registration Success");
        handleOpen();
        hideRegistration();
    }

    //Failures

    const showFailure = () => {
        setOpenSnackError(true);
    }

    const loginFail = () => {
        console.log("Login Failed");
        setOpenSnackError(true);
    }

    //Utilities
    const hideRegistration = () => {
        setRegisterUser(false);
    }
    const showRegistration = () => {
        setRegisterUser(true);
    }
  return (
    <div className="App" style={{width:'100%'}}>

        <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Success!
            </Alert>
        </Snackbar>

        <Snackbar open={openSnackError} autoHideDuration={6000} onClose={handleCloseError}>
            <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                Failure!
            </Alert>
        </Snackbar>
        {isLoggedIn && <Home logoutHandler={logoutHandler} customerID={customerID} showFailure={showFailure} showSuccess={showSuccess}/>}
        {!isLoggedIn && !registerUser && <Login updateCustomerID={updateCustomerID} loginFail={loginFail} loginSuccess={loginSuccess} showRegistration={showRegistration}/>}
        {!isLoggedIn && registerUser && <Registration registerSucess={registerSuccess} hideRegistration={hideRegistration}/>}
    </div>
  );
}

export default App;
