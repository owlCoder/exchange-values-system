import React from 'react';

interface IInfoModal {
  title: string;
  closeModalMethod: React.Dispatch<React.SetStateAction<boolean>>;
}

export default IInfoModal;