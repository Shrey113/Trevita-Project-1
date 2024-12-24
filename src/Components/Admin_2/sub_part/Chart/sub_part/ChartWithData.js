import React, { useState,useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ChartWithData.css';
import ShowChartLoading from './ShowChartLoading';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartWithData = () => {

  const [status_counts, set_status_counts] = useState({});
  const [loading, set_loading] = useState(true);
  const [error, setError] = useState(null);

  const [all_data,set_all_data] = useState(0);

  useEffect(() => {
    const fetchStatusCounts = async () => {
        try {
            set_loading(true);
            const response = await fetch('http://localhost:4000/chart/status-count'); // Replace with your endpoint URL

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            

            // Transform the data to match the desired structure
            const transformedData = {
                status_pending_request: data.Pending || 0,
                status_reject_request: data.Reject || 0,
                status_accept_request: data.Accept || 0,
            };

            set_all_data((data.Pending || 0) + (data.Reject || 0) + (data.Accept || 0));

            set_status_counts(transformedData);
        } catch (err) {
            console.error('Error fetching status counts:', err);
            setError(err.message);
        } finally {
            set_loading(false);
        }
    };

    fetchStatusCounts();
}, []);
  const data = {
    labels: ['Accept Requests', 'Pending Requests', 'Rejected Requests'],
    datasets: [
      {
        label: 'counts ',
        data: [status_counts.status_accept_request,
           status_counts.status_pending_request
           , status_counts.status_reject_request],
        backgroundColor: ['#fa977c', '#0085db', '#e6ecf1'],
        borderColor: ['white', 'white', 'white'],
        borderWidth: 0.1,
      },
    ],
  };

  const options = {
    cutout: '80%', 
    responsive: true,
    maintainAspectRatio: false,
  };

  

  return (
    <div className="chart-container_round" >
      <h2 className='title_name'>Owners Data</h2>
      {!loading 
        ?
        <div className="chart-box">
        <div className="chart">
          <Doughnut data={data} options={options} />
        </div>
        <div className="data-box">
          <p><strong>Data Summary:</strong></p>
          <div className="item">
            <p>Accept request</p>
            <p>{status_counts.status_accept_request}</p>
          </div>
          <div className="item">
           <p>Pending request</p>
            <p>{status_counts.status_pending_request}</p>
          </div>
          <div className="item">
            <p>reject request</p>
            <p>{status_counts.status_reject_request}</p>
          </div>
          <div className="item">
            <p>Total</p>
            <p>{all_data}</p>
          </div>
        </div>
        {error}
      </div>
        :
        <div className="loading_con">
          <ShowChartLoading/>
        </div>
      }

    </div>
  );
};

export default ChartWithData;
