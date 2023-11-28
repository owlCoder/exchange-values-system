import React, { useEffect, useState } from 'react';
import { API_URL } from '../../main';
import ITransaction from '../../interfaces/Transaction/ITransaction';
import { showErrorToast, showSuccessToast, showInfoToast, showWarningToast } from '../Toast/Toast';
import { ToastContainer } from 'react-toastify';
import Graph from '../Graph/Graph';
import socketIOClient, { Socket } from 'socket.io-client';

const Transactions: React.FC = () => {
  let run = 0;
  const [data, setData] = useState<ITransaction[]>([]);
  
  useEffect(() => {
    const socket: Socket = socketIOClient(API_URL.replace('/api', ''));

    socket.on('connect', () => {
      ShowInfo();
    });

    socket.on('live', (new_transaction: ITransaction) => {
      setData(data => [...data, new_transaction]);

      if(new_transaction.approved == "APPROVED")
        showSuccessToast(`Transcation ${new_transaction.amount} ${new_transaction.currency} to
                                   ${new_transaction.receiver_email} has been approved`);
      else
        showWarningToast(`Transcation ${new_transaction.amount} ${new_transaction.currency} to
                                   ${new_transaction.receiver_email} has been denied`);
    });

    socket.on('disconnect', () => {
      showErrorToast('RealTime transaction systems service is offline');
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []); 

  const ShowInfo = (): void => {
    if(run < 1) {
      showInfoToast("Connecting to Transactions System service");
      setTimeout(() => showSuccessToast('Connected to Transactions System service'), 1000);
      run = 1;
    }
  };

  return (
    <div>
      {/* Show toast notification for realtime server connections */}
      <ToastContainer />

      <div className="overflow-y-auto h-screen overflow-x-hidden justify-center items-center w-full md:inset-0 md:h-full">
        <div className="relative p-4 w-full h-full md:h-auto">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Real-Time Transactions
              </h3>
            </div>
            <Graph data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;