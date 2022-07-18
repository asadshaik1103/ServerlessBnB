import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextareaAutosize, TextField } from '@mui/material';


export const Analysis = () => {
  // const data = React.useRef();
  const [score, SetScore] = React.useState("")

  const theme = createTheme();

  const handleSubmit = e => {
		e.preventDefault();

		axios({
			method: 'GET',
			url: 'https://us-central1-atomic-life-356321.cloudfunctions.net/poly'
		})
			.then(res => {
                SetScore(res.data)
				console.log("Got polarity score ")
			})
			.catch(err => {
				console.error("error getting polarity score")
			});
	};


  return (<ThemeProvider theme={theme}>
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
                Get Sentiment Analysis of Feedbacks
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="scoreId"
                    label=""
                    name="Score"
                    autoFocus
                    value={score}
                    onChange={(event) => { SetScore(event.target.value) }}
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
                    Score rangers between -1 to 1.
                    -1 is really bad to +1 being very good. Anything close to 0 is a neutral score.
                </Typography>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Get Score
                </Button>
            </Box>
        </Box>
    </Container>
</ThemeProvider>
);
}