import { sendInternalServerError, sendCustomSuccess } from "./common.js";
import con  from '../index.js';

export const addRide = (req, res) => {
    try{
        const {
            rideId, 
            carId,
            customerId, 
            source, 
            destination, 
            rideDate, 
            chargePerDay: charges, 
            status,            
        } = req.body;

        const getRideByIdQuery = 'SELECT * FROM ride WHERE rideId = ?;';

        const rideUpdateQuery = `UPDATE ride SET
            carId = ?,
            customerId = ?,
            source = ?,
            destination = ?,
            rideDate = ?
            charges = ?,
            status = ?,
            WHERE rideId = ?;
        `;
        const rideAddQuery = `INSERT INTO ride (
            rideId,
            carId,
            customerId, 
            source, 
            destination, 
            rideDate, 
            charges, 
            status) VALUES (NULL, ?, ?,?,?,?,?,?)
        `;

        const getLastInerstedIdQuery = `SELECT LAST_INSERT_ID();`;

        if(rideId){ //Update
            con.query(rideUpdateQuery, [
                rideId,
                carId,
                customerId, 
                source, 
                destination, 
                rideDate, 
                charges, 
                status,
            ], (err, result) => {
                if(err){
                    sendInternalServerError(res);
                }
                else{
                    con.query(getRideByIdQuery, [rideId], (err, result)=>{
                        if(result[0]){
                            sendCustomSuccess(res, { data: result[0]});
                        }
                        else{
                            sendCustomError(res, 404, 'Entity Not Found');
                        }
                    });
                }
            });
        }
        else{ //Add New
            con.query(rideAddQuery, [
                carId,
                customerId, 
                source, 
                destination, 
                rideDate, 
                charges, 
                status,
            ], (err, result) => {

                if(err){
                    console.log(err);
                    sendInternalServerError(res);
                }
                else{
                    con.query(getLastInerstedIdQuery, (err, result) => {
                        if(result){
                            let id = result[0]['LAST_INSERT_ID()'];
                            con.query(getRideByIdQuery, [id], (err, result)=>{
                                if(result[0]){
                                    sendCustomSuccess(res, { data: result[0]});
                                }
                                else{
                                    sendCustomError(res, 404, 'Entity Not Found');
                                }
                            });
                        }
                        else{
                            console.log(err);
                            sendInternalServerError(res);
                        }
                    })
                }
            });
        }
    }
    catch(err){
        sendInternalServerError(res);
    }
}



// export const getUserRides = (req, res) => {
//     try{
//         const userId = req.query.userId;
//         const filterRidesBasedOnTypeQuery = `SELECT * FROM ride WHERE customerId = ?`;
//         con.query(filterRidesBasedOnTypeQuery, [userId], (err, result) => {
//             if(err){
//                 sendInternalServerError(res);
//             }
//             else{
//                 console.log(result);
//                 sendCustomSuccess(res, result);
//             }
//         });
//     }
//     catch(err){
//         sendInternalServerError(res);
//     }
// }

export const getInProgressRide = (req, res) => {
    try{
        const userId = req.query.userId;
        const persona = req.query.persona;
        console.log(persona);
        const inProgressRidesQuery = `select carNumber, chargePerDay, 
        ride.carId, rideId, source, destination, status, customerId 
                from ride INNER JOIN car on car.carId = ride.carId 
                inner join user on ride.customerId = user.userId 
                where customerId = ? and status = 'In-Progress' and persona = ?;`;
        con.query(inProgressRidesQuery, [userId, persona], (err, result)=>{
            if(err){
                console.log(err);
                sendInternalServerError(res);
            }
            else{
                console.log('Rides', result);
                sendCustomSuccess(res, result); 
            }
        })
    }
    catch(e){
        sendInternalServerError(e);
    }
}

export const getUserRides = (req, res) => {
    try{
        const userId = req.query.userId;
        const persona = req.query.persona;
        let query;
        if(persona === 'owner'){
            query = `select carNumber, chargePerDay, ride.carId, 
            rideId, source, destination, status, customerId, charges
            from ride INNER JOIN car on car.carId = ride.carId 
            where car.ownerId = ?`;
        }
        else if(persona === 'customer'){
            query = `select carNumber, ride.carId, chargePerDay,
            rideId, source, destination, status, customerId, charges
                from ride INNER JOIN car on car.carId = ride.carId 
                where customerId = ?`;
        }

        con.query(query, [userId], (err, result)=>{
            if(err){
                console.log(err);
                sendInternalServerError(res);
            }
            else{
                sendCustomSuccess(res, result); 
            }
        })
    }
    catch(e){
        sendInternalServerError(e);
    }
}