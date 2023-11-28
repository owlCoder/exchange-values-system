interface ITransferFundsPopUp {
    account_id: number;
    balance: number;
    currency: string;
    closeModalMethod: React.Dispatch<boolean>;
    onRefresh: React.Dispatch<void>;
}

export default ITransferFundsPopUp;
