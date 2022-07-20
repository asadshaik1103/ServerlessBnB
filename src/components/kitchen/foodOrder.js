import {initializeApp} from 'firebase/app';
import {collection, getFirestore, setDoc, doc} from "firebase/firestore";
import {ThemeProvider} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {MenuItem, Select} from "@mui/material";
import Button from "@mui/material/Button";
import {v4} from "uuid";
import axios from "axios";

export const OrderFood = () => {
    const theme = createTheme();
    const [foodItem, setFoodItem] = React.useState("")

    const firebaseConfig = {
        apiKey: "AIzaSyBCFJTln4yuszDHpnv1tTiCDHHzIDgQaZM",
        authDomain: "csci5410-project-356905.firebaseapp.com",
        projectId: "csci5410-project-356905",
        storageBucket: "csci5410-project-356905.appspot.com",
        messagingSenderId: "410169754914",
        appId: "1:410169754914:web:07056faf289d88f410517b",
        measurementId: "G-9FBGVZCY9E"
    };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)

    const handleSubmit = e => {
        e.preventDefault();
        // storeData(db);
        axios.post('https://us-central1-csci5410-project-356905.cloudfunctions.net/foodOrder', {
            "order_id": "123",
            "customer_id": "xyx@gmail.com"
        }).then(res => {
            console.log(res);
            if (res && res.data && res.data.valid) {
                alert("Successfully validated");
            } else {
                alert("Invalid code");
            }

        }).catch(err => {
            alert(err);
        });
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
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
                            id="scoreId"
                            label={foodItem}
                            name="Score"
                            autoFocus
                            value={foodItem}
                            onChange={(event) => {
                                setFoodItem(event.target.value)
                            }}
                        >
                            <MenuItem value="CROISSANT">CROISSANT</MenuItem>
                            <MenuItem value="PAIN AU CHOCOLAT">PAIN AU CHOCOLAT</MenuItem>
                            <MenuItem value="SOUR CREAM COFFEE CAKE">SOUR CREAM COFFEE CAKE</MenuItem>
                            <MenuItem value="HOUSE BRIOCHE FRENCH TOAST">HOUSE BRIOCHE FRENCH TOAST</MenuItem>
                            <MenuItem value="BREAKFAST BUTTY SANDWICH">BREAKFAST BUTTY SANDWICH</MenuItem>
                            <MenuItem value="BLUEBERRY PANCAKES">BLUEBERRY PANCAKES</MenuItem>
                            <MenuItem value="VEGAN CHIA PUDDING CUP">VEGAN CHIA PUDDING CUP</MenuItem>
                            <MenuItem value="GREEN JUICE">GREEN JUICE</MenuItem>
                        </Select>
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
    );
}