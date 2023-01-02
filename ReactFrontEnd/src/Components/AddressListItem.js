import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import * as React from "react";

const AddressListItem = (props) => {
    const onBtnClickHandler = (event) => {
        props.selectAddressHandler(event.target.value);
    }
    return(
        <ListItem>
            <ListItemText primary={"Shipping Address Name:" + props.SAName} secondary={"Name: " + props.ReceipientName} />
            <Button variant="contained" color="warning" value={props.SAName} onClick={onBtnClickHandler}>
                Select Address
            </Button>
        </ListItem>
    )
}

export default AddressListItem;