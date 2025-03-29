import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useFileStatus = (fileId: string) => {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const socket = io('http://localhost:3000');
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
