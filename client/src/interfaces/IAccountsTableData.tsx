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
     * Indicates whether the credit card is verified or not.
     * @type {boolean}
     */
    verified: boolean;
  
    /**
     * Indicates if the data needs to be refreshed.
     * @type {boolean}
     */
    refresh: boolean;

    /**
     * Method to render an exchange funds popup.
     * @param account_id - The ID of the account involved in the fund exchange.
     * @param balance - The current balance of the account.
     * @param currency - The currency associated with the account balance.
     * @returns void
     */
    renderExchangeFundsPopup: (account_id: number, balance: number, currency: string) => void;

    /**
     * Method to render a transfer funds popup.
     * @param account_id - The ID of the account involved in the transfer process.
     * @param balance - The current balance of the account.
     * @param currency - The currency associated with the account balance.
     * @returns void
     */
    renderTransferFundsPopup: (account_id: number, balance: number, currency: string) => void;
  }
  
  export default IAccountsTableData;
  