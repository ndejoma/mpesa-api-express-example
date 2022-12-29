/** @format */

import padZero from '@/utils/padZero';

/**
 *
 * A function that generates the current time stamp and
 * returns a string in the format YYYYMMDDHHmmss
 * @export
 * @return {YYYYMMDDHHmmss}
 */
export default function getCurrentTimeStamp() {
    //a date object of the time
    const date = new Date();
    const year = `${date.getFullYear()}`; //2022
    //make sure to add 1 as JavaScript returns 0-11 as the months Jan-Dec
    const month = padZero(`${date.getMonth() + 1}`, 2); //12
    const day = padZero(`${date.getDate()}`, 2); //28
    const hours = padZero(`${date.getHours()}`, 2); //12
    const mins = padZero(`${date.getMinutes()}`, 2); //25
    const secs = padZero(`${date.getSeconds()}`, 2); //56

    //return a timestamp in the format YYYYMMDDHHmmss eg 20221228122556
    return `${year}${month}${day}${hours}${mins}${secs}`;
}
