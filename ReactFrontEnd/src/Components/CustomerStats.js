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

const CustomerStats = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [beginDate, setBeginDate] = useState(dayjs('2022/12/05'));
    const [endDate, setEndDate] = useState(dayjs('2022/12/05'));
    const [productList, setProductList] = useState([]);
    const handleChangeEndDate = (event) => {
        let temp = event.$d.toLocaleDateString().split("/");
        let year = temp[2];
        let month = temp[0];
        if(month.length === 1) {
            month = '0'+month;
        }
        let day = temp[1];
        if(day.length === 1) {
            day = '0'+day;
        }
        let date = year+'-'+month+'-'+day;
        console.log(date);
        setEndDate(date);
    };


    const handleChangeBeginDate = (event) => {
        let temp = event.$d.toLocaleDateString().split("/");
        let year = temp[2];
        let month = temp[0];
        if(month.length === 1) {
            month = '0'+month;
        }
        let day = temp[1];
        if(day.length === 1) {
            day = '0'+day;
        }
        let date = year+'-'+month+'-'+day;
        console.log(date);
        setBeginDate(date);
    };

    const handleExpandClick = () => {
        axios({
            method: "POST",
            url: props.url,
            data: {
                beginDate,
                endDate,
            }
        }).then((response) => {
            const res = response.data;
            setProductList(res.customer_list)
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
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Begin Date
                                </Typography>
                                <br />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Begin Date"
                                        inputFormat="MM/DD/YYYY"
                                        value={beginDate}
                                        onChange={handleChangeBeginDate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    End Date
                                </Typography>
                                <br />
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="End Date"
                                        inputFormat="MM/DD/YYYY"
                                        value={endDate}
                                        onChange={handleChangeEndDate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
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
                                    <strong>Customer Name: {productItem.FName + ' ' + productItem.LName}</strong>
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    <strong>{props.uniqueValueString}: </strong>{productItem.TotalAmount}$
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

export default CustomerStats;