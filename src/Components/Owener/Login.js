import React, { useState,useEffect  } from "react";
// import CustomInputField from './sub_components/CustomInputField.js'
import eye_visible from './../../Assets/Login/eye_visible.png';
import eye_hide from './../../Assets/Login/eye_hide.png';
import Register_page_ from './../../Assets/Owener/Register_page_.jpg';

import { useNavigate } from 'react-router-dom';
import './css/LoginRegister.css'
import { TypeAnimation } from 'react-type-animation';
import travel from "./../../Assets/Owener/download.jpg";





const CustomInputField = ({ id, type, value, onChange, label, error, name }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="Login_register_input_group">
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



const text_lines = [
  "Enter your credentials to get started",
  "this is line 2 for new user"
];


function Login() {
  const [is_show_animation,set_is_show_animation] = useState(true);
  //  Login part -- 
  const [login_email, set_login_email] = useState("");
  const [login_email_error, set_login_email_error] = useState("");
  const [login_password, set_login_password] = useState("");
  const [login_password_error, set_login_password_error] = useState("");

  const [is_register, toggle_register_login] = useState(false);
  // register part --
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

  // toggle page --
  const [show_verify_page,set_show_verify_page] = useState(false)
  const [show_forget_password,set_show_forget_password] = useState(false)


  const validate_email = (email) => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_pattern.test(email);
  };


  const navigate = useNavigate();

  function go_to_admin_page(){
    navigate('/admin_pass_with_id_admin_id_tjSFS1f21s1fSF');
  }


  // validate login  - function 
  const handle_login_submit = (event) => {
    console.log("sss");
    
    // if (login_email === Admin_page_password_key){
    //   if(login_password === Admin_page_user_key){
    //     go_to_admin_page()
    //     return;
    //   }
    // }
    event.preventDefault();
    let is_valid = true;

    if (validate_email(login_email)) {
      set_login_email_error("");
    } else {
      set_login_email_error("Invalid email");
      is_valid = false;
    }
    if (is_valid) {
      fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_name: login_email,
          password: login_password
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.log("server say : Not-ok\n\nmessage : 'server response was not ok(Not a 200).' ");
          }
        })
        // check by server code-- login
        .then(data => {
          set_login_password_error("");
          set_login_email_error("");

          if (data.status === 'login-fail') {
            set_login_email_error("Enter Email is does not exist");
          }else{
            if (data.status === 'password-fail') {
              set_login_password_error("Enter password is incorrect");
            } else if(data.status === 'password-pass'){
              set_login_password_error("");
              // go to verify otp page

            } else if(data.status === 'server-fail'){
              alert('Internal server error');
            }else {
              alert('Not valid data send by server');
            }
            set_login_email_error("");
          }
        })
        .catch(error => {
          console.log("while run java script error\n\nError :", error);
        });

    }
  };

  // validate register - function 
  const handle_register_submit = (event) => {
    event.preventDefault();
    let is_valid = true;

    if (register_user_name.length < 4) {
      set_register_user_name_error("Length must be 4 characters");
      is_valid = false;
    } else {
      set_register_user_name_error("");
    }

    if (validate_email(register_email)) {
      set_register_email_error("");
    } else {
      set_register_email_error("Invalid email");
      is_valid = false;
    }

    const temp_password = register_password;
    if (temp_password.length < 4) {
      set_register_password_error("Length must be at least 4 characters");
      is_valid = false;
    } else if (!/\d/.test(temp_password)) {
      set_register_password_error("Must contain at least one digit");
      is_valid = false;
    } else if (!/[a-zA-Z]/.test(temp_password)) {
      set_register_password_error("Must contain at least one letter");
      is_valid = false;
    } else if (!/[A-Z]/.test(temp_password)) {
      set_register_password_error("Must contain at least one uppercase letter");
      is_valid = false;
    } else {
      set_register_password_error("");
    }
    

    if (register_password !== register_confirm_password_password) {
      set_register_confirm_password_password_error("Passwords must match");
      is_valid = false;
    } else {
      set_register_confirm_password_password_error("");
    }

    if (!terms_and_conditions) {
      set_terms_and_conditions_error("Terms and conditions must be checked");
      is_valid = false;
    } else {
      set_terms_and_conditions_error("");
    }

    if (is_valid) {
      fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          register_user_name: register_user_name,
          register_email: register_email,
          register_password: register_password,
        }),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.log("server say : Not-ok\n\nmessage : 'server response was not ok(Not a 200).' ");
          }
        })

        .then(data => {
          console.log(data);          
          if (data.status === 'failed-exist') {
            set_register_email_error("Enter Email is already exist");
          } else if (data.status === 'success') {
            set_register_email_error("");
            set_is_show_animation(!is_show_animation)
            set_show_verify_page(!show_verify_page)
          } else {
            alert('Not valid data send by server');
          }
        })
        .catch(error => {
          console.log("html say : Not-ok\n\nmessage : 'while run java script error'\n\nError :", error);
        });
    }
  };

 


  return (
    <>
      <div className="full_blur_bg_1">
        <div className="user_login_con">

          {/* form - 1 Login */}
          <form className={`login_part ${is_register ? "reverse_form_animation" : "set_form_animation" }`} id="login_part" onSubmit={handle_login_submit} action="http://localhost:4000/api/login" method="POST">
              <div className="title">Login</div>
              <CustomInputField type="text" id="login_email" name="user_html" value={login_email} onChange={(e)=>set_login_email(e.target.value)} label="Email" error={login_email_error} />
              <CustomInputField type="password" id="login_password" value={login_password} onChange={(e)=>set_login_password(e.target.value)} label="Password" error={login_password_error} />
              <span className="forgot_password" onClick={()=>{set_show_forget_password(!show_forget_password);set_is_show_animation(!is_show_animation)}}> forgot password? </span>

              
              <button id="custom_button">Login</button>
              
              {/* <img src={google_logo} className="other_login" alt="google sign" /> */}
              <p> Don't have an account?{" "} 
                <span id="go_to_register" onClick={ ()=>{toggle_register_login(!is_register)} }> Register </span>
              </p>
          </form>

          {/* form - 2 Register */}
          <form className={`register_part ${!is_register ? "reverse_form_animation" : "set_form_animation" }`} action="go.html" id="register_part" onSubmit={handle_register_submit}>
                <div className="title">Register</div>
                <CustomInputField type="text" value={register_user_name} onChange={(e)=>set_register_user_name(e.target.value)} label="User Name" error={register_user_name_error} id="register_user_name"/>
                <CustomInputField type="text" value={register_email} onChange={(e)=>set_register_email(e.target.value)} label="Email" error={register_email_error} id="register_email"/>
                <CustomInputField type="password" value={register_password} onChange={(e)=> set_register_password(e.target.value)} label="Password" error={register_password_error} id="register_password"/>
                <CustomInputField type="password" value={register_confirm_password_password} onChange={(e)=> set_register_confirm_password_password(e.target.value)} label="Confirm Password" error={register_confirm_password_password_error} id="register_confirm_password_password"/>
                <span>
                    <input type="checkbox" style={{marginleft:"10px"}} id="terms_and_conditions" checked={terms_and_conditions} onChange={(e)=> set_terms_and_conditions(e.target.checked)} />  
                    <label htmlFor="terms_and_conditions"style={{cursor:"pointer"}} className="label_custom_check_box">Agree to terms and conditions</label>
                    <div id="terms_and_conditions_error" className="all_error_for_input">{terms_and_conditions_error}</div>
                </span>
                <button id="custom_button">Register</button>
                
                
                
                <p>Have an account?{" "} 
                  <span id="go_to_login" onClick={()=>{toggle_register_login(!is_register)}}>
                    Login
                  </span>
                </p>
          </form>

          {/* switch for move on form */}
          <div className="switch_con" id="switch_con" style={{ transform: is_register ? "translate(100%)" : "translate(0%)" }}>
            
            <div className="travel_login_img" id="travel_login_img">
              <img src={travel} alt=""/>
            </div>

            <div className="top_switch_con">
                
            </div>
          </div>

        </div>
      </div>

   </>
  );
  
}

export default Login;


