import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { initializeApp } from 'firebase/app';
import { doc, collection, addDoc, getFirestore, getDoc, query, where, getDocs, updateDoc, setDoc,  } from 'firebase/firestore';
import axios from 'axios';
import {useNavigate} from 'react-router';

export const Rooms = () => {
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

    const [rooms, setRooms] = React.useState([]);

    React.useEffect(() => {
        const app = initializeApp(firebaseConfig);
        let db = getFirestore(app);
        setDb(db);

        // getDocs(collection(db, "rooms_data")).then((querySnapshot) => {
        //     console.log("res: ", querySnapshot);
        //     const roomsData = [];
        //     querySnapshot.forEach((doc) => {
        //         roomsData.push(doc.data());
        //     });
        //     setRooms(roomsData);
        // });
        axios.post("https://us-central1-serverless-bnb-6c350.cloudfunctions.net/getAllRoomsData").then((res) => {
            console.log("res from get all rooms CF: ", res);
            setRooms(res.data.docsInfo);
        });
    }, []);

    React.useEffect(() => {
        console.log("rooms: ", rooms);
    }, [rooms]);

    const bookRoom = (room) => {
        console.log("booking room: ", room);
        axios.post("https://us-central1-serverless-bnb-6c350.cloudfunctions.net/bookRoomAndPublish", {
            "userNotificationNumber": new Date().getTime() + "",
            "email": localStorage.getItem("email"),
            "accessToken": localStorage.getItem("accessToken"),
            "useridCognito": localStorage.getItem("userid-cognito"),
            "useridBnb": localStorage.getItem("userid-cognito") + "-" + room.room_number + "-" + new Date().getTime(),
            "roomInfo": {
                ...room
            }
        }).then((resfromAcknowledgement) => {
            console.log("resfromAcknowledgement: ", resfromAcknowledgement);
            alert("You're room has been booked");
            localStorage.setItem("room_book_no", room.room_number);
            navigate('/home');
        }).catch(err => {
            alert(err);
        });
        // updateDoc(doc(db, "rooms_data", room.room_number), {
        //     available: false,
        //     userid: 
        // }).then((res) => {
        //     console.log("updated", res);
        // }
        // ).catch(error => {
        //     console.log("error: ", error);
        // }
        // );

        // update 
    }


    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignItems: 'center',
                mt: 2,
                mb: 2,
                p: 2,
                width: '100%',
            }}>
            {rooms && rooms.map((room, index) => {
                return (
                    <RoomCard key={index} room={room} bookRoom={bookRoom} />
                )})
            }
            </Box>
        </>
    );
}

const RoomCard = ({room, bookRoom}) => {

    const isRoomBooked = (room) => {
        return room && (!room.available || localStorage.getItem("room_book_no") === room.room_number);
    }
    

    return (
        <Card sx={{ maxWidth: 200, mt: 5 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Room number: {room.room_number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Number of bedrooms: {room.number_of_bedrooms}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Free Wifi: {room.free_wifi ? "Yes" : "No"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Available: {room.available ? "Yes" : "No"}
                </Typography>
            </CardContent>
            <CardActions>
                <Button disabled={isRoomBooked(room)}
                    size="small"
                    onClick={(e) => {bookRoom(room)}}>Book Room</Button>
            </CardActions>
        </Card>
    );
}
