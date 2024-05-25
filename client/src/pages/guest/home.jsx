import React, { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { axiosClient } from '../../api/axios'; // Assuming you're using axios for API requests
const socket = io('http://localhost:5555');
import { authContext } from '../../contexts/AuthWrapper';

export default function Home() {
  const userContext = useContext(authContext);
  const handleUpgrade = async ( )=> {
    try {
      const response = await axiosClient.post('/rent', {
        guestName: 'John Doe',
        houseId: 'house123',
        hostId: '664d7845bd3c78354f894977',
      });
      console.log("done ");
      
    } catch (error) {
      console.error(error);
     
    }
  }
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', userContext.user._id); 
    socket.on('notification', (notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });
    return () => {
      socket.off('notification');
      socket.emit('leaveRoom', userContext.user._id);
    };
  }, [userContext.user]);

  useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  return (
    <div>
      <button onClick={handleUpgrade}>upgrade</button>
    </div>
  )
}
