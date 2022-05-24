import { BACKEND_URL } from "./constants";
import { BACKEND_PORT } from "./constants";
export const fetchCarListFromDB = async type => {
    
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/car/getCarsByType?type=${type}`, options);
    const status = response.status;
    const data = await response.json();
    return {status, data};
};
export const fetchCarListFromDBForOwner = async (userId) => {
    
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    }
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/car/getCarsByOwner?ownerId=${userId}`, options);
    const status = response.status;
    const data = await response.json();
    return {status, data};
};

export const addCar = async (car, user) => {
    const payload = {
        ...car,
        ownerId: user.userId,
        available:1,
    }
    console.log(payload);
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    }
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/car/add`, options);
    const status = response.status;
    const data = await response.json();
    return {status, data};
}