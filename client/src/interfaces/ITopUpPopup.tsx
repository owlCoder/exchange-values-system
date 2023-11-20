import React from 'react';

/**
 * Represents the structure for props used in the Top-Up Popup component.
 * @interface ITopUpPopup
 */
interface ITopUpPopup {
  /**
   * The card number for the top-up operation.
   * @type {string}
   */
  card_number: string;

  /**
   * The unique identifier associated with the user (optional).
   * @type {number | undefined}
   */
  uid: number | undefined;

  /**
   * Method to close the top-up popup.
   * @type {React.Dispatch<boolean>}
   */
  closeModalMethod: React.Dispatch<boolean>;

  /**
   * Function to trigger a data refresh after top-up.
   * @type {React.Dispatch<void>}
   */
  onRefresh: React.Dispatch<void>;
}

export default ITopUpPopup;
