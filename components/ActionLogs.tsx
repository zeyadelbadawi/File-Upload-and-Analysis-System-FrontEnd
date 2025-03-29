'use client';

import React, { useState, useEffect, useRef } from 'react';
import useSocket from '../hooks/useSocket';

const ActionLogs = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const socketMessage = useSocket();
  const logContainerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (socketMessage && !logs.includes(socketMessage)) {
      setLogs((prevLogs) => [...prevLogs, socketMessage]);
    }
  }, [socketMessage, logs]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow-md w-full h-70">
      <h3 className="font-semibold text-xl text-gray-800 mb-4">User Action Logs</h3>
      <div className="bg-gray-50 p-4 rounded-md h-70">
        {logs.length === 0 ? (
          <p className="text-gray-500">No logs yet. Waiting for actions...</p>
        ) : (
          <ul ref={logContainerRef} className="space-y-2 max-h-60 overflow-y-auto">
            {logs.map((log, index) => (
              <li key={index} className="bg-white p-3 rounded-md shadow-sm transition duration-300 hover:bg-gray-100">
                {log}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ActionLogs;
