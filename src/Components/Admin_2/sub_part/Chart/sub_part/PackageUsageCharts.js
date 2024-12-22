import React, { useState } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import './PackageUsageCharts.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PackageUsageCharts = () => {
  
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly User Growth',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      },
    ],
  };

  
  const pieData = {
    labels: ['Package A', 'Package B', 'Package C', 'Package D'],
    datasets: [
      {
        data: [300, 50, 100, 75],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  
  const barData = {
    labels: ['Package A', 'Package B', 'Package C', 'Package D'],
    datasets: [
      {
        label: 'Number of Users',
        data: [150, 200, 120, 250],
        backgroundColor: '#FF6384',
      },
      {
        label: 'Free Trial Users',
        data: [50, 40, 60, 30],
        backgroundColor: '#36A2EB',
      },
    ],
  };

  
  const barOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const [showChart,setshowChart] = useState(1)

  return (
    <div className="charts-container_PackageUsage">
  <h2 className="charts-title">Package Usage Overview</h2>

  
    <div className="slider_con">
            <button className={`${showChart !== 0 && 'active'}`} onClick={() => setshowChart(1)}>
                Most Used Packages
            </button> 
            <button className={`${showChart !== 1 && 'active'}`} onClick={() => setshowChart(0)}>
                Number of Users Subscribed
            </button>
    </div>

  

  <div className="chart-section_1">
    {showChart === 0 ?
      <div className="chart">
      <h3>Number of Users Subscribed to Each Package (Stacked Bar Chart)</h3>
      <Bar data={barData} options={barOptions} />
      </div>
      :
      <div className="chart">
        <h3>Most Used Packages (Pie Chart)</h3>
        <Pie data={pieData} />
      </div>
    }
  </div>

  <div className="chart-section_1">
    <div className="chart">
    <h3>Monthly User Growth (Line Chart)</h3>
    <Line data={lineData} />

    </div>
  </div>
</div>

  );
};

export default PackageUsageCharts;