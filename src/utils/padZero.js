/** @format */

import isString from '@/utils/isString';

/**
 *
 *
 * @param {string} [str='']
 * @param {number} [maxLength=0]
 * @return {*}
 */
export default function padZero(str = '', maxLength = 0) {
    if (isString(str)) {
        //eg '2' with maxLength 2 becomes '02'
        return str.padStart(maxLength, '0');
    } else {
        throw new Error('You can only pad strings types');
    }
}
