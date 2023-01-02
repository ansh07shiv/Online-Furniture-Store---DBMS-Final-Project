import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import * as React from "react";
import {useState} from "react";

const CartItem = (props) => {
    const [quantity, setQuantity] = useState(props.qtyTemp);
    const updateQty = (event) => {
        setQuantity(event.target.value);
    }
    const deleteHandler = () => {
        props.deleteItem(props.ProductID);
    }

    return (
        <Grid item xs={6} style={{marginBottom: '20px'}}>
            <Card sx={{ minWidth: '50%'}}>
                <Box>
                    <CardContent>
                        <Typography component="div" variant="h5">
                            <strong>{props.PName}</strong>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {props.PDescription}
                        </Typography>
                        <Typography variant="body2" style={{color: '#990D35', fontSize: '20px'}}>
                            <strong>Price</strong>: {props.PPrice}$
                        </Typography>
                        <Typography variant="body2" style={{fontSize: '20px', marginTop: '20px'}}>
                        <strong>Quantity: </strong> {quantity}
                    </Typography>
                    </CardContent>
                    <Divider />
                    <Box sx={{ alignItems: 'center', padding:'20px' }}>
                        {/*<TextField type='number' value={quantity} label="Quantity" variant="outlined"*/}
                        {/*           style={{marginRight: '20px'}} onChange={updateQty}/>*/}

                        <IconButton aria-label="play/pause" onClick={deleteHandler}>
                            <DeleteIcon sx={{ height: 38, width: 38 }} />
                        </IconButton>
                        <Typography variant="body2" style={{color: '#990D35', fontSize: '20px', marginTop: '20px'}}>
                            <strong>Total</strong>: {props.PPrice*quantity}$
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Grid>
    )
}

export default CartItem;