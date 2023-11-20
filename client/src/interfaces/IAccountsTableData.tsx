/**
 * Represents data structure for account table information.
 * @interface IAccountsTableData
 */
interface IAccountsTableData {
    /**
     * The card number associated with the account.
     * @type {string}
     */
    card_number: string;
  
    /**
     * Indicates whether the account is verified or not.
     * @type {boolean}
     */
    verified: boolean;
  
    /**
     * Indicates if the data needs to be refreshed.
     * @type {boolean}
     */
    refresh: boolean;
  }
  
  export default IAccountsTableData;
  