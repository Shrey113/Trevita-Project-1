import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './ActiveUsersChart.css'; 


const dailyActiveUsers = [
  { name: "Mon", activeUsers: 120, totalUsers: 500 },
  { name: "Wed", activeUsers: 170, totalUsers: 540 },
  { name: "Fri", activeUsers: 180, totalUsers: 560 },
  { name: "Sun", activeUsers: 200, totalUsers: 580 },
];


const monthlyActiveUsers = [
  { month: "Jan", activeUsers: 2000, totalUsers: 10000 },
  { month: "Mar", activeUsers: 2300, totalUsers: 10500 },
  { month: "May", activeUsers: 2700, totalUsers: 11000 },
  { month: "Jul", activeUsers: 3100, totalUsers: 12000 },
];

const ActiveUsersChart = () => {
  
  const [showDailyData, setShowDailyData] = useState(true);

  return (
    <div className="active-users-chart">
      <h2 className="chart-title">{showDailyData ? "Active Users per Day" : "Active Users vs Total Users Over Time"}</h2>

      
    <div className="slider_con">
    <button className={`${showDailyData   && 'active'}`} onClick={() => setShowDailyData(true)}>
    Daily
            </button>
            <button className={`${showDailyData === false   && 'active'}`} onClick={() => setShowDailyData(false)}>
            Monthly
            </button> 

    </div>


      <div className="chart-container_ActiveUsersChart" style={{ boxShadow: 'none' }}>
        <ResponsiveContainer width="100%" height={300} style={{ boxShadow: 'none' }}>
          <BarChart data={showDailyData ? dailyActiveUsers : monthlyActiveUsers} 
              barCategoryGap="20%" 
              barGap={5}  
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={showDailyData ? "name" : "month"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="activeUsers" fill="#fa977c"  radius={[10, 10, 0, 0]} />
            <Bar dataKey="totalUsers" fill="#0085db"   radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActiveUsersChart;
