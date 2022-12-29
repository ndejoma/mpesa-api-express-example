/** @format */

import isString from '@/utils/isString';


/**
 *
 *
 * @export
 * @param {string} [num='']
 * @return {Boolean}
 */
export default function isValidMpesaNumber(num = '') {
    if (isString(num)) {
        return num?.length === 10 && num?.startsWith('0');
    } else {
        return false;
    }
}
