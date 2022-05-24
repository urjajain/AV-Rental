import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';

const NavBar = () => {

    const history = useHistory();
    const redirectToDashboard = () => {
        history.push('/Dashboard');
    }

    return(
        <div >
            <Navbar className="nav" expand="lg"  >
            <Container >
            
            <Navbar.Brand onClick={redirectToDashboard} type="button"  > 
                <span className="logoText" >AV Rental System</span>
            </Navbar.Brand>
            </Container>
            </Navbar>
        </div>
    );
}

export default NavBar;