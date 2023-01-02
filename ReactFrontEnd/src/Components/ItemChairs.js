import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import {useState} from "react";

const ItemChairs = (props) => {
    const [quantity, setQuantity] = useState(0);
    const onQtyChangeHandler = (event) => {
        if(event.target.value >= 0) {
            setQuantity(event.target.value);
        } else {
            setQuantity(0);
        }
    }
    const addCartItem = () => {
        if(quantity > 0) {
            props.success();
            props.addCartItem(props.pID, quantity);
        } else {
            props.failure();
        }
    }

    return(
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.pType}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.pName}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Fabric: {props.Fabric}
                    <br/> Type: {props.Type}
                </Typography>
                <Typography variant="body2">
                    {props.pDesc}
                </Typography>
                <br />
                <Divider />
                <br />
                <Typography variant="body2" style={{color: '#990D35', fontSize: '20px'}}>
                    <strong>Price</strong>: {props.pPrice}$
                </Typography>
            </CardContent>
            <CardActions style={{padding: '20px'}}>
                <TextField value={quantity} type='number' label="Quantity" variant="outlined" style={{marginRight: '20px'}} onChange={onQtyChangeHandler} />
                <Button size="medium" fullWidth variant="contained" sx={{ bgcolor: 'secondary.main' }}
                        onClick={addCartItem}
                >Add to Cart</Button>
            </CardActions>
        </Card>
    );
}

export default ItemChairs;