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

const drawerWidth = 250;

function Home({ logout }) {
    let navigate = useNavigate();

    const handleClick = (text) => {
        if (text === 'Book Room') {
            navigate('/home');
        }
        if (text === 'Order Food') {
            navigate('/foodorder');
        }
        if (text === 'Book Tour') {
            navigate('/booktour');
        }
        if (text === 'View Invoice') {
            navigate('/invoice');
        }
        if (text === "Customer's Choice") {
            navigate('/visualisation');
        }
    };
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
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Button onClick={clickLogout} variant="contained">Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },

            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {["Book Room", "Order Food", "Book Tour", "View Invoice", "Customer's Choice"].map((text) => {
                        return (<ListItem key={text} disablePadding sx={{ marginLeft: '10px' }}>
                            <ListItemButton onClick={() => handleClick(text)}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>);
                    })}
                </List>
            </Box>
        </Drawer>
    </Box>);
}

export default Home;