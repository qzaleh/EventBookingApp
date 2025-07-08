import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    axios.post('/api/auth/login', { username, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user._id);
        navigate('/booking'); // Redirect to the booking page on successful login
      })
      .catch(error => {
        console.error('Error logging in', error);
        alert('Login unsuccessful. Please check your username and password.');
      });
  };

  return (
    <Box style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField 
        label="Username" 
        fullWidth 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
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
        variant="contained" 
        color="primary" 
        onClick={handleLogin} 
        style={{ display: 'block', marginTop: 20 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
