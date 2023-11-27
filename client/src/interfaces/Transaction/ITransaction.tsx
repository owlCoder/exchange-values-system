import ITransferFundsData from "./ITransferFundsData";

interface ITransaction extends ITransferFundsData {
    id: number;
    currency: string;
};

export default ITransaction;