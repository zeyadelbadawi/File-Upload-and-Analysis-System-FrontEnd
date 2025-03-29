import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useFileStatus = (fileId: string) => {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
  const socket = io('https://backend-izke.onrender.com'); // Connect to the backend WebSocket server
    socket.emit('join', { fileId });

    socket.on('fileStatus', (status: string) => {
      setStatus(status);
    });

    return () => {
      socket.disconnect();
    };
  }, [fileId]);

  return status;
};

export default useFileStatus;
