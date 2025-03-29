import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useSocket = () => {
  const [message, setMessage] = useState<string>('');
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!);
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Successfully connected to WebSocket server');
    });

    socket.on('fileStatusUpdate', (data: any) => {
      console.log('Received data:', data);
      setMessage(`File ${data.fileId} status: ${data.status}`);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      console.log('Cleaning up socket listeners');
      socket.off('fileStatusUpdate');
    };
  }, [socket]);

  return message;
};

export default useSocket;
