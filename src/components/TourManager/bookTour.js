import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Select, MenuItem, TextField } from '@mui/material';
import { initializeApp } from 'firebase/app';
import { doc, collection, addDoc, getFirestore, getDoc, query, where, getDocs, updateDoc, setDoc, } from 'firebase/firestore';


export const BookTour = () => {
    // const data = React.useRef();
    const [tourType, setTourType] = React.useState("")
    const [headCount, setHeadCount] = React.useState("")
    const [budget, setBudget] = React.useState("")
    const [date, setDate] = React.useState("")

    const [body, setBody] = React.useState("")
    var response = ''
    const [bookingResponse, setBookingResponse] = React.useState('');
    var data1 = ''
    const firebaseConfig = {
        apiKey: "AIzaSyAYaTiesliO6_Re4ODBvfK2vDAMylAZ-T0",
        authDomain: "tour-pass-group22.firebaseapp.com",
        projectId: "tour-pass-group22",
        storageBucket: "tour-pass-group22.appspot.com",
        messagingSenderId: "833133457536",
        appId: "1:833133457536:web:395936df056c16f31e7665",
        measurementId: "G-D6L8KHTPK1"
      };
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)
    const ref = collection(db, "tourPass")
    const userId = localStorage.getItem('userid-cognito')
    
    const handleSubmit = e => {
        e.preventDefault();
        // bookingResponse = " tour booked"
        // setBookingResponse(' test 1');
        data1 = '{"user": "' + userId + '", "preference_type": ' + tourType + ', "budget": ' + parseInt(budget) + ', "number_of_people": ' + headCount + ', "date": "' + date + '"}';
        setBody(JSON.parse(data1))
        console.log(body)
        axios({
            method: 'post',
            url: 'https://us-central1-atomic-life-356321.cloudfunctions.net/recomendationModel',
            data: JSON.parse(data1)
        })
            .then(res => {
                response = res.data
                setBookingResponse(response.tour + " tour booked")
                setTourType('')
                setHeadCount('')
                setDate('')
                // console.log(JSON.parse(response))
                try{
                    var pass = storeData(response)
                    var respforviz = axios.post("https://us-central1-csci-5410-assignment-4-part-b.cloudfunctions.net/TourAnalysisEndpoint", {data: response})
                    console.log(respforviz)
                } catch(e) {
                    console.log(e)
                }
                // escape:

                console.log("Tour booked successfully")
            })
            .catch(err => {
                
                setBookingResponse("Error in booking")
                console.error("error booking the tour")
            });
    };

    const storeData = async (response) => { 
        const resp = await addDoc(ref, response)
        // console.log(pass)
        response.id = resp._key.path.segments[1]
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(response))}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = resp._key.path.segments[1] + ".json";
                  
        link.click();
        // return resp._key.path.segments[1]
        return resp._key.path.segments[1]
    }


    return (

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Tour Recomendation
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <div style={{
                            width: '100px',
                            height: '80px',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'end'

                        }}>
                            <Typography variant="subtitle2" gutterBottom component="div"></Typography>
                        </div>
                        <lable>Select Tour catogery Type</lable>
                        <Select
                            margin="dense"
                            required
                            fullWidth
                            id="scoreId"
                            label={tourType}
                            name="Score"
                            autoFocus
                            value={tourType}
                            onChange={(event) => { setTourType(event.target.value) }}
                        >
                            <MenuItem value={1}>Fishing</MenuItem>
                            <MenuItem value={2}>City</MenuItem>
                            <MenuItem value={3}>Nature</MenuItem>
                            <MenuItem value={4}>Ocean</MenuItem>
                            <MenuItem value={5}>Historic</MenuItem>
                            <MenuItem value={6}>Beach</MenuItem>
                        </Select>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="budget"
                            label="Budget per person"
                            name="budget"
                            autoFocus
                            value={budget}
                            onChange={(event) => { setBudget(event.target.value) }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="count"
                            label="Number of people"
                            name="count"
                            autoFocus
                            value={headCount}
                            onChange={(event) => { setHeadCount(event.target.value) }}
                        />
                        <TextField
                            label="Enter Tour date"
                            margin="normal"
                            required
                            fullWidth
                            placeholder='MM/DD/YYYY'
                            id="date"
                            name="date"
                            autoFocus
                            value={date}
                            onChange={(event) => { setDate(event.target.value) }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <div style={{
                            width: '100',
                            height: '50px',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'end'

                        }}>
                        </div>
                        <Typography component="h1" variant="h5"  style={{fontSize: 12}}>
                            {bookingResponse}
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Book Tour
                        </Button>
                    </Box>
                </Box>
            </Container>

        
    );
}