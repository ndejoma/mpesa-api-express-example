/** @format */

export default function isValidMpesaTransactionAmount(amount) {
    return Number.isInteger(amount) && amount >= 1 && amount <= 150000;
}
