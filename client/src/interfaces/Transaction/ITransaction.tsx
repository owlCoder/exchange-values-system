import ITransferFundsData from "../TransferFunds/ITransferFundsData";

interface ITransaction extends ITransferFundsData {
    id: number;
    currency: string;
};

export default ITransaction;