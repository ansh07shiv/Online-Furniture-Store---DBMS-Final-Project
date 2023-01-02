import OrderCard from "./OrderCard";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";

const ManageOrder = (props) => {
    const [orderList, setOrderList] = useState([]);
    useEffect(() => {
        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/getOrderDetailsCustomer",
            data: {
                customerID:props.customerID,
            }
        }).then((response) => {
            props.showSuccess();
            const res = response.data;
            const orderListRes = res.order_list;
            setOrderList(orderListRes);
        }).catch((error) => {
            props.showFailure();
            if(error.response) {
                console.log(error);
            }
        })
    }, []);
    return(
        <>
            <Grid container justifyContent="center" spacing={2}>
        {orderList.map(orderItem => {
                return(
                    <OrderCard customerName={orderItem.FName + ' ' + orderItem.LName} orderDate={orderItem.TDate}
                               orderStatus={orderItem.OrderStatus} orderPrice={orderItem.TotalAmount}
                               showSuccess={props.showSuccess} showFailure={props.showFailure}
                               cartID={orderItem.CartID} customerID={props.customerID}
                    />
                )
            })}
            </Grid>
        </>
    )
}

export default ManageOrder;