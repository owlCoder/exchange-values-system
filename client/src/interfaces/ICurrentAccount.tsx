/**
 * Represents the structure for current account information.
 * @interface ICurrentAccount
 */
interface ICurrentAccount {
    /**
     * The unique identifier for the account.
     * @type {number}
     */
    account_id: number;
  
    /**
     * The account number.
     * @type {string}
     */
    account_number: string;
  
    /**
     * The current balance of the account.
     * @type {number}
     */
    balance: number;
  
    /**
     * The currency associated with the account.
     * @type {string}
     */
    currency: string;
  
    /**
     * The associated card number for the account.
     * @type {string}
     */
    card_number: string;
  
    /**
     * The unique identifier associated with the user.
     * @type {number}
     */
    uid: number;
  }
  
  export default ICurrentAccount;
  