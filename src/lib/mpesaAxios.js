/** @format */

import axios from 'axios';

//this is an axios instance for calling the mpesa API
//Defaults with https://sandbox.safaricom.co.ke/ url

const mpesaAxios = axios.create({
    baseURL: 'https://sandbox.safaricom.co.ke/',
});

export default mpesaAxios;
