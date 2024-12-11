

const fs = require('fs');
// const filePath = './node_modules/react-scripts/config/webpackDevServer.config.js';
const filePath = 'node_modules/react-scripts/config/webpackDevServer.config.js';


fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
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
                console.error('Error writing to the file:', err);
                return;
            }
        });
    } else {
        console.log('Old text not found in the file. CALL a @shrey11_');
    }
});
