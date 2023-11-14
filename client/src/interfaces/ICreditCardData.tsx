interface ICreditCardData {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    uid: number | undefined;
  }

  export default ICreditCardData;