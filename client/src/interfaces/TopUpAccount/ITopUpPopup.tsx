import React from 'react';

export interface ITopUpPopup {
  card_number: string;
  uid: number | undefined;
  closeModalMethod: React.Dispatch<boolean>;
  onRefresh: React.Dispatch<void>;
}