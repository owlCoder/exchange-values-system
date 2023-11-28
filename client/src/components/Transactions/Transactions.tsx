import React, { useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import { API_URL } from '../../main';
import ITransaction from '../../interfaces/Transaction/ITransaction';
import { showErrorToast, showSuccessToast, showInfoToast, showWarningToast } from '../Toast/Toast';
import { ToastContainer } from 'react-toastify';
import Graph from '../Graph/Graph';
import axios from 'axios';

const Transactions: React.FC = () => {
  const [data, setData] = useState<ITransaction[]>([]);

  useEffect(() => {
    const fetchData = async (data: any) => {
      try {
        const response = await axios.get(API_URL + `realtime?lastData=${data}`);
        if (response.status === 200) {
          const result = response.data;
          console.log('Received data:', result.data);
          // Process the received data, update UI, etc.
          fetchData(result.data); // Initiate the next request
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    // const socket: Socket = socketIOClient(API_URL);
    // socket.on('connect', () => {
    //   showInfoToast("Connecting to Transactions System service");
    //   setTimeout(() => showSuccessToast('Connected to Transactions System service'), 3500);
    // });

    // socket.on('updated_data', transaction => {
    //   if (transaction.startsWith("No")) {
    //     showInfoToast(transaction);
    //   }
    //   else {
    //     console.log(transaction);

    //     // var new_transaction: ITransaction = JSON.parse(transaction);
    //     // setData(data => [...data, new_transaction]);

    //     // if (new_transaction.approved)
    //     //   showSuccessToast(`Transcation ${new_transaction.amount} ${new_transaction.currency} to
    //     //                            ${new_transaction.receiver_email} has been approved`);
    //     // else
    //     //   showWarningToast(`Transcation ${new_transaction.amount} ${new_transaction.currency} to
    //     //                            ${new_transaction.receiver_email} has been denied`);
    //   }
    // })

    // socket.on('disconnect', () => {
    //   showErrorToast('RealTime Transactions System service is offline');
    // });

    // // Cleanup on unmount
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

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