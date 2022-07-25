
import {createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {v4} from "uuid";
import Home from '../Home';
import {useNavigate} from 'react-router';


export const OrderFood = () => {
    const theme = createTheme();
    const [foodItem, setFoodItem] = React.useState("")
    const [quantity, setQuantity] = React.useState("")
    const [price, setPrice] = React.useState("")
    let [orderId, setOrderId] = React.useState("")
    const [arr] = React.useState([]);
    let navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        orderId = v4()
        localStorage.setItem("orderid", orderId)
        localStorage.setItem("fooditem", foodItem)
        localStorage.setItem("quantity", quantity)
        navigate('/confirmorder')
    }
    const menu = localStorage.getItem("menu")
    const oe = JSON.parse(menu)
    console.log(oe)
    Object.keys(oe).forEach(function (key) {
        arr.push(oe[key]);
    });


    return (
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
    )

}