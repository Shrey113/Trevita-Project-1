import React from 'react'
import './Calendar.css'

import left_arrw from './sub_img/left-arrow.png'
import right_arrw from './sub_img/right-arrow.png'
import technology_icon from './sub_img/technology.png'
import books_icon from './sub_img/stack-of-books.png'
import vido_icon from './sub_img/cam-recorder.png'
import clock_icon from './sub_img/clock.png'







function Calendar() {



  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const days = ['11', '12', '13', '14', '15', '16'];

  const shortenDay = (day) => day.slice(0, 3);

  const ItemData = ({main_img})=>{
    return(
      <div className="item_con">
      <div className="icon">
        <img src={main_img} alt="" />
      </div>
      <div className="data">
        <div className="title">
          Metting with Client
        </div>
        <div className="message_Data">
          <div className="sub_data">
            <img src={vido_icon} alt="" />
            Google Meet
          </div>
          <div className="time">
          <img src={clock_icon} alt="" />
            12 PM
          </div>
        </div>
      </div>

    </div>
    )
  }

  return (
    <div className="body_test">
    <div className='Calendar_con'>
      <div className="title_bar_sub">
        <div className="month">October 2023</div>
        <div className="navigation">
          <div className="left">
            <img src={left_arrw} alt="" />
          </div>
          <div className="right">
            <img src={right_arrw} alt="" />
          </div>
        </div>
      </div>

      <div className="day_list_con">
        <div className="all_day">
        {weekdays.map((day, index) => (
          <span key={index} >
            {shortenDay(day)}
          </span>
        ))}
        </div>
        <div className="only_day">
        {days.map((day, index) => (
          <span key={index} className={`${index === 1 && 'active'}`}>
            {day}
          </span>
        ))}
        </div>
      </div>

      <div className="list_of_active_task">
          <ItemData main_img={books_icon}/>
          <ItemData main_img={technology_icon}/>
          <ItemData main_img={technology_icon}/>
      </div>
    </div>
    </div>
  )
}

export default Calendar;
