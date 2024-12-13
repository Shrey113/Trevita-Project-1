const crypto = require('crypto');

// Store OTPs for users
let otp_storage_owener = {};
let otp_storage_Client = {};

function generate_otp(user_email,type) {
  const otp = crypto.randomInt(100000, 999999).toString();
  if(type == "owener"){
    otp_storage_owener[user_email] = otp;
  }else{
    otp_storage_Client[user_email] = otp;
  }
  return otp;
}

function get_otp(user_email,type) {
  if(type == "owener"){
    return otp_storage_owener[user_email];
  }else{
    return otp_storage_Client[user_email];
  }
}

function clear_otp(user_email,type) {
  if(type == "owener"){
    delete otp_storage_owener[user_email]; 
  }else{
    delete otp_storage_Client[user_email];
  }
}

module.exports = { generate_otp, get_otp, clear_otp };
