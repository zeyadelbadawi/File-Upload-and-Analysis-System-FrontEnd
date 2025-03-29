import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useFileStatus = (fileId: string) => {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
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
