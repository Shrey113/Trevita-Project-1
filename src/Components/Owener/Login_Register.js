import React, { useState,useEffect  } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import './css/LoginRegister.css'
import "swiper/css";
import "swiper/css/autoplay";

import eye_visible from './../../Assets/Login/eye_visible.png';
import eye_hide from './../../Assets/Login/eye_hide.png';
import Register_page_1 from "./../../Assets/Owener/Register_page_1.jpg";
import Register_page_2 from "./../../Assets/Owener/Register_page_2.jpg";
import Register_page_3 from "./../../Assets/Owener/Register_page_3.jpg";
import Register_page_4 from "./../../Assets/Owener/Register_page_4.jpg";


import VerifyOpt from './sub_components/VerifyOpt.js';
import ForgetPassword from "./sub_components/ForgetPassword.js";
import ShowLoder from "./sub_components/show_loder.js";
import {localstorage_key_for_jwt_user_side_key,Server_url,localstorage_key_for_admin_login} from './../../redux/AllData.js'



const CustomInputField = ({ id, type, value, onChange, label, error, name }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="Login_register_input_group_Owener">
            <input 
                type={isPasswordVisible ? 'text' : type} 
                id={id} 
                name={name} 
                value={value} 
                onChange={onChange} 
                 required
            />
            <span className="bar"></span>
            {type === 'password' && (
                <button 
                    type="button" 
                    onClick={togglePasswordVisibility} 
                    className="show_password_button"
                >
                    <img 
                        src={isPasswordVisible ? eye_visible : eye_hide} 
                        height={25} 
                        alt="Toggle Password Visibility" 
                    />
                </button>
            )}
            
            <label htmlFor={id}>{label}</label>
            
            {error && (
                <div id={`${id}_error`} className="all_error_for_input">
                    {error}
                </div>
            )}
        </div>
    );
};



