import {ThemeProvider} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {v4} from "uuid";
import axios from "axios";
import Home from '../Home';
import {useNavigate} from 'react-router';


export const OrderFood = () => {
    const theme = createTheme();
    const [foodItem, setFoodItem] = React.useState("")
    const [quantity, setQuantity] = React.useState("")
    let [orderId, setOrderId] = React.useState("")
    const emailId = "xyz@gmail.com"
    let navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        orderId = v4()
        localStorage.setItem("orderid", orderId)
        axios.post('https://us-central1-csci5410-project-356905.cloudfunctions.net/foodOrder', {
            "order_id": orderId,
            "customer_id": emailId,
            "food_item": foodItem,
            "food_quantity": quantity
        }).then(res => {
            if (res.status === 200 && res.data['message'] === "Order updated in database successfully") {
                alert("Order placed successfully with Order Id: " + orderId)
                navigate('/orderid')
            } else {
                alert("Something went wrong, please try again!")
                window.location.reload();
            }

        }).catch(err => {
            alert(err);
        });
    }
        const menu = localStorage.getItem("menu")
        const oe = JSON.parse(menu)
            const arr = [];
            Object.keys(oe).forEach(function(key) {
              arr.push(oe[key]);
            });

        return (
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    {/* <Home/> */}
                    <Box
                        sx={{
                            marginTop: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Order Food
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <div style={{
                                width: '100px',
                                height: '80px',
                                display: 'flex',
                                flexFlow: 'column',
                                justifyContent: 'end'

                            }}>
                                <Typography variant="subtitle2" gutterBottom component="div"/>
                            </div>
                            <lable>Select Food Item</lable>
                            <Select
                                margin="dense"
                                required
                                fullWidth
                                id="foodItem"
                                label={foodItem}
                                name="foodItem"
                                autoFocus
                                value={foodItem}
                                onChange={(event) => {
                                    setFoodItem(event.target.value)
                                }}
                            >
                                {arr.map((type) => {
                                    return (<MenuItem value={type.food_item}>{type.food_item}</MenuItem>)
                                })}

                            </Select>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="quantity"
                                label="Enter Quantity"
                                name="quantity"
                                autoFocus
                                value={quantity}
                                onChange={(event) => {
                                    setQuantity(event.target.value)
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Place Order
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        )

}