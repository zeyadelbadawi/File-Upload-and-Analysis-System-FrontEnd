'use client';

import React, { useState, useEffect } from 'react';
import useSocket from '../hooks/useSocket';

const FileProcessingStatus = () => {
  const socketMessage = useSocket();
  const [status, setStatus] = useState<string>('Waiting for file processing...');

  useEffect(() => {
    if (socketMessage && socketMessage !== status) {
      setStatus(socketMessage);
    }
  }, [socketMessage, status]);

  return (
    <div className="bg-gray-200 p-6 mt-4 rounded-md shadow-lg w-full h-50">
      <h3 className="font-semibold text-lg text-gray-800 mb-4">File Processing Status</h3>
      <div
        className={`p-4 rounded-md transition duration-500 ease-in-out transform ${
          status.includes('Error')
            ? 'bg-red-100 text-red-500 border-red-500'
            : 'bg-green-100 text-green-500 border-green-500'
        } border-l-4 h-30`}
      >
        {status === 'Waiting for file processing...' ? (
          <p className="text-sm text-gray-500">{status}</p>
        ) : (
          <p className="text-sm">{status}</p>
        )}
      </div>
    </div>
  );
};

export default FileProcessingStatus;
