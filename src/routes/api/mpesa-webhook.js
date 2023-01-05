import nodeLog from '@/lib/nodeLog';
import { Router } from 'express';

const mpesaWebhookRouter = Router();

mpesaWebhookRouter.post('', (req, res) => {
    //get the data from the request
    //in this case we only care if the transaction was successful that ResultCode === 0
    const reqBodyData = req?.body?.Body?.stkCallback;

    //return the response early, the server just needs confirmation of receipt
    res.status(200).send({
        message: 'Received',
    });

    //check if the transaction is okay and save the information eg to a DB of your choice
    if (reqBodyData && reqBodyData?.ResultCode === 0) {
        const {
            CheckoutRequestId: checkout_req_id,
            Amount: amount,
            MpesaReceiptNumber: transaction_code,
            PhoneNumber: mpesa_number,
            Balance: balance,
        } = reqBodyData?.CallbackMetadata?.Item.reduce(
            (prev, curr) => {
                return {
                    ...prev,
                    [curr?.Name]: curr?.Value ?? null,
                };
            },
            {
                CheckoutRequestId: reqBodyData?.CheckoutRequestID,
            }
        );


    }
});

export default mpesaWebhookRouter;
