const http = require('http');
const createApp = require('./app');
const config = require('./config');
const { ensureDirectory, ensureFile } = require('./utils/fileSystem');

const bootstrap = async () => {
  await ensureDirectory(config.dataDir);
  await ensureFile(config.usersFile, '[]');

  const app = createApp();
  const server = http.createServer(app);

  server.listen(config.port, () => {
    /* eslint-disable no-console */
    console.log(`API server ready on http://localhost:${config.port}`);
  });
};

bootstrap().catch((error) => {
  /* eslint-disable no-console */
  console.error('Unable to start server', error);
  process.exit(1);
});


