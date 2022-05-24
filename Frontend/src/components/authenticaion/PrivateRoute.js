import React, {useContext} from 'react';
import { AuthContext } from './ProvideAuth';
import {Route, Redirect} from 'react-router-dom';
import { CircularProgress } from '@mui/material';


const PrivateRoute = ({ children, ...rest }) => {
    const contextValue = useContext(AuthContext);
    console.log(children, contextValue, rest);
    return (
      <Route
      {...rest}
      render={
        ({ location }) => (
          contextValue.isAuthenticated
            ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location }
                }}
              />
            ))
      }
    />
    );
  }
  
  export default PrivateRoute;