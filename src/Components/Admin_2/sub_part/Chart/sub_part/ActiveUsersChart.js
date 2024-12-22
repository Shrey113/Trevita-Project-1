import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './ActiveUsersChart.css'; 


const dailyActiveUsers = [
  { name: "Mon", activeUsers: 120, totalUsers: 500 },
  { name: "Tue", activeUsers: 150, totalUsers: 520 },
  { name: "Wed", activeUsers: 170, totalUsers: 540 },
  { name: "Thu", activeUsers: 160, totalUsers: 550 },
  { name: "Fri", activeUsers: 180, totalUsers: 560 },
  { name: "Sat", activeUsers: 190, totalUsers: 570 },
  { name: "Sun", activeUsers: 200, totalUsers: 580 },
];


const monthlyActiveUsers = [
  { month: "Jan", activeUsers: 2000, totalUsers: 10000 },
  { month: "Feb", activeUsers: 2200, totalUsers: 10200 },
  { month: "Mar", activeUsers: 2300, totalUsers: 10500 },
  { month: "Apr", activeUsers: 2500, totalUsers: 10700 },
  { month: "May", activeUsers: 2700, totalUsers: 11000 },
  { month: "Jun", activeUsers: 2900, totalUsers: 11500 },
  { month: "Jul", activeUsers: 3100, totalUsers: 12000 },
];

const ActiveUsersChart = () => {
  
  const [showDailyData, setShowDailyData] = useState(false);

  return (
    <div className="active-users-chart">
      <h2 className="chart-title">{showDailyData ? "Active Users per Day" : "Active Users vs Total Users Over Time"}</h2>

      
    <div className="slider_con">
    <button className={`${showDailyData === false  && 'active'}`} onClick={() => setShowDailyData(false)}>
            Real Time
            </button>
            <button className={`${showDailyData   && 'active'}`} onClick={() => setShowDailyData(true)}>
            Per Day
            </button> 

    </div>


      <div className="chart-container_ActiveUsersChart" style={{ boxShadow: 'none' }}>
        <ResponsiveContainer width="100%" height={300} style={{ boxShadow: 'none' }}>
          <BarChart data={showDailyData ? dailyActiveUsers : monthlyActiveUsers}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={showDailyData ? "name" : "month"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="activeUsers" fill="#fa977c" />
            <Bar dataKey="totalUsers" fill="#0085db" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActiveUsersChart;
