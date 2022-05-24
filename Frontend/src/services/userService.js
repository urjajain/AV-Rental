import { BACKEND_URL } from "./constants";
import { BACKEND_PORT } from "./constants";
export const updateUserProfile = async (payload) => {
    const options = {
        method: 'POST',
        headers: {'Content-Type':  'application/json'},
        body: JSON.stringify(payload),
    };
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/user/updateUser`, options);
    const status = response.status;
    const data = await response.json();
    return {
        status, data,
    };

}

export const getUserDetails = async id => {
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    };
    const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/user/${id}`,);
    const status = response.status;
    const data = await response.json();
    return {status, data};
}