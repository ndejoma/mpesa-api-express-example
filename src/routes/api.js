/** @format */
import express from 'express';
import apiStatusRouter from 'src/routes/api/status';
import Cors from 'cors';

//create a router object
//NOTE the default path is /api for this  router object
const router = express.Router();

//parse the body to JSON using the express.json middleware function
router.use(express.json());

//the /api/status route
router.use('/status', apiStatusRouter);

const whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
];

const corsOptions = {
    origin: function (origin, callback) {
        //the !origin prevents blocking of Rest clients such as Thunder Client or Postman
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Failed to CORS policy'));
        }
    },
};

//allow requests from localhost, plantsvee.co.ke and Rest clients only
router.use(Cors(corsOptions));

export default router;
