import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface File {
  id: number;
  originalName: string;
  mimeType: string;
  status: string;
  uploadDate: string;
  extractedData?: string;
}

interface FileSearchProps {
  files: File[]; 
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;

}

const FileSearch: React.FC<FileSearchProps> = ({ files }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [fileType, setFileType] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('uploadDate');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);

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
        .get(`${process.env.NEXT_PUBLIC_API_URL}/file/files?userId=${userId}&status=${status}&type=${fileType}&sortBy=${sortBy}&sortOrder=${sortOrder}`)
        .then((response) => {
          setFiles(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Error loading files');
          setLoading(false);
        });
    }
  }, [userId, status, fileType, sortBy, sortOrder]);

  if (loading) return <p className="text-center text-gray-600">Loading files...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Search functionality
  const filteredFiles = files.filter((file) =>
    file.originalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => {
    setSelectedFile(null);
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 mb-6">
      {/* Filters Section */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="relative flex items-center w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search files by name"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <span className="absolute right-4 text-gray-400">🔍</span>
        </div>
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="">All Types</option>
          <option value="application/pdf">PDF</option>
          <option value="image/jpeg">JPEG</option>
          <option value="image/png">PNG</option>
          <option value="text/csv">CSV</option>
          <option value="application/vnd.ms-excel">Excel</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="processed">Processed</option>
          <option value="failed">Failed</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>

      {/* Files List */}
      <ul className="space-y-4">
        {filteredFiles.map((file) => (
          <li key={file.id} className="border-b pb-4 hover:bg-gray-100 transition duration-300">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-lg">{file.originalName}</p>
              <span className="text-sm text-gray-500">{new Date(file.uploadDate).toLocaleString()}</span>
            </div>
            <p className="text-gray-700">Type: {file.mimeType}</p>
            <p className="text-gray-700">Status: <span className={`font-semibold ${file.status === 'pending' ? 'text-yellow-500' : file.status === 'processed' ? 'text-green-500' : 'text-red-500'}`}>{file.status}</span></p>
            {file.extractedData && (
              <>
                <p className="text-gray-700">Extraction Method: {file.mimeType === 'application/pdf' ? 'PDF' : file.mimeType === 'image/jpeg' || file.mimeType === 'image/png' ? 'OCR' : 'CSV/Excel'}</p>
                <p className="text-gray-700">Extracted Data: {file.extractedData.slice(0, 100)}...</p>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Modal for File Details */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <button onClick={closeModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedFile.originalName}</h2>
            <p><strong>Type:</strong> {selectedFile.mimeType}</p>
            <p><strong>Status:</strong> {selectedFile.status}</p>
            <p><strong>Uploaded on:</strong> {new Date(selectedFile.uploadDate).toLocaleString()}</p>
            {selectedFile.extractedData && (
              <>
                <p><strong>Extraction Method:</strong> {selectedFile.mimeType === 'application/pdf' ? 'PDF' : selectedFile.mimeType === 'image/jpeg' || selectedFile.mimeType === 'image/png' ? 'OCR' : 'CSV/Excel'}</p>
                <p><strong>Extracted Data:</strong> {selectedFile.extractedData}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileSearch;
