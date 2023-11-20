import React from 'react';

/**
 * Represents the structure for information modal props.
 * @interface IInfoModal
 */
interface IInfoModal {
  /**
   * The title displayed in the information modal.
   * @type {string}
   */
  title: string;

  /**
   * Method to close the information modal.
   * @type {React.Dispatch<React.SetStateAction<boolean>>}
   */
  closeModalMethod: React.Dispatch<React.SetStateAction<boolean>>;
}

export default IInfoModal;
