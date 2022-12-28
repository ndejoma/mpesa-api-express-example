/** @format */

import { Router } from 'express';

//create the Router object for the /api/status path
const apiStatusRouter = Router();

apiStatusRouter.get('', (req, res) => {
    return res.status(200).send({
        message: 'The status api route is working okay',
    });
});

export default apiStatusRouter;
