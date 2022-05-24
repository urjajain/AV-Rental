import React, {useState}  from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function FindSourceAndDestination(props) {

  
  const setSource = (e) => {
    const { ride, setRide} = props;
    setRide(
      {
        ...ride,
        source: e.target.value,
      }
    );
  }
  const setDestination = (e) => {
    const { ride, setRide} = props;
    setRide(
      {
        ...ride,
        destination: e.target.value,
      }
    );
  }
  const setCarType = (e) => {
    const { ride, setRide} = props;
    setRide(
      {
        ...ride,
        carType: e.target.value,
      }
    );
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Select Source and Destination
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <TextField
            id="source"
            name="source"
            label="Source"
            fullWidth
            autoComplete="Source"
            variant="standard"
            onChange={(e) => {setSource(e)}}
            defaultValue={props.ride ? props.ride.source : ''}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="destination"
            name="destination"
            label="Car Destination"
            fullWidth
            autoComplete="Car Type"
            variant="standard"
            onChange={(e) => {setDestination(e)}}
            defaultValue={props.ride ? props.ride.destination : ''}
          />
        </Grid>
        <Grid item xs={12}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.ride ? props.ride.carType : ''}
          label="Car Type"
          onChange={setCarType}
          autoWidth
          style={{width:'30%'}}
        >
          <MenuItem value={'Sedan'}>Sedan</MenuItem>
          <MenuItem value={'Hatchback'}>Hatchback</MenuItem>
          </Select>
        </Grid>
        
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="pickupDate"
            name="pickupDate"
            label="Pick-up date"
            fullWidth
            autoComplete="Pick-up date"
            variant="standard"
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="time"
            name="time"
            label="Time"
            fullWidth
            autoComplete="Time"
            variant="standard"
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dropoffDate"
            name="dropoffDate"
            label="Drop-off date"
            fullWidth
            autoComplete="Drop-off date"
            variant="standard"
          />
        </Grid> */}
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            id="time"
            name="time"
            label="Time"
            fullWidth
            autoComplete="Time"
            variant="standard"
          />
        </Grid> */}
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="I confirm that I am 21 years old or over."
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}