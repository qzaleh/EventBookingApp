import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, Box } from '@mui/material';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [seats, setSeats] = useState(1);

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then(response => {
        setEvent(response.data.event);
      })
      .catch(error => {
        console.error('Error fetching event details', error);
      });
  }, [id]);

  const handleBooking = () => {
    const token = localStorage.getItem('token');
    axios.post('/api/book', {
      userId: localStorage.getItem('userId'),
      eventId: event._id,
      seats: seats
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      alert(response.data.message);
    })
    .catch(error => {
      console.error('Error creating booking', error);
    });
  };

  return (
    <Box style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>{event.name}</Typography>
      <Typography variant="body1" paragraph>{event.description}</Typography>
      <Typography variant="h6">Price: ${event.ticketPrice}</Typography>
      <Typography variant="h6">Tickets Available: {event.ticketsAvailable}</Typography>
      <TextField 
        label="Number of Seats" 
        type="number" 
        value={seats} 
        onChange={(e) => setSeats(e.target.value)} 
        inputProps={{ min: 1, max: event.ticketsAvailable }}
        style={{ marginTop: 20 }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleBooking} 
        style={{ display: 'block', marginTop: 20 }}
      >
        Book Tickets
      </Button>
    </Box>
  );
};

export default EventDetails;
