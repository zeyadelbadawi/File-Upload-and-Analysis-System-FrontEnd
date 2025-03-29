import React, { useState } from 'react';
import useFileStatus from '../hooks/useFileStatus';

const FileStatus = ({ fileId }: { fileId: string }) => {
  const status = useFileStatus(fileId);

  return (
    <div className="mt-4">
      <h3>File Processing Status</h3>
      <p>Status: {status}</p>
    </div>
  );
};

export default FileStatus;
