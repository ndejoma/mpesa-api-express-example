/** @format */

import genMpesaReqPassword from '@/lib/genMpesaReqPass';
import getMpesaAuthToken from '@/lib/getMpesaAuthToken';
import mpesaAxios from '@/lib/mpesaAxios';
import nodeLog from '@/lib/nodeLog';
import getCurrentTimeStamp from '@/lib/getCurrentTimeStamp';
import isValidMpesaNumber from '@/utils/isValidMpesaNumber';
import isValidMpesaTransactionAmount from '@/utils/isValidMpesaTransactionAmount';
import { Router } from 'express';

const stkpushRouter = Router();

//the static config for the request
// These values never change with the request
const staticReqData = {
    BusinessShortCode: +process.env.BUSINESS_SHORT_CODE,
    TransactionType: process.env.TRANSACTION_TYPE,
    PartyB: +process.env.BUSINESS_SHORT_CODE,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: 'TestAcc', //Change to the name of your company
    TransactionDesc: 'Test', //change to reflect the transaction description
};

stkpushRouter.post('', async (req, res) => {
    const { amount = 0, mpesaNumber = '' } = req.body;

    if (
        isValidMpesaNumber(mpesaNumber) &&
        isValidMpesaTransactionAmount(amount)
    ) {
        try {
            //get the the authorization token
            const accessToken = await getMpesaAuthToken();

            try {
                /**
                 * convert the 0722111222 number to a valid MSISDN
                 * Remove the leading 0 and pad 254 string to the start to get 254722111222
                 */
                const PhoneNumber = mpesaNumber.slice(1).padStart(12, '254');
                const Timestamp = getCurrentTimeStamp();
                //generate a base64 encoded string which is a
                const Password = genMpesaReqPassword(Timestamp);

                const reqData = {
                    ...staticReqData,
                    Password,
                    Timestamp,
                    Amount: process.env.NODE_ENV === 'production' ? amount : 1,
                    PartyA: PhoneNumber,
                    PhoneNumber,
                };

                nodeLog(reqData, 'The data from the request');

                const { data } = await mpesaAxios.post(
                    '/mpesa/stkpush/v1/processrequest',
                    {
                        ...staticReqData,
                        Password,
                        Timestamp,
                        Amount:
                            process.env.NODE_ENV === 'production' ? amount : 1,
                        PartyA: PhoneNumber,
                        PhoneNumber,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                /**
                 * Upon a successful request your response data should look like this
                    {
                        MerchantRequestID: '32568-135340929-1',
                        CheckoutRequestID: 'ws_CO_29122022180730620703699320',
                        ResponseCode: '0',
                        ResponseDescription: 'Success. Request accepted for processing',
                        CustomerMessage: 'Success. Request accepted for processing'
                        } 
                 * You can query the status of the transaction using the CheckoutRequestId
                 **/

                return res.status(200).send({
                    ...data,
                    message:
                        'The STK push request was accepted, enter your Mpesa PIN when prompted',
                });
            } catch (err) {
                nodeLog(err, 'The error here ****');
                return res.status(500).send({
                    message:
                        'There was an error while processing your payment request',
                });
            }
        } catch (err) {
            return res.status(401).send({
                message: 'Failed to get the authorization token',
            });
        }
    } else {
        return res.status(422).send({
            message: 'The data provided is invalid',
        });
    }
});

export default stkpushRouter;
