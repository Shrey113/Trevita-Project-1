const fs = require('fs');
const path = require('path');
const chalk = require('chalk')


function error_message(message,error=""){
  console.log(chalk.red(` [ERROR]   ${message}`));
  if (!error==""){
    console.log(error);
  }
}

function info_message(message){
  console.log(chalk.hex('#fffd94')(` [INFO]    ${message}`));
}

function success_message(message){
  console.log(chalk.green(` [SUCCESS] ${message}`));
}

function normal_message(message){
  console.log(chalk.white(` [NORMAL]  ${message}`));
}








function server_request_mode(method, url, body) {
  function truncateString(input, charLimit) {
    return input.length > charLimit ? input.substring(0, charLimit) + "..." : input;
  }

  function truncateBodyContent(body, charLimit) {
    const truncatedBody = {};
    for (const [key, value] of Object.entries(body)) {
      const truncatedKey = truncateString(key, charLimit);
      const truncatedValue = typeof value === 'string' ? truncateString(value, charLimit) : value;
      truncatedBody[truncatedKey] = truncatedValue;
    }
    return truncatedBody;
  }
  
  const truncatedUrl = truncateString(url, 30);
  const truncatedBody = truncateBodyContent(body, 20);

  const baseLog = [
    chalk.hex('#fffd94')(method.padEnd(8)),
    chalk.green(truncatedUrl.padEnd(35)),
  ];

  if (Object.keys(truncatedBody).length > 0) {
    const formattedBody = Object.entries(truncatedBody)
      // .map(([key, value]) => `{ ${key}: ${value} }`)
      .map(([key, value]) => `{${key}}`)
      .join(',');
    baseLog.push(chalk.magenta(formattedBody));
  }

  console.log(...baseLog);
}





const log_file_path = path.join(__dirname, './../../Data_file/log_file.txt');

function write_log_file(message, status = 'INFO') {
  const current_time = new Date();
  const formatted_time = current_time.toLocaleString('en-GB', { hour12: false });

  const log_entry = `\nDate      :  ${formatted_time}\n` +
                      `Status    :  ${status}\n` +
                      `Message   :  ${message}\n`;

  fs.appendFile(log_file_path, log_entry, (err) => {
    if (err) {
      error_message(`Error writing to log`)
      error_message(`Error :\n`,err);
      return;
    }
    success_message('Log entry added successfully')
  });
}

module.exports = {server_request_mode,write_log_file,error_message,info_message,success_message,normal_message}