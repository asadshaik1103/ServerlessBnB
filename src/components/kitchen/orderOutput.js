import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Container from "@mui/material/Container";
import Home from '../Home';
import Box from "@mui/material/Box";
import axios from "axios";
import {useNavigate} from 'react-router';

let OrderOutput;
export default OrderOutput = () => {
    let navigate = useNavigate();
    let date;
    date = (new Date().getDate() + new Date().getMonth() + new Date().getMilliseconds())
    axios.post("https://us-central1-serverless-project-356217.cloudfunctions.net/publishGCPMessage", {
        "userNotificationNumber": date.toString(),
        "topicName": "foodOrder",
        "message": {
            "order_id": localStorage.getItem("orderid"),
            "email": localStorage.getItem("email"),
            "food_item": localStorage.getItem("fooditem"),
            "food_quantity": localStorage.getItem("quantity")
        }
    }).then(res => {
        console.log(res)
        if (res.status === 200) {
            alert("Message Published successfully")
            axios.post("https://us-central1-serverless-project-356217.cloudfunctions.net/subscribingToTopic", {
                "userNotificationNumber": date.toString()
            }).then(res => {
                console.log(res)
                if (res.status === 200) {
                    alert("Message subscribed successfully")
                    navigate('/home')
                } else {
                    alert("Subscribe Message Error")
                    navigate('/home')
                }
            })
        } else {
            alert("Publish Message Error")
            navigate('/home')
        }
    })

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
                <h4>Thank you for ordering with us. Your food is being prepared. </h4>
                <p><b>Order id: </b> {localStorage.getItem("orderid")}</p>
            </Box>
        </Container>
    )
}