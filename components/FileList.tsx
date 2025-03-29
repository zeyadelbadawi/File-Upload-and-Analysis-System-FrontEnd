'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(Number(storedUserId));  
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/file/files?userId=${userId}`)
        .then((response) => {
          setFiles(response.data.data); 
          setLoading(false);
        })
        .catch((error) => {
          setError('Error loading files');
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) return <p>Loading files...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-4">
      <h3>Uploaded Files</h3>
      <ul className="space-y-4">
  {files.map((file: any) => (
    <li key={file.id} className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-xl transition-all ease-in-out duration-300 bg-white">
      <div className="text-sm space-y-1">
        <p className="font-semibold text-gray-800">Name: {file.originalName}</p>
        <p className="text-gray-600">Type: {file.mimeType}</p>
        <p className="text-gray-600">Status: {file.status}</p>
        <p className="text-gray-600">Uploaded on: {new Date(file.uploadDate).toLocaleString()}</p>
      </div>
      {file.extractedData && (
        <div className="mt-2 text-gray-600">
          <p>Extraction Method: {file.mimeType === 'application/pdf' ? 'PDF' : file.mimeType.includes('image/') ? 'OCR' : 'CSV/Excel'}</p>
          <p>Extracted Data: {file.extractedData.slice(0, 100)}...</p>
        </div>
      )}
    </li>
  ))}
</ul>

    </div>
  );
};

export default FileList;