function LoginRegisterOwener() {
  //  Login part -- 
  const [login_email, set_login_email] = useState("");
  const [login_email_error, set_login_email_error] = useState("");
  const [login_password, set_login_password] = useState("");
  const [login_password_error, set_login_password_error] = useState("");

  const [is_register, toggle_register_login] = useState(false);
  const [is_page_1register, toggle_is_page_1register] = useState(true);
  // register part 1 --
  const [register_user_name, set_register_user_name] = useState("");
  const [register_user_name_error, set_register_user_name_error] = useState("");
  const [register_email, set_register_email] = useState("");
  const [register_email_error, set_register_email_error] = useState("");
  const [register_password, set_register_password] = useState("");
  const [register_password_error, set_register_password_error] = useState("");
  const [register_confirm_password_password, set_register_confirm_password_password] = useState("");
  const [register_confirm_password_password_error, set_register_confirm_password_password_error] = useState("");
  const [terms_and_conditions, set_terms_and_conditions] = useState(false);
  const [terms_and_conditions_error, set_terms_and_conditions_error] = useState("");

 // register part 1 --
 const [register_business_name, set_register_business_name] = useState("");
 const [register_business_name_error, set_register_business_name_error] = useState("");
 const [register_business_address, set_register_business_address] = useState("");
 const [register_business_address_error, set_register_business_address_error] = useState("");
 const [register_business_mobile_number, set_register_business_mobile_number] = useState("");
 const [register_business_mobile_number_error, set_register_business_mobile_number_error] = useState("");
 const [register_business_GST_number, set_register_business_GST_number] = useState("");
 const [register_business_GST_number_error, set_register_business_GST_number_error] = useState("");

  // toggle page --
  const [show_verify_page,set_show_verify_page] = useState(false)
  const [show_forget_password,set_show_forget_password] = useState(false)

  const [test,set_test] = useState(false);

  const [show_loder,set_show_loder] = useState(false);
  


  function go_to_register(){
    if(window.innerWidth >= 661 ){
      toggle_register_login(!is_register)
    }else{
      set_test(true);
    }
  }
  function go_to_Login(){
    if(window.innerWidth >= 661 ){
      toggle_register_login(!is_register)
    }else{
      set_test(false);
    }
  }

  useEffect(() => {

    let previousWidth = window.innerWidth;

    const handleResize = () => {
      if (window.innerWidth !== previousWidth) {
        previousWidth = window.innerWidth; 

        if (window.innerWidth >= 661) {
          set_test(true);
        } else {
          set_test(false);
        }

        toggle_register_login(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const validate_email = (email) => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_pattern.test(email);
  };

  async function loginAdmin(admin_email, admin_password) {
    console.log(admin_email);
    
    try {
      const response = await fetch(`${Server_url}/Admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin_email, admin_password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        set_login_password_error("");
        set_login_email_error("");
        console.log(data);
        if(data.message === "Email not found") {
          set_login_email_error("Email not found as Admin");
        }else if(data.message === "Invalid password"){
          set_login_password_error("Invalid password as Admin")
        }else if(data.message === "Login successful"){
          localStorage.setItem(localstorage_key_for_admin_login, data.token);
        
          window.location.href = '/';
          // alert("admin login successful")
          
        }
      } else {
        // HTTP error
        console.error('HTTP error:', response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


  const handle_login_submit = async (event) => {
    event.preventDefault();
    console.log("Step 1: Form submit event triggered");
  
    let is_valid = true;
  
    // Check if it's an admin login
    if (login_email.startsWith("^admin")) {
      console.log("Step 2: Admin login detected");
      const temp = login_email.replace("^admin", "");
      try {
        await loginAdmin(temp, login_password);
        console.log("Step 3: Admin login successful");
      } catch (error) {
        console.error("Step 3: Admin login failed:", error);
      }
      return;
    } else {
      console.log("Step 2: Regular user login detected");
    }
  
    // Validate email
    if (validate_email(login_email)) {
      console.log("Step 4: Email validation passed");
      set_login_email_error("");
    } else {
      console.log("Step 4: Email validation failed");
      set_login_email_error("Invalid email");
      is_valid = false;
    }
  
    if (!is_valid) {
      console.log("Step 5: Validation failed, stopping submission");
      return;
    }
  
    console.log("Step 5: Validation passed, proceeding to login");
  
    try {
      const response = await fetch(`${Server_url}/owner/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: login_email,
          user_password: login_password,
        }),
      });
  
      if (!response.ok) {
        console.error("Step 6: Server response was not OK");
        return;
      }
  
      console.log("Step 6: Server responded OK, parsing data");
  
      const data = await response.json();
      console.log("Step 7: Server response data parsed:", data);
  
      // Handle login result
      if (data.status === "login-fail") {
        console.log("Step 8: Login failed, setting error messages");
        set_login_password_error(data.error);
        set_login_email_error(data.error);
      } else if (data.user_key) {
        console.log("Step 8: Login successful, storing user key and reloading page");
        localStorage.setItem(localstorage_key_for_jwt_user_side_key, data.user_key);
        window.location.reload(); // Replace with better navigation logic if using a framework
      }
    } catch (error) {
      console.error("Step 6: Error during login fetch request:", error);
    }
  };
  


  function register_page_1_valide(e){
    e.preventDefault();
    let is_valid_page_1 = true;

  if (register_user_name.length < 4) {
    set_register_user_name_error("Length must be 4 characters");
    is_valid_page_1 = false;
  } else {
    set_register_user_name_error("");
  }

  if (validate_email(register_email)) {
    set_register_email_error("");
  } else {
    set_register_email_error("Invalid email");
    is_valid_page_1 = false;
  }

  const temp_password = register_password;
  if (temp_password.length < 4) {
    set_register_password_error("Length must be at least 4 characters");
    is_valid_page_1 = false;
  } else if (!/\d/.test(temp_password)) {
    set_register_password_error("Must contain at least one digit");
    is_valid_page_1 = false;
  } else if (!/[a-zA-Z]/.test(temp_password)) {
    set_register_password_error("Must contain at least one letter");
    is_valid_page_1 = false;
  } else if (!/[A-Z]/.test(temp_password)) {
    set_register_password_error("Must contain at least one uppercase letter");
    is_valid_page_1 = false;
  } else {
    set_register_password_error("");
  }
  

  if (register_password !== register_confirm_password_password) {
    set_register_confirm_password_password_error("Passwords must match");
    is_valid_page_1 = false;
  } else {
    set_register_confirm_password_password_error("");
  }

  if (!terms_and_conditions) {
    set_terms_and_conditions_error("Terms and conditions must be checked");
    is_valid_page_1 = false;
  } else {
    set_terms_and_conditions_error("");
  }


  if(is_valid_page_1){
    toggle_is_page_1register(false)
    console.log("sss - 1");
  }
}
 
  const handle_register_submit = async (event) => {
    event.preventDefault();
    let is_valid = true;

    if (register_business_name.trim() === "") {
      set_register_business_name_error("Business Name is required.");
      is_valid = false;
    } else {
      set_register_business_name_error("");
    }

    if (register_business_address.trim() === "") {
      set_register_business_address_error("Business Address is required.");
      is_valid = false;
    } else {
      set_register_business_address_error("");
    }

    // const mobileRegex = /^[0-9]\d{9}$/;
    if (register_business_mobile_number.length !== 10) {
      set_register_business_mobile_number_error("Mobile number must be exactly 10 digits.")
      is_valid = false;
    }else{
      set_register_business_mobile_number_error("");
    }
 
    if (!/^[0-9]{10}$/.test(register_business_mobile_number)) {
      set_register_business_mobile_number_error("Enter a valid 10-digit mobile number.");
      is_valid = false;
    }else{
      set_register_business_mobile_number_error("");
    }
 
    

    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/; 
    if (!gstRegex.test(register_business_GST_number)) {
      set_register_business_GST_number_error("GST number must be exactly 15 characters long.And GST validation");
      is_valid = false;
    } else {
      set_register_business_GST_number_error("");
    }



    if (is_valid) {
      const Data = {
        user_name: register_user_name,
        user_email: register_email,
        user_password: register_password,
        business_name: register_business_name,
        business_address: register_business_address,
        mobile_number: register_business_mobile_number,
        GST_number: register_business_GST_number,
      };

      try {
        const response = await fetch(`${Server_url}/owner/add_owner`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);

          if (data.error === "Email already exists") {
            toggle_is_page_1register(true);
            set_register_email_error(data.error);
          } else {
            // sub -if-else
            if (data.error === "user name already exists") {
              toggle_is_page_1register(true);
              set_register_user_name_error(data.error);
            } else if (data.message === "go for otp") {
              set_show_loder(true);
              set_show_verify_page(true);
              fetch(`${Server_url}/send_otp_email`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: register_email, type:"owner", }),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Network response was not ok");
                  }
                  return response.json();
                })
                .then((data) => {
                  if (!data.error) {
                    
                  } else {
                    set_show_loder(false);
                    alert("server error at /send otp email");
                  }
                })
                .catch((error) => {
                  set_show_loder(false);
                  console.error("Error:", error.message);
                });
            }else{
              set_show_loder(false);
              set_show_verify_page(false);
              alert("server error at /owner/add_owner");
            }
          }
        } else {
          const errorData = await response.text();
          console.log("Error adding client, status code:", response.status);
          console.error("Error response:", errorData);
        }
      } catch (error) {
        console.error("Error making fetch request:", error);
      }
    }
  
  };

 


  return (
    <>
      <div className="full_blur_bg_1">
      
        <div className="user_login_con">
        
        {show_loder && <ShowLoder/>}
          {/* form - 1 Login */}
          <form className={`login_part ${is_register ? "reverse_form_animation" : "set_form_animation" }`} id="login_part" onSubmit={handle_login_submit} action={`${Server_url}/api/login`} method="POST"
          style={{display:window.innerWidth >= 661 ? "flex" : test ? "none" : "flex" }}
          >
          

              <div className="title">Login</div>
              <CustomInputField type="text" id="login_email" name="user_html" value={login_email} onChange={(e)=>set_login_email(e.target.value)} label="Email" error={login_email_error} />
              <CustomInputField type="password" id="login_password" value={login_password} onChange={(e)=>set_login_password(e.target.value)} label="Password" error={login_password_error} />
              <span className="forgot_password" onClick={()=>{set_show_forget_password(!show_forget_password); }}> forgot password? </span>

              
              <button id="custom_button">Login</button>
              
              {/* <img src={google_logo} className="other_login" alt="google sign" /> */}
              <p> Don't have an account?{" "} 
                <span id="go_to_register" onClick={go_to_register}> Register </span>
              </p>
          </form>

          {/* form - 2 Register */}
          <form className={`register_part ${!is_register ? "reverse_form_animation" : "set_form_animation" }`} action="go.html" id="register_part" onSubmit={handle_register_submit} 
          style={{display:window.innerWidth >= 661 ? "flex" : test ? "flex" : "none" }}
          >
            
                <div className="title">Register</div>
                {is_page_1register ? <>
                <CustomInputField type="text" value={register_user_name} onChange={(e)=>set_register_user_name(e.target.value)} label="User Name" error={register_user_name_error} id="register_user_name"/>
                <CustomInputField type="text" value={register_email} onChange={(e)=>set_register_email(e.target.value)} label="Email" error={register_email_error} id="register_email"/>
                <CustomInputField type="password" value={register_password} onChange={(e)=> set_register_password(e.target.value)} label="Password" error={register_password_error} id="register_password"/>
                <CustomInputField type="password" value={register_confirm_password_password} onChange={(e)=> set_register_confirm_password_password(e.target.value)} label="Confirm Password" error={register_confirm_password_password_error} id="register_confirm_password_password"/>
                </>
                :<>
                <CustomInputField type="text" value={register_business_name} onChange={(e) => set_register_business_name(e.target.value)} label="Business Name" error={register_business_name_error} id="register_business_name"/>
                <CustomInputField type="text" value={register_business_address} onChange={(e) => set_register_business_address(e.target.value)} label="Business Address" error={register_business_address_error} id="register_business_address"/>
                <CustomInputField type="text" value={register_business_mobile_number} onChange={(e) => set_register_business_mobile_number(e.target.value)} label="Mobile Number" error={register_business_mobile_number_error} id="register_business_mobile_number"/>
                <CustomInputField type="text" value={register_business_GST_number} onChange={(e) => set_register_business_GST_number(e.target.value)} label="GST Number" error={register_business_GST_number_error} id="register_business_GST_number"/>
                </>}

                {is_page_1register &&  <span>
                    <input type="checkbox" style={{marginleft:"10px"}} id="terms_and_conditions" checked={terms_and_conditions} onChange={(e)=> set_terms_and_conditions(e.target.checked)} />  
                    <label htmlFor="terms_and_conditions"style={{cursor:"pointer"}} className="label_custom_check_box">Agree to terms and conditions</label>
                    <div id="terms_and_conditions_error" className="all_error_for_input">{terms_and_conditions_error}</div>
                </span>
}
                
              

                <div className="button_con_register_part">

                {is_page_1register ?
                    <button id="custom_button" className="custom_button" onClick={ (e)=>{
                      register_page_1_valide(e);
                      }} >Next</button> : <button id="custom_button" onClick={ (e)=>{
                        e.preventDefault();
                        toggle_is_page_1register(true);
                      }} >back</button> }
             

      
                {!is_page_1register && <button id="custom_button">Register</button>}
                </div>
                
                
                
                <p>Have an account?{" "} 
                  <span id="go_to_login" onClick={go_to_Login}>
                    Login
                  </span>
                </p>
          </form>

          {/* switch for move on form */}
          <div className="switch_con" id="switch_con" style={{ transform: is_register ? "translate(100%)" : "translate(0%)" }}>
            
          <Swiper modules={[Pagination, Autoplay]} 
           autoplay={{ delay: 3000 }}
           loop={true} pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }} className="image-swiper" style={{
              width: "100%",
              height: "100%",
              position: "relative",
            }}>
            <SwiperSlide>
              <div className="travel_login_img" id="travel_login_img">
                <img src={Register_page_1}      alt="Slide 1"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}  />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="travel_login_img" id="travel_login_img">
                <img src={Register_page_2} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="travel_login_img" id="travel_login_img">
                <img src={Register_page_3} alt="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="travel_login_img" id="travel_login_img">
                <img src={Register_page_4} alt="" />
              </div>
            </SwiperSlide>
            <div className="swiper-pagination" />
          </Swiper>
          </div>

        </div>
      </div>

      {show_verify_page ? <VerifyOpt 
             user_name={register_user_name}
             user_email={register_email}
             user_password={register_password}
             business_name={register_business_name}
             business_address={register_business_address}
             mobile_number={register_business_mobile_number}
             GST_number={register_business_GST_number}
      close_function={()=>{set_show_verify_page(!show_verify_page);
        set_show_loder(false);

      }
    } />
                      : ''}
      { show_forget_password ? <ForgetPassword last_enter_email={login_email} page_close_function={()=>
         {set_show_forget_password(!show_forget_password);
         }} /> : ''}
   </>
  );
  
}

export default LoginRegisterOwener;


