/**
 * A small utility function to help log objects in the Terminal(STDOUT)
 *
 * @format
 * @param {...any} values
 * The '%o', format the values as Object,
 *  because by default it will be formatted  to a string
 */

export default function nodeLog(...values) {
    console.log('%o', ...values);
}
