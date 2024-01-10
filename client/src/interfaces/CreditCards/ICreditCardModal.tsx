import React from 'react';

export interface ICreditCardModal {
  uid?: number;
  ModalClose: React.Dispatch<React.SetStateAction<void>>;
  RefreshDataBackground: React.Dispatch<React.SetStateAction<void>>;
}