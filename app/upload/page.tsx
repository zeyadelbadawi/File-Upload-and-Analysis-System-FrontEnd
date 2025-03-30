'use client';  

import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import FileSearch from '@/components/FileSearch';
import FileActivityChart from '@/components/FileActivityChart';
import FileProcessingStatus from '@/components/FileProcessingStatus';
import ActionLogs from '@/components/ActionLogs';

export default function Home() {
  const [files, setFiles] = useState<any[]>([]);

  const refreshFiles = () => {
    setFiles((prevFiles) => [
      ...prevFiles,
      { id: Date.now(), originalName: 'New File' }, 
    ]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">File Management</h1>
      <FileUpload refreshFiles={refreshFiles} />
      <FileProcessingStatus />
      <ActionLogs />
      <FileSearch files={files} />
      <FileActivityChart />
    </div>
  );
}
