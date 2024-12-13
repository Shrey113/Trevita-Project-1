const crypto = require('crypto');

// Store OTPs for users
let otp_storage = {};

// Function to generate an OTP and store it with the user's email
function generate_otp(user_email) {
  const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
  otp_storage[user_email] = otp; // Store the OTP with the user's email
  return otp;
}

// Function to get the OTP for a specific user
function get_otp(user_email) {
  return otp_storage[user_email]; // Retrieve the OTP for the given email
}

// Function to clear OTP after verification
function clear_otp(user_email) {
  delete otp_storage[user_email]; // Remove the OTP from storage
}

module.exports = { generate_otp, get_otp, clear_otp };
