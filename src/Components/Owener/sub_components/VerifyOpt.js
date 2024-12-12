import React, { useState } from 'react';
import './../css/VerifyOpt.css';

import ShowLoder from './../sub_components/show_loder.js';
// import {local_storage_key} from './sub_component/All_data.js'
import close_button from './../../../Assets/Owener/cross.png'
function VerifyOpt({ user_name, user_email, user_password, close_function }) {
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
    fetch('http://localhost:4000/api/verify_otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          user_send_otp: OTP,
          user_name: user_name,
          user_email: user_email,
          user_password: user_password
        }
      ),
    })
      .then((response) => {
        if (!response.ok) { throw new Error('Network response was not ok'); }
        return response.json();
      })
      .then((data) => {
        if (data.status === "verify-pass") {
          set_show_loder(true);
          setTimeout(() => {
            set_show_loder(false);
            if(data.user_key){
              alert("set me localt key and redux")
              // localStorage.setItem(local_storage_key,data.user_key)                
            }else{
              console.log(data);
              alert("Not able to store a user Data")
            }
            window.location.reload();
          }, 2000);

        } else {
          alert("OTP NOT match")
        }

        console.log(data);
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
