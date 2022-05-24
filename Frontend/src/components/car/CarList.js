import React, {useState, useEffect, useContext} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {fetchCarListFromDB, fetchCarListFromDBForOwner} from '../../services/carService';
import Radio from '@mui/material/Radio';
import { AuthContext } from '../authenticaion/ProvideAuth';


function createData(rideNumber, carNumber, date,  charge) {
  return { rideNumber, carNumber, charge, date };
}

const rows = [
  createData('1', '8CPA850', '11/10/2021', 16.0 ),
  createData('2', '7YPN393', '11/09/2021', 29.0),
  createData('3', '8AMF954', '11/09/2021', 56.0),
  createData('4', '8AMF954', '10/19/2021', 76.0),
  createData('5', '8AMF954', '10/09/2021', 76.0),
  createData('6', '8AMF954', '10/06/2021', 146.0),
  createData('7', '7MWL676', '09/30/2021', 122.0),
  createData('8', '7MWL676', '09/29/2021', 102.0),
  createData('9', '8AMF954', '09/19/2021', 56.0),
  createData('10','8AMF954', '05/09/2021', 86.0),
  createData('11', '8AMF954', '05/09/2021', 86.0),

];

export default function CarList(props) {

  const authContext = useContext(AuthContext);
  const [carList, setCarList] = useState();
  const [loading, setLoading] = useState(true);
  console.log(props); 
  useEffect(() => {
    if(props.persona === 'owner'){
      const {user} = authContext;
      const {userId} = user;
      fetchCarListForOwner(userId);
    }
    else{
      fetchCarListForCustomer(props.ride.carType);
    }
  }, [])

  const selectCar = (e) =>{
    const {carId, carNumber, model, chargePerDay } = JSON.parse(e.target.value);
    const {setRide, ride} = props;
    setRide({
      ...ride,
      carId,
      model, 
      carNumber, 
      chargePerDay,
    })
  }

  const fetchCarListForCustomer = async (type) => {
    const resp = await fetchCarListFromDB(type);
    if(resp.status === 200){
      const rows = [];
      resp.data.payload.forEach(el => {
        const { carNumber, carId, ownerId, type, model, chargePerDay, mileage} = el;
        rows.push({
          carNumber,
          carId,
          ownerId, 
          type, 
          model,
          chargePerDay, 
          mileage,
        })
      });
      setCarList(rows);

      setLoading(false);
    }
    else{
      console.log(resp.data.message);
    }

  }
  const fetchCarListForOwner = async (id) => {
    const resp = await fetchCarListFromDBForOwner(id);
    if(resp.status === 200){
      const rows = [];
      console.log(resp.data.payload);
      resp.data.payload.forEach(el => {
        const { carNumber, carId, ownerId, type, model, chargePerDay, mileage} = el;
        rows.push({
          carNumber, 
          carId,
          ownerId, 
          type, 
          model,
          chargePerDay, 
          mileage,
        })
      });
      setCarList(rows);

      setLoading(false);
    }
    else{
      console.log(resp.data.message);
    }

  }

  return (
    <>
    {!loading && (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.ride ? (
              <>
              <TableCell>Select</TableCell>
              <TableCell >Car Number</TableCell>
              </>
            ) : (
            <TableCell >Car Number</TableCell>
            )}
            <TableCell align="right">Car Type</TableCell>
            <TableCell align="right">Car Model</TableCell>
            <TableCell align="right">Charge Per Daye</TableCell>
            <TableCell align="right">Mileage</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {carList.map((row) => {
            // console.log('ROW', row);
            return(
            <TableRow
              key={row.carNumber}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {props.ride ? (
                <>
                <Radio value={JSON.stringify(row)} checked={row.carId === props.ride.carId} onChange={selectCar}/>
                <TableCell align="right">{row.carNumber}</TableCell>
                </>
              ): (
                <TableCell align="right">{row.carNumber}</TableCell>

              )}
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.model}</TableCell>
              <TableCell align="right">{row.chargePerDay}</TableCell>
              <TableCell align="right">{row.mileage}</TableCell>


            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
    )}
    </>
  );
}