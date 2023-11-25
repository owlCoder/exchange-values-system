import React, { useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import { API_URL } from '../../..';
import ITransaction from '../../../interfaces/ITransaction';
import { showErrorToast, showSuccessToast, showWarningToast, showInfoToast } from '../../ToastNotification/Toast';
import { ToastContainer } from 'react-toastify';

const Transactions: React.FC = () => {
  const [data, setData] = useState<ITransaction[]>([]);

  const handleSuccessClick = () => {
    showSuccessToast('Operation successful!');
  };

  const handleErrorClick = () => {
    showErrorToast('Something went wrong!');
  };

  const handleWarningClick = () => {
    showWarningToast('Be cautious!');
  };
  
  useEffect(() => {
    const socket: Socket = socketIOClient(API_URL + "realtime");
    socket.on('connect', () => {
      showInfoToast("Connecting to Transactions System service");
      setTimeout(() => showSuccessToast('Connected to Transactions System service'), 5500);
    });

    socket.on('updated_data', (transaction) => {
      var new_transaction: ITransaction = JSON.parse(transaction);
      setData(data => [...data, new_transaction]);
      showInfoToast("Transcation has been processed")
    })

    socket.on('disconnect', () => {
      showErrorToast('RealTime Transactions System service is offline');
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []); // Include timer in the dependencies array

  return (
    <div>
      {/* Show toast notification for realtime server connections */}
       <ToastContainer />
      <h1 className='dark:text-white'>Live Data: </h1>
      <div>
      <button className='text-white bg-[#8E0000] hover:bg-[#A43232] focus:ring-4 focus:ring-[#8E0000] font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2 mr-2 dark:bg-[#8E0000] dark:hover:bg-[#A43232] focus:outline-none dark:focus:ring-[#8E0000]' onClick={handleSuccessClick}>Show Success Toast</button>
      <button className='text-white bg-[#8E0000] hover:bg-[#A43232] focus:ring-4 focus:ring-[#8E0000] font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2 mr-2 dark:bg-[#8E0000] dark:hover:bg-[#A43232] focus:outline-none dark:focus:ring-[#8E0000]' onClick={handleErrorClick}>Show Error Toast</button>
      <button className='text-white bg-[#8E0000] hover:bg-[#A43232] focus:ring-4 focus:ring-[#8E0000] font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2 mr-2 dark:bg-[#8E0000] dark:hover:bg-[#A43232] focus:outline-none dark:focus:ring-[#8E0000]' onClick={handleWarningClick}>Show Warning Toast</button>
    </div>
    </div>
  );
};

export default Transactions;