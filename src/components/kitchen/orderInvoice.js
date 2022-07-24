import {Table, TableBody, TableCell, TableRow, TableHead, TableContainer} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// import Home from '../Home';

let OrderFood;
export default OrderFood = () => {
    let [data, setData] = React.useState([])
    console.log(data)
    data.push({"order_id": localStorage.getItem("orderid"),
                        "email": localStorage.getItem("email"),
                        "food_item": localStorage.getItem("fooditem"),
                        "food_quantity": localStorage.getItem("quantity")})

    return (
        <Container component="main" maxWidth="xs">
                <CssBaseline/>

                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Order Invoice
                    </Typography>
    <TableContainer sx={{ minWidth: 650 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell align="center">Email ID </TableCell>
                                <TableCell align="right">Food Item </TableCell>
                                <TableCell align="right">Food Quantity</TableCell>
                            </TableRow>
                            </TableHead>
        <TableBody>
            {data.map((x, id) => (
            <TableRow
                key={id}
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
            >
                <TableCell component="th" scope="row">
                    {x.order_id}
                </TableCell>
                <TableCell component="th" scope="row">
                    {x.email}
                </TableCell>
                <TableCell className="table-cell-style" align="right">
                    {x.food_item}
                </TableCell>
                <TableCell className="table-cell-style" align="right">{x.food_quantity}</TableCell>
            </TableRow>
                ))}
    </TableBody>
            </Table>
    </TableContainer>
                </Box>
        </Container>
    )
}