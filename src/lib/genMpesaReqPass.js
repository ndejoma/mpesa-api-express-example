/** @format */

import { Buffer } from 'node:buffer';

const passKey = process.env.MPESA_PASS_KEY;
const businessShortCode = process.env.BUSINESS_SHORT_CODE;

/**
 **
 * This function generate a base64 encoded string which a combination of
 *  BusinessShortCode + Passkey + Timestamp
 * @export
 * @param {string} [timeStamp='']
 * @return {string}
 */
export default function genMpesaReqPassword(timeStamp = '') {
    if (passKey && businessShortCode && timeStamp) {
        const rawPass = `${businessShortCode}${passKey}${timeStamp}`;
        return Buffer.from(rawPass).toString('base64');
    } else {
        throw new Error('All values must be provided to generate the password');
    }
}
