// Vercel Serverless Function wrapper for Express app
// This file allows the Express backend to run as a serverless function on Vercel

const path = require('path');

// Set the working directory to server folder for proper path resolution
// This ensures config.js and other modules can find their files correctly
process.chdir(path.join(__dirname, '..', 'server'));

const createApp = require('../server/src/app');

// Create the Express app
const app = createApp();

// Export as serverless function handler
module.exports = app;

