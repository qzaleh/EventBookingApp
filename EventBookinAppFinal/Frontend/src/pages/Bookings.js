import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    axios.get(`/api/bookings/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setBookings(response.data.bookings);
    })
    .catch(error => {
      console.error('Error fetching bookings', error);
    });
  }, []);

  return (
    <Box style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Your Bookings</Typography>
      <List>
        {bookings.map(booking => (
          <ListItem key={booking._id}>
            <ListItemText 
              primary={`Event: ${booking.event.name}`} 
              secondary={`Seats: ${booking.seats}, Total Price: $${booking.totalPrice}`} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Bookings;
