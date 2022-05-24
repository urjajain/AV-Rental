import React, {useContext} from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect, useHistory } from "react-router";
import {signup} from '../../services/authenticationService';
import { AuthContext } from '../authenticaion/ProvideAuth';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Signup() {

  const history = useHistory();

  const [idCreated, setidCreated] = useState(0);
  const authContext = useContext(AuthContext);
  const [persona, setPersona] = useState('');

  const {setUser, setAuthState, updateLocalStorage} = authContext;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var customer = data.get('customer');
    var carOwner = data.get('carOwner');
    var admin = data.get('admin');
    var persona;
    if (customer === 'on') persona = "customer";
    if (carOwner === 'on') persona = "owner";
    if (admin === 'on') persona = "admin";
    // eslint-disable-next-line no-console
    var data1= {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      persona:persona,
    };

    console.log(data1);
    const response = await signup(data1);
    if(response.status === 200){
      setUser(response.data);
      setAuthState(true);
      updateLocalStorage(response.data); //Need to call after setUser
      setTimeout(()=>{
        history.push('/login');
      }, 500);
      
    }
    else{
      setAuthState(false);
      console.log('Error', response);
    }
  };

  if(idCreated){
    return <Redirect to="/profile" />
  } else  if (idCreated==="Email ID already exists"){
    return (
    <div> Email ID already exists </div>
  );
  }
  return (
    
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://imageio.forbes.com/specials-images/imageserve/6127a9548f7630d09ed2131b/Driverless-car-with-futuristic-technology-/960x0.jpg?fit=bounds&format=jpg&width=960)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <br></br>
            <Grid item xs={12}>
                  <div class="form-check form-check-inline">
                    <input 
                      checked={persona === 'Customer'} 
                      class="form-check-input" 
                      type="radio" 
                      name="customer" 
                      id="customer"
                      onClick={()=>{setPersona('Customer')}}
                    />
                    <label 
                      class="form-check-label" for="customer">
                      Customer
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input 
                      checked={persona === 'Owner'}  
                      class="form-check-input" 
                      type="radio" 
                      name="carOwner" 
                      id="carOwner"
                      onClick={()=>{setPersona('Owner')}}
                    />
                    <label class="form-check-label" for="carOwner">
                      Car Owner
                    </label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input 
                      checked={persona === 'Admin'} 
                      class="form-check-input" 
                      type="radio" 
                      name="admin" 
                      id="admin"
                      onClick={()=>{setPersona('Admin')}}  
                    />
                    <label class="form-check-label" for="admin">
                      Admin
                    </label>
                  </div>
              </Grid>
              <br></br>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}