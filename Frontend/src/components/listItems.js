import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Redirect } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from "react-router-dom";
export const mainListItems = (persona) => {
  console.log(persona);
  return(
    <div>
      <ListItem button> 
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'White'}} primary="Dashboard" />
      </ListItem>
      <ListItem button component={Link} to="/profile">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
              <ListItemText style={{color: 'White'}} primary="Profile" />
          </ListItem>
      <ListItem button component={Link} to="/pricing">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'White'}} primary="Payment Plan" />
      </ListItem>
      {(persona === 'owner' || persona === 'admin') && (
      <Link to={{
        pathname: '/RideList',
        state: {
          persona: 'owner'
        }}}>
        <ListItem button >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText style={{color: 'white'}} primary="Your Asset Rides" />
        </ListItem>
        </Link>
      )}
      <Link to={{
      pathname: '/RideList',
      state: {
        persona: 'customer'
      }}}>
      <ListItem button >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'white'}} primary="Your Rides" />
      </ListItem>
      </Link>
      
      
      {(persona === 'owner' || persona === 'admin' )&& (
        <ListItem button component={Link} to='/AddCar'>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'white'}} primary="Add a Car" />
      </ListItem>
      )}
      {(persona === 'owner' || persona === 'admin') && (
        <ListItem button component={Link} to='/CarList'>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText style={{color: 'white'}} primary="View Assets" />
      </ListItem>
      )}
      {persona === 'admin' && (
        <ListItem button component={Link} to='/AdminAnalysis'>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
          <ListItemText style={{color: 'white'}} primary="Business Trends" />
        </ListItem>
      )}

    </div>
  )};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText style={{color: 'white'}} primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText style={{color: 'white'}} primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText style={{color: 'white'}} primary="Year-end sale" />
    </ListItem>
  </div>
);