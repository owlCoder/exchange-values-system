/**
 * Interface representing data required for fund exchange.
 */
interface IExchangeFundsData {
    /**
     * The ID of the account involved in the fund exchange.
     */
    account_id: number;

    /**
     * The initial currency to be exchanged from.
     */
    initial_currency: string;

    /**
     * The target currency to convert funds into.
     */
    currency_to_convert: string;

    /**
     * The amount of initial currency to exchange.
     */
    amount_to_exchange: number;
}

export default IExchangeFundsData;
