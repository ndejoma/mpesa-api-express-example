/** @format */
import express from 'express';
import apiRouter from '@/routes/api';
import { error404, handleRouteErrors } from '@/lib/error';

/**
 * the port to listen on, you can pass the PORT
 * as an environment variable in your shell
 * $ export PORT=3003 && pnpm run dev
 */
const PORT = process.env.PORT ?? 3008;

const app = express();

//maps to the /api/* routes
app.use('/api', apiRouter);

/**
 * These middleware function should always be the last
 * Error handling middleware function  should be last in the Middleware stack according
 * to the Express documentation
 */
app.use(error404);
app.use(handleRouteErrors);

app.listen(PORT, () => {
    console.log(`I am an express app listening on port ${PORT}`);
});
