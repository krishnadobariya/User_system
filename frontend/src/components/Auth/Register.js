import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Avatar,
  CssBaseline,
  Grid,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = name ? "" : "Name is required";
    tempErrors.email = email ? "" : "Email is required";
    if (email && !/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is not valid";
    }
    tempErrors.password = password ? "" : "Password is required";
    if (password && password.length < 8) {
      tempErrors.password = "Password should be at least 8 characters long";
    }
    if (password && !/[A-Z]/.test(password)) {
      tempErrors.password = "Password should contain at least one uppercase letter";
    }
    if (password && !/[a-z]/.test(password)) {
      tempErrors.password = "Password should contain at least one lowercase letter";
    }
    if (password && !/[0-9]/.test(password)) {
      tempErrors.password = "Password should contain at least one number";
    }
    if (password && !/[!@#$%^&*]/.test(password)) {
      tempErrors.password = "Password should contain at least one special character (!@#$%^&*)";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).every((key) => !tempErrors[key]);
  };

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
        if (response.data.status === 200) {
          toast.success('Registration successful! Please login.');
          navigate('/login');
        } else {
          toast.error(response.data.message);
        }
      } catch (err) {
        toast.error('Registration failed. Please try again.');
        console.error(err);
      }
    } else {
      toast.error('Please fix the errors and try again.');
    }
  };

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
};

export default Register;
