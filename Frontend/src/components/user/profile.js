import React, {useContext, useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Wallet from './wallet';
import { Col, Row } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ProvideAuth, { AuthContext } from '../authenticaion/ProvideAuth';
import Button from '@mui/material/Button';
import {updateUserProfile, getUserDetails} from '../../services/userService';
import {useHistory} from 'react-router-dom';

export default function Profile(props) {  
  const history = useHistory();
  
  const [loading, setLoading] = useState(true);

  const authContext = useContext(AuthContext);
  const [userId, setUserId] = useState(authContext.user.userId);
  const [user, setUser] = useState();


  useEffect(()=>{
    fetchUserDetails();
  },[]);

  const fetchUserDetails = async () =>{
    setLoading(true);
    
    const res = await getUserDetails(userId);
    if(res.status === 200){
      setUser(res.data.payload);
      setLoading(false);
    } 
    else{
      console.log('Error Occured');
    }

  }

  const updateUserData = async () => {
    const obj = {
      userId: user.userId,
      fname : document.getElementById('firstName').value === '' ?  
        user.fname : 
        document.getElementById('firstName').value,
      lname : document.getElementById('lastName').value === '' ? 
        user.lname :
        document.getElementById('lastName').value,
      email : document.getElementById('email').value === '' ? 
        user.email :
        document.getElementById('email').value,
      phone : document.getElementById('phoneNumber').value === ''?
        user.phone :
        document.getElementById('phoneNumber').value,
      zip : document.getElementById('zip').value === '' ? 
        user.zip :
        document.getElementById('zip').value,
      address : document.getElementById('address1').value === '' ?
        user.address :
        document.getElementById('address1').value,
      country : document.getElementById('country').value === '' ? 
        user.country :
        document.getElementById('country').value,
      state : document.getElementById('state').value === '' ?  
        user.state :
        document.getElementById('state').value,
      walletBalance: 890,
    }
    setUser(obj);

    const response = await updateUserProfile(obj);
    if(response.status === 200){
      setUser(response.data.payload.data);
      setTimeout(()=>{
        history.push('/Dashboard');
      }, 500);
    } 
    else{
      console.log('Error Occuered');
    }



  }

  return (
      <React.Fragment>
        {!loading && (
        <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
         <Row>   
        <Col>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Card>
            <CardMedia
            component="img"
            // sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image="https://www.scarymommy.com/wp-content/uploads/2019/11/michael-scott-quotes.jpg"
            alt="{post.imageLabel}"
          />
            </Card>
        </Paper>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Wallet></Wallet>
        </Paper>
        </Col>
        <Col>
        <br></br><br></br>
        <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            defaultValue={user.fname}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            defaultValue={user.lname}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phoneNumber"
            variant="standard"
            defaultValue={user.phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            defaultValue={user.email}
          />
        </Grid>
        </Grid>
        <br></br><br></br>
        <Typography variant="h6" gutterBottom>
        Address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            defaultValue={user.address}
          />

        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            defaultValue={user.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            defaultValue={user.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            defaultValue={user.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            defaultValue={user.country}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
        <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={updateUserData}
              >
                Update Details
              </Button>
      </Grid>
      </Col></Row>
      </Container>
    )}
    </React.Fragment>
  );
}