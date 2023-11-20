import ICreditCardData from "./ICreditCardData";

/**
 * Represents the structure for card slider data.
 * @interface CardSliderData
 */
interface CardSliderData {
    /**
     * An array of credit card data used in the card slider.
     * @type {ICreditCardData[]}
     */
    cards: ICreditCardData[];
  }
  
  export default CardSliderData;
  