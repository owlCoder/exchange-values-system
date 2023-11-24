import React, { useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client'; // Import the 'Socket' type if available
import { API_URL } from '../../..';

const Transactions = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const socket: Socket = socketIOClient(API_URL + "realtime");

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('updated_data', (updatedData) => {
      setData(updatedData);
      console.log(updatedData)
    });

    // Define the cleanup function explicitly as a void function
    return (): void => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1 className='text-white'>Live Data: {data}</h1>
    </div>
  );
};

export default Transactions;
