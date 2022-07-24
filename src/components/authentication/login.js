import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

// ES Modules, e.g. transpiling with Babel
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
    AuthenticationDetails
} from 'amazon-cognito-identity-js';

var poolData = {
	UserPoolId: 'us-east-1_KUH06D9Pf', // Your user pool id here
	ClientId: '3ki2sql280fs695a4d6q0is6aq', // Your client id here
};

const theme = createTheme();

export const SignIn = ({ setCognitoUser }) => {
    let navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        var poolData = {
            UserPoolId: 'us-east-1_KUH06D9Pf', // Your user pool id here
            ClientId: '3ki2sql280fs695a4d6q0is6aq', // Your client id here
        };

        var validationData1 = {
            Name : 'email',
            Value : email
        };
        var validationData2 = {
            Name : 'password',
            Value : password
        };
        
        var validationData = [];
        validationData.push(validationData1);
        validationData.push(validationData2);

        var authenticationData = {
            Username: email,
            Password: password
        };

        var authenticationDetails = new AuthenticationDetails(
            authenticationData
        );

        var userPool = new CognitoUserPool(poolData);

        var userData = {
            Username: email,
            Pool: userPool,
        };

        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                var accessToken = result.getAccessToken().getJwtToken();
                console.log("access");
                navigate("/qna-authenticate", { state: {
                    email: email
                }});
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("email", email);
                localStorage.setItem("userid-cognito", result.getAccessToken().payload["username"]);
                setCognitoUser(cognitoUser);
            },
            onFailure: function (err) {
                alert(err.message || JSON.stringify(err));
            },
        });
    };

    // const registerWithCognito = (event) => {
    //     event.preventDefault();
    //     var userPool = new CognitoUserPool(poolData);

    //     var attributeList = [];
    
    //     var dataEmail = {
    //         Name: 'email',
    //         Value: email,
    //     };
    
    //     var attributeEmail = new CognitoUserAttribute(dataEmail);
    
    //     attributeList.push(attributeEmail);

    //     userPool.signUp(email, password, attributeList, null, (response) => {
    //         console.log("response: ", response);
    //         if (!response) {
    //             navigate("/qna");
    //         } else {
    //             alert(response);
    //         }
    //     });
    // }

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleTextInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
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
                        Sign in
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange= {handleTextInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange= {handleTextInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="space-around">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Don't have an account? Sign up
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/Lexbot" variant="body2">
                                    Login as a Guest user
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}