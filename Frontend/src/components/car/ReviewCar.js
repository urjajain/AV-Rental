import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RideList from '../car/CarList';

const ReviewCar = (props) => {

    const {car} = props;
    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} aria-label="simple table">
            <TableBody>
                <TableRow
                    key={car.carId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="car">
                        Number
                    </TableCell>
                    <TableCell align="right">{car.carNumber}</TableCell>
                </TableRow>
                <TableRow
                    key={car.model}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="car">
                        Model
                    </TableCell>
                    <TableCell align="right">{car.model}</TableCell>
                </TableRow>
                <TableRow
                    key={car.carType}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="car">
                        Type
                    </TableCell>
                    <TableCell align="right">{car.type}</TableCell>
                </TableRow>
                <TableRow
                    key={car.chargePerDay}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="car">
                        Expected Charge Per Day 
                    </TableCell>
                    <TableCell align="right">{car.chargePerDay}</TableCell>
                </TableRow>
                <TableRow
                    key={car.cmileage}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="car">
                        mileage 
                    </TableCell>
                    <TableCell align="right">{car.mileage}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );
}

export default ReviewCar;