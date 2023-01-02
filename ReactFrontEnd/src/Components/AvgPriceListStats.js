import {useState} from "react";
import dayjs from "dayjs";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import * as React from "react";

const AvgPriceListStats = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [productList, setProductList] = useState([]);




    const handleExpandClick = () => {
        axios({
            method: "GET",
            url: props.url,
        }).then((response) => {
            const res = response.data;
            setProductList(res.average_price_list)
            props.showSuccess();
        }).catch((error) => {
            props.showFailure();
            if(error.response) {
                console.log(error);
            }
        })
        setExpanded(!expanded);
    };

    return(
        <Grid item xs={12}>
            <Card sx={{ minWidth: '50%'}}>
                <CardContent>
                    <CardContent>
                        <Typography component="div" variant="h5">
                            <strong>{props.question}</strong>
                        </Typography>
                        <br />
                        <Typography variant="body2">
                            <Button variant="contained" color="success" onClick={handleExpandClick}>
                                Search
                            </Button>
                        </Typography>
                    </CardContent>
                </CardContent>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {productList.map(productItem => {
                        return(
                            <>
                                <Typography component="div" variant="h5">
                                    <strong>Product Type: {productItem.PType}</strong>
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    <strong>{props.uniqueValueString}: </strong>{productItem['AVG(PPrice)']}
                                </Typography>
                                <Divider />
                            </>
                        )
                    })}
                </Collapse>
            </Card>
        </Grid>
    )
}

export default AvgPriceListStats;