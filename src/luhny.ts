/*
Luhny.ts by Alyx Shang.
Licensed under the FSL v1.
*/

'use strict';

/**
 * Checks whether the supplied string is an integer or not.
 * @param {string} expr A string expression that could potentially be an integer.
 * @returns {boolean} Returns a boolean to signify whether the parameter is an integer or not.
 */
export function isInt(expr: string): boolean{
    return RegExp('[0-9]+').test(expr);
  }

/**
 * Checks whether the supplied string is an integer sequence or not.
 * @param {string} imei A string expression that could potentially be an integer sequence.
 * @returns {boolean} Returns a boolean to signify whether the parameter is an integer sequence or not.
 */
export function isNumberSequence(imei: string): boolean {
    let result: boolean = true;
    const charList: Array<string> = imei.split('');
    for (let i: number = 0; i < charList.length; i++){
        if (isInt(charList[i]) === false){
            result = false;
        }
        else {
            // Do nothing.
        }
    }
    return result;
}

/**
 * Gets every second number from the left and returns these numbers in an array.
 * @param {string} imei A string expression that contains an IMEI number.
 * @returns {Array<number>} Returns an array with every second number from the left in it taken from the supplied IMEI string.
 */
export function getImportantNumbers(imei: string): Array<number>{
    const result: Array<number> = []
    const charList: Array<string> = imei.split('');
    for (let i: number = 0; i < charList.length; i++){
        const currIndex: number = i + 1;
        if (currIndex % 2 == 0){
           result.push(parseInt(charList[i]));
        }
        else {
            // Do nothing.
        }
    }
    return result;
}

/**
 * Returns an array of numbers containing all the 
 * numbers that remain after putting all the numbers second from the left in an array.
 * @param {string} imei A string containg an IMEI number.
 * @returns {Array<number>} Returns an array of numbers containing all the 
 * numbers that remain after putting all the numbers second from the left in an array.
 */
export function getTrashNumbers(imei: string): Array<number>{
    const result: Array<number>  =[];
    const charList: Array<string> = imei.split('');
    for (let i = 0; i < charList.length; i++){
        const currIndex = i + 1;
        if (currIndex % 2 == 0){
            // Do nothing.
        }
        else {
            result.push(parseInt(charList[i]));
        }
    }
    result.pop();
    return result;
}

/**
 * Retrieves all "important" numbers from an IMEI string, performs a type conversion,
 * doubles each of these numbers, and puts the doubles into an array. This array is then returned.
 * "Important" numbers of an IMEI string are constituted of every second number from the 
 * left in an IMEI string.
 * @param {string} imei The supplied string containg an IMEI number.
 * @returns {Array<number>} Returns a sum of all the doubles of "important" numbers in an IMEI string.
 */
export function doubleImportantNumbers(imei: string): Array<number>{
    const impNums: Array<number> = getImportantNumbers(imei);
    const result: Array<number> = [];
    for (let i: number = 0; i < impNums.length; i++){
        result.push(impNums[i] * 2);
    }
    return result;
}

/**
 * Computes the sum of all the "non-important" numbers in an IMEI string.
 * The "non-important" numbers are all the numbers that remain after 
 * putting every second number from the left in an IMEI string into a number array.
 * @param {string} imei The supplied string containg an IMEI number.
 * @returns {number} Returns the sum of all the "non-important" numbers in an IMEI string.
 */
export function addTrashNumbers(imei: string): number {
    const impNums = getTrashNumbers(imei);
    let result = 0;
    for (let i = 0; i < impNums.length; i++){
        result = result + impNums[i];
    }
    return result;
}

/**
 * Converts the supplied array of numbers into an array of strings and
 * returns this array of strings.
 * @param {Array<number>} arr The array of numbers to be converted.
 * @returns {Array<string>} Returns an array of strings.
 */
export function convertNumberArrayToStringArray(arr: Array<number>): Array<string>{
    const result: Array<string> =[];
    for (let i: number = 0; i < arr.length; i++){
        const num: string = arr[i].toString();
        const nums: Array<string> = num.split('');
        for (let x: number = 0; x < nums.length;x++) {
            result.push(nums[x]);
        }
    }
    return result;
}

/**
 * Splits all the characters in the 
 * "important" numbers and adds them all
 * together in a lump sum. The "important"
 * numbers are constituted of every second number
 * from the left in an IMEI string.
 * @param {string} imei The supplied string containg an IMEI number.
 * @returns {number} Returns the sum of all numbers 
 * second from the left in the given IMEI string.
 */
export function addImportantDoubleDigits(imei: string): number{
    let result: number = 0;
    const doubles: Array<number> = doubleImportantNumbers(imei);
    const digitArr: Array<string> = convertNumberArrayToStringArray(doubles);
    for (let i: number = 0; i < digitArr.length; i++){
        result = result + parseInt(digitArr[i]);
    }
    return result;
}

/**
 * Gets the last item of a string array and returns it.
 * @param {Array<string>} arr The array of strings from which to take the last item.
 * @returns {string} Returns the last item of an array of strings.
 */
export function getLastItem(arr: Array<string>): string {
    const arrayLength: number = arr.length;
    const lastItemIndex: number = arrayLength -1;
    return arr[lastItemIndex];
}

/**
 * Gets the check digit of the supplied IMEI, adds the "important" and the
 * "other" numbers together, subtracts the "mod 10" of that sum from 10, makes
 * a type conversion, compares the check digit and the calculated check digit,
 * and returns true or false depending on whether they match or not.
 * @param {string} imei The supplied string containg an IMEI number.
 * @returns {boolean} Returns a boolean that reflects whether the supplied IMEI is valid or not.
 */
export function validateIMEI(imei: string): boolean{
    const imeiChars: Array<string> = imei.split('');
    const checkDigit: string = getLastItem(imeiChars);
    let result: boolean = false;
    const sum: number = addImportantDoubleDigits(imei) + addTrashNumbers(imei);
    const computedCheckDigit: number = (10 - (sum%10));
    const computedConvertedCD: string = computedCheckDigit.toString();
    if (checkDigit === computedConvertedCD && imeiChars.length === 15){
        result = true;
    }
    else {
        // Do nothing.
    }
    return result;
}

// Exports all
// functions.
export default {
    isInt,
    getLastItem,
    validateIMEI,
    getTrashNumbers,
    addTrashNumbers,
    isNumberSequence,
    getImportantNumbers,
    doubleImportantNumbers,
    addImportantDoubleDigits,
    convertNumberArrayToStringArray,
};