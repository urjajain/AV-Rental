import React, {useContext, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CarDetails from './CarDetails';
import ReviewCar from './ReviewCar';
import { addCar } from '../../services/carService';
import { AuthContext } from '../authenticaion/ProvideAuth';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Add car details', 'Review and Add car'];



const theme = createTheme();

const AddCar = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [car, setCar] = useState();
  const [loading, setLoading] = useState();
  const authContext = useContext(AuthContext);

  const {user} = authContext;

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <CarDetails car={car} setCar={setCar}/>;
      // case 1:
        // return <UserVerification car={car} setCar={setCar}/>;
      case 1:
        return <ReviewCar car={car} setCar={setCar}/>;
      default:
        // throw new Error('Unknown step');
    }
  }

  const handleNext = async () => {
    setLoading(true);
    setActiveStep(activeStep + 1);
    if(activeStep == 1){
      const resp = await addCar(car, user);
      if(resp.status === 200){
        setLoading(false);
      }
      else{
        console.log('Error Occured', resp.data.payload.message);
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme} backgroundcolor='blue'>
      
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
        
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        {/* <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar> */}
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined"   sx={{ my: { xs: 5, md: 8 }, p: { xs: 5, md: 8} }}>
          <Typography component="h1" variant="h4" align="center">
            ADD CAR
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel> <Typography style={{color:"gray"}} component="h6" variant="h6" align="center" color="Gray">{label}</Typography></StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <>
              {!loading && (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your Car with number {car.carId} has been booked into the system. You can watch the details of trips in Rides Section
                </Typography>
              </React.Fragment>
              )}
              </>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="outlined"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? 'Add Asset' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}

export default AddCar;