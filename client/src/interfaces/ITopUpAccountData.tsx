/**
 * Represents the structure for top-up account data.
 * @interface ITopUpAccountData
 */
interface ITopUpAccountData {
    /**
     * The currency to be used for the top-up.
     * @type {string}
     */
    currency: string;
  
    /**
     * The amount to be topped up.
     * @type {number}
     */
    amount: number;
  
    /**
     * The card number used for the top-up.
     * @type {string}
     */
    card_number: string;
  
    /**
     * The unique identifier associated with the user.
     * @type {number}
     */
    uid: number;
  }
  
  export default ITopUpAccountData;
  