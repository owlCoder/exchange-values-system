interface ITransferFundsData {
    sender_uid: number;
    sender_account_id: number;
    amount: number;
    receiver_uid: number;
    receiver_account_number: string;
    receiver_email: string;
    receiver_name: string;
    receiver_surname: string;
    approved: string;
}

export default ITransferFundsData;
