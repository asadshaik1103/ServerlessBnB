import {ThemeProvider} from "@mui/styles";
import {createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Container from "@mui/material/Container";
import Home from '../Home';
import Box from "@mui/material/Box";

let OrderOutput;
export default OrderOutput = () => {
    const theme = createTheme();
    return (
        <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Home/>
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
        </ThemeProvider>
    )
}