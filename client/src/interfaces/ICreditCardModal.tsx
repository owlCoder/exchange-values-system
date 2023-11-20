import React from 'react';

/**
 * Represents the structure for the props passed to the CreditCardModal component.
 * @interface ICreditCardModal
 */
interface ICreditCardModal {
  /**
   * The unique identifier associated with the user (optional).
   * @type {number | undefined}
   */
  uid?: number;

  /**
   * Function to close the modal, received from React state.
   * @type {React.Dispatch<React.SetStateAction<void>>}
   */
  ModalClose: React.Dispatch<React.SetStateAction<void>>;

  /**
   * Function to trigger a background data refresh, received from React state.
   * @type {React.Dispatch<React.SetStateAction<void>>}
   */
  RefreshDataBackground: React.Dispatch<React.SetStateAction<void>>;
}

export default ICreditCardModal;
