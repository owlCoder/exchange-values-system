interface ICreditCardData {
    card_number: string;
    cardholder_name: string;
    expiry_date: string;
    cvv: string;
    uid: number | undefined;
    verified: boolean;
  }

  export default ICreditCardData;