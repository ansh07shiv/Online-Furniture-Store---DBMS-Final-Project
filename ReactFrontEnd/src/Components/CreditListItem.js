import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import * as React from "react";

const CreditListItem = (props) => {
    const onBtnClickHandler = (event) => {
        props.selectCardHandler(event.target.value);
    }
    return(
        <ListItem>
            <ListItemText primary={"Card Owner Name:" + props.CardOwnerName} secondary={"Card Number: " + props.CardNumber} />
            <Button variant="contained" color="warning" value={props.CardNumber} onClick={onBtnClickHandler}>
                Select Card
            </Button>
        </ListItem>
    )
}

export default CreditListItem;