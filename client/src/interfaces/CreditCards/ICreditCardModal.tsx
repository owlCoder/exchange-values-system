import React from 'react';

interface ICreditCardModal {
  uid?: number;
  ModalClose: React.Dispatch<React.SetStateAction<void>>;
  RefreshDataBackground: React.Dispatch<React.SetStateAction<void>>;
}

export default ICreditCardModal;
