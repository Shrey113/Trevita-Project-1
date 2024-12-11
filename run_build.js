const path = require('path');
const { execSync } = require('child_process');

var url = 'http://localhost:3000';
// const server_file_path = path.join(__dirname,'Server','server.js')


console.log("\n1 - build a new folder \n");

execSync("npm run build", { stdio: 'inherit' })
execSync(`cls`, { stdio: 'inherit' });

console.log("\n2 -  start server\n");

// execSync(`start cmd /k node ${server_file_path}`, { stdio: 'inherit' });

// setTimeout(() => {
//     execSync(`start ${url}`, { stdio: 'inherit' });   
// }, 1000);

setTimeout(() => {
    execSync("serve -s build", { stdio: 'inherit' })        
}, 1000);
