import React, { useState } from 'react';
import './../css/VerifyOpt.css';

import ShowLoder from './../sub_components/show_loder.js';
// import {local_storage_key} from './sub_component/All_data.js'
import close_button from './../../../Assets/Owener/cross.png'

import {localstorage_key_for_jwt_user_side_key,Server_url} from './../../../redux/AllData.js'

function VerifyOpt({ user_name,
  user_email,
  user_password,
  business_name,
  business_address,
  mobile_number,
  GST_number
  , close_function }) {
  const [show_loder, set_show_loder] = useState(false);


  const [OTP, set_OTP] = useState('');

  function set_input_otp(input) {
    set_OTP(input);
  }

  function close_me(){
    let user_result = window.confirm("are you sore you need to close")
    if (user_result){
      close_function()
    }
  }

  const verify_opt = (e) => {
    e.preventDefault();
    fetch(`${Server_url}/owner/verify_otp_owner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          type:"owener",
          user_send_otp: OTP,
          user_name: user_name,
          user_email: user_email,
          user_password: user_password,
          business_name: business_name,
          business_address: business_address,
          mobile_number: mobile_number,
          GST_number: GST_number,
        }
      ),
    })
      .then((response) => {
        if (!response.ok) { throw new Error('Network response was not ok'); }
        return response.json();
      }).then((data) => {
        console.log(data);
        if (data.message === "OTP verified successfully") {
          console.log("OTP verification passed");
          set_show_loder(true);
          setTimeout(() => {
            set_show_loder(false);
            if(data.user_key){
              localStorage.setItem(localstorage_key_for_jwt_user_side_key,data.user_key)                
            }else{
              alert("Not able to store a Data")
            }
            window.location.reload();
          }, 1000);
        } else {
          alert("OTP NOT match")
          console.log("Message not matched:", data.message);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="verify-opt-container">
      <form onSubmit={verify_opt}>
        {show_loder && <ShowLoder />}
        <span htmlFor="OTP">Verify OTP</span>
        <input
          type="text"
          id="OTP"
          placeholder="Enter your OTP"
          value={OTP}
          onChange={(e) => set_input_otp(e.target.value)}
        />
        <input type="submit" />
        <p className="message"><strong>OTP</strong> will be send on <strong>register email {user_email}</strong>.</p>
              <div onClick={close_me} className='close_con'>
        <img src={close_button} alt="close me" />
      </div>
      </form>

    </div>
  );
}

export default VerifyOpt;
