import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PriceComparisonChart = ({ crops, marketData }) => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Comparison Across Markets',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₹${context.raw.toFixed(2)} per quintal`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price per Quintal (₹)'
        },
        ticks: {
          callback: function(value) {
            return '₹' + value;
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Crops'
        }
      }
    }
  };

  const chartData = {
    labels: crops.slice(0, 8),
    datasets: [
      {
        label: 'Average Price',
        data: crops.slice(0, 8).map(crop => {
          const cropData = marketData.filter(item => item.crop === crop);
          return cropData.length > 0 
            ? cropData.reduce((sum, item) => sum + item.modalPrice, 0) / cropData.length
            : 0;
        }),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        tension: 0.1,
      },
      {
        label: 'Highest Price',
        data: crops.slice(0, 8).map(crop => {
          const cropData = marketData.filter(item => item.crop === crop);
          return cropData.length > 0 
            ? Math.max(...cropData.map(item => item.maxPrice))
            : 0;
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 2,
        tension: 0.1,
      }
    ],
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Price Comparison Across Markets</h3>
      <div className="h-80">
        <Line options={chartOptions} data={chartData} />
      </div>
      <div className="mt-4 text-sm text-gray-500">
        <p>This chart compares the average and highest prices of major crops across different markets.</p>
      </div>
    </div>
  );
};

export default PriceComparisonChart;