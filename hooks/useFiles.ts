'use client';  

import { useQuery } from 'react-query';
import axios from 'axios';

interface FileData {
  id: number;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  path: string;
  status: string;
  extractedData: string;
  uploadDate: string;
}

const fetchFiles = async (userId: number): Promise<FileData[]> => {
  const response = await axios.get(`http://localhost:3000/file/files?userId=${userId}`);
  return response.data.data;  
};

const useFiles = (userId: number) => {
  return useQuery(['files', userId], () => fetchFiles(userId));  
};

export default useFiles;
