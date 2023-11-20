/**
 * Represents the structure for credit card data.
 * @interface ICreditCardData
 */
interface ICreditCardData {
  /**
   * The credit card number.
   * @type {string}
   */
  card_number: string;

  /**
   * The cardholder's name.
   * @type {string}
   */
  cardholder_name: string;

  /**
   * The expiry date of the credit card.
   * @type {string}
   */
  expiry_date: string;

  /**
   * The CVV (Card Verification Value) of the credit card.
   * @type {string}
   */
  cvv: string;

  /**
   * The unique identifier associated with the user.
   * @type {number}
   */
  uid: number;

  /**
   * Indicates whether the credit card is verified or not.
   * @type {boolean}
   */
  verified: boolean;
}

export default ICreditCardData;
