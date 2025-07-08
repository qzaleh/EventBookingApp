import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    console.log('Registering user with data:', { name, email, phone, age, password });

    axios.post('http://localhost:3001/api/auth/register', { name, email, phone, age, password })
      .then(response => {
        console.log('Registration response:', response.data);
        alert(response.data.message);
        navigate('/login');
      })
      .catch(error => {
        console.error('Error registering', error);
      });
  };

  return (
    <Box style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleRegister}>
        <TextField 
          label="Name" 
          fullWidth 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ marginBottom: 20 }} 
        />
        <TextField 
          label="Email" 
          type="email" 
          fullWidth 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ marginBottom: 20 }} 
        />
        <TextField 
          label="Phone" 
          fullWidth 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          style={{ marginBottom: 20 }} 
        />
        <TextField 
          label="Age" 
          type="number" 
          fullWidth 
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          style={{ marginBottom: 20 }} 
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ marginBottom: 20 }} 
        />
        <Button 
          type="submit"
          variant="contained" 
          color="primary" 
          style={{ display: 'block', marginTop: 20 }}
        >
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
