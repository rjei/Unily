const http = require('http');
const createApp = require('./app');
const config = require('./config');
const bootstrap = async () => {
  const app = createApp();
  const server = http.createServer(app);

  server.listen(config.port, () => {

    console.log(`API server ready on http://localhost:${config.port}`);
  });
};

bootstrap().catch((error) => {
  /* eslint-disable no-console */
  console.error('Unable to start server', error);
  process.exit(1);
});


