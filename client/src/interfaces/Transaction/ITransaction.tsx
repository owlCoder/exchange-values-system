import { ITransferFundsData } from "../TransferFunds/ITransferFundsData";

export interface ITransaction extends ITransferFundsData {
    id: number;
    currency: string;
};