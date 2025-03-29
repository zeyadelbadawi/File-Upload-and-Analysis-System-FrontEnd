// pages/index.tsx
'use client';  // Add this line at the top of the component

import FileUpload from '@/components/FileUpload';
import FileList from '@/components/FileList';
import FileSearch from '@/components/FileSearch';
import FileActivityChart from '@/components/FileActivityChart'; // Import FileActivityChart

import FileProcessingStatus from '@/components//FileProcessingStatus';
import ActionLogs from '@/components/ActionLogs';
export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold"></h1>
      <FileUpload />
      <FileProcessingStatus />
      <ActionLogs />
      <FileSearch />
      <FileActivityChart />


    </div>
  );
}
