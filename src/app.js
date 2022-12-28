/** @format */
import express from 'express';
import api from 'src/routes/api';
import { error404, handleRouteErrors } from 'src/lib/error';

/**
 * the port to listen on, you can pass the PORT
 * as an environment variable in your shell
 * $ export PORT=3003 && pnpm run
 */
const PORT = process.env.PORT ?? 3008;

const app = express();

app.use('/api', api);

/**
 * These middleware function should always be the last
 * 
 */
app.use(error404);
app.use(handleRouteErrors);

app.listen(PORT, () => {
    console.log(`I am an express app listening on port ${PORT}`);
});
