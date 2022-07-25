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

import { useNavigate, useLocation } from 'react-router-dom';
const theme = createTheme();

export const CipherComponent = () => {
    let navigate = useNavigate();

    const firebaseConfig = {
        apiKey: "AIzaSyAH-rkE1X016FVI3mMHS84CBpJx438sWjA",
        authDomain: "serverless-bnb-6c350.firebaseapp.com",
        projectId: "serverless-bnb-6c350",
        storageBucket: "serverless-bnb-6c350.appspot.com",
        messagingSenderId: "118152119095",
        appId: "1:118152119095:web:2db390886f389c897550b2",
        measurementId: "G-QW28YJ4KBG"
    };

    const [db, setDb] = React.useState(null);

    const { state } = useLocation();

    React.useEffect(() => {
        const app = initializeApp(firebaseConfig);
        let db = getFirestore(app);
        setDb(db);
        setChallengeText(generateRandomString(6)); // <-- will generate a random string of length 5
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        storeData(db);
    };

    const storeData = async (firestoreDB) => {
        try {
            const userInfo = {
                email: state.email,
                password: state.password,
                answerFirst: state.answerFirst,
                answerSecond: state.answerSecond,
                cipherShiftKey: cipherShiftKey
            }
            const docRef = doc(firestoreDB, 'user_data', "registration_data");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const snapshotData = docSnap.data();
                // if (snapshotData[userInfo.email]) {
                //     alert('email already exists');
                // } else {
                    await setDoc(docRef, { [userInfo.email]: { ...userInfo } }, { merge: true });
                    // navigate to login page
                    navigate('/login');
                // }
            } else {
                const newDocRef = await setDoc(doc(firestoreDB, "user_data", "registration_data"), {
                    [userInfo.email]: { ...userInfo }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [challengeText, setChallengeText] = React.useState("ABCD");
    const [cipherShiftKey, setCipherShiftKey] = React.useState("");

    const generateRandomString = (length) => {
        let result = "", seeds
    
        for(let i = 0; i < length - 1; i++){
            seeds = [
                Math.floor(Math.random() * 25) + 65,
                Math.floor(Math.random() * 25) + 97
            ]
            result += String.fromCharCode(seeds[Math.floor(Math.random() * 2)])
        }
    
        return result
    }


    React.useEffect(() => {
        console.log("cipherShiftKey: ", cipherShiftKey);
    }, [cipherShiftKey]);

    const disableSaveCipherKey = () => {
        return Number(cipherShiftKey) < 1 || Number(cipherShiftKey) > 25;
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
                        Provide cipher shift key number between 1 and 25
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="cipherShiftKey"
                            label="Cipher Shift Key"
                            name="cipherShiftKey"
                            autoFocus
                            value={cipherShiftKey}
                            onChange={(event) => { setCipherShiftKey(event.target.value) }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={disableSaveCipherKey()}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save Cipher
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
