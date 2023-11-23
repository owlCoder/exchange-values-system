/**
 * Interface representing data required for an transfer funds popup.
 */
interface ITransferFundsPopUp {
    /**
     * The ID of the account involved in the fund transfer.
     */
    account_id: number;

    /**
     * The current balance of the account.
     */
    balance: number;

    /**
     * The currency associated with the account balance.
     */
    currency: string;

    /**
     * Method used to close the exchange funds popup.
     * @type {React.Dispatch<boolean>}
     */
    closeModalMethod: React.Dispatch<boolean>;

    /**
     * Function to trigger a data refresh after the exchange of funds.
     * @type {React.Dispatch<void>}
     */
    onRefresh: React.Dispatch<void>;
}

export default ITransferFundsPopUp;
