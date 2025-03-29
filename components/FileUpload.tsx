'use client';

import { useDropzone } from 'react-dropzone';
import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setErrorMessage(null);
    setIsUploading(true); 

    const formData = new FormData();

    acceptedFiles.forEach(file => formData.append('file', file));

    const userId = localStorage.getItem('userId');
    if (userId) {
      formData.append('userId', userId);
    }

    axios
      .post('http://localhost:3000/file/upload', formData, {
        onUploadProgress: (progressEvent: any) => {
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
      })
      .then(response => {
        console.log('Files uploaded successfully:', response.data);
        setIsUploading(false);
        window.location.reload();
      })
      .catch(error => {
        console.error('Error uploading files:', error);
        setErrorMessage('There was an error uploading your files. Please try again.');
        setIsUploading(false);
      });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    onDropAccepted: (acceptedFiles) => {
      const previews = acceptedFiles.map(file => URL.createObjectURL(file));
      setFilePreviews(previews);
    },
    onDropRejected: (rejectedFiles) => {
      setErrorMessage(`Some files were rejected due to invalid file types or sizes. Please check the accepted formats.`);
    }
  });

  return (
    <div className="container mx-auto p-4">
      <div {...getRootProps()} className="border-dashed border-4 p-8 text-center cursor-pointer hover:bg-gray-100 transition-all">
        <input {...getInputProps()} />
        <p className="text-lg font-semibold text-gray-600">Drag and drop files here, or click to select files</p>
        {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      </div>

      {filePreviews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {filePreviews.map((preview, index) => (
            <div key={index} className="border p-2 rounded-md">
              <img src={preview} alt={`Preview ${index}`} className="max-w-full h-auto" />
            </div>
          ))}
        </div>
      )}

      {isUploading ? (
        <div className="mt-4">
          <p>Uploading... Please wait.</p>
          <progress value={uploadProgress} max="100" className="w-full" />
        </div>
      ) : (
        uploadProgress === 100 && (
          <p className="text-green-600 mt-2">Upload complete!</p>
        )
      )}
    </div>
  );
};

export default FileUpload;
