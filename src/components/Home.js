import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router';
import { OrderFood } from '../components/kitchen/foodOrder';
import { BookTour } from '../components/TourManager/bookTour'
import { Feedback } from '../components/Feedback/feedback';
import OrderInvoice from '../components/kitchen/orderInvoice';
import { Analysis } from '../components/analysis/analysis';
import { Rooms } from './rooms/rooms';
import Visualisation from '../components/visualisation/visualisation';
import axios from "axios";
import Lexbot  from '../components/lexbot/Lexbot';

const drawerWidth = 250;

function Home({ logout }) {
    let navigate = useNavigate();
    const [path, setPath] = React.useState('book_rooms');

    const handleClick = (text, event) => {
        if (event) {
            event.preventDefault();
        }
        // if (text === path) {
        //     return;
        // }
        if (text === 'Book Room') {
            setPath('Book Room');
        }
        if (text === 'Order Food') {
            setPath('Order Food');
            axios.post('https://us-central1-csci5410-project-356905.cloudfunctions.net/fetchFoodMenu', { "Content-Type": "application/json" }).then(res => {
                if (res.data) {
                    localStorage.setItem("menu", JSON.stringify(res.data))

                } else {
                    alert("Unable to fetch food menu.");
                }

            }).catch(err => {
                alert(err);
            });

        }
        if (text === 'Book Tour') {
            setPath('Book Tour');
        }
        if (text === 'View Invoice') {
            setPath('View Invoice');
        }
        if (text === 'Feedback') {
            setPath('Feedback');
        }
        if (text === 'OrderInvoice') {
            setPath('OrderInvoice');
        }
        if (text === 'Analysis') {
            setPath('Analysis');
        }
        if (text === 'Visualisation') {
            setPath('Visualisation');
        }
        if (text === 'Chat') {
            // setPath('lexbot');
            navigate('/Lexbot')
        }
    };

    React.useEffect(() => {
        console.log("path: ", path);
    }, [path]);

    const clickLogout = () => {
        localStorage.clear()
        navigate('/');
        logout();
    }


    return (<Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

            <Toolbar>
                <Typography
                    variant="h5"
                    noWrap
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: '600px' }}
                >
                    Serverless B&B
                </Typography>

                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                        <IconButton
                            size="large"
                            color="inherit"
                        >
                            <Badge color="error">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <Button onClick={clickLogout} variant="contained">Logout</Button>
                    </Box >
                </Toolbar >
            </AppBar >
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},

                }}
            >
                <Toolbar/>
                <Box sx={{overflow: 'auto'}}>
                    <List>
                        {["Book Room", "Order Food", "Book Tour", "View Invoice", "Feedback", "Analysis", "Visualisation", "Chat"].map((text) => {
                            return (<ListItem key={text} disablePadding sx={{marginLeft: '10px'}}>
                                    <ListItemButton onClick={(event) => handleClick(text, event)}>
                                        <ListItemText primary={text}/>
                                    </ListItemButton>
                                </ListItem>);
                        })}
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                {path === 'Book Tour' && <BookTour />}
                {path === 'Book Room' && <Rooms />}
                {path === 'Order Food' && <OrderFood />}
                {path === 'Feedback' && <Feedback />}
                {path === 'View Invoice' && <OrderInvoice />}
                {path === 'Analysis' && <Analysis />}
                {path === 'Visualisation' && <Visualisation />}
                {/* {path === 'lexbot' && <Lexbot />} */}
            </Box>
        </Box >);
}

export default Home;