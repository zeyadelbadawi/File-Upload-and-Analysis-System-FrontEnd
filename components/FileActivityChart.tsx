'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


interface FileActivityChartProps {
  files: any[];
}

const FileActivityChart = ({ files }: { files: any[] }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [fileTypeData, setFileTypeData] = useState<any>({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        .get(`${process.env.NEXT_PUBLIC_API_URL}/file/file-summary?userId=${userId}`)
        .then((response) => {
          const fileTypeBreakdown = response.data.fileTypeBreakdown;

          const labels = fileTypeBreakdown.map((item: any) => item.file_mimeType);  
          const data = fileTypeBreakdown.map((item: any) => item.count);

          setFileTypeData({
            labels,
            datasets: [
              {
                data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF8C00', '#4BC0C0'],  
                hoverBackgroundColor: ['#FF4C64', '#2F8CCF', '#FFD45E', '#FF7F1F', '#41B8B0'], 
                borderWidth: 2,
                borderColor: '#ffffff', 
              },
            ],
          });
          setLoading(false);
        })
        .catch((error) => {
          setError('Error loading file type summary');
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full"></div>
        <p className="ml-4 text-gray-600">Loading activity chart...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="mt-6 p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">File Type Breakdown</h3>
      <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px]">
        <Pie
          data={fileTypeData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                backgroundColor: '#000',
                titleColor: '#fff',
                bodyColor: '#fff',
              },
              legend: {
                position: 'top',
                labels: {
                  boxWidth: 12,
                  padding: 15,
                  font: {
                    size: 14,
                  },
                },
              },
            },
            animation: {
              animateScale: true,
              animateRotate: true,
            },
          }}
        />
      </div>
    </div>
  );
};

export default FileActivityChart;
