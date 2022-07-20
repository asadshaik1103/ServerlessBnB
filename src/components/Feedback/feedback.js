import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextareaAutosize } from '@mui/material';


export const Feedback = () => {

  const [info, setInfo] = useState(null);
  // const data = React.useRef();
  const [data, SetFeedback1] = React.useState("")

  const theme = createTheme();

  const handleSubmit = e => {
		e.preventDefault();

		axios({
			method: 'POST',
			url: 'https://us-central1-atomic-life-356321.cloudfunctions.net/saveFeedback',
			data: { data },
		})
			.then(res => {
        SetFeedback1('')
				console.log("feedback is saved")
			})
			.catch(err => {
				console.error("not saved")
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
                User Feedback section
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
                <TextareaAutosize
                    margin="normal"
                    required
                    style={{width: 250, height: 150 }}
                    id="feedbackid"
                    label="Enter your feedback"
                    name="feedback"
                    autoFocus
                    value={data}
                    onChange={(event) => { SetFeedback1(event.target.value) }}
                />
                <div style={{
                    width: '100',
                    height: '50px',
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'end'

                }}>
                  </div>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Submit
                </Button>
            </Box>
        </Box>
    </Container>
</ThemeProvider>
);
}