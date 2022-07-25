import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useLocation } from "react-router-dom";

import { initializeApp } from 'firebase/app';
import { doc, collection, addDoc, getFirestore, getDoc, query, where, getDocs, updateDoc, setDoc,  } from 'firebase/firestore';

import axios from "axios";

const theme = createTheme();

export const QnAAuthentication = () => {

    let navigate = useNavigate();
    // let params = useParams();

    const { state } = useLocation();

    const [question1, SetQuestion1] = React.useState("")
    const [question2, SetQuestion2] = React.useState("")
    const [answer1, SetAnswer1] = React.useState("")
    const [answer2, SetAnswer2] = React.useState("")

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

    const getQuestions = () => {
        axios.get("https://us-central1-serverless-bnb-6c350.cloudfunctions.net/getQuestions").then((res) => {
            console.log("res: ", res);
            SetQuestion1(res.data.questions.questionFirst);
            SetQuestion2(res.data.questions.questionSecond);
        });
    }

    React.useEffect(() => {
        const app = initializeApp(firebaseConfig);
        let db = getFirestore(app);
        setDb(db);
        getQuestions();

    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log({
            answer1: answer1,
            answer2: answer2,
        });

        axios.post("https://us-central1-serverless-bnb-6c350.cloudfunctions.net/validateQnA", {
            "answerFirst": answer1,
            "answerSecond": answer2,
            "email": state.email
        }).then(res => {
            console.log(res);

            if (res && res.data && res.data.valid) {
                navigate('/cipher-authenticate', { state: {
                    email: state.email,
                    password: state.password,
                    answerFirst: answer1,
                    answerSecond: answer2
                } });
            } else {
                alert('Invalid details provided');
            }
            
        }).catch(err => {
            alert(err);
        });
    };

    const storeData = async (firestoreDB) => {
        try {
            const userInfo = {
                email: state.email,
                password: state.password,
                answerFirst: answer1,
                answerSecond: answer2
            };
            const docRef = doc(firestoreDB, 'user_data', "registration_data");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const snapshotData = docSnap.data();
                if (snapshotData[userInfo.email]) {
                    alert('email already exists');
                } else {
                    await setDoc(docRef, { [userInfo.email]: { ...userInfo } }, { merge: true });
                    navigate('/cipher', { state: {
                        email: userInfo.email,
                        password: userInfo.password,
                        answerFirst: userInfo.answerFirst,
                        answerSecond: userInfo.answerSecond
                    } });
                }
            } else {
                const newDocRef = await setDoc(doc(firestoreDB, "user_data", "registration_data"), {
                    [userInfo.email]: { ...userInfo }
                });
                navigate('/cipher', { state: {
                    email: userInfo.email,
                    password: userInfo.password,
                    answerFirst: userInfo.answerFirst,
                    answerSecond: userInfo.answerSecond
                } });
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
                            <Typography variant="subtitle2" gutterBottom component="div">{question1}</Typography>
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="answer1"
                            label="Answer"
                            name="answer1"
                            autoFocus
                            value={answer1}
                            onChange={(event) => { SetAnswer1(event.target.value) }}
                        />
                        <div style={{
                            width: '100%',
                            height: '50px',
                            display: 'flex',
                            flexFlow: 'column',
                            justifyContent: 'end'

                        }}>
                            <Typography variant="subtitle2" gutterBottom component="div">{question2}</Typography>
                        </div>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="answer2"
                            label="Answer"
                            name="answer2"
                            autoFocus
                            value={answer2}
                            onChange={(event) => { SetAnswer2(event.target.value) }}
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