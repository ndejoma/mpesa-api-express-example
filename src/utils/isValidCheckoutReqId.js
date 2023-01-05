import isString from '@/utils/isString';

export default function isValidCheckoutReqId(id = '') {
    if (isString(id)) {
        return id.startsWith('ws_CO_');
    } else {
        return false;
    }
}
