export interface IAccountsTableData {
    card_number: string;
    verified: boolean;
    refresh: boolean;
    renderExchangeFundsPopup: (account_id: number, balance: number, currency: string) => void;
    renderTransferFundsPopup: (account_id: number, balance: number, currency: string) => void;
  }  