import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { initializeApp } from 'firebase/app';
import { doc, collection, addDoc, getFirestore, getDoc, query, where, getDocs, updateDoc, setDoc,  } from 'firebase/firestore';

const theme = createTheme();

export const QnA = () => {

    const [q1, SetQ1] = React.useState("Please provide your favorite sports person name ?")
    const [q2, SetQ2] = React.useState("Please provide your favorite food name ?")
    const [a1, SetA1] = React.useState("")
    const [a2, SetA2] = React.useState("")

    const firebaseConfig = {
        apiKey: "AIzaSyCCETZBCUtg-D84NTeN3b_F6zBQUa3YqcU",
        authDomain: "csci5410-assignment2-b00894318.firebaseapp.com",
        projectId: "csci5410-assignment2-b00894318",
        storageBucket: "csci5410-assignment2-b00894318.appspot.com",
        messagingSenderId: "506160455530",
        appId: "1:506160455530:web:720e4b356128e4371b4f13",
        measurementId: "G-L8H6MRSKQS"
    };

    const [db, setDb] = React.useState(null);

    React.useEffect(() => {
        const app = initializeApp(firebaseConfig);
        let db = getFirestore(app);
        setDb(db);
    }, []);

    // React.useEffect(() => {
    //     if (db) {
    //         storeData(db);
    //     }
    // }, [db]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log({
            a1: a1,
            a2: a2,
        });

        storeData(db);
    };

    const storeData = async (firestoreDB) => {
        try {
            // TODO get this data dynamically
            const userInfo = {
                email: "asadshaik1103@gmail.com",
                password: "Qwerty123$",
                answerFirst: "Asad",
                answerSecond: "Shaik"
            }
            const docRef = doc(firestoreDB, 'user_data', "registration_data");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const snapshotData = docSnap.data();
                if (snapshotData[userInfo.email]) {
                    alert('email already exists');
                } else {
                    await setDoc(docRef, { [userInfo.email]: { ...userInfo } }, { merge: true });
                }
            } else {
                const newDocRef = await setDoc(doc(firestoreDB, "user_data", "registration_data"), {
                    [userInfo.email]: { ...userInfo }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeProvider theme={theme}>
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
                        Provide answers to below security questions
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <div style={{
                            width: '100%',
                            height: '50px',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'end'

                        }}>
                            <Typography variant="subtitle2" gutterBottom component="div">{q1}</Typography>
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="answer1"
                            label="Answer"
                            name="answer1"
                            autoFocus
                            value={a1}
                            onChange={(event) => { SetA1(event.target.value) }}
                        />
                        <div style={{
                            width: '100%',
                            height: '50px',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'end'

                        }}>
                            <Typography variant="subtitle2" gutterBottom component="div">{q2}</Typography>
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="answer2"
                            label="Answer"
                            name="answer2"
                            autoFocus
                            value={a2}
                            onChange={(event) => { SetA2(event.target.value) }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Validate
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}