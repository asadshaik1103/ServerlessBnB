import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Container from "@mui/material/Container";
import Home from '../Home';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import axios from "axios";
import {useNavigate} from 'react-router';

export const ConfirmOrder = () => {
    const emailId = localStorage.getItem("email")
    let navigate = useNavigate();

    const clickYes = () => {
        axios.post('https://us-central1-csci5410-project-356905.cloudfunctions.net/foodOrder', {
            "order_id": localStorage.getItem("orderid"),
            "customer_id": emailId,
            "food_item": localStorage.getItem("fooditem"),
            "food_quantity": localStorage.getItem("quantity")
        }).then(res => {
            if (res.status === 200 && res.data['message'] === "Order updated in database successfully") {
                alert("Order placed successfully with Order Id: " + localStorage.getItem("orderid"))
                axios.post("https://us-central1-csci-5410-assignment-4-part-b.cloudfunctions.net/FoodAnalysisEndpoint",{
                    "order_id": localStorage.getItem("orderid"),
                    "customer_id": emailId,
                    "food_item": localStorage.getItem("fooditem"),
                    "food_quantity": localStorage.getItem("quantity")
                }).then(res => {console.log(res)
                if (res.status === 200){
                    navigate('/orderid')
                }
                else{
                    alert("Visualization error")
                    navigate('/orderid')
                }})
            } else {
                alert("Something went wrong, please try again!")
                window.location.reload();
            }

        }).catch(err => {
            alert(err);
        });
    }
    const clickNo = () => {
        alert("Your order has been cancelled")
        navigate('/foodorder')
    }

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
                        <h4>Are you sure you want to order {localStorage.getItem("quantity")} {localStorage.getItem("fooditem")}? Please confirm. </h4>
                        <div style={{display: "flex", width: '160px', justifyContent: 'space-between'}}>
                            <Button
                                type="submit"
                                //fullWidth
                                style={{width: 'fit-content'}}
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick = {clickYes}
                            >
                                Yes
                            </Button>
                            <Button
                                type="submit"
                                //fullWidth
                                style={{width: 'fit-content'}}
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick = {clickNo}
                            >
                                No
                            </Button>
                        </div>
                    </Box>
                </Container>

    )
}