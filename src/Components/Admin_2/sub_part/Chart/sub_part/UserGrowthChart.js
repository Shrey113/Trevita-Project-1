import React from 'react';
import { Line } from 'react-chartjs-2';
import './UserGrowthChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const UserGrowthChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    values: [100, 200, 400, 600, 800, 950, 1200, 1500, 1800, 2000, 2300, 2500],
  };

  const chartData = {
    labels: data.labels, 
    datasets: [
      {
        label: 'User Growth',
        data: data.values,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'User Growth Over Time',
        font: {
          size: 20
        }
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 14
          }
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Users',
          font: {
            size: 14
          }
        },
        min: 0,
        max: 3000,
        ticks: {
          stepSize: 500,
          font: {
            size: 12
          }
        },
      },
    },
  };
  

  return (
    <div className="UserGrowthChart_con" >
      <h1 className='UserGrowthChart_title'>User Growth Chart</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default UserGrowthChart;
