/**
 * Helper functions for validating credit card information.
 * @module CreditCardHelper
 */

/**
 * Checks if a credit card number is valid.
 * @param {string} cardNumber - The credit card number to validate.
 * @returns {boolean} Returns true if the card number is valid; otherwise, returns false.
 */
export function isCardNumberValid(cardNumber: string): boolean {
    const pattern = /^\d{4} \d{4} \d{4} \d{4}$/; // 16-digit number with spaces
    return pattern.test(cardNumber);
  }
  
  /**
   * Checks if a CVV number is valid.
   * @param {string} cvv - The CVV number to validate.
   * @returns {boolean} Returns true if the CVV number is valid; otherwise, returns false.
   */
  export function isCVVValid(cvv: string): boolean {
    const pattern = /^\d{3}$/; // 3-digit number
    return pattern.test(cvv);
  }
  
  /**
   * Checks if an expiry date is valid in MM/YY format.
   * @param {string} expiryDate - The expiry date to validate.
   * @returns {boolean} Returns true if the expiry date is valid; otherwise, returns false.
   */
  export function isExpiryDateValid(expiryDate: string): boolean {
    const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    if (!pattern.test(expiryDate)) return false;
  
    const currentYear = new Date().getFullYear() % 100; // Last 2 digits of the year
    const currentMonth = new Date().getMonth() + 1; // Current month
  
    const month = parseInt(expiryDate.substring(0, 2));
    const year = parseInt(expiryDate.substring(3, 5));
  
    if (year < currentYear || year > currentYear + 10) return false;
    if (year === currentYear && month < currentMonth) return false;
    if (month < 1 || month > 12) return false;
  
    return true;
  }
  