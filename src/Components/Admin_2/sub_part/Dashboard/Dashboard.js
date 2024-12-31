import React,{useEffect,useState} from 'react'
import { gsap } from "gsap";


import UserDataList from './UserDataList.js'
// import Calendar from "./Calendar";
import ChartWithData from "../Chart/sub_part/ChartWithData.js";
import ProfitExpensesChart from "./ProfitExpensesChart";
import WelcomeUser from "./welcome_user";


import p_set from './../../shape/p_set.png'
import dollar_set from './../../shape/dollar-symbol.png'
import shape_1 from './../../shape/top-info-shape.png'
import shape_2 from './../../shape/top-error-shape.png'
import shape_3 from './../../shape/top-warning-shape.png'

const MainBox = ({fix_img,main_img,amount,other_amount,title})=>{
    return (
      <div className="admin_first_page_box">
        <div className="fix_img">
          <img src={fix_img} alt="" />
        </div>
        <div className="main_img">
          <img src={main_img} alt="" />
        </div>
        
        <span>
        <div className="data">
          <div className="amount">{amount}</div>
          <div className="other_amount">{other_amount}</div>
        </div>
        <div className="title">{title}</div>
        </span>
      </div>
    )
  }
  

function Dashboard({adminSettings,activeRow,setActiveRow,socket}) {
  const [data, setData] = useState(null);

    useEffect(() => {
      if(adminSettings?.show_animation){

       if (activeRow === 0) {gsap.fromTo(
          ".section_1_admin > *",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.2,
          }
        );
    
        gsap.fromTo(
          ".section_2_admin > *",
          { opacity: 0, y: 180 },
          {
            opacity: 1,
            y: 0,
            delay:0.1,
            duration: 0.8,
            stagger: 0.4,
          });
    
        gsap.fromTo(
          ".section_3_admin > *",
          { opacity: 0, y: 180 },
          {
            opacity: 1,
            y: 0,
            delay:0.6,
            duration: 1,
            stagger: 0.5,
          }
        );}
      }
    
      }, [activeRow,adminSettings?.show_animation]);


      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/owner_v2/all-data');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.log
                (error.message);
            } 
        };

        fetchData();
    }, []);

  return (
    <>
        <div className="section_1_admin">
        <MainBox 
                    fix_img={shape_1} 
                    main_img={p_set} 
                    amount={data?.totalAdmins || "0"} 
                    other_amount={"+0%"} 
                    title={"Admins"} 
                />
                <MainBox 
                    fix_img={shape_2} 
                    main_img={dollar_set} 
                    amount={data?.totalOwners || "0"} 
                    other_amount={"+0%"} 
                    title={"Owners"} 
                />
                <MainBox 
                    fix_img={shape_3} 
                    main_img={dollar_set} 
                    amount={data?.totalClients || "0"} 
                    other_amount={"-0%"} 
                    title={"Clients"} 
                />
                <MainBox 
                    fix_img={shape_1} 
                    main_img={p_set} 
                    amount={data?.totalPackages || "0"} 
                    other_amount={"+0%"} 
                    title={"Packages"} 
                />
                <MainBox 
                    fix_img={shape_3} 
                    main_img={dollar_set} 
                    amount={data?.totalExpenses || "0"} 
                    other_amount={"-0%"} 
                    title={"Expenses"} 
                />
          <WelcomeUser setActiveRow={setActiveRow} socket={socket} />
        </div>
    
        <div className="section_2_admin">
        <UserDataList />
        <ChartWithData/>
        </div>
        <div className="section_3_admin">
        <ProfitExpensesChart />
        {/* <Calendar /> */}
        </div>
    </>
  )
}

export default Dashboard;
