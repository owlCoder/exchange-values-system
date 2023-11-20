/**
 * Represents the structure for currency data.
 * @interface ICurrency
 */
interface ICurrency {
    /**
     * The currency code.
     * @type {string}
     */
    code: string;
  
    /**
     * The currency number.
     * @type {number}
     */
    number: number;
  
    /**
     * The currency exchange rate or course.
     * @type {number}
     */
    course: number;
  }
  
  export default ICurrency;
  