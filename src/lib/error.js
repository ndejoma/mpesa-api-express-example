/**
 * Make error. Makes error from message or throws passed-in err
 *
 * @format
 */

import nodeLog from '@/lib/nodeLog';

function makeError(message, status) {
    const err = message instanceof Error ? message : new Error(message);
    err.status = status;
    return err;
}

/** handler for 404 routes. */
function error404(req, res, next) {
    const err = makeError('The requested resource was not found', 404);
    // pass the error to the next piece of middleware
    next(err);
}

/** general error handler */
function handleRouteErrors(error, req, res, next) {
    // for actual JS exceptions, log the exception stack
    if (error?.stack) {
        nodeLog(error.stack);
    }

    res.status(error?.status ?? 500).json({ message: error.message });
}

export { makeError, error404, handleRouteErrors };
