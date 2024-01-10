import React from 'react';

export interface IInfoModal {
  title: string;
  closeModalMethod: React.Dispatch<React.SetStateAction<boolean>>;
}