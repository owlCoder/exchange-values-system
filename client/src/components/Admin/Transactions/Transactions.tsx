import React, { useEffect, useState } from 'react';
import socketIOClient, { Socket } from 'socket.io-client';
import { API_URL, REALTIME_TIMEOUT } from '../../..';

const Transactions = () => {
  const [data, setData] = useState('');
  const [connectionTime, setConnectionTime] = useState<number>(REALTIME_TIMEOUT);
  const [notification, setNotification] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null); // Explicitly typed as NodeJS.Timeout

  const handleCountdown = () => {
    const newTimer = setInterval(() => {
      setConnectionTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(newTimer);
          return REALTIME_TIMEOUT;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000); // Update every second

    setTimer(newTimer); // Set the timer state
  };

  useEffect(() => {
    const socket: Socket = socketIOClient(API_URL + "realtime");

    setNotification("Connection to realtime service...")

    socket.on('connect', () => {
      console.log('Connected to server');
      setNotification('');
      handleCountdown(); // Start countdown when connected
    });

    socket.on('updated_data', (updatedData) => {
      setData(updatedData);
      console.table(JSON.parse(updatedData))
      setConnectionTime(REALTIME_TIMEOUT);
    });

    socket.on('disconnect', () => {
      if (timer) {
        clearInterval(timer); // Clear the countdown timer
      }
      setConnectionTime(REALTIME_TIMEOUT); // Reset time to 60 seconds on disconnect
      setData(''); // Clear data when disconnected
      setNotification('RealTime transaction systems service is offline');
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []); // Include timer in the dependencies array

  return (
    <div>
      <h1 className='dark:text-white'>Live Data: {data}</h1>
      <p className='dark:text-white'>Transcations will be processed: &nbsp;
       {notification === "" ? connectionTime +  " seconds" : notification}
       </p>
    </div>
  );
};

export default Transactions;