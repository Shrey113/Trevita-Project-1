import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ChartWithData.css';

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartWithData = () => {
  const data = {
    labels: ['#fa977c', '#0085db', '#e6ecf1'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: ['#fa977c', '#0085db', '#e6ecf1'],
        borderColor: ['white', 'white', 'white'],
        borderWidth: 0.1,
      },
    ],
  };

  // Add options to control cutout (chart ring thickness)
  const options = {
    cutout: '80%', // Adjust this value (e.g., '60%', '70%') to control ring thickness
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="chart-container_round" style={{ width: '300px', height: '300px' }}>
      <div className="chart-box">
        <div className="chart">
          <Doughnut data={data} options={options} />
        </div>
        <div className="data-box">
          <p><strong>Data Summary:</strong></p>
          <p>Red: 12</p>
          <p>Blue: 19</p>
          <p>Yellow: 3</p>
        </div>
      </div>
    </div>
  );
};

export default ChartWithData;
