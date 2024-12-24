import React from 'react'
import './Charts.css'

import ChartWithData from './sub_part/ChartWithData'
import ProfitExpensesChart from './sub_part/ProfitExpensesChart'
import UserGrowthChart from './sub_part/UserGrowthChart'
import ActiveUsersChart from './sub_part/ActiveUsersChart'
import PackageUsageCharts from './sub_part/PackageUsageCharts'

function Charts() {
  return (
    <div className='Chart_id'>
      <div className='section_2'>
      {/* <ChartWithData/> */}
      <ActiveUsersChart/>
      <ProfitExpensesChart/>
      </div>

      <div className='section_1'>
      
      {/* <UserGrowthChart/>  */}
      </div>


      <PackageUsageCharts/>

    </div>
  )
}

export default Charts
