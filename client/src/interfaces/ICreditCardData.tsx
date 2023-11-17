interface ICreditCardData {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    uid: number | undefined;
    verified: boolean;
  }

  export default ICreditCardData;