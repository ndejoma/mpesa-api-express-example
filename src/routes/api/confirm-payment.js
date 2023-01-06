import genMpesaReqPassword from '@/lib/genMpesaReqPass';
import getCurrentTimeStamp from '@/lib/getCurrentTimeStamp';
import getMpesaAuthToken from '@/lib/getMpesaAuthToken';
import mpesaAxios from '@/lib/mpesaAxios';
import isValidCheckoutReqId from '@/utils/isValidCheckoutReqId';
import { Router } from 'express';

const confirmPaymentRouter = Router();

confirmPaymentRouter.post('', async (req, res) => {
    const { checkoutReqId = '' } = req.body;
    if (isValidCheckoutReqId(checkoutReqId)) {
        //get the authorization token to call the API
        try {
            const authToken = await getMpesaAuthToken();

            if (authToken) {
                try {
                    //the data to send the in request
                    const Timestamp = getCurrentTimeStamp();
                    const Password = genMpesaReqPassword(Timestamp);
                    const reqData = {
                        BusinessShortCode: process.env.BUSINESS_SHORT_CODE,
                        Password,
                        Timestamp,
                        CheckoutRequestID: checkoutReqId,
                    };

                    const { data } = await mpesaAxios.post(
                        '/mpesa/stkpushquery/v1/query',
                        reqData,
                        {
                            headers: {
                                Authorization: `Bearer ${authToken}`,
                            },
                        }
                    );

                    return res.status(200).send({
                        resultCode: data?.ResultCode ?? null,
                        resultDes: data?.ResultDesc ?? null,
                        message: 'The transaction was confirmed successfully',
                    });
                } catch (err) {
                    if (err?.response?.data?.errorCode === '500.001.1001') {
                        return res.status(404).send({
                            message: err?.response?.data?.errorMessage,
                            transactionStatus: 'not found',
                        });
                    }
                    return res.status(500).send({
                        message:
                            'There was a problem while confirming the payment, try again',
                    });
                }
            } else {
                throw new Error('Failed to get authorization token');
            }
        } catch (err) {
            return res.status(500).send({
                message: 'Failed to get authorization token',
            });
        }
    } else {
        return res.status(422).send({
            message: 'The data provided is invalid',
        });
    }
});

export default confirmPaymentRouter;
