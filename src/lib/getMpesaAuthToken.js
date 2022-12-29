/** @format */

import myAxios from '@/lib/myAxios';
import nodeLog from '@/lib/nodeLog';

export default async function getMpesaAuthToken() {
    try {
        const {
            data: { authToken },
        } = await myAxios.get('/mpesa-auth');
        return authToken ?? '';
    } catch (err) {
        throw err;
    }
}
