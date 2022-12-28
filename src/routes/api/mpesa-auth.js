/** @format */
import mpesaAxios from '@/lib/mpesaAxios';
import { Router } from 'express';

const mpesaAuthRouter = Router();

/***
 * This will map to /api/mpesa-auth route to get the authorization token
 * to perform all other request to the Daraja  Mpesa API
 *
 * The Token expired after ~1hr make sure to save it or
 *  generate a new one on each subsequent request
 *
 */
mpesaAuthRouter.get('', async (req, res) => {
    try {
        const { data: { access_token: authToken } = { access_token: '' } } =
            await mpesaAxios.get('/oauth/v1/generate', {
                //auth` indicates that HTTP Basic auth should be used, and supplies credentials.
                /***
                 * Same as Base64Encoded(CONSUMER_KEY:CONSUMER_SECRET)
                 * will be translated to Authorization: 'Basic Base64Encoded(CONSUMER_KEY:CONSUMER_SECRET)'
                 */
                auth: {
                    username: process.env.CONSUMER_KEY,
                    password: process.env.CONSUMER_SECRET,
                },
                params: {
                    grant_type: 'client_credentials',
                },
            });
        return res.status(200).send({
            message: 'The auth token generated successfully',
            authToken,
        });
    } catch (err) {
        const statusCode = err?.response?.status ?? 500;
        const message =
            err?.response?.statusText ??
            'There was problem while getting the auth token';
        return res.status(statusCode).send({
            statusCode,
            message,
        });
    }
});

export default mpesaAuthRouter;
