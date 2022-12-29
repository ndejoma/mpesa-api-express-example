/** @format */

import host from '@/utils/host';
import axios from 'axios';

const myAxios = axios.create({
    baseURL: host,
});

export default myAxios;
