/** @format */
import express from 'express';
import Cors from 'cors';
import apiStatusRouter from '@/routes/api/status';
import mpesaAuthRouter from '@/routes/api/mpesa-auth';
import stkpushRouter from '@/routes/api/stkpush';
import testApiRouter from '@/routes/api/test';
import mpesaWebhookRouter from '@/routes/api/mpesa-webhook';
import confirmPaymentRouter from '@/routes/api/confirm-payment';

//create a router object
//NOTE the default path is /api/:path for this  app
const apiRouter = express.Router();

//parse the body to JSON using the express.json middleware function
apiRouter.use(express.json());

//the /api/status route
apiRouter.use('/status', apiStatusRouter);

//the /api/test api route
apiRouter.use('/test', testApiRouter);

//this default to the /api/mpesa-auth router
apiRouter.use('/mpesa-auth', mpesaAuthRouter);

//this maps to the /api/stkpush route
apiRouter.use('/stkpush', stkpushRouter);

//this maps to the /api/mpesa-webhook route
apiRouter.use('/payment', mpesaWebhookRouter);

//this maps to the /api/confirm-payment route
apiRouter.use('/confirm-payment', confirmPaymentRouter)

/***
 * if you are calling the API from your frontend code
 *  whitelist your domain and local testing origin
 *  eg https://mydomain.com without the port
 *  Also http://mydomain.com without the port should be added
 */
const whitelist = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'https://mydomain.com'
];

const corsOptions = {
    origin:  (origin, callback) => {
        //the !origin check prevents blocking of Rest clients such as Thunder Client or Postman
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Failed to CORS policy'));
        }
    },
};

//allow requests from localhost, mydomain.com and Rest clients only
apiRouter.use(Cors(corsOptions));

export default apiRouter;
