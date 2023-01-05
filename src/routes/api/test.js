/** @format */
import genMpesaReqPassword from '@/lib/genMpesaReqPass';
import getMpesaAuthToken from '@/lib/getMpesaAuthToken';
import nodeLog from '@/lib/nodeLog';
import getCurrentTimeStamp from '@/lib/getCurrentTimeStamp';
import isValidMpesaNumber from '@/utils/isValidMpesaNumber';
import isValidMpesaTransactionAmount from '@/utils/isValidMpesaTransactionAmount';
import { Router } from 'express';

const testApiRouter = Router();

/***
 *
 * This route is for testing purposes only
 * Test various implementations in the API
 *
 */
testApiRouter.post('', async (req, res) => {
    try {
        const timeStamp = getCurrentTimeStamp();
        const password = genMpesaReqPassword(timeStamp);
        return res.status(200).send({
            message: 'The access token',
            password,
        });
    } catch (err) {
        nodeLog(err, 'The error');
        return res.status(500).send({
            message: 'The access token get failed',
        });
    }
});

export default testApiRouter;
