
const modules_need_for_this_file = [
    'express',
    'cors',
    'react',
    'chalk@4',
    'mongoose',
    'react-router-dom',
    'concurrently --save-dev',
    'nodemailer',
    'jsonwebtoken',
    'react-chartjs-2',
    'chart.js',
    'socket.io',
    'socket.io-client',
    'morgan',
    'emoji-picker-react',
    // must for fix react app
    '--save-dev @babel/plugin-proposal-private-property-in-object',
];


let task_1 = false // Install modules
let task_2 = false // fix React - 1

//--------------------------------------------------------------------------------------------------------
//-------------------------------------- Install All modules, react --------------------------------------
//--------------------------------------------------------------------------------------------------------

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });


function install_modules(modules_array){
    global = task_1
    try {
        modules_array.forEach((module,index) => {
            console.log(`\nModule installer Create by @Shrey11_\n\n${index + 1} of ${modules_array.length}\tName : ${module} \n\nDownloading process script:`);
            execSync(`npm install ${module}`, { stdio: 'inherit' });
            execSync(`cls`, { stdio: 'inherit' });
        });
        task_1 = true
    } catch (error) {
        task_1 = false
        console.log('Error', error);
    }
};

install_modules(modules_need_for_this_file);


//--------------------------------------------------------------------------------------------------------
//--------------------------------------- fix other part for react ---------------------------------------
//--------------------------------------------------------------------------------------------------------


execSync(`cls`, { stdio: 'inherit' });
console.log("fix other part for react.....")

const fs = require('fs');
// const filePath = './node_modules/react-scripts/config/webpackDevServer.config.js';
const filePath = './node_modules/react-scripts/config/webpackDevServer.config.js';


fs.readFile(filePath, 'utf8', (err, data) => {
    global = task_2
    if (err) {
        task_2 = false
        console.error('Error reading the file:', err);
        return;
    }

const oldText = `    onBeforeSetupMiddleware(devServer) {
      // Keep \`evalSourceMapMiddleware\`
      // middlewares before \`redirectServedPath\` otherwise will not have any effect
      // This lets us fetch source contents from webpack for the error overlay
      devServer.app.use(evalSourceMapMiddleware(devServer));

      if (fs.existsSync(paths.proxySetup)) {
        // This registers user provided middleware for proxy reasons
        require(paths.proxySetup)(devServer.app);
      }
    },
    onAfterSetupMiddleware(devServer) {
      // Redirect to \`PUBLIC_URL\` or \`homepage\` from \`package.json\` if url not match
      devServer.app.use(redirectServedPath(paths.publicUrlOrPath));

      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebook/create-react-app/issues/2272#issuecomment-302832432
      devServer.app.use(noopServiceWorkerMiddleware(paths.publicUrlOrPath));
    },`;

    const newText = `
    setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
            throw new Error('webpack-dev-server is not defined');
        }

        // Add the evalSourceMapMiddleware before other middlewares
        middlewares.unshift(evalSourceMapMiddleware(devServer));

        if (fs.existsSync(paths.proxySetup)) {
            require(paths.proxySetup)(devServer.app);
        }

        // Add the other middlewares after the evalSourceMapMiddleware
        middlewares.push(
            redirectServedPath(paths.publicUrlOrPath),
            noopServiceWorkerMiddleware(paths.publicUrlOrPath)
        );

        return middlewares;
    },`;

    if (data.includes(oldText)) {
        const updatedContent = data.replace(oldText, newText);

        fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
            if (err) {
                task_2 = false
                console.error('Error writing to the file:', err);
                return;
            }else{
                task_2 = true
            }
        });
    }else{        
        task_2 = false
    }
});


//--------------------------------------------------------------------------------------------------------
//------------------------------------------- End message part -------------------------------------------
//--------------------------------------------------------------------------------------------------------

if (task_1){
    console.log("\n 1. All modules installed successfully\n");
}
if (task_2){
    console.log(" 2. fix -- (BUG that will show on start React-app)....\n\n");
}
const path = require('path');


const server_file_path = path.join(__dirname,'Server','server.js')
var react_url = 'http://localhost:3000';
rl.question('Any key to build React App and start.....', () => {
    execSync(`cls`, { stdio: 'inherit' });
    console.log("@shrey11_ say 'npm run build'\n");
    
    console.log("\n1 - build a new folder \n");
    
    execSync("npm run build", { stdio: 'inherit' })
    execSync(`cls`, { stdio: 'inherit' });
    
    console.log("\n2 -  start server\n");

    execSync(`start ${react_url}`, { stdio: 'inherit' });

    execSync(`start cmd /k node ${server_file_path}`, { stdio: 'inherit' });

    execSync("serve -s build", { stdio: 'inherit' })
    
    rl.close();
});







//  other thing that chage --- 

// // some time need to add
// npm install --save-dev @babel/plugin-proposal-private-property-in-object

