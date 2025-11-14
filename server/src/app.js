const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

const createApp = () => {
  const app = express();

  const corsOptions = config.clientOrigin
    ? {
        origin: config.clientOrigin,
        credentials: true,
      }
    : {};

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  app.use('/api/auth', authRoutes);

  app.use(errorHandler);

  return app;
};

module.exports = createApp;


