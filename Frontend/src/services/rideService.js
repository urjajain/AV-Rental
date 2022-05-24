import { BACKEND_URL } from "./constants";
import { BACKEND_PORT } from "./constants";

export const bookRide = async (ride, user) => {
    const {carId, source, destination, chargePerDay: charges} = ride;
    let date = new Date();
    date = date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ';
    const payload = {
        carId, 
        source,
        destination, 
        charges,
        status: 'In-Progress',
        customerId: user.userId,
        rideDate: date,
    }
    console.log(payload);
    const options = {
        method: 'POST',
        headers:  {'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    };
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/ride/addRide`, options);
    const status = response.status;
    const data = await response.json();
    return {status, data};
}

export const fechInProgressRides = async (userId, persona) => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/ride/inProgress?userId=${userId}&persona=${persona}`, options);
    const status = response.status;
    const data  = await response.json();
    return {status, data};
}

export const fetchRideListFromDB = async (customerId, persona) => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }

    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/ride/userRides?userId=${customerId}&persona=${persona}`, options);
    const status = response.status;
    const data  = await response.json();
    console.log('Ride Service', data);
    return {status, data};
}
